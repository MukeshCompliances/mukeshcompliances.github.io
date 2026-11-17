# Compliance Record app — handover for a new chat

Written 16 Nov 2026 at the end of a very long build chat. Read this fully before changing anything.
Everything needed to continue is in this repository under `_dev/`.

## 1. Who the user is and how to work with them

- Mukesh — runs a CA / compliance practice in India. Timezone Asia/Kolkata. Uses a phone and an HP laptop (Windows, Chrome).
- Writes Hinglish / Hindi, sometimes English, often by voice (expect transcription slips).
- **Reply in simple Hindi (Devanagari). Short, result first, mobile-friendly.** No jargon; say "साइट", "नियम", "बटन".
- When he must do something in Firebase / GitHub / the site: give **numbered steps with the exact on-screen button names**. He sends photos of his screen when stuck.
- Rule from day one: small tasks first, keep every existing feature.
- He is not technical. Do not ask him to edit code. If Firebase rules must change, give the **whole rules text** to paste (Ctrl+A, paste, Publish) — never "find these two lines".
- **Batch Firebase-rules changes.** He has pasted rules three times already and was annoyed. Collect rule changes and give them once.
- Be honest about what was and was not tested. Rules cannot be tested here (see §8).
- His email is private: never put it in public files or send it to outside services. In `firestore.rules` it appears only in the text you hand back to him (placeholder `OWNER_GMAIL_HERE` in the repo copy).
- Never ask for passwords, OTPs, API keys in chat.
- He worries about usage/credits: avoid unnecessary web searches and long replies.

## 2. The two deployments

| | Claude app (artifact) | Website |
|---|---|---|
| URL | https://claude.ai/artifact/1k5Tiz3oej2z2NkQZE5QDf | https://mukeshcompliances.github.io |
| Slug / repo | artifact slug `0603bb2c-8e71-4946-80e2-1209c72545ca` (last version `1794795514-d257`) | repo `MukeshCompliances/mukeshcompliances.github.io`, branch `main`, GitHub Pages |
| Data | artifact db (collections at top level) | Firebase project id `mukeshcompliances`, Firestore default DB, Spark (free) plan |
| Login | Claude account | Firebase Auth: Email/Password + Google |
| Claude features | yes (`sample` capability) | **no** (no API key; `sample` is null) |
| Use | testing + Claude-powered features | real daily work, multi-firm product |

**Agreed workflow:** every app change goes to the Claude artifact first, he tests, and only after his OK it is pushed to the website. Exception: things that exist only on the site (login, firms, provider panel) go straight to the site after local tests.

The artifact's declared capabilities: `{assets:{}, db:{rules:[{path:"",read:"view",write:"interact"}]}, downloads:{}, user:{scopes:["profile"]}, sample:{images:true}}`. Publish with `publish_files` (needs `base_version` from `get_artifact`).

There is one scheduled task: "कानून के नए बदलाव – रोज़ की खोज", daily 07:43 IST, writes law updates into the **artifact's** `law_updates` collection only (not the site).

## 3. Repository layout

```
/                      the live site (GitHub Pages serves this)
  index.html           BUILT file = app + site layer. Never edit by hand.
  kb_extra.json        extra question-bank answers the site loads at start ([] now)
  law_updates.json     law updates the site imports into each firm ([] now)
  manifest.json, icon.svg, .nojekyll
/_dev/
  HANDOVER.md          this file
  index.html           APP SOURCE (single self-contained file, ~850 KB). Edit this.
  modules/*.js         reference copies of each module as last spliced into index.html
  site/shim.html       the site layer (Firebase login, firms, provider panel, idle log-out)
  site/build.py        builds ../index.html + shim + firebase_config.json -> site/out/
  site/firebase_config.json   public web config of the Firebase project
  site/firestore.rules        CURRENT published rules (owner email replaced by OWNER_GMAIL_HERE)
  tests/*.py           Playwright tests; tests/site/fakefb.js = in-memory fake of Firebase
  tests/samples/       synthetic sample files made for tests (no real client data)
```

**Deploy the site:** `cd _dev/site && python3 build.py` → copy `out/index.html` to the repo root → commit → push.
Commit messages end with the attribution lines the session provides.

