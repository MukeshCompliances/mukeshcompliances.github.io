/* ================= 🏭 business profile → which compliances apply and why =================
   State rules researched Nov 2026 (re-check before relying on them):
   Professional tax (employer, monthly): Maharashtra 15th (from Mar 2026), Gujarat 15th, Karnataka 20th, West Bengal 21st,
     Telangana / Andhra Pradesh / Madhya Pradesh 10th of next month. Tamil Nadu half-yearly (sources differ on the date).
     No PT: Delhi, Haryana, UP, Uttarakhand, Rajasthan, Goa, HP, J&K, Ladakh.
   LWF: Maharashtra half-yearly (Jun & Dec) due 15 Jul / 15 Jan; Haryana & Punjab monthly 15th; Karnataka yearly (Dec) due 15 Jan.
   ITC-04: turnover > ₹5 cr half-yearly 25 Oct / 25 Apr, otherwise yearly 25 Apr.
   GSTR-9 mandatory above ₹2 cr, GSTR-9C above ₹5 cr; e-invoice above ₹5 cr (any year since 2017-18).
   FSSAI D-1 31 May (manufacturers / importers); D-2 (dairy) 31 Oct / 30 Apr. */
const bt=(hi,en)=>lang==="hi"?hi:en;
const BZ_ACTS=["mfg","trade","service","export","import","ecom","jobwork","food","dairy","pack"];
const BZ_TO=["u1","1to2","2to5","5to10","o10"];
const BZ_KIND=["office","factory","shop","warehouse"];
const BZ_LIC=["factory","pcb","fssai","shop","trade","fire","lm","drug","other"];
const PT_RULE={"27":{m:15},"24":{m:15},"29":{m:20},"19":{m:21},"36":{m:10},"37":{m:10},"28":{m:10},"23":{m:10},"33":{h:true}};
const PT_CHECK=new Set(["32","18","10","20","21","16","17","14","15","11","22","13","34","03"]);
const PT_NONE=new Set(["07","06","09","05","08","30","02","01","38"]);
const LWF_RULE={"27":{h:true},"06":{m:15},"03":{m:15},"29":{y:true}};
const LWF_CHECK=new Set(["24","33","37","28","36","19","23","32","22","30","21","07","04","08"]);
Object.assign(I18N.hi,{bzState:"राज्य",bzEmpHint:"{n} कर्मचारी बताए हैं — {r}",bzT:"काम-धंधा, जगह और कर्मचारी",bzH:"इससे तय होगा कि कौन-से कंप्लायंस लागू हैं — राज्य, जगह और काम के हिसाब से।",bzActs:"क्या काम करते हैं? (एक से ज़्यादा चुन सकते हैं)",
 bzA_mfg:"🏭 मैन्युफ़ैक्चरिंग",bzA_trade:"🛒 ट्रेडिंग",bzA_service:"🧑‍💼 सर्विस",bzA_export:"🚢 एक्सपोर्ट",bzA_import:"📦 इम्पोर्ट",bzA_ecom:"🛍 ऑनलाइन (ई-कॉमर्स) पर बेचते हैं",bzA_jobwork:"🔧 माल जॉब-वर्क पर भेजते हैं",bzA_food:"🍱 खाने-पीने का सामान",bzA_dairy:"🥛 दूध / डेयरी",bzA_pack:"🏷 पैक्ड सामान बनाते/इम्पोर्ट करते हैं",
 bzTo:"पिछले साल का टर्नओवर (सारे GSTIN मिलाकर)",bzTo_:"— चुनें —",bzTo_u1:"₹1 करोड़ तक",bzTo_1to2:"₹1–2 करोड़",bzTo_2to5:"₹2–5 करोड़",bzTo_5to10:"₹5–10 करोड़",bzTo_o10:"₹10 करोड़ से ज़्यादा",
 bzEmp:"कुल कर्मचारी",bzLocs:"काम की जगहें (राज्य के हिसाब से नियम बदलते हैं)",bzLocH:"हर राज्य/जगह जहाँ ऑफ़िस, फ़ैक्ट्री, दुकान या गोदाम है — और वहाँ कितने कर्मचारी हैं।",bzAddLoc:"+ जगह जोड़ें",bzKind_office:"ऑफ़िस",bzKind_factory:"फ़ैक्ट्री",bzKind_shop:"दुकान / शोरूम",bzKind_warehouse:"गोदाम",bzCity:"शहर",bzEmpHere:"यहाँ कर्मचारी",
 bzLics:"लाइसेंस (एक्सपायरी डालें — रिन्यूअल अपने-आप याद दिलाया जाएगा)",bzAddLic:"+ लाइसेंस जोड़ें",bzL_factory:"फ़ैक्ट्री लाइसेंस",bzL_pcb:"प्रदूषण (PCB) सहमति – CTE/CTO",bzL_fssai:"FSSAI लाइसेंस",bzL_shop:"शॉप्स एंड एस्टैब्लिशमेंट",bzL_trade:"नगर निगम ट्रेड लाइसेंस",bzL_fire:"फ़ायर NOC",bzL_lm:"लीगल मेट्रोलॉजी (पैकर) रजिस्ट्रेशन",bzL_drug:"ड्रग लाइसेंस",bzL_other:"अन्य लाइसेंस",bzLicNo:"नंबर",bzExp:"एक्सपायरी",
 apT:"📋 कौन-से कंप्लायंस लागू हैं — और क्यों",apYes:"✔ लागू — ऐप में बनते हैं",apChk:"⚠ जाँचें — लागू हो सकता है",apNo:"✖ लागू नहीं",apMissing:"बिज़नेस प्रोफ़ाइल अधूरी है — काम, टर्नओवर, कर्मचारी और जगह भरें, तभी पूरा फ़ैसला हो पाएगा।",apEdit:"✏ काम / जगह / कर्मचारी बदलें",apOpen:"📋 क्या लागू है और क्यों",apSum:"{y} लागू · {c} जाँचें · {n} लागू नहीं",apSaved:"सेव हो गया — अब नए लागू कंप्लायंस बनाएँ",apNote:"राज्यों के नियम नवंबर 2026 की जानकारी से हैं। कोई भी नियम लागू करने से पहले राज्य का पोर्टल / नोटिफ़िकेशन देखें।",bzSave:"सेव करें"});
