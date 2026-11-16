#!/usr/bin/env python3
"""Daily law search without Claude. Runs on GitHub Actions (free) and writes law_updates.json at the site root,
which every firm imports when it opens the site. Sources are in sources.json - add new searches there.
If the secret GEMINI_API_KEY is set, Google's free Gemini writes a short summary in simple Hindi + English and drops noise;
without it only title, date, link and category are saved."""
import json, os, re, sys, hashlib, html, time, urllib.request, urllib.parse, email.utils, datetime
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", ".."))
OUT = os.path.join(ROOT, "law_updates.json")
CFG = json.load(open(os.path.join(HERE, "sources.json"), encoding="utf-8"))
KEY = os.environ.get("GEMINI_API_KEY", "").strip()
UA = {"User-Agent": "Mozilla/5.0 (compatible; MukeshCompliancesLawSearch/1.0)"}
RELEVANT = re.compile(r"notif|circular|advisory|amend|due date|deadline|extend|rule|rate|form|return|filing|compliance|penalt|late fee|interest|portal|exemption|threshold|limit|instruction|order|clarif", re.I)
NOISE = re.compile(r"\b(stock|share price|sensex|nifty|ipo|cricket|bollywood|horoscope)\b", re.I)
CATS = {"gst", "it", "roc", "pf", "pt", "iex", "lic", "other"}

def get(url, data=None, headers=None, timeout=25):
    req = urllib.request.Request(url, data=data, headers=dict(UA, **(headers or {})))
    with urllib.request.urlopen(req, timeout=timeout) as r:
        return r.read().decode("utf-8", "replace")

def tag(block, name):
    m = re.search(r"<%s[^>]*>(.*?)</%s>" % (name, name), block, re.S | re.I)
    if not m: return ""
    v = m.group(1).strip()
    v = re.sub(r"^<!\[CDATA\[(.*)\]\]>$", r"\1", v, flags=re.S)
    return html.unescape(re.sub(r"<[^>]+>", " ", html.unescape(v))).strip()

def parse_rss(xml):
    out = []
    for b in re.findall(r"<item\b.*?</item>", xml, re.S | re.I):
        t, l, d, s = tag(b, "title"), tag(b, "link"), tag(b, "pubDate"), tag(b, "description")
        src = tag(b, "source")
        try: dt = email.utils.parsedate_to_datetime(d).date().isoformat() if d else ""
        except Exception: dt = ""
        if t and l: out.append({"title": re.sub(r"\s+", " ", t), "link": l.strip(), "date": dt, "desc": re.sub(r"\s+", " ", s)[:600], "src": src})
    return out

def guess_cat(text):
    T = text.lower()
    for c, words in [("gst", ["gst", "cbic", "gstn", "gstr"]), ("it", ["cbdt", "income tax", "income-tax", "tds", "tcs", "itr"]),
                     ("roc", ["mca", "companies act", "roc", "llp"]), ("pf", ["epfo", "esic", "provident fund", "esi "]),
                     ("iex", ["dgft", "customs", "export", "import"])]:
        if any(w in T for w in words): return c
    return "other"

def norm_words(s):
    return set(w for w in re.findall(r"[a-z0-9]+", s.lower()) if len(w) > 2)

def similar(a, b):
    A, B = norm_words(a), norm_words(b)
    return bool(A and B) and len(A & B) / len(A | B) >= 0.55

def gemini(prompt):
    for model in CFG.get("ai", {}).get("models", []):
        url = "https://generativelanguage.googleapis.com/v1beta/models/%s:generateContent?key=%s" % (model, urllib.parse.quote(KEY))
        body = json.dumps({"contents": [{"parts": [{"text": prompt}]}], "generationConfig": {"responseMimeType": "application/json", "temperature": 0.2}}).encode()
        try:
            r = json.loads(get(url, data=body, headers={"Content-Type": "application/json"}, timeout=60))
            return json.loads(r["candidates"][0]["content"]["parts"][0]["text"])
        except Exception as e:
            print("  AI model", model, "failed:", str(e)[:150])
    return None

PROMPT = """You help a CA / compliance firm in India. Below is a news or press item found by a search. Decide whether it reports a real change in Indian tax / company / labour / trade law or procedure that a compliance firm must know (notification, circular, advisory, due-date extension, new form or rule, rate change). Use ONLY the text given; never invent numbers, dates or section numbers. If a detail is not in the text, leave it empty.
Return JSON: {"relevant": true/false, "cat": one of gst|it|roc|pf|pt|iex|lic|other, "impact": high|med|low,
 "title_hi": short title in simple Hindi (Devanagari, keep form names like GSTR-3B in English), "title_en": short English title,
 "sum_hi": 1-2 simple Hindi sentences: what changed, "sum_en": same in English,
 "before_hi","before_en","after_hi","after_en": what it was before / what it is now (empty if not stated),
 "who_hi","who_en": who it applies to (empty if not stated),
 "act_hi","act_en": list of 0-3 short actions for the firm, "eff": effective date YYYY-MM-DD or "", "number": notification/circular number or "",
 "same_as": a short key naming the underlying notification so duplicates from different news sites match, e.g. "CBDT circular 07/2026"}
ITEM:
TITLE: %s
SOURCE: %s
DATE: %s
TEXT: %s"""

