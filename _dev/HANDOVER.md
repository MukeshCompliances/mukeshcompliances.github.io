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
- His email is private: never put it in public files or send it to outside services. Since 23 Nov 2026 the rules no longer contain his email (config/app create is closed because the record exists).
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
  site/firestore.rules        rules to publish (no email inside since 23 Nov 2026)
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
- gr module (17 Nov; on the site after his OK incl. 86B): 🧮 GST check button on GSTR-3B / GSTR-1 entries. Slots: firm working Excel, GSTR-1 PDF, GSTR-3B PDF (portal, text), GSTR-2B Excel (portal). Totals head-wise: sales W/R1/3B 3.1(a)+(b); R1 HSN vs invoices; RCM payable vs 3.1(d); ITC impg W/2B/4A1; other ITC W/2B(less CN)/4A5; RCM ITC 4A3; reversal 4B; net 4C; 3B ITC above 2B; 2B not-available vs 4D2; GSTIN/month mismatch. Tolerance ₹1.5. Record per client+GSTIN+period in collection gst_recon. Working names per firm in settings/gst_work (⚙ picker lists labels from the uploaded sheet); defaults = Mukesh's format (SALES / PURCHASES AS PER GSTR 2-B / IMPG BILLS / RCM Details / GROSS TOTAL / summary block "Portal GST 3B Table"). Multi-GSTIN workbook: sheet picked by state code (MH/HR...) or dropdown. Tested on his real Sep-26 files (Addenda MH: all 9 checks matched); real files NOT in repo (client data). Not done: cash paid (6.1) vs working, bill-by-bill 2B match.
- Rule 86B (17 Nov, he wants it watched closely): first card in GST check. tv = 3B 3.1(a) (or working sales); >₹50 lakh → 1% of 3.1(a) tax vs cash paid in 3B 6.1 part (A) (RCM excluded). Exceptions: per-client party.gst86b (it / rz / ri / gv) picked in the sheet; cumulative "cash so far this FY ≥1%" computed from uploaded 3Bs only. Notes for Rule 88C (R1 vs 3B tax) and 88D (ITC above 2B). Verified on real Sep-26 MH 3B: need 59,892.56, paid 59,893.- GST risk checks added 17 Nov (Claude app first): RCM ITC 4A3 ≤ 3.1(d); RCM tax paid in cash 6.1(B) ≥ 3.1(d); ITC in 2B not taken (warn, 16(4) reminder); Sec 16(4) — previous-FY bills in the working's 2B section (date column configurable "date"), deadline 30 Nov of next FY vs 3B ARN date / today; late filing of 3B (item due date) and GSTR-1 (item or 11th of next month) from ARN dates with late-fee (₹50/day) and 18% interest estimates. Not possible with current files: Rule 37/37A (supplier payment / supplier 3B), 17(5) blocked credit, 3.2 inter-state B2C, e-invoice IRN.
- More GST checks 17 Nov (Claude app first): 2B "ITC Reversal" (Rule 37A) vs 3B 4(B)(2); Rule 42/43 warn when 3.1(c)+(e) > 0 and 4(B)(1) = 0; from the 2B B2B invoice list (stored as b2.inv, max 3000, non-RCM, availability Yes): Sec 16(4) previous-FY bills (used when the working has none), Rule 37 bills older than 180 days before 3B ARN date / today (warn: verify payment), Sec 17(5) review by supplier-name keywords (hotel, food, club, insurance, motor/car, construction, uber/cab…; heuristic, warn only).
- Optional extra files in GST check (17 Nov, Claude app first): payment register / creditor ledger (bill no + payment date → Rule 37: 2B bills >180 days unpaid / paid after 180 days = ✖), Tally purchase register (bill no + ledger name or HSN + tax → Sec 17(5) by ledger keywords / HSN 8703, 8711, 996331, 996332, 9954, 997132, 997133), IRP e-invoice list (doc no + IRN/Ack → every B2B sales bill in the working must have one; only if client ticked "e-invoice applies" = party.einv). Readers find the header row by the firm's column names (grTable, same ⚙ names incl. invno, gst, pname, payDate, ledger, hsn, irn). Tested only on synthetic registers built from the Sep-26 bills (not committed).