Object.assign(I18N.en,{bzState:"State",bzEmpHint:"You entered {n} employees — {r}",bzT:"Business, places and employees",bzH:"This decides which compliances apply — by state, place and type of business.",bzActs:"What does the business do? (pick all that apply)",
 bzA_mfg:"🏭 Manufacturing",bzA_trade:"🛒 Trading",bzA_service:"🧑‍💼 Services",bzA_export:"🚢 Exports",bzA_import:"📦 Imports",bzA_ecom:"🛍 Sells online (e-commerce)",bzA_jobwork:"🔧 Sends goods for job work",bzA_food:"🍱 Food products",bzA_dairy:"🥛 Milk / dairy",bzA_pack:"🏷 Makes/imports packaged goods",
 bzTo:"Last year's turnover (all GSTINs together)",bzTo_:"— select —",bzTo_u1:"Up to ₹1 crore",bzTo_1to2:"₹1–2 crore",bzTo_2to5:"₹2–5 crore",bzTo_5to10:"₹5–10 crore",bzTo_o10:"Above ₹10 crore",
 bzEmp:"Total employees",bzLocs:"Places of business (rules change by state)",bzLocH:"Every state/place with an office, factory, shop or warehouse — and how many employees work there.",bzAddLoc:"+ Add place",bzKind_office:"Office",bzKind_factory:"Factory",bzKind_shop:"Shop / showroom",bzKind_warehouse:"Warehouse",bzCity:"City",bzEmpHere:"Employees here",
 bzLics:"Licences (enter expiry — renewal reminder is automatic)",bzAddLic:"+ Add licence",bzL_factory:"Factory licence",bzL_pcb:"Pollution (PCB) consent – CTE/CTO",bzL_fssai:"FSSAI licence",bzL_shop:"Shops & Establishment",bzL_trade:"Municipal trade licence",bzL_fire:"Fire NOC",bzL_lm:"Legal metrology (packer) registration",bzL_drug:"Drug licence",bzL_other:"Other licence",bzLicNo:"Number",bzExp:"Expiry",
 apT:"📋 Which compliances apply — and why",apYes:"✔ Applies — created in the app",apChk:"⚠ Check — may apply",apNo:"✖ Does not apply",apMissing:"Business profile is incomplete — fill business type, turnover, employees and places for a full decision.",apEdit:"✏ Change business / places / employees",apOpen:"📋 What applies and why",apSum:"{y} apply · {c} to check · {n} don't apply",apSaved:"Saved — now create the newly applicable compliances",apNote:"State rules are as researched in Nov 2026. Check the state portal / notification before relying on any rule.",bzSave:"Save"});
Object.assign(I18N.zh,{bzState:"邦",bzEmpHint:"已填写 {n} 名员工——{r}",bzT:"业务、地点与员工",bzH:"据此按邦、地点和业务类型确定适用的合规事项。",bzActs:"业务类型（可多选）",
 bzA_mfg:"🏭 制造",bzA_trade:"🛒 贸易",bzA_service:"🧑‍💼 服务",bzA_export:"🚢 出口",bzA_import:"📦 进口",bzA_ecom:"🛍 电商销售",bzA_jobwork:"🔧 委外加工",bzA_food:"🍱 食品",bzA_dairy:"🥛 乳制品",bzA_pack:"🏷 生产/进口包装商品",
 bzTo:"上年营业额（全部 GSTIN 合计）",bzTo_:"— 请选择 —",bzTo_u1:"≤ ₹1 千万",bzTo_1to2:"₹1–2 千万",bzTo_2to5:"₹2–5 千万",bzTo_5to10:"₹5–10 千万",bzTo_o10:"> ₹10 千万",
 bzEmp:"员工总数",bzLocs:"经营地点（各邦规则不同）",bzLocH:"每个有办公室、工厂、店铺或仓库的邦/地点及员工人数。",bzAddLoc:"+ 添加地点",bzKind_office:"办公室",bzKind_factory:"工厂",bzKind_shop:"店铺",bzKind_warehouse:"仓库",bzCity:"城市",bzEmpHere:"此处员工",
 bzLics:"执照（填写到期日——自动提醒续期）",bzAddLic:"+ 添加执照",bzL_factory:"工厂执照",bzL_pcb:"污染控制许可 CTE/CTO",bzL_fssai:"FSSAI 执照",bzL_shop:"商店与机构登记",bzL_trade:"市政营业执照",bzL_fire:"消防许可",bzL_lm:"计量（包装商）登记",bzL_drug:"药品执照",bzL_other:"其他执照",bzLicNo:"编号",bzExp:"到期日",
 apT:"📋 适用哪些合规事项及原因",apYes:"✔ 适用——已在应用中生成",apChk:"⚠ 需核实——可能适用",apNo:"✖ 不适用",apMissing:"业务资料不完整——请填写业务类型、营业额、员工和地点。",apEdit:"✏ 修改业务 / 地点 / 员工",apOpen:"📋 适用事项及原因",apSum:"{y} 项适用 · {c} 项待核实 · {n} 项不适用",apSaved:"已保存——请生成新适用的合规事项",apNote:"各邦规则依据 2026 年 11 月资料。使用前请查看邦官方门户 / 通知。",bzSave:"保存"});