def main():
    old = json.load(open(OUT, encoding="utf-8")) if os.path.exists(OUT) else []
    seen_ids = {u.get("id") for u in old}
    seen_titles = [((u.get("title") or {}).get("en") or "") + " " + (u.get("_orig") or "") for u in old[:200]]
    seen_keys = {u.get("_key") for u in old if u.get("_key")}
    cutoff = (datetime.date.today() - datetime.timedelta(days=int(CFG.get("days", 4)))).isoformat()
    found = []
    for s in CFG["sources"]:
        if s.get("on") is False: continue
        url = s.get("url") or ("https://news.google.com/rss/search?" + urllib.parse.urlencode({"q": s["q"] + " when:%dd" % int(CFG.get("days", 4)), "hl": "en-IN", "gl": "IN", "ceid": "IN:en"}))
        try:
            items = parse_rss(get(url))
        except Exception as e:
            print("SOURCE FAILED", s["id"], str(e)[:150]); continue
        must = [m.lower() for m in s.get("must", [])]
        n = 0
        for it in items:
            if it["date"] and it["date"] < cutoff: continue
            text = it["title"] + " " + it["desc"]
            if must and not any(m in text.lower() for m in must): continue
            if NOISE.search(text) or not RELEVANT.search(text): continue
            g = guess_cat(text); it["cat"] = g if g != "other" else (s.get("cat") if s.get("cat") in CATS else "other")
            if it["src"] and it["title"].endswith(" - " + it["src"]): it["title"] = it["title"][: -len(it["src"]) - 3]
            it["source_id"] = s["id"]; found.append(it); n += 1
        print("source", s["id"], "items", len(items), "kept", n)
    new = []
    limit = int(CFG.get("ai", {}).get("max_new_per_run", 12))
    for it in found:
        uid = "auto_" + hashlib.sha1(it["link"].encode()).hexdigest()[:12]
        if uid in seen_ids or any(similar(it["title"], t) for t in seen_titles): continue
        rec = {"id": uid, "cat": it["cat"], "title": {"en": it["title"]}, "sum": {"en": it["desc"][:400]} if it["desc"] and not it["desc"].startswith(it["title"][:30]) else {},
               "date": it["date"] or datetime.date.today().isoformat(), "source": it["src"] or it["source_id"], "number": "", "url": it["link"],
               "impact": "med", "auto": True, "_orig": it["title"]}
        if KEY:
            if len(new) >= limit: break
            a = gemini(PROMPT % (it["title"], it["src"], it["date"], it["desc"]))
            time.sleep(4)  # stay inside the free per-minute limit
            if a is not None:
                if not a.get("relevant"): seen_titles.append(it["title"]); continue
                k = (a.get("same_as") or "").strip().lower()
                if k and k in seen_keys: continue
                if k: seen_keys.add(k); rec["_key"] = k
                rec["cat"] = a.get("cat") if a.get("cat") in CATS else rec["cat"]
                rec["impact"] = a.get("impact") if a.get("impact") in ("high", "med", "low") else "med"
                rec["title"] = {"hi": a.get("title_hi") or "", "en": a.get("title_en") or it["title"]}
                rec["sum"] = {"hi": a.get("sum_hi") or "", "en": a.get("sum_en") or ""}
                for f in ("before", "after", "who"):
                    if a.get(f + "_hi") or a.get(f + "_en"): rec[f] = {"hi": a.get(f + "_hi") or "", "en": a.get(f + "_en") or ""}
                if a.get("act_hi") or a.get("act_en"): rec["act"] = {"hi": a.get("act_hi") or [], "en": a.get("act_en") or []}
                if re.match(r"^\d{4}-\d\d-\d\d$", a.get("eff") or ""): rec["eff"] = a["eff"]
                rec["number"] = (a.get("number") or "")[:60]
                rec["ai"] = True
        new.append(rec); seen_titles.append(it["title"]); seen_ids.add(uid)
    print("new updates:", len(new))
    if new:
        allu = (new + old)[: int(CFG.get("keep", 300))]
        json.dump(allu, open(OUT, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    return 0

if __name__ == "__main__":
    sys.exit(main())