**How modules are added:** each feature is a block of JS appended inside `_dev/index.html` just before the line
`paintStatic();render();init();` + `</script>`. Later modules wrap earlier functions (`const _old=fn; fn=function(){ _old(); … }`). The `modules/*.js` copies are for reading; the source of truth is `index.html`. When changing a module, edit the copy and re-splice it (replace from its `/* ===== xx:` marker to the next marker), or edit `index.html` directly and keep the copy in sync.

**Tests** were written for paths like `/home/claude/compliance-app/index.html` and `/home/claude/tests/...`; adjust paths when running elsewhere. They need Playwright (Python), and `pdfjs-dist@3.11.174` + `xlsx@0.18.5` from npm for tests that read PDFs/Excel (the app loads these from cdnjs; tests route cdnjs to local copies). Key ones:
- `demo_test.py` — in-app self-check; expect "47 ठीक · 1 देखें · 0 दिक्कत" outside Claude.
- `kb_test.py` (39/39), `tr_test.py`, `at_test.py`, `fr_test.py`.
- `site2_test.py` — the whole site layer on the fake Firebase (firms, migration, request/approve, paid period, services, updates, idle log-out, sign-up screens). Takes ~100 s.
- Four notice tests (`att`, `case`, `c2`, `cr`) and the older sample PDFs are **not** in the repo because they contain real client references; rebuild them with synthetic samples if needed. Tests that read other PDFs (`ins`, `nt`, `period`, `fs`, `pc`…) need samples that are also not included.
- `mn_test.py` has a stale step (a sheet stays open and blocks a nav click) — pre-existing, not a regression.

## 4. What the app does (all in `_dev/index.html`)

Tabs: dashboard, list, clients, vault, documents, 📮 notices, 🛡 insurance, 📰 law updates, 📘 learn, 👥 team. Languages: Hindi, English, Chinese (`bt(hi,en)` helper; Chinese via `zhT`, Claude-translated and cached in `i18n_zh`).

Modules in creation order (marker name → what it is):
- core: clients (`parties`), compliances (`items`), generation `generate(p,startM,to)` by entity/GST/TDS/etc., proofs upload with period matching (`periodFacts`, `compareFacts`, AY = FY+1, payment challans matched by payment date), vault (master password never stored), roles.
- `lu` law updates · `biz` "which compliance applies and why" (state, activity, turnover, employees → PT/LWF/ITC-04/FSSAI/licences) · `mn` filing manuals + 🆘 error helper · `ins` insurance tracker · `nt` notice tracker · `demo` demo mode + self-check · `bk` backup/import + invites · `case`, `cs2`, `qa`, `fx`, `att`, `cr` notice case timeline, auto-detect step from paper, Q&A, one-tap actions, attachments, relation check · `zh_fix`, `zhdyn` Chinese · `tm` timing (late / due / period running / upcoming; future work hidden until its time; dashboard order "coming due first, then old late") · `fs` Balance Sheet & P&L entry + checker (tally, rounding vs actual figures, Schedule III basics, UDIN 60 days).
- `kb` **question bank** (answers without Claude): ~40 bilingual Q&As with sources, matcher that understands differently-worded questions (synonym map Hindi/Hinglish/English, fuzzy spelling, idf scoring, "did you mean", learns from picks in `kb_learn`), unanswered questions saved in `kb_asked` with a "copy all" button so he can paste them to Claude; extra answers come from `kb_extra.json` (site) / `kb_extra` collection.
- `tr` **TDS check**: working (Excel/CSV/PDF or manual) ↔ challans (PDF or manual) ↔ certificates; month and section differences, late-payment interest estimate, unread challans kept in yellow to complete, differences accepted with a reason, challans set aside with a reason. Collection `tds_recon`.
- `at` **Advance-tax check**: last year's computation (rate/regime, IT depreciation, add-backs) + this year's P&L (each head classified allowed / not allowed / check with reason and section) → total income → tax (FY 2026-27 rates; companies 25/22/30/15, firm 30, individual new/old slabs) → instalments 15/45/75/100% vs challans, interest estimate, Excel download. Collection `adv_tax`.
- `ft` **services per firm + updates** (site only; inert in the Claude app): catalog `FTG` (7 groups, every compliance code as `p_<code>`) + `FTM` (7 features `m_…`); `firm.features` map set by the provider; firm-side "seen" map in `settings/features`; newly allowed items show a "🆕 update" banner the firm admin turns on. UI-level gating only (not in rules).
- `fr` **Financial reports** per client: `p.fr = {mis,q,stock,prov,day}` → codes FR-MIS, FR-Q, FR-STK, FR-PROV in new category/group `fin` ("वित्तीय रिपोर्ट"); FS and UDIN-FS also group under `fin`.