function bzProf(p){return p.prof||{}}
function bzLocs(p){const pr=bzProf(p);const L2=(pr.locs||[]).filter(l=>l.st);if(L2.length)return L2;
  return [...new Set((p.gsts||[]).map(g=>g.gstin).filter(Boolean).map(g=>g.slice(0,2)))].map(st=>({st,kind:"office",emp:null}))}
function bzEmpIn(p,st){const pr=bzProf(p);const locs=(pr.locs||[]).filter(l=>l.st===st);
  if(locs.length){const n=locs.reduce((a,l)=>a+(+l.emp||0),0);if(n)return n;}
  const allSt=new Set(bzLocs(p).map(l=>l.st));return allSt.size===1&&allSt.has(st)?(+pr.emp||0):0}
function bzTo(p){const pr=bzProf(p);return pr.to||""}
const toGt=(p,b)=>{const i=BZ_TO.indexOf(bzTo(p));return i>=0&&i>BZ_TO.indexOf(b)}; /* turnover band strictly above band b */
const hasAct=(p,a)=>(bzProf(p).acts||[]).includes(a);
const stN=st=>STATES[st]||st;

/* the rules: each returns {st:"yes"|"chk"|"no", cat, title, why} or null */
function applic(p){
  const R=[],e=p.entity,co=isCo(e),pr=bzProf(p),emp=+pr.emp||0,gs=(p.gsts||[]).filter(g=>g.gstin),reg=gs.filter(g=>g.type!=="composition");
  const add=(st,cat,title,why)=>R.push({st,cat,title,why});
  const toKnown=!!bzTo(p);
  /* GST */
  if(gs.length)add("yes","gst",bt("GST रिटर्न (GSTR-1, 3B / CMP-08)","GST returns (GSTR-1, 3B / CMP-08)"),bt(`${gs.length} GSTIN है: ${gs.map(g=>stN(g.gstin.slice(0,2))).join(", ")}। हर GSTIN की रिटर्न अलग फ़ाइल होती है।`,`${gs.length} GSTIN(s): ${gs.map(g=>stN(g.gstin.slice(0,2))).join(", ")}. Each GSTIN files its own returns.`));
  else if(e!=="ind")add(toGt(p,"u1")||(!toKnown)?"chk":"no","gst",bt("GST रजिस्ट्रेशन","GST registration"),bt("GSTIN नहीं है। सामान बेचने पर ₹40 लाख और सर्विस पर ₹20 लाख से ज़्यादा टर्नओवर हो (कुछ राज्यों में कम), या इंटर-स्टेट / ई-कॉमर्स सप्लाई हो, तो रजिस्ट्रेशन ज़रूरी।","No GSTIN. Registration is needed above ₹40 lakh (goods) / ₹20 lakh (services) turnover (lower in some states), or for inter-state / e-commerce supplies."));
  if(reg.length){
    if(toKnown)add(toGt(p,"1to2")?"yes":"no","gst","GSTR-9",toGt(p,"1to2")?bt("टर्नओवर ₹2 करोड़ से ज़्यादा — सालाना रिटर्न ज़रूरी (31 दिसंबर)।","Turnover above ₹2 crore — annual return mandatory (31 Dec)."):bt("टर्नओवर ₹2 करोड़ तक — GSTR-9 भरना ज़रूरी नहीं (मर्ज़ी से भर सकते हैं)।","Turnover up to ₹2 crore — GSTR-9 optional."));
    else add(reg.some(g=>g.to2)?"yes":"chk","gst","GSTR-9",bt("₹2 करोड़ से ज़्यादा टर्नओवर पर ज़रूरी — टर्नओवर भरें।","Mandatory above ₹2 crore — enter turnover."));
    if(toKnown)add(toGt(p,"2to5")?"yes":"no","gst","GSTR-9C",toGt(p,"2to5")?bt("टर्नओवर ₹5 करोड़ से ज़्यादा — रिकंसिलिएशन स्टेटमेंट भी।","Turnover above ₹5 crore — reconciliation statement too."):bt("टर्नओवर ₹5 करोड़ तक — 9C नहीं।","Turnover up to ₹5 crore — no 9C."));
    if(toKnown)add(toGt(p,"2to5")?"yes":"chk","gst",bt("ई-इनवॉइस (हर B2B बिल पर IRN)","E-invoice (IRN on every B2B invoice)"),toGt(p,"2to5")?bt("टर्नओवर ₹5 करोड़ से ज़्यादा — ई-इनवॉइस ज़रूरी। ये रिटर्न नहीं, हर बिल के साथ होता है।","Turnover above ₹5 crore — e-invoice mandatory. Not a return; done with every invoice."):bt("2017-18 के बाद किसी भी साल टर्नओवर ₹5 करोड़ पार हुआ था तो आज भी ज़रूरी है — पुराने साल देखें।","Required if turnover crossed ₹5 crore in any year since 2017-18 — check past years."));
    if(hasAct(p,"jobwork"))add("yes","gst","ITC-04",toGt(p,"2to5")?bt("माल जॉब-वर्क पर जाता है, टर्नओवर ₹5 करोड़ से ज़्यादा — हर छमाही (25 अक्टूबर / 25 अप्रैल)।","Goods go for job work, turnover above ₹5 crore — half-yearly (25 Oct / 25 Apr)."):bt("माल जॉब-वर्क पर जाता है — साल में एक बार (25 अप्रैल)।","Goods go for job work — yearly (25 Apr)."));
    if(hasAct(p,"ecom"))add("chk","gst",bt("ई-कॉमर्स पर बिक्री — TCS का मिलान","E-commerce sales — match TCS"),bt("Amazon/Flipkart जैसे ऑपरेटर TCS काटते हैं — GSTR-2B / TCS क्रेडिट हर महीने मिलाएँ।","Operators collect TCS — match the TCS credit every month."));
  }
  /* income tax / TDS */
  add("yes","it","ITR",co?bt("कंपनी है — ITR हर हाल में, ऑडिट वाली डेट।","Company — ITR always, audit due date."):bt("हर व्यक्ति/संस्था जिसकी आय है।","Every person/entity with income."));
  if(e!=="ind"){
    if(p.audit)add("yes","it",bt("टैक्स ऑडिट","Tax audit"),bt("प्रोफ़ाइल में टैक्स ऑडिट 'हाँ' है।","Tax audit marked yes."));
    else if(toKnown&&toGt(p,"u1"))add("chk","it",bt("टैक्स ऑडिट","Tax audit"),bt("बिज़नेस टर्नओवर ₹1 करोड़ से ज़्यादा है — ऑडिट लगेगा, जब तक कैश लेन-देन 5% से कम न हो (तब ₹10 करोड़ तक छूट)।","Business turnover above ₹1 crore — audit applies unless cash transactions are under 5% (then up to ₹10 crore)."));
  }
  if(p.tan)add("yes","tds","TDS / TCS",bt("TAN है"+(p.tdsSal?" — सैलरी TDS भी":"")+"।","TAN held"+(p.tdsSal?" — salary TDS too":"")+"."));
  else if(e!=="ind"&&(emp>0||toGt(p,"u1")))add("chk","tds",bt("TAN और TDS","TAN and TDS"),bt("कर्मचारी हैं या बड़ा बिज़नेस है — किराया, ठेकेदार, प्रोफ़ेशनल फ़ीस, सैलरी पर TDS काटना पड़ता है। TAN लें।","Has employees or sizeable business — TDS on rent, contractors, fees, salary. Get a TAN."));
  if(p.tan&&emp>0&&!p.tdsSal)add("chk","tds",bt("सैलरी TDS (Form 138 / 24Q) और Form 16","Salary TDS (Form 138 / 24Q) and Form 16"),bt(`${emp} कर्मचारी हैं — टैक्स बनता हो तो सैलरी TDS और Form 16।`,`${emp} employees — salary TDS and Form 16 if tax is due.`));
  /* ROC */
  if(co){add("yes","roc",bt("ROC सालाना (AOC-4, MGT-7, DIR-3 KYC)","ROC annual (AOC-4, MGT-7, DIR-3 KYC)"),bt(L().ent[e]+" — Companies Act लागू।",L().ent[e]+" — Companies Act applies."));
    if(/^L/.test(p.cin||""))add("chk","roc",bt("SEBI (LODR) — लिस्टेड कंपनी","SEBI (LODR) — listed company"),bt("CIN 'L' से शुरू — लिस्टेड है। SEBI की तिमाही फ़ाइलिंग अलग से — ये ऐप अभी उन्हें नहीं बनाता।","CIN starts with 'L' — listed. Quarterly SEBI filings are separate — not created by this app yet."));
    add(p.msme?"yes":"chk","roc","MSME-1",bt("MSME सप्लायर को 45 दिन से ज़्यादा का पेमेंट बाकी हो तो छमाही रिटर्न।","Half-yearly return if dues to MSME suppliers are over 45 days."));
  }else if(e==="llp")add("yes","roc",bt("LLP Form 11 और Form 8","LLP Form 11 and Form 8"),bt("LLP है — LLP Act लागू।","LLP — LLP Act applies."));
  else add("no","roc","ROC / MCA",bt(L().ent[e]+" — MCA में रजिस्टर्ड नहीं, ROC फ़ाइलिंग नहीं।",L().ent[e]+" — not registered with MCA, no ROC filings."));
  /* labour: PF / ESI */
  if(e!=="ind"){
    if(p.pf)add("yes","pf","PF",bt("PF रजिस्ट्रेशन है"+(emp?` (${emp} कर्मचारी)`:"")+"।","PF registered"+(emp?` (${emp} employees)`:"")+"."));
    else if(emp>=20)add("chk","pf","PF",bt(`${emp} कर्मचारी — 20 या ज़्यादा होने पर PF ज़रूरी। वेतन सीमा अब ₹25,000।`,`${emp} employees — PF mandatory at 20 or more. Wage ceiling now ₹25,000.`));
    else if(emp)add("no","pf","PF",bt(`${emp} कर्मचारी — 20 से कम, PF ज़रूरी नहीं (मर्ज़ी से ले सकते हैं)।`,`${emp} employees — under 20, PF not mandatory (voluntary possible).`));
    if(p.esi)add("yes","pf","ESI",bt("ESI रजिस्ट्रेशन है।","ESI registered."));
    else if(emp>=10)add("chk","pf","ESI",bt(`${emp} कर्मचारी — 10 या ज़्यादा होने पर ESI ज़रूरी (₹21,000 तक वेतन वालों के लिए)।`,`${emp} employees — ESI applies at 10 or more (for wages up to ₹21,000).`));
    else if(emp)add("no","pf","ESI",bt(`${emp} कर्मचारी — 10 से कम, ESI नहीं।`,`${emp} employees — under 10, no ESI.`));
    if(emp)add("chk","pf",bt("लेबर कोड — रजिस्टर और सालाना रिटर्न","Labour codes — registers and annual return"),bt("21 नवंबर 2025 से चार लेबर कोड लागू — रजिस्टर, अपॉइंटमेंट लेटर, बोनस और एक सालाना रिटर्न। राज्य के नियम देखें।","Four labour codes in force since 21 Nov 2025 — registers, appointment letters, bonus and one annual return. Check state rules."));
  }
  /* state-wise: PT and LWF for every place with employees */
  const locs=bzLocs(p),states=[...new Set(locs.map(l=>l.st))];
  states.forEach(st=>{const n=bzEmpIn(p,st),name=stN(st);
    if(PT_NONE.has(st))add("no","pt",bt("प्रोफ़ेशनल टैक्स – ","Professional tax – ")+name,bt(name+" में प्रोफ़ेशनल टैक्स नहीं है।",name+" does not levy professional tax."));
    else if(PT_RULE[st]){const r=PT_RULE[st];
      if(n)add("yes","pt",bt("प्रोफ़ेशनल टैक्स – ","Professional tax – ")+name,r.h?bt(`${name} में ${n} कर्मचारी — PT छमाही। तारीख पर स्रोत अलग-अलग हैं, राज्य पोर्टल से पक्का करें।`,`${n} employees in ${name} — PT half-yearly. Sources differ on the date; confirm on the state portal.`):bt(`${name} में ${n} कर्मचारी — सैलरी से PT काटकर हर महीने अगले महीने की ${r.m} तारीख तक जमा।`,`${n} employees in ${name} — deduct PT from salary and deposit by the ${r.m}th of next month.`));
      else add("chk","pt",bt("प्रोफ़ेशनल टैक्स – ","Professional tax – ")+name,bt(name+" में PT है — यहाँ कितने कर्मचारी हैं, भरें। कंपनी/मालिक का अपना PT (PTEC) भी देखें।","PT applies in "+name+" — enter employees here. Also check the entity's own PT (PTEC)."));
    }else if(PT_CHECK.has(st))add("chk","pt",bt("प्रोफ़ेशनल टैक्स – ","Professional tax – ")+name,bt(name+" में PT (या मिलता-जुलता टैक्स) है — तारीखें अभी ऐप में नहीं, राज्य पोर्टल देखें।",name+" levies PT (or similar) — dates not in the app yet, check the state portal."));
    if(n||!(bzProf(p).locs||[]).length){
      if(LWF_RULE[st]&&n){const r=LWF_RULE[st];add("yes","pf",bt("लेबर वेलफ़ेयर फ़ंड – ","Labour welfare fund – ")+name,r.h?bt("छमाही (जून और दिसंबर) — जमा 15 जुलाई और 15 जनवरी।","Half-yearly (June & December) — deposit by 15 Jul and 15 Jan."):r.y?bt("साल में एक बार (दिसंबर) — जमा 15 जनवरी।","Yearly (December) — deposit by 15 Jan."):bt("हर महीने — अगले महीने की 15 तारीख।","Monthly — by the 15th of next month."))}
      else if(LWF_RULE[st]||LWF_CHECK.has(st))add("chk","pf",bt("लेबर वेलफ़ेयर फ़ंड – ","Labour welfare fund – ")+name,bt(name+" में LWF है"+(n?"":" — कर्मचारी संख्या भरें")+"। दर और तारीख राज्य बोर्ड से देखें।","LWF exists in "+name+(n?"":" — enter employees")+". Check rate and date with the state board."));
    }
  });
  /* place / activity based */
  const kinds=new Set((pr.locs||[]).map(l=>l.kind));const lic=pr.lic||[];const hasLic=t2=>lic.some(l=>l.type===t2);
  const licRow=(type,why,need)=>{if(hasLic(type))add("yes","lic",t("bzL_"+type),bt("एक्सपायरी डाली है — रिन्यूअल याद दिलाया जाएगा।","Expiry entered — renewal will be reminded."));else if(need)add("chk","lic",t("bzL_"+type),why)};
  licRow("factory",bt("फ़ैक्ट्री है — फ़ैक्ट्री लाइसेंस (लेबर कोड / राज्य नियम) और उसका रिन्यूअल। एक्सपायरी डालें।","Has a factory — factory licence (labour code / state rules) and its renewal. Enter expiry."),hasAct(p,"mfg")||kinds.has("factory"));
  licRow("pcb",bt("मैन्युफ़ैक्चरिंग — राज्य प्रदूषण बोर्ड की सहमति (CTE/CTO) और सालाना रिटर्न/रिन्यूअल लग सकता है।","Manufacturing — state pollution board consent (CTE/CTO) and renewal/annual return may apply."),hasAct(p,"mfg"));
  licRow("shop",bt("दुकान/ऑफ़िस है — राज्य का शॉप्स एंड एस्टैब्लिशमेंट रजिस्ट्रेशन (कुछ राज्यों में रिन्यूअल)।","Has a shop/office — state Shops & Establishment registration (renewal in some states)."),kinds.has("shop")||kinds.has("office")||hasAct(p,"trade")||hasAct(p,"service"));
  licRow("trade",bt("दुकान/गोदाम — नगर निगम का ट्रेड लाइसेंस लग सकता है।","Shop/warehouse — a municipal trade licence may be needed."),kinds.has("shop")||kinds.has("warehouse"));
  licRow("lm",bt("पैक्ड सामान बनाते/इम्पोर्ट करते हैं — लीगल मेट्रोलॉजी रजिस्ट्रेशन और पैकेट पर ज़रूरी जानकारी।","Packaged goods — legal metrology registration and mandatory package labelling."),hasAct(p,"pack")||(hasAct(p,"import")&&hasAct(p,"trade")));
  licRow("fire",bt("फ़ैक्ट्री/गोदाम — फ़ायर NOC और रिन्यूअल देखें।","Factory/warehouse — check fire NOC and renewal."),kinds.has("factory")||kinds.has("warehouse"));
  if(hasAct(p,"food")||hasAct(p,"dairy")){licRow("fssai",bt("खाने का सामान — FSSAI लाइसेंस और रिन्यूअल।","Food business — FSSAI licence and renewal."),true);
    if(hasAct(p,"mfg")||hasAct(p,"import")||hasAct(p,"pack"))add("yes","lic",bt("FSSAI सालाना रिटर्न (D-1)","FSSAI annual return (D-1)"),bt("खाने का सामान बनाते/इम्पोर्ट करते हैं — 31 मई तक पिछले साल की रिटर्न।","Food manufacturer/importer — return for last year by 31 May."));
    if(hasAct(p,"dairy"))add("yes","lic",bt("FSSAI छमाही रिटर्न (D-2)","FSSAI half-yearly return (D-2)"),bt("दूध/डेयरी — 31 अक्टूबर और 30 अप्रैल।","Milk/dairy — 31 Oct and 30 Apr."));}
  lic.filter(l=>l.type==="other"||l.type==="drug").forEach(l=>add(l.exp?"yes":"chk","lic",t("bzL_"+l.type)+(l.no?" "+l.no:""),l.exp?bt("एक्सपायरी डाली है — रिन्यूअल याद दिलाया जाएगा।","Expiry entered — renewal reminded."):bt("एक्सपायरी डालें।","Enter expiry.")));
  /* import / export */
  const ie=hasAct(p,"export")||hasAct(p,"import");
  if(p.iec)add("yes","iex",bt("IEC सालाना अपडेट","IEC annual update"),bt("IEC है — हर साल 30 जून तक अपडेट।","IEC held — update by 30 June every year."));
  else if(ie)add("chk","iex","IEC",bt("इम्पोर्ट/एक्सपोर्ट करते हैं — IEC ज़रूरी। IEC नंबर भरें।","Imports/exports — IEC required. Enter the IEC."));
  if(hasAct(p,"export")){if(p.lut)add("yes","iex","LUT",bt("बिना टैक्स एक्सपोर्ट के लिए हर साल LUT।","LUT every year for export without tax."));
    else add("chk","iex","LUT",bt("एक्सपोर्ट करते हैं — बिना IGST भरे एक्सपोर्ट के लिए LUT (RFD-11) लें, वरना IGST भरकर रिफ़ंड।","Exports — file LUT (RFD-11) to export without IGST, or pay IGST and claim refund."));
    add("chk","iex",bt("एक्सपोर्ट का पैसा आना (EDPMS / बैंक)","Export proceeds realisation (EDPMS / bank)"),bt("एक्सपोर्ट का पेमेंट तय समय में आना चाहिए और बैंक में मिलान — बकाया बिल देखें।","Export proceeds must be realised in time and matched with the bank — watch outstanding bills."));}
  return R;
}
function apMissingInfo(p){const pr=bzProf(p);return !(pr.acts&&pr.acts.length)||!pr.to||pr.emp===undefined||pr.emp===""}
function apHtml(p,compact){
  const R=applic(p),g={yes:[],chk:[],no:[]};R.forEach(r=>g[r.st].push(r));
  const sec=(k,lab,col)=>g[k].length?`<h2 style="color:${col}">${esc(lab)} (${g[k].length})</h2>`+g[k].map(r=>`<div class="item" style="cursor:default"><div class="main"><div class="t">${esc(r.title)}</div><div class="m" style="margin-top:3px">${esc(r.why)}</div></div><span class="chip">${esc(t("grp_"+r.cat))}</span></div>`).join(""):"";
  if(compact)return t("apSum",{y:g.yes.length,c:g.chk.length,n:g.no.length});
  return `${apMissingInfo(p)?`<div class="warn">${esc(t("apMissing"))}</div>`:""}${sec("yes",t("apYes"),"var(--green)")}${sec("chk",t("apChk"),"var(--amber)")}${sec("no",t("apNo"),"var(--mute)")}<div class="m" style="margin-top:10px">${esc(t("apNote"))}</div>`;
}
function openApplic(pid){const p=parties.find(x=>x.id===pid);if(!p)return;
  openSheet(`<h3>${esc(t("apT"))}</h3><div class="m">${esc(p.name)}</div>${apHtml(p)}
   <div class="actions">${canDo("client")?`<button class="btn" id="apEd">${esc(t("apEdit"))}</button><button class="btn green" id="apGen">${esc(t("genBtn"))}</button>`:""}<button class="btn ghost" id="apBack">${esc(t("close"))}</button></div>`,{k:"applic",id:pid});
  $("#apBack").onclick=()=>openClient(pid);const e2=$("#apEd");if(e2)e2.onclick=()=>openBizForm(pid);const g2=$("#apGen");if(g2)g2.onclick=()=>openGen(pid)}