- 17 Nov: all GST check additions (RCM, 16(4), late filing, 37A, 42/43, 37, 17(5), extra registers, e-invoice) pushed to the site after his OK.
## State at end of chat 2 (17 Nov 2026)
- Claude app (artifact) latest version: 1794912872-91b5 — same code as the site (site pushed 17 Nov after his OK). Always get_artifact for the live version before publishing.
- Repo is the single source of truth: edit _dev/index.html (+ modules/*.js copy), test, publish to artifact, then after his OK: cd _dev/site && python3 build.py → copy out/index.html to root → commit → push.
- Tests here: Playwright + /home/claude/tests/npm (pdfjs-dist 3.11.174, xlsx 0.18.5) — reinstall in a new sandbox. Hide #wnCard in tests. demo_test should give "47 ठीक · 1 देखें · 0 दिक्कत".
- What's-new card: add a new entry at the top of WHATS_NEW (in modules/fp_module.js + index.html) for each visible change.
- He works by voice a lot; replies short, simple Hindi, numbered steps with exact button names. He is credit-conscious: one task per chat, avoid needless searches/reads.

## NEXT (agreed 17 Nov): TDS check, then ITR check — "same as GST check"
Approach that worked for GST: ask him for REAL sample files of one client, read them, build parsers for the exact portal formats, keep the firm's own working format configurable (⚙ names), compare totals + rule checks, test on his files (never commit client files), artifact first, site after OK.
- TDS (extend existing tr module, collection tds_recon): files he was asked for — TDS working Excel, filed 26Q/24Q evidence (FVU .txt / Form 27A / TRACES statement status), TRACES justification report / default summary, challan 281 PDFs. Checks to build: working ↔ return ↔ challans; interest 201(1A) late deduction 1% / late deposit 1.5% per month; 234E ₹200/day (capped at TDS amount); 271H; 206AA no-PAN 20%; 206AB; short deduction by section rate; TRACES defaults; due dates (7th, March 30 Apr; returns 31 Jul/31 Oct/31 Jan/31 May).
- ITR (new): files — ITR JSON or PDF + computation, 26AS and AIS/TIS (PDF/JSON), Form 16/16A, advance-tax / self-assessment challans. Checks: 26AS/AIS income and TDS vs ITR; 234A/234B/234C; 234F late fee; 44AB audit applicability; loss carry-forward only if filed by due date; 43B(h) MSME payments; 40(a)(ia); tax year vs AY (Income-tax Act 2025 from FY 2026-27). Reuse the at (advance-tax) module where possible.

## Update 19 Nov 2026 (chat 3) — on artifact and site
- Record-filing sheet shows state + GSTIN + period big (fileHead); warns when a client has several GSTINs. If the proof's GSTIN belongs to another entry of the same return+period, a green box offers "attach to <state> entry" (altEntryFor; openFile(id, preFiles) pre-selects the file via DataTransfer).
- 🧾 "Challan / proof from portal" button on every entry (pp module at end of index.html): portal login link, login ID (GSTIN/PAN/TAN/PF/ESI/CIN/IEC) copy, vault login copy (pwGate + vLogAct), menu path and what to download per kind, then openFile. App cannot log in to portals itself.
- Safe delete: Delete removed from the detail row; now a small link at the bottom of Edit, needs a tick. deleteItem is a SOFT delete (deleted/deletedAt/deletedBy) → trashItems; restore / delete permanently (admin, two presses) in 👥 Team tab. genKey "have" sets include trash so deleted generated entries are not recreated. Per-proof "✕ Remove file" (removedProofs kept). Texts in I18N hi/en/zh (dl*, rp* keys); history keys rmproof/del/restore.
- Data fix in the artifact db: ADDENDA Haryana GSTR-3B Oct 2026 (doc l9b2iiucun7ehms7e0k7) given ARN AA0610266454971 + filing 19/11/2026, status filed_noproof — he must re-upload the PDF.
- 19 Nov later: ARN read from PDFs now any 2-letter prefix ([A-Z]{2}+12 digits+char) — Maharashtra GST ARNs start "AB", old pattern only took "AA", so ARN stayed blank → "proof pending". File-password boxes are type=text with -webkit-text-security (Chrome was autofilling the site login: e-mail into ARN, password into file password). arnOk() rejects e-mails/junk as ARN; autofilled values are wiped after open. Add-proof and Edit sheets list the proofs already attached.

### Update 19 Nov 2026 (chat 3) — figures inside proof (🔢)
- New module (just before the trash module): wraps `checkFiles`. For GSTR-1 / GSTR-3B PDF proofs it parses the figures with `grParse3B`/`grParse1`, and adds rows to the proof-check table: sales taxable value + tax vs the other return (from gst_recon rec or the other entry's proof via blobGet; tolerance ₹1.5) and vs the 🧮 working; for 3B also RCM 3.1(d), net ITC 4(C), cash 6.1 (info only). Parsed figures are saved to `gst_recon` (same key as 🧮 GST check).
- A figure mismatch shows ✖ rows but does not block saving the proof (the file still belongs to the entry).
- Tested only on synthetic reportlab PDFs (pdf.js merges headers if columns are too close); parsers were earlier verified on real Sep-26 portal files.

### Update 23 Nov 2026 — firm self-setup (site only, no rules change)
- 👤 menu (firm owner / admin, not when expired): **🏢 फ़र्म की जानकारी** — firm edits its own name + phone (`firms/{fid}` update; rules already allow `name`,`phone`). **🚀 शुरुआत के कदम** — getting-started checklist.
- Checklist pops once ~2.5 s after login for a new firm's owner/admin (not the provider's own firm `first:true`), until "Don't show again" or all steps done. Steps tick themselves: firm name checked (`settings/onboard.nameOk`), first client (`parties`), team (members>1 or invites), vault master password (`vault/meta`), optional backup import (manual ✔ → `impOk`). State in `firms/{fid}/settings/onboard`.
- Tested on the fake Firebase with site2_test (+ onboarding checks; the test needed the What's-new card removed in `login()` — it intercepts clicks). Not tested on real Firebase.

### Update 23 Nov 2026 — security fixes, reload log-out, 🔄 update button
- Rules (handed to him as full text, **publish status: ask him**): `config/app` create closed (`if false`), update only by super and `owner` unchanged → no email in rules; new `billing/{fid}` provider-only; `invidx` update needs admin of both old and new fid; firm self-create limited to the signup fields (no plan/features/trial dates).
- Code: provider payment notes moved from `firms/{fid}.pays` (readable by the firm) to `billing/{fid}` (moved automatically when the 🛠 panel opens; firm's `pays` set to []). `config/app.ownerEmail` blanked on super login and no longer written. Firm names escaped in gate/menu HTML.
- 4 page loads within 60 s → sign out with message (`localStorage.__site_rl`). Top-left **🔄 अपडेट** button reloads a fresh copy (`?v=` removed after load) and does not count.
- Checked and fine: vault items AES-GCM 256 with PBKDF2-SHA256 250k (username/password/notes all encrypted), file passwords only stored encrypted. Not fixed: in-firm role limits (junior/viewer) are UI-only except viewer/expired writes; no automatic backups on Spark (firms should use 📦 backup); legacy top-level data copy still present (super-only).
- OTP login asked for: phone SMS needs Blaze; email = link only, 5/day on Spark. Waiting for his decision.
- fakefb.js: `sessionStorage.fakeAuto` keeps the fake sign-in across reloads (for reload tests).

### Update 23 Nov 2026 — 📒 Accounts (bk), part 1 (artifact v74 + site)
- Module `bk` at the end of the script (before `paintStatic();render();init();`). Nav button `#nBk` / section `#bk` added by code; `show` and `paintStatic` wrapped.
- Data: `bk_books/{pid}` {name,gstin,st,fy0,cs:{fy},L:{id:{n,g,op:{fy:signed},gstin,st,del}}}; `bk_vm/{pid}_{fy}_{mm}[_k]` {pid,fy,ym,v:{id:{d,t,no,nar,ln:[{l,a}],gst,by,at,del}}} — one doc per client-month (≤700 KB then a new part) so a year opens with ~12 reads. a>0 Dr, a<0 Cr. Deletes are tombstones (`del:true`); newest `at` wins when a voucher moved month.
- Writes go through `bkMerge`: site = `set(...,{merge:true})` (deep merge), Claude db = `update` (deep merge) / `set` when new, local = deep merge in localStorage `compliance_bk_v1`.
- 26 Tally groups (`BK_G`), default ledgers (`BK_DEF`), vouchers pay/rcpt/contra/jrnl/sales/purch/cn/dn; invoices compute GST (IGST if party state ≠ book state) + round off; `gst` block saved on the voucher (party GSTIN, state, items, inter) for GSTR-1/3B later.
- Reports: day book, ledger, TB, trading+P&L (closing stock per FY), BS, ledger list, Excel, carry-forward to FY+1.
- No rules change needed (firm sub-collections). Not in 🧩 services catalog yet (always visible).
- Next asked: client's own login (role limited to own books), GSTR-1/3B from vouchers, invoice print, outstanding, cash/bank book.
- fakefb.js: `where('==')` now filters, `set merge` deep-merges like Firestore.

### Update 23 Nov 2026 — 📒 Accounts part 2: GST returns + outstanding (artifact v75 + site)
- Tabs `gst` and `out` added (module after bk part 1; wraps bkTab/bkWire/bkOpen). `bkGst(per)` per = y / q1..q4 / mMM: GSTR-3B 3.1(a), 3.1(c) (0% items), 4(A)(5) from purchases, 4(B) from debit notes (= purchase returns in these books), 4(C), 6.1 cash estimate with set-off order IGST→I,C,S; CGST→C,I; SGST→S,I. GSTR-1: B2B (party GSTIN), B2CL (inter-state, unregistered, invoice value > ₹1 lakh), B2CS by POS+rate, CDNR / CDNUR (credit notes = sales returns), rate summary. GST Excel (sheets GSTR-3B, b2b, b2cl, b2cs, cdn).
- Outstanding: debtors / creditors balances with last bill date.
- Agreed weekly plan with him: week 2 client's own login (role limited to own books; rules change), week 3 invoice print + HSN + Tally/Excel import, week 4 bank reconciliation + books ↔ 🧮 GST check. Later on his decision: OTP (Blaze), privacy/terms, online payment.

### Update 23 Nov 2026 — 📒 Accounts part 3: inventory, HSN, bill details, invoice print (artifact v77 + site)
- He wants to give the app free to one client for feedback. Decision: the client gets **its own firm ID** on the site (like Addenda) → sees only its data; so no separate client-role login was built. Books dropdown has **"🏢 अपनी फ़र्म की किताबें"** (pid `_self`, name from `__site.firm.name`).
- Items: `bk_books/{pid}.I` {n,hsn,u (UQC),r,op:{fy:{q,v}},del}; bill item lines carry `it,q,p`; stock = weighted average cost (opening + purchases − debit notes) ; sales / credit notes move qty only. When items exist, closing stock and opening stock in P&L/BS come from items (`bkStock`), manual closing-stock box hidden. Item opening values are mirrored into the "stock" ledger's opening (`bkSyncStockLedger`). Carry-forward also moves item qty/value.
- 📦 स्टॉक tab (summary + item form with movements), HSN summary in GST tab and GST Excel `hsn` sheet.
- `bk_books.info` {name,addr,ph,em,bank,ac,ifsc,pre,terms} via "🏢 बिल की जानकारी"; invoice no default = (CN/)+prefix+voucher no; ledger `addr`.
- 🖨 Print: overlay `#bkPrint` + @media print CSS (window.print) and "download file" (standalone HTML that prints itself). Amount in words Indian (`bkWords`). Note: build.py asserts one literal `<body>` — the downloaded-HTML template builds the tag with `"bo"+"dy"`.

### Update 23 Nov 2026 — two parts: 🗂 Compliance / 📒 Accounts (artifact v78 + site)
- Module `part` at the end. Switch `#partBar` above the nav (only when the firm has both parts). Accounts part: nav shows only 👥 टीम, `#bk` is the screen, title "हिसाब-किताब", search and "+ new client" hidden (CSS class `.partHide`). Last part remembered in localStorage `__part`.
- Provider controls per firm in 🧩 services: new mods `m_cmp`, `m_bk` (first two in FTM). They default to ON when a firm's features map lacks them (old firms keep both) and never come as "🆕 updates". shim panel `isOn` also defaults them to ticked.
- Accounts-only firm: opens straight into "🏢 अपनी फ़र्म की किताबें" (`_self`).
- For a free client: provider → 🧩 services → untick "🗂 Compliance (whole part)" → they get only Accounts.

### Update 23 Nov 2026 — Accounts menu (artifact v79 + site)
- `bkMenu()` replaces the old action buttons / tab chips: Vouchers (8 types, `.bkVt` → `bkNewOf(t)`), Reports (`.bkTab`), Masters (`.bkMk` led/item/info/xl). CSS `#bkCss`: phone = 4-column voucher grid + horizontally scrolling chips; ≥900px = sticky left column 250px, `body.partBk main{max-width:1320px}`.
- Tally keys when the books are open and no sheet is open: F4 contra, F5 payment, F6 receipt, F7 journal, F8 sales, F9 purchase, Ctrl+F8 credit note, Ctrl+F9 debit note.
- Old ids `#bkNewV/#bkNewL/#bkXl/#bkInfo` no longer exist (tests updated to the menu classes).

### Update 23 Nov 2026 — accounts dashboard, compliance toolbar (artifact v80 + site)
- Accounts open on tab `home` (`bkHomeHtml`): 8 cards (sales, purchases, net profit, cash+bank, to receive, to pay, GST cash this month via `bkGst("m"+mm)`, stock) → click opens the report; monthly sales vs purchases bars (CSS); recent 8 vouchers; top 5 receivables.
- Compliance dashboard: `#mineT` ("Only my work") and the "records incomplete → Complete" warning are moved into `#dashTools` right under the date line (render wrapper moves the DOM nodes).
- Desktop width: `main` max 1200px from 1100px wide; accounts part 1320px.

### Update 23 Nov 2026 — client portals (artifact v81 + site) — RULES CHANGE handed to him (brands)
- `/<slug>` (e.g. /addenda): GitHub Pages serves root `404.html` → redirects to `/?f=<slug>`; shim reads `f`, `history.replaceState` back to `/<slug>`, loads `brands/{slug}` {fid,name,tag,color} **before login** (rules: read true, write super only) and paints the login box (name, tagline, colour), `--brand`, page title; app title = brand name · part.
- Branded portal admits only members of `brand.fid` (super-admin passes). Others get "not on this portal's team" (+ link to main site if they have another firm). New people need an invite from that firm.
- Provider panel per firm: **🎨 पोर्टल** — slug (2–30 a-z0-9-, reserved: index/404/admin/login/www/api), name, tagline, colour; copy link; turn off. Firm doc gets `portal: slug`.
- Rules now = previous + `match /brands/{slug} { allow read: if true; allow write: if isSuper(); }`. **He published them on 23 Nov 2026 17:26 IST** (this text = `_dev/site/firestore.rules`).

### Update 24 Nov 2026 — registers, invoice format, quick add (artifact v82 + site)
- Menu vouchers now open a **register** (tab `reg`, `bk.rt` type, `bk.rp` period, `bk.rq` search) with list + totals and a big "＋ New …" button (`#bkRegNew`); F-keys still open a new voucher directly.
- Bill form: party input uses its own list (`#bkDlP`: debtors/creditors/cash/bank) + "＋ नया ग्राहक/सप्लायर" (`bkLForm(null,after,{n,g})`, returns to the bill with the party set) + info line (GSTIN, state, IGST or CGST+SGST). Item row: "＋" new item (`bkIForm(null,after,{n})`), info line `bkItemInfo` (HSN, GST %, unit, stock; ⚠ HSN missing / GST % differs). Line ledger list `#bkDlS` (sales/purchase/income/expense/fixed assets).
- Invoice number format in `bk_books.info.fmt` ({FY}, {YYYY}, {N}, {N3}…) + `info.start` (first sales number); "⚙ नंबर का फ़ॉर्मेट" in the bill. `bkInvNo` reassigned in part 4. `bkGrab` exposes the bill form's reader.

### Fix 24 Nov 2026 — portal stuck on "लॉगिन हो रहा है…"
- He reported /addenda stuck at "Signing in…" (real site; not reproducible on the fake). Suspected: the brand was read through the Firestore SDK **before** sign-in (with multi-tab persistence), so the SDK had to switch user mid-flight. Now the brand is read with a plain REST `fetch` (`firestore.googleapis.com/v1/projects/<id>/databases/(default)/documents/brands/<slug>?key=<apiKey>`, public read rule), 6 s timeout.
- Watchdog: if still "Signing in…" after 25 s → message (close other tabs of the site, button to sign out and retry). admit() errors now show on the gate instead of hanging.
- Not verified on the real site from here (sandbox can't reach Firestore). Ask him to retry.
- Portal login page has a small link "🛠 एडमिन लॉगिन (मुख्य साइट)" → `/`.
- On a portal, if the signed-in ID is a member of `brand.fid` (members doc exists) that firm opens, even when the ID's main firm (`users.firm`) is another; `users.firm` is NOT overwritten in that case. So Mukesh, once added to Addenda's 👥 Team, opens Addenda from /addenda and his own firm from `/`. A super-admin who is not on that team opens his own firm (with the portal look).

### Update 24 Nov 2026 — provider adds clients ahead (RULES CHANGE handed over: firmInvites + invited firm create)
- 🛠 फ़र्में → "👥 नए क्लाइंट" box → **＋ नया क्लाइंट जोड़ें**: firm name, client email (login ID), phone, plan (demo 30 days / paid until date / ♾ free forever), parts (🗂 / 📒 → `features.m_cmp/m_bk`), optional portal name. Saved to `firmInvites/{email}`; list of not-yet-signed-up invites with "📋 संदेश" (copies a WhatsApp/email text with link + steps) and ✖.
- Portal chosen at invite: `brands/{slug}` created at once with `fid:""` (look works, no team restriction yet); when the provider next opens 🛠 फ़र्में, firms with `portalWanted` get `portal` and the brand's `fid` filled.
- Client side (admit): no firm + `firmInvites/{email}` exists → creates `firms/{uid}` with the invite's status / dates / plan / features (`fromInvite:true`, `portalWanted`), owner member admin, `users.firm`, deletes the invite → opens straight in (no approval).
- **Published by him 24 Nov 2026 13:26 IST.** Rules: new `match /firmInvites/{email}` (read: super or that email; create/update: super; delete: super or that email) and firm create also allowed when `invitedFirm()` (keys limited; status, trialEndsMs, plan, features, name, portalWanted must equal the invite).