Collections used by the app: compliances, clients, parties, members, vault (doc `meta`), vault_items, vault_log, settings (docs `email`, `access`, `features`), access_requests, law_updates, law_reads, manual_notes, error_cases, insurance, notices, app_feedback, i18n_zh, kb_asked, kb_learn, kb_extra, tds_recon, adv_tax, blobs (site only; files chunked in subcollection `p`).

## 5. The site layer (`_dev/site/shim.html`)

Injected right after `<body>`. Loads Firebase compat SDK 10.12.2, shows the login gate, and exposes `window.claude.use(name)` returning `db` (Firestore **scoped to the user's firm**), `user`, `assets` (files chunked into Firestore, max 10 MB), `downloads`. `sample` is absent.

**Multi-firm model**
- `config/app` `{owner: uid, support}` — the provider (super-admin). Only the email written in the rules can create it.
- `firms/{fid}` — fid = owner's uid (one firm per account). Fields: name, owner, ownerEmail, ownerName, phone, note, status, plan, trialEnds (ISO), trialEndsMs, pays[], features{}, stats{clients,users}, lastSeen.
- `firms/{fid}/members/{uid}` `{role,email,name}`, `firms/{fid}/invites/{email}`, `invidx/{email}` `{fid}` (lets an invited person find their firm), `users/{uid}` `{name,email,firm}`.
- All app data lives under `firms/{fid}/<collection>/…`. The provider is deliberately **not** allowed into firm data by the rules.
- Status: `pending` (request sent, app closed) → provider approves → `trial` with `trialEndsMs` (plan `demo` 30 days, or plan `paid` until a chosen date) or `active` (no end date); `stopped`, `rejected`. After the end date the firm is view-only (rules deny writes; shim reports role viewer).
- Provider panel ("🛠 फ़र्में", only for the super-admin): list of firms, pending requests on top with count on the button, approve demo / refuse, 💳 paid period (+1/3/6/12/24 months or a date, with a private payment note), ♾ forever, ⏸ stop, ✎ rename, 🧩 services (46 tick boxes, per group and per item), support contact.
- Login gate: tabs Sign in / Sign up (name, email, password, confirm), Forgot password screen, Google button, show-password eye. Email must be verified (token is refreshed after verification — this was a real bug, fixed). Session persistence = browser session; 20-minute idle auto log-out with a 1-minute warning; account menu (👤) with change password and log out.
- First owner login after the firms change copied old top-level data into `firms/<owner uid>` (copy only, nothing deleted).

**Verified on the real site by the user's screenshots:** request access → provider sees it → paid period saved; services button visible. Everything else on the site was tested only on the fake Firebase.

## 6. Current state on the real site (as of 16 Nov 2026)

- Rules published = `_dev/site/firestore.rules` (with his Gmail in place of the placeholder). Email/Password sign-in is enabled.
- His Gmail = super-admin and owner of firm no. 1 (default name "ADDENDA"; he was told to rename it e.g. "Mukesh Compliances").
- He created a **separate ID for the client firm "Addenda Chemical India Private Limited"** and gave it a paid period (it showed only 31 days, to 15 Dec 2026 — he may extend to a year). Its services were still "सभी" (never saved).
- The Addenda data still has to be brought in: Claude app → 👥 टीम → 📦 backup download → on the site, logged in as the Addenda ID → 👥 टीम → 📥 import. Not confirmed done.
- Addenda's workers are in India; their managers are in China. Firebase/Google is blocked in China → decided: **managers use VPN** (no rebuild). Managers should sign up with email+password, not Google.

## 7. Pending work

His side: import Addenda backup; rename own firm; fill support contact in the panel; save 🧩 services for each client firm; test from China over VPN; extend Addenda's period if wanted; create vault master password; add juniors.

To build (agreed order, none started):
1. App-wide audit log ("who did what") — only the vault has a log now.
2. "Delete all data of a firm" + remove the old copy left in the provider's own firm/top level.
3. Tell the provider when a new request arrives (today it only shows when he opens the site).
4. Bulk add clients from Excel. 5. DSC register with expiry reminders. 6. Privacy policy + terms draft (DPDP: obligations bite 13 May 2027).
7. Later: billing, client portal, timesheets, calendar/workload view.
Older parked items: bulk upload of old proofs with auto-matching; daily law updates reaching the site (`law_updates.json`); OCR for scans on the site; notice-reply templates; "copy for Claude" button; email reminders; GST 2B reconciliation; remaining states' PT/LWF.

**Next rules batch (give all at once):** enforce `features` in rules (services are UI-only now); anything needed for audit log / firm deletion.

Claude features on the site need a paid Anthropic API key behind a small server (e.g. Cloudflare Worker). He chose not to do this now. Free alternatives were discussed (on-device OCR, templates, Chrome built-in AI, Cloudflare Workers AI); none built.

## 8. Limits to stay honest about

- The sandbox cannot open the live site or Firebase, and the Firestore emulator cannot be downloaded — **rules are never tested here**. Say so, and tell him exactly what to check on the real site.
- Services/feature gating and roles in the Claude artifact are app-level, not a hard wall.
- Scanned PDFs/photos cannot be read on the site (no Claude). Challan / Form 16A / Tally P&L / computation parsers were tested on synthetic samples only; real files may differ — ask him for a failing sample.
- The tax figures in the question bank and advance-tax module came from web searches in Nov 2026; several answers are marked "confirm with a senior" (no source). MAT/AMT, special capital-gain rates and marginal relief for surcharge are not computed.
- Drafts and answers must not invent figures or case law; mark `[TO CONFIRM]`.

## 9. Facts researched and built in (Nov 2026)

GSTR-1 11th, GSTR-3B 20th (QRMP 22/24), PMT-06 25th; GST late fee ₹50/day (nil ₹20) with caps ₹500/2,000/5,000/10,000; GST interest 18%. TDS deposit 7th (March 30 Apr), returns 31 Jul/31 Oct/31 Jan/31 May; late deduction 1%/month, late deposit 1.5%/month, ₹200/day fee. Belated ITR AY 2026-27 till 31 Dec 2026 (₹5,000 / ₹1,000), revised till 31 Mar 2027 (fee after 31 Dec). CBDT Circular 07/2026: tax audit report 21 Oct 2026, audit ITR 21 Nov 2026. PF/ESI 15th; PF wage ceiling ₹25,000 from 17 Sep 2026. PT: MH 15, GJ 15, KA 20, WB 21, TS/AP/MP 10. LWF: MH 15 Jul/15 Jan, HR/PB monthly 15th, KA 15 Jan. GSTR-9 > ₹2 cr, 9C > ₹5 cr, e-invoice > ₹5 cr. AOC-4 30 days / MGT-7 60 days from AGM, ₹100/day/form; one source says FY 2025-26 extended to 31 Dec 2026 / 31 Jan 2027 (unconfirmed). UDIN within 60 days. Advance tax 15 Jun 15%, 15 Sep 45%, 15 Dec 75%, 15 Mar 100%; no 234C interest if 12% / 36% paid in Q1 / Q2. FY 2026-27 slabs and company/firm rates unchanged by Budget 2026.


## Update 16 Nov 2026 (second chat)
- Site: Google Search Console verified (meta tag added in site/build.py) and imported into Bing Webmaster Tools.
- Tax Year (Income-tax Act 2025): proof check shows "Tax Year 2026-27 (= FY 2026-27)" for FY 2026-27 onwards, "AY … (= FY …)" before; label "Assessment year / Tax year". periodFacts already reads "Tax Year" as FY. Published to the Claude app (version 1794836188-9033); On the site too (pushed after his OK, 16 Nov).
- Invites work; the app sends no email. Person must Sign up on the site with the invited email. TODO: after inviting, show a ready WhatsApp message with sign-up steps.
- New ideas agreed (not started):
  - Email reminders via Google Apps Script (free, ~100 mails/day). Team first; clients later (send in the CA firm's name, client email + opt-in tick).
  - Client upload link with each reminder: no login, one compliance + one period only, auto-closes after 15 days or when done; uploads go to a "to check" list; auto-accept when Excel/text PDF matches GSTIN/PAN, period (tax period, not upload date: Oct GSTR-1 sent in Nov = Oct) and is not a duplicate; scans and mismatches go to team. Needs rules -> do with the audit-log rules batch.
  - Tally (Edit Log edition) two-way sync, in pieces, one per chat: 1 helper program on the user's PC checks Tally + open companies; 2 ledgers/parties in; 3 vouchers in; 4 invoice from site to Tally (shown first, added only after OK, never edits/deletes); 5 TDS/GST from entries. Per-user: helper on each user's PC, site user mapped to his Tally user name; queue if Tally closed. Test company first, backup before real company. Unverified how Tally records the user for imported vouchers — test first. User wants piece 3 (auto sync) but credits are limited.
- User has a weekly credit limit (44% used on Mon 16 Nov). One small task per chat.
- fp module (16 Nov; Claude app version 1794836931-835b, on the site too after his OK, 16 Nov): FS entry split into parts (bs, pl, notes, cf [company], ar [company/LLP/audit], dr [company], tar [audit]) stored in item.fp{k:{name,pages,text<=12k,file,at,by,scan?}}. "All in one PDF" splits pages by headings near the top of each page; scanned PDF -> manual tick + pages. Cross-check: same FY per part, same unit, P&L profit found in notes/BS reserves. All parts in -> status filed_proof (fpAuto), removing one reverts. List row shows 📑 n/N. FS added to NO_ARN. Test: tests/fp_test.py (synthetic PDFs in tests/samples/fp_*). Not tested on real statements.
- lq module (16 Nov, straight to site on his request): law update sheet gets 📘 plain summary, 6 quick questions, ask box (intent regex + sentence match + question bank); unanswered saved to kb_asked as "[title] question". Test tests/lq_test.py. Note: on the site law_updates.json is still [] — daily search writes only to the Claude app.
- What's new card (WHATS_NEW in fp module): shown once per person (localStorage). Add a new entry at the top for each user-visible change. It covers bottom buttons until OK — tests must hide #wnCard (add_init_script with CSS), demo_test then still 47/1/0.

- DECIDED 16 Nov: law updates stay with the Claude daily scheduled task only. GitHub/Gemini/Google-News/govt-site search was built, then fully removed at his request — do not propose it again unless he asks.
- gr module (17 Nov, Claude app first; NOT on site until his OK): 🧮 GST check button on GSTR-3B / GSTR-1 entries. Slots: firm working Excel, GSTR-1 PDF, GSTR-3B PDF (portal, text), GSTR-2B Excel (portal). Totals head-wise: sales W/R1/3B 3.1(a)+(b); R1 HSN vs invoices; RCM payable vs 3.1(d); ITC impg W/2B/4A1; other ITC W/2B(less CN)/4A5; RCM ITC 4A3; reversal 4B; net 4C; 3B ITC above 2B; 2B not-available vs 4D2; GSTIN/month mismatch. Tolerance ₹1.5. Record per client+GSTIN+period in collection gst_recon. Working names per firm in settings/gst_work (⚙ picker lists labels from the uploaded sheet); defaults = Mukesh's format (SALES / PURCHASES AS PER GSTR 2-B / IMPG BILLS / RCM Details / GROSS TOTAL / summary block "Portal GST 3B Table"). Multi-GSTIN workbook: sheet picked by state code (MH/HR...) or dropdown. Tested on his real Sep-26 files (Addenda MH: all 9 checks matched); real files NOT in repo (client data). Not done: cash paid (6.1) vs working, bill-by-bill 2B match.