/* shared form fields (wizard step + edit sheet) */
function bizFieldsHtml(pr,gsts){
  pr=pr||{};const acts=new Set(pr.acts||[]);
  let locs=(pr.locs&&pr.locs.length)?pr.locs:[...new Set((gsts||[]).map(g=>(g.gstin||"").slice(0,2)).filter(Boolean))].map(st=>({st,kind:"office",emp:"",city:""}));
  if(!locs.length)locs=[{st:"",kind:"office",emp:"",city:""}];
  const stOpts=v=>`<option value="">—</option>`+Object.entries(STATES).filter(([k])=>!["97","99","28","25"].includes(k)).sort((a,b)=>a[1].localeCompare(b[1])).map(([k,n])=>`<option value="${k}" ${k===v?"selected":""}>${esc(n)}</option>`).join("");
  const locRow=l=>`<div class="bzLoc note" style="background:#fff;border:1px solid var(--line);margin-top:6px"><div class="row2"><div><label>${esc(t("bzState"))}</label><select class="bzSt">${stOpts(l.st)}</select></div><div><label>&nbsp;</label><select class="bzKd">${BZ_KIND.map(k=>`<option value="${k}" ${k===l.kind?"selected":""}>${esc(t("bzKind_"+k))}</option>`).join("")}</select></div></div>
     <div class="row2"><div><label>${esc(t("bzCity"))}</label><input class="bzCt" value="${esc(l.city||"")}"></div><div><label>${esc(t("bzEmpHere"))}</label><input class="bzEh" type="number" min="0" inputmode="numeric" value="${esc(l.emp??"")}"></div></div>
     <button type="button" class="btn red bzRm" style="padding:4px 10px;margin-top:6px">${esc(t("remove"))}</button></div>`;
  const licRow=l=>`<div class="bzLic note" style="background:#fff;border:1px solid var(--line);margin-top:6px"><select class="bzLt">${BZ_LIC.map(k=>`<option value="${k}" ${k===l.type?"selected":""}>${esc(t("bzL_"+k))}</option>`).join("")}</select>
     <div class="row2"><div><label>${esc(t("bzLicNo"))}</label><input class="bzLn" value="${esc(l.no||"")}"></div><div><label>${esc(t("bzExp"))}</label><input class="bzLe" type="date" value="${esc(l.exp||"")}"></div></div>
     <button type="button" class="btn red bzRm" style="padding:4px 10px;margin-top:6px">${esc(t("remove"))}</button></div>`;
  return `<div class="m">${esc(t("bzH"))}</div>
   <label>${esc(t("bzActs"))}</label><div class="chips" id="bzActs">${BZ_ACTS.map(a=>`<button type="button" class="btn ${acts.has(a)?"":"ghost"} bzAct" data-a="${a}" style="padding:6px 10px;font-size:13px">${esc(t("bzA_"+a))}</button>`).join("")}</div>
   <div class="row2"><div><label>${esc(t("bzTo"))}</label><select id="bzTo"><option value="">${esc(t("bzTo_"))}</option>${BZ_TO.map(k=>`<option value="${k}" ${k===pr.to?"selected":""}>${esc(t("bzTo_"+k))}</option>`).join("")}</select></div>
   <div><label>${esc(t("bzEmp"))}</label><input id="bzEmp" type="number" min="0" inputmode="numeric" value="${esc(pr.emp??"")}"></div></div>
   <h2>${esc(t("bzLocs"))}</h2><div class="m">${esc(t("bzLocH"))}</div><div id="bzLocs">${locs.map(locRow).join("")}</div><button type="button" class="btn ghost" id="bzAddLoc" style="margin-top:6px">${esc(t("bzAddLoc"))}</button>
   <h2>${esc(t("bzLics"))}</h2><div id="bzLics">${(pr.lic||[]).map(licRow).join("")}</div><button type="button" class="btn ghost" id="bzAddLic" style="margin-top:6px">${esc(t("bzAddLic"))}</button>
   <template id="bzLocT">${locRow({st:"",kind:"office"})}</template><template id="bzLicT">${licRow({type:"factory"})}</template>`;
}
function bizWire(){
  document.querySelectorAll(".bzAct").forEach(b=>b.onclick=()=>b.classList.toggle("ghost"));
  const rm=()=>document.querySelectorAll(".bzRm").forEach(b=>b.onclick=()=>b.parentElement.remove());rm();
  const addT=(btn,box,tpl)=>{const b=$(btn);if(b)b.onclick=()=>{$(box).insertAdjacentHTML("beforeend",$(tpl).innerHTML);rm()}};
  addT("#bzAddLoc","#bzLocs","#bzLocT");addT("#bzAddLic","#bzLics","#bzLicT");
}
function bizCollect(){
  if(!$("#bzTo"))return null;
  const acts=[...document.querySelectorAll(".bzAct")].filter(b=>!b.classList.contains("ghost")).map(b=>b.dataset.a);
  const num=v=>v===""?"":Math.max(0,parseInt(v,10)||0);
  const locs=[...document.querySelectorAll("#bzLocs .bzLoc")].map(r=>({st:r.querySelector(".bzSt").value,kind:r.querySelector(".bzKd").value,city:r.querySelector(".bzCt").value.trim(),emp:num(r.querySelector(".bzEh").value)})).filter(l=>l.st);
  const lic=[...document.querySelectorAll("#bzLics .bzLic")].map(r=>({type:r.querySelector(".bzLt").value,no:r.querySelector(".bzLn").value.trim(),exp:r.querySelector(".bzLe").value})).filter(l=>l.no||l.exp);
  let emp=num($("#bzEmp").value);const locSum=locs.reduce((a,l)=>a+(+l.emp||0),0);if(emp===""&&locSum)emp=locSum;
  return{acts,to:$("#bzTo").value,emp,locs,lic};
}
function openBizForm(pid){const p=parties.find(x=>x.id===pid);if(!p)return;
  openSheet(`<h3>${esc(t("bzT"))}</h3><div class="m">${esc(p.name)}</div>${bizFieldsHtml(p.prof,p.gsts)}<div class="err" id="ferr"></div>
   <div class="actions"><button class="btn" id="bzSave">${esc(t("bzSave"))}</button><button class="btn ghost" id="bzX">${esc(t("cancel"))}</button></div>`,{k:"biz",id:pid});
  bizWire();$("#bzX").onclick=()=>openApplic(pid);
  $("#bzSave").onclick=async()=>{const prof=bizCollect();const np=Object.assign({},p,{prof});
    try{await saveParty(np);const i=parties.findIndex(x=>x.id===pid);if(i>=0)parties[i]=np;toast(t("apSaved"));openApplic(pid)}catch(e){$("#ferr").textContent=t("saveFail")}};
}
/* extra dated compliances produced by the profile (called from generate) */
function bizGenerate(p,add,months,yrs,setPe){
  const pr=bzProf(p);if(!p.prof)return;
  const ml=(y,m)=>MON[m-1]+" "+y;
  bzLocs(p).map(l=>l.st).filter((v,i,a)=>a.indexOf(v)===i).forEach(st=>{const n=bzEmpIn(p,st),nm=stN(st);if(!n)return;
    const r=PT_RULE[st];if(r){if(r.m)months.forEach(([y,m])=>{setPe(y+"-"+p2(m));add({code:"PT-"+st,name:"Professional tax – "+nm,cat:"pt",freq:"monthly",period:ml(y,m),due:ymd(y,m+1,r.m)})});
      else yrs.forEach(y=>{add({code:"PT-"+st,name:"Professional tax – "+nm+" (Apr–Sep, confirm date)",cat:"pt",freq:"yearly",period:"H1 "+fyl(y),due:ymd(y,9,30)});add({code:"PT-"+st,name:"Professional tax – "+nm+" (Oct–Mar, confirm date)",cat:"pt",freq:"yearly",period:"H2 "+fyl(y-1),due:ymd(y,3,31)})})}
    const w=LWF_RULE[st];if(w){if(w.m)months.forEach(([y,m])=>{setPe(y+"-"+p2(m));add({code:"LWF-"+st,name:"Labour welfare fund – "+nm,cat:"pf",freq:"monthly",period:ml(y,m),due:ymd(y,m+1,w.m)})});
      else if(w.h)yrs.forEach(y=>{add({code:"LWF-"+st,name:"Labour welfare fund – "+nm+" (Jan–Jun)",cat:"pf",freq:"yearly",period:"Jan–Jun "+y,due:ymd(y,7,15)});add({code:"LWF-"+st,name:"Labour welfare fund – "+nm+" (Jul–Dec)",cat:"pf",freq:"yearly",period:"Jul–Dec "+(y-1),due:ymd(y,1,15)})});
      else yrs.forEach(y=>add({code:"LWF-"+st,name:"Labour welfare fund – "+nm+" (yearly)",cat:"pf",freq:"yearly",period:"CY "+(y-1),due:ymd(y,1,15)}))}
  });
  if(hasAct(p,"jobwork"))(p.gsts||[]).filter(g=>g.gstin&&g.type!=="composition").forEach(g=>yrs.forEach(y=>{
    if(toGt(p,"2to5")){add({code:"ITC-04",name:"ITC-04 (job work, Apr–Sep)",cat:"gst",freq:"yearly",period:"H1 "+fyl(y),due:ymd(y,10,25),gi:g.gstin});add({code:"ITC-04",name:"ITC-04 (job work, Oct–Mar)",cat:"gst",freq:"yearly",period:"H2 "+fyl(y-1),due:ymd(y,4,25),gi:g.gstin})}
    else add({code:"ITC-04",name:"ITC-04 (job work, yearly)",cat:"gst",freq:"yearly",period:fyl(y-1),due:ymd(y,4,25),gi:g.gstin})}));
  if((hasAct(p,"food")||hasAct(p,"dairy"))&&(hasAct(p,"mfg")||hasAct(p,"import")||hasAct(p,"pack")))yrs.forEach(y=>add({code:"FSSAI-D1",name:"FSSAI annual return (Form D-1)",cat:"lic",freq:"yearly",period:fyl(y-1),due:ymd(y,5,31)}));
  if(hasAct(p,"dairy"))yrs.forEach(y=>{add({code:"FSSAI-D2",name:"FSSAI half-yearly return (Form D-2, Apr–Sep)",cat:"lic",freq:"yearly",period:"H1 "+fyl(y),due:ymd(y,10,31)});add({code:"FSSAI-D2",name:"FSSAI half-yearly return (Form D-2, Oct–Mar)",cat:"lic",freq:"yearly",period:"H2 "+fyl(y-1),due:ymd(y,4,30)})});
  (pr.lic||[]).filter(l=>l.exp).forEach(l=>add({code:"LIC-"+l.type+(l.no?"-"+l.no:""),name:"Renewal – "+(I18N.en["bzL_"+l.type]||l.type)+(l.no?" ("+l.no+")":""),cat:"lic",freq:"once",period:"Expiry "+l.exp,due:l.exp}));
}
