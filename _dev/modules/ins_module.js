/* ================= 🛡 insurance tracker: upload a policy → it is read, checked against a checklist for its type, and renewal reminders are created ================= */
Object.assign(I18N.hi,{navIns:"🛡 बीमा",inT:"बीमा (इंश्योरेंस)",inTxt:"पॉलिसी की PDF या फ़ोटो डालें और बताएँ कि ये किस तरह की पॉलिसी/डॉक्यूमेंट है। ऐप पढ़कर बताएगा कि उसमें क्या-क्या है और क्या नहीं, फ़ॉर्म अपने-आप भरेगा और रिन्यूअल का रिमाइंडर बना देगा।",inUp:"📤 पॉलिसी / डॉक्यूमेंट डालें",
 inClient:"किस क्लाइंट की?",inPick:"— चुनें —",inKind:"ये कौन-सा डॉक्यूमेंट है?",inType:"किस तरह का बीमा है?",inTypeAuto:"— पता नहीं, ऐप पहचाने —",inFile:"फ़ाइल (PDF या फ़ोटो)",inPw:"PDF पर पासवर्ड है तो (वैकल्पिक)",inRead:"पढ़ें और जाँचें",inReading:"डॉक्यूमेंट पढ़ रहा है…",
 inK_policy:"पॉलिसी शेड्यूल / पॉलिसी कॉपी",inK_renewal:"रिन्यूअल नोटिस",inK_endorse:"एंडोर्समेंट (बदलाव)",inK_receipt:"प्रीमियम की रसीद",inK_other:"कुछ और",
 inY_fire:"🔥 फ़ायर / स्टॉक (भारत सूक्ष्म / लघु उद्यम)",inY_burglary:"🔓 बर्गलरी (चोरी)",inY_marine:"🚢 मरीन / ट्रांज़िट",inY_mbd:"⚙ मशीनरी ब्रेकडाउन",inY_gmc:"🏥 ग्रुप हेल्थ (GMC)",inY_gpa:"🩹 ग्रुप पर्सनल एक्सीडेंट",inY_ec:"👷 एम्प्लॉईज़ कंपनसेशन (WC)",inY_pl:"☣ पब्लिक लायबिलिटी (PLI Act)",inY_motor:"🚗 मोटर / गाड़ी",inY_dno:"🧑‍⚖️ डायरेक्टर्स (D&O)",inY_cyber:"💻 साइबर",inY_life:"❤️ कीमैन / लाइफ़",inY_other:"📄 अन्य",
 inF_insurer:"बीमा कंपनी",inF_policyNo:"पॉलिसी नंबर",inF_insured:"बीमित (Insured) का नाम",inF_start:"शुरू",inF_end:"खत्म (एक्सपायरी)",inF_sum:"सम इंश्योर्ड (₹)",inF_premium:"प्रीमियम (₹, GST सहित)",inF_gstin:"बीमित का GSTIN",inF_location:"जगह / रिस्क का पता",inF_agent:"एजेंट / ब्रोकर",inF_agentPh:"एजेंट का फ़ोन",
 inF_items:"किस चीज़ का बीमा (बिल्डिंग / मशीन / स्टॉक)",inF_perils:"कौन-से ख़तरे कवर (STFI, भूकंप)",inF_hypo:"बैंक / हाइपोथिकेशन",inF_addons:"ऐड-ऑन",inF_mkind:"ओपन पॉलिसी या एक बार की",inF_transit:"कहाँ से कहाँ तक",inF_basis:"कवर का आधार (ICC A/B/C)",inF_machines:"मशीनों की लिस्ट",inF_members:"कितने लोग कवर",inF_family:"परिवार / फ़्लोटर",inF_tpa:"TPA",inF_list:"सदस्यों की लिस्ट",inF_cover:"मृत्यु / विकलांगता कवर",inF_emps:"कर्मचारियों की संख्या",inF_wages:"घोषित वेतन",inF_limit:"लिमिट ऑफ़ लायबिलिटी",inF_erf:"एनवायरनमेंट रिलीफ़ फ़ंड (ERF)",inF_hazard:"खतरनाक पदार्थ",inF_reg:"गाड़ी नंबर",inF_idv:"IDV",inF_ncb:"NCB",inF_mcover:"कवर (कॉम्प्रिहेंसिव / थर्ड पार्टी)",inF_retro:"रेट्रो डेट",inF_life:"जिसका बीमा (Life assured)",inF_maturity:"मैच्योरिटी",inF_nextPrem:"अगला प्रीमियम कब",inF_endNo:"एंडोर्समेंट नंबर",inF_endEff:"बदलाव कब से",inF_change:"क्या बदला",inF_paidOn:"पेमेंट की तारीख",inF_renewBy:"रिन्यू करने की आख़िरी तारीख",
 inFound:"✔ मिला",inMissing:"✖ नहीं मिला",inChkT:"आपने बताया: {k} — {y}. डॉक्यूमेंट में ये मिला:",inSum:"{f} में से {n} चीज़ें मिलीं",inFix:"नीचे फ़ॉर्म में जो नहीं मिला वो ख़ुद भरें या जाँचें।",inSaveB:"सेव करें और रिमाइंडर बनाएँ",inSaved:"सेव हो गया — रिन्यूअल रिमाइंडर बन गया",
 inW_type:"आपने '{a}' चुना, पर डॉक्यूमेंट '{b}' जैसा लगता है — एक बार देख लें।",inW_client:"डॉक्यूमेंट में क्लाइंट का नाम/GSTIN/PAN नहीं मिला — सही क्लाइंट है?",inOk_client:"क्लाइंट मिल गया: {x}",inW_exp:"ये पॉलिसी {d} को ख़त्म हो चुकी है!",inW_soon:"ये पॉलिसी {n} दिन में ख़त्म होगी — रिन्यूअल शुरू करें।",inW_dup:"ये पॉलिसी पहले से डाली हुई है ({x})।",inW_gap:"पिछली {y} पॉलिसी {d} को ख़त्म हुई थी — बीच में {n} दिन बिना बीमा रहे।",inW_scan:"फ़ाइल से टेक्स्ट नहीं निकला (स्कैन/फ़ोटो)। Claude से पढ़वाने के लिए ऐप Claude में खोलें, या फ़ॉर्म ख़ुद भरें।",inW_locked:"PDF पर पासवर्ड है — पासवर्ड डालकर दोबारा पढ़ें।",inW_noPolicy:"इस पॉलिसी नंबर की पॉलिसी ऐप में नहीं मिली — पहले पॉलिसी डालें।",inLinked:"पॉलिसी {x} से जोड़ा गया",
 inAll:"सभी",inExpSoon:"45 दिन में ख़त्म",inExpired:"ख़त्म हो चुकी",inActive:"चालू",inNone:"अभी कोई पॉलिसी नहीं डाली।",inDays:"{n} दिन बाकी",inOver:"{n} दिन पहले ख़त्म",inRenew:"🔁 रिन्यू हुई — नई पॉलिसी डालें",inRenewed:"रिन्यू हो गई",inHist:"बदलाव / रसीदें",inSuggest:"इस क्लाइंट के लिए ये बीमा देखें",inSugNone:"सब ज़रूरी बीमा डाले हुए हैं (प्रोफ़ाइल के हिसाब से)।",inDashN:"🛡 {n} पॉलिसी 45 दिन में ख़त्म / ख़त्म हो चुकी — देखें",inClientB:"🛡 बीमा ({n})",inDel:"हटाएँ",inEdit:"बदलें",inAiNote:"Claude ने पढ़ा — फिर भी एक बार पॉलिसी से मिलाकर देख लें।",inRx:"ऐप ने ख़ुद पढ़ा (बिना Claude) — कुछ चीज़ें छूट सकती हैं।",inRemind:"रिमाइंडर: {d} (टीम के 'बाकी काम' में दिखेगा)"});
Object.assign(I18N.en,{navIns:"🛡 Insurance",inT:"Insurance",inTxt:"Upload the policy PDF or photo and say what kind of policy/document it is. The app reads it, tells you what is in it and what is missing, fills the form and creates the renewal reminder.",inUp:"📤 Upload policy / document",
 inClient:"Which client?",inPick:"— select —",inKind:"What is this document?",inType:"Type of insurance",inTypeAuto:"— not sure, let the app detect —",inFile:"File (PDF or photo)",inPw:"PDF password, if any (optional)",inRead:"Read and check",inReading:"Reading the document…",
 inK_policy:"Policy schedule / copy",inK_renewal:"Renewal notice",inK_endorse:"Endorsement (change)",inK_receipt:"Premium receipt",inK_other:"Something else",
 inY_fire:"🔥 Fire / stock (Bharat Sookshma / Laghu Udyam)",inY_burglary:"🔓 Burglary",inY_marine:"🚢 Marine / transit",inY_mbd:"⚙ Machinery breakdown",inY_gmc:"🏥 Group health (GMC)",inY_gpa:"🩹 Group personal accident",inY_ec:"👷 Employees' compensation (WC)",inY_pl:"☣ Public liability (PLI Act)",inY_motor:"🚗 Motor / vehicle",inY_dno:"🧑‍⚖️ Directors (D&O)",inY_cyber:"💻 Cyber",inY_life:"❤️ Keyman / life",inY_other:"📄 Other",
 inF_insurer:"Insurer",inF_policyNo:"Policy number",inF_insured:"Insured name",inF_start:"Start",inF_end:"End (expiry)",inF_sum:"Sum insured (₹)",inF_premium:"Premium (₹, incl. GST)",inF_gstin:"Insured's GSTIN",inF_location:"Location / risk address",inF_agent:"Agent / broker",inF_agentPh:"Agent phone",
 inF_items:"What is covered (building / machinery / stock)",inF_perils:"Perils covered (STFI, earthquake)",inF_hypo:"Bank / hypothecation",inF_addons:"Add-ons",inF_mkind:"Open or specific policy",inF_transit:"Transit from / to",inF_basis:"Basis (ICC A/B/C)",inF_machines:"Machinery schedule",inF_members:"Persons covered",inF_family:"Family / floater",inF_tpa:"TPA",inF_list:"Member list",inF_cover:"Death / disablement cover",inF_emps:"Number of employees",inF_wages:"Declared wages",inF_limit:"Limit of liability",inF_erf:"Environment Relief Fund (ERF)",inF_hazard:"Hazardous substances",inF_reg:"Vehicle number",inF_idv:"IDV",inF_ncb:"NCB",inF_mcover:"Cover (comprehensive / third party)",inF_retro:"Retro date",inF_life:"Life assured",inF_maturity:"Maturity",inF_nextPrem:"Next premium due",inF_endNo:"Endorsement number",inF_endEff:"Effective from",inF_change:"What changed",inF_paidOn:"Payment date",inF_renewBy:"Renew by",
 inFound:"✔ Found",inMissing:"✖ Not found",inChkT:"You said: {k} — {y}. Found in the document:",inSum:"{n} of {f} items found",inFix:"Fill or check what was not found in the form below.",inSaveB:"Save and create reminder",inSaved:"Saved — renewal reminder created",
 inW_type:"You chose '{a}', but the document looks like '{b}' — please check.",inW_client:"Client name/GSTIN/PAN not found in the document — right client?",inOk_client:"Client matched: {x}",inW_exp:"This policy expired on {d}!",inW_soon:"This policy ends in {n} days — start the renewal.",inW_dup:"This policy is already saved ({x}).",inW_gap:"The previous {y} policy ended on {d} — {n} days without cover.",inW_scan:"No text in the file (scan/photo). Open the app in Claude to have Claude read it, or fill the form yourself.",inW_locked:"The PDF is password-protected — enter the password and read again.",inW_noPolicy:"No saved policy with this number — upload the policy first.",inLinked:"Linked to policy {x}",
 inAll:"All",inExpSoon:"Ends in 45 days",inExpired:"Expired",inActive:"Active",inNone:"No policies yet.",inDays:"{n} days left",inOver:"ended {n} days ago",inRenew:"🔁 Renewed — upload the new policy",inRenewed:"Renewed",inHist:"Changes / receipts",inSuggest:"Covers to consider for this client",inSugNone:"All suggested covers are on file (as per profile).",inDashN:"🛡 {n} policies ending within 45 days / expired — view",inClientB:"🛡 Insurance ({n})",inDel:"Delete",inEdit:"Edit",inAiNote:"Read by Claude — still compare once with the policy.",inRx:"Read by the app itself (without Claude) — some items may be missed.",inRemind:"Reminder: {d} (shows in the team's pending work)"});
Object.assign(I18N.zh,{navIns:"🛡 保险",inT:"保险",inTxt:"上传保单 PDF 或照片并说明保单/文件类型。应用会读取并告诉您包含哪些内容、缺少哪些，自动填写表单并创建续保提醒。",inUp:"📤 上传保单 / 文件",inClient:"哪个客户？",inPick:"— 请选择 —",inKind:"这是什么文件？",inType:"保险类型",inTypeAuto:"— 不确定，由应用识别 —",inFile:"文件（PDF 或照片）",inPw:"PDF 密码（可选）",inRead:"读取并检查",inReading:"正在读取…",
 inK_policy:"保单明细 / 副本",inK_renewal:"续保通知",inK_endorse:"批单（变更）",inK_receipt:"保费收据",inK_other:"其他",inY_fire:"🔥 火险 / 存货",inY_burglary:"🔓 盗窃险",inY_marine:"🚢 货运险",inY_mbd:"⚙ 机器损坏险",inY_gmc:"🏥 团体医疗险",inY_gpa:"🩹 团体意外险",inY_ec:"👷 雇员赔偿险",inY_pl:"☣ 公众责任险",inY_motor:"🚗 机动车险",inY_dno:"🧑‍⚖️ 董事责任险",inY_cyber:"💻 网络险",inY_life:"❤️ 关键人 / 寿险",inY_other:"📄 其他",
 inFound:"✔ 找到",inMissing:"✖ 未找到",inChkT:"您选择：{k} — {y}。文件中找到：",inSum:"{f} 项中找到 {n} 项",inFix:"请在下方表单中补填或核对未找到的项目。",inSaveB:"保存并创建提醒",inSaved:"已保存——已创建续保提醒",inAll:"全部",inExpSoon:"45 天内到期",inExpired:"已到期",inActive:"有效",inNone:"暂无保单。",inDays:"剩余 {n} 天",inOver:"已过期 {n} 天",inRenew:"🔁 已续保——上传新保单",inRenewed:"已续保",inHist:"变更 / 收据",inSuggest:"建议该客户考虑的保险",inSugNone:"建议的保险均已登记。",inDashN:"🛡 {n} 份保单 45 天内到期 / 已到期——查看",inClientB:"🛡 保险（{n}）",inDel:"删除",inEdit:"编辑",inAiNote:"由 Claude 读取——请与保单核对。",inRx:"由应用自行读取——可能有遗漏。",inRemind:"提醒：{d}（显示在团队待办中）"});
["inF_insurer","inF_policyNo","inF_insured","inF_start","inF_end","inF_sum","inF_premium","inF_gstin","inF_location","inF_agent","inF_agentPh","inW_type","inW_client","inOk_client","inW_exp","inW_soon","inW_dup","inW_gap","inW_scan","inW_locked","inW_noPolicy","inLinked"].forEach(k=>{if(!I18N.zh[k])I18N.zh[k]=I18N.en[k]});
Object.keys(I18N.en).filter(k=>k.startsWith("inF_")).forEach(k=>{if(!I18N.zh[k])I18N.zh[k]=I18N.en[k]});

const IN_KINDS=["policy","renewal","endorse","receipt","other"];
const IN_TYPES=["fire","burglary","marine","mbd","gmc","gpa","ec","pl","motor","dno","cyber","life","other"];
const IN_COMMON=["insurer","policyNo","insured","start","end","sum","premium","gstin"];
/* checklist per type: extra fields with a keyword test used when Claude can't read the document */
const IN_EXTRA={
 fire:[["location",/(risk|premises)\s*(location|address)|location of risk|situation/i],["items",/building|plant\s*&?\s*machinery|stock/i],["perils",/stfi|storm|flood|earthquake|inundation/i],["hypo",/hypothecat|financier|bank\s*clause|in favou?r of/i],["addons",/add[- ]?on|terrorism|escalation|spontaneous/i]],
 burglary:[["location",/(risk|premises)\s*(location|address)|situation/i],["items",/stock|contents|cash/i],["hypo",/hypothecat|financier/i]],
 marine:[["mkind",/open\s*(policy|cover)|specific\s*voyage|annual\s*turnover\s*policy|sales\s*turnover/i],["transit",/transit|voyage|from\s+\w+.*\bto\b/i],["basis",/institute\s*cargo\s*clause|\bicc\b|itc\s*\(?[abc]\)?/i]],
 mbd:[["location",/location|situation|premises/i],["machines",/schedule of machinery|machinery\s*(details|list)|make\s*&?\s*model/i]],
 gmc:[["members",/no\.?\s*of\s*(members|lives|employees|insured persons)|member\s*count|lives/i],["family",/family\s*floater|floater|dependants?|spouse/i],["tpa",/\btpa\b|third\s*party\s*administrator/i],["list",/annexure|member\s*list|list of (members|insured)/i]],
 gpa:[["members",/no\.?\s*of\s*(members|persons|employees)|lives/i],["cover",/death|disablement|PTD|PPD/i],["list",/annexure|member\s*list/i]],
 ec:[["emps",/no\.?\s*of\s*(employees|workers|persons)|number of employees/i],["wages",/wages|salary/i],["location",/location|premises|situation/i]],
 pl:[["limit",/limit of (indemnity|liability)/i],["erf",/environment\s*relief\s*fund|\berf\b/i],["hazard",/hazardous/i],["location",/location|premises|situation/i]],
 motor:[["reg",/\b[A-Z]{2}\s?-?\d{1,2}\s?-?[A-Z]{1,3}\s?-?\d{4}\b/],["idv",/\bidv\b|insured'?s?\s*declared\s*value/i],["ncb",/\bncb\b|no\s*claim\s*bonus/i],["mcover",/comprehensive|package|third\s*party|liability\s*only/i]],
 dno:[["limit",/limit of (indemnity|liability)/i],["retro",/retro(active)?\s*date/i]],
 cyber:[["limit",/limit of (indemnity|liability)/i],["retro",/retro(active)?\s*date/i]],
 life:[["life",/life\s*assured/i],["maturity",/maturity/i],["nextPrem",/next\s*(premium\s*)?due|due\s*date/i]],
 other:[]};
const IN_KIND_FIELDS={renewal:["insurer","policyNo","insured","renewBy","premium"],endorse:["insurer","policyNo","endNo","endEff","change"],receipt:["insurer","policyNo","premium","paidOn"],other:["insurer","policyNo","insured"]};
const IN_INSURERS=["New India Assurance","United India","Oriental Insurance","National Insurance","ICICI Lombard","HDFC ERGO","Bajaj Allianz","Bajaj General","Tata AIG","Reliance General","SBI General","IFFCO Tokio","IFFCO-Tokio","Cholamandalam","Future Generali","Royal Sundaram","Universal Sompo","Liberty General","Go Digit","Digit Insurance","Acko","Zurich Kotak","Kotak General","Magma","Shriram General","Star Health","Niva Bupa","Care Health","Aditya Birla Health","ManipalCigna","Raheja QBE","Navi General","Life Insurance Corporation","LIC of India","HDFC Life","ICICI Prudential","SBI Life","Max Life","Axis Max Life","Tata AIA","Bajaj Allianz Life","Kotak Life","PNB MetLife"];
const IN_TYPE_KW=[["marine",/marine|cargo|transit/i],["motor",/motor|private car|goods carrying|two wheeler|\bidv\b/i],["gmc",/group\s*(mediclaim|health)|\bgmc\b|health insurance/i],["gpa",/group\s*personal\s*accident|\bgpa\b/i],["ec",/employee'?s'?\s*compensation|workmen'?s?\s*compensation/i],["pl",/public liability/i],["dno",/directors'?\s*(and|&)\s*officers|\bd\s*&\s*o\b/i],["cyber",/cyber/i],["mbd",/machinery\s*breakdown|\bmbd\b/i],["burglary",/burglary|house\s*breaking/i],["life",/life\s*assured|keyman|term\s*plan|endowment/i],["fire",/fire|sookshma|laghu\s*udyam|griha|standard fire|special perils|\bstfi\b/i]];
const IN_KIND_KW=[["endorse",/endorsement/i],["renewal",/renewal\s*(notice|reminder|invitation)|due for renewal/i],["receipt",/premium\s*receipt|receipt\s*(no|number)|received with thanks/i]];

let insItems=[],insRef=null,inState={f:"",cl:""};
function insInit(db){if(db){insRef=db.collection("insurance");insRef.onSnapshot(s=>{insItems=s.docs.map(d=>Object.assign({id:d.id},d.data()));renderIns();insBadge();if(!$("#dash").hidden)render()},()=>{})}
  else{insItems=lget("compliance_ins_v1","[]");insBadge()}}
async function insSave(r){if(insRef){if(r.id){const id=r.id,d=Object.assign({},r);delete d.id;await insRef.doc(id).set(d);return id}const x=await insRef.add(r);return x.id}
  if(!r.id)r.id="i"+Date.now()+Math.random().toString(36).slice(2,5);const i=insItems.findIndex(x=>x.id===r.id);if(i>=0)insItems[i]=r;else insItems.push(r);lset("compliance_ins_v1",insItems);renderIns();insBadge();return r.id}
async function insDel(id){if(insRef)await insRef.doc(id).delete();else{insItems=insItems.filter(x=>x.id!==id);lset("compliance_ins_v1",insItems);renderIns();insBadge()}}
const inDaysTo=d=>{if(!d)return null;return Math.round((new Date(d+"T00:00:00")-new Date(todayStr()+"T00:00:00"))/864e5)};
const inPolicies=()=>insItems.filter(r=>r.kind==="policy");
const inLive=()=>inPolicies().filter(r=>r.status!=="renewed");
function inAlertN(){return inLive().filter(r=>{const n=inDaysTo(r.f&&r.f.end);return n!=null&&n<=45}).length}
function insBadge(){const b=$("#nIns");if(!b)return;const n=inAlertN();b.innerHTML=esc(t("navIns"))+(n?` <span class="badge b-late" style="padding:0 6px">${n}</span>`:"")}
function insDashHtml(){const n=inAlertN();return n?`<button class="btn ghost" id="insDash" style="width:100%;text-align:left;margin:0 0 12px;background:var(--amber-soft,#fff6e0);color:var(--amber,#9a6700)">${esc(t("inDashN",{n}))}</button>`:""}
const inTypeName=y=>t("inY_"+(y||"other"));
function inDue(r){const n=inDaysTo(r.f&&r.f.end);if(n==null)return"";return n<0?`<span class="badge b-late">${esc(t("inOver",{n:-n}))}</span>`:n<=45?`<span class="badge b-filed_noproof">${esc(t("inDays",{n}))}</span>`:`<span class="badge b-filed_proof">${esc(t("inDays",{n}))}</span>`}

/* which covers to consider for a client (advice, not law — except PLI Act for hazardous substances) */
function inSuggest(p){const pr=(p&&p.prof)||{},acts=new Set(pr.acts||[]),kinds=new Set((pr.locs||[]).map(l=>l.kind)),emp=+pr.emp||0,have=new Set(inLive().filter(r=>r.clientId===p.id).map(r=>r.type)),S=[];
  const s=(y,why)=>{if(!have.has(y))S.push({y,why})};
  if(acts.has("mfg")||acts.has("trade")||kinds.has("factory")||kinds.has("warehouse")||kinds.has("shop"))s("fire",bt("माल/मशीन/बिल्डिंग है — आग, बाढ़, भूकंप से बचाव। बैंक लोन हो तो बैंक भी माँगता है।","Stock/machinery/building — cover against fire, flood, earthquake. Banks require it for loans."));
  if(acts.has("mfg"))s("mbd",bt("मशीनें हैं — अचानक ख़राबी का ख़र्च।","Machinery — sudden breakdown cost."));
  if(acts.has("export")||acts.has("import")||acts.has("trade"))s("marine",bt("माल रास्ते में रहता है — ट्रांज़िट में नुकसान का बीमा।","Goods in transit — transit loss cover."));
  if(emp>0)s("ec",bt(`${emp} कर्मचारी — काम पर चोट लगने पर मालिक की ज़िम्मेदारी (जहाँ ESI नहीं है वहाँ ख़ास ज़रूरी)।`,`${emp} employees — employer liability for work injuries (important where ESI doesn't apply).`));
  if(emp>=10)s("gmc",bt("कर्मचारियों का ग्रुप हेल्थ — ESI से ज़्यादा वेतन वालों के लिए।","Group health for staff — for those above the ESI wage limit."));
  if(/chem|pharma|petro|gas|paint|fertili|pesticide|solvent/i.test(p.name||""))s("pl",bt("नाम से केमिकल/खतरनाक पदार्थ का काम लगता है — Public Liability Insurance Act 1991 के तहत खतरनाक पदार्थ रखने वालों को ये पॉलिसी लेनी ज़रूरी है। जाँचें।","Name suggests chemicals/hazardous substances — the Public Liability Insurance Act 1991 makes this cover compulsory for those handling hazardous substances. Check."));
  if(isCo(p.entity))s("dno",bt("कंपनी है — डायरेक्टरों की ज़िम्मेदारी का बीमा (मर्ज़ी से)।","Company — directors' liability cover (optional)."));
  return S}

function renderIns(){
  const el=$("#ins");if(!el||el.hidden)return;
  let L=inPolicies().slice();
  if(inState.cl)L=L.filter(r=>r.clientId===inState.cl);
  if(inState.f==="soon")L=L.filter(r=>{const n=inDaysTo(r.f.end);return r.status!=="renewed"&&n!=null&&n>=0&&n<=45});
  else if(inState.f==="exp")L=L.filter(r=>{const n=inDaysTo(r.f.end);return r.status!=="renewed"&&n!=null&&n<0});
  else if(inState.f==="act")L=L.filter(r=>r.status!=="renewed");
  L.sort((a,b)=>(a.status==="renewed")-(b.status==="renewed")||(a.f.end||"9").localeCompare(b.f.end||"9"));
  const cl=inState.cl?parties.find(p=>p.id===inState.cl):null;const sug=cl?inSuggest(cl):[];
  const seg=(k,lab)=>`<button data-f="${k}" class="${inState.f===k?"on":""}">${esc(lab)}</button>`;
  el.innerHTML=`<h2 style="margin-top:4px">${esc(t("inT"))}</h2><div class="note" style="margin-bottom:10px">${esc(t("inTxt"))}</div>
   ${canDo("file")?`<div class="actions" style="margin:0 0 10px"><button class="btn" id="inUpB" style="flex:1">${esc(t("inUp"))}</button></div>`:""}
   <div class="filters"><select id="inCl"><option value="">${esc(t("allClients")||t("inAll"))}</option>${parties.map(p=>`<option value="${p.id}" ${p.id===inState.cl?"selected":""}>${esc(p.name)}</option>`).join("")}</select></div>
   <div class="lang seg" id="inF" style="flex-wrap:wrap;margin-bottom:8px">${seg("",t("inAll"))}${seg("act",t("inActive"))}${seg("soon",t("inExpSoon"))}${seg("exp",t("inExpired"))}</div>
   ${L.map(r=>`<div class="item inRow" data-id="${esc(r.id)}" style="${r.status==="renewed"?"opacity:.6":""}"><div class="main"><div class="t">${esc(inTypeName(r.type))}</div>
     <div class="m">${esc(r.client||"")} · ${esc(r.f.insurer||"")}${r.f.policyNo?" · "+esc(r.f.policyNo):""}</div>
     <div class="m">${r.f.sum?"₹"+esc(Number(r.f.sum).toLocaleString("en-IN"))+" · ":""}${r.f.start?fmt(r.f.start):"?"} → ${r.f.end?fmt(r.f.end):"?"}</div></div>
     <div class="due">${r.status==="renewed"?`<span class="badge b-pending">${esc(t("inRenewed"))}</span>`:inDue(r)}</div></div>`).join("")||`<div class="empty">${esc(t("inNone"))}</div>`}
   ${cl?`<h2>${esc(t("inSuggest"))}</h2>${sug.map(s=>`<div class="item inSug" data-y="${s.y}"><div class="main"><div class="t">${esc(inTypeName(s.y))}</div><div class="m">${esc(s.why)}</div></div><span class="m">+</span></div>`).join("")||`<div class="m">${esc(t("inSugNone"))}</div>`}`:""}`;
  const ub=$("#inUpB");if(ub)ub.onclick=()=>openInsUpload({clientId:inState.cl});
  $("#inCl").onchange=e=>{inState.cl=e.target.value;renderIns()};
  el.querySelectorAll("#inF button").forEach(b=>b.onclick=()=>{inState.f=b.dataset.f;renderIns()});
  el.querySelectorAll(".inRow").forEach(r=>r.onclick=()=>openInsDetail(r.dataset.id));
  el.querySelectorAll(".inSug").forEach(r=>r.onclick=()=>canDo("file")&&openInsUpload({clientId:inState.cl,type:r.dataset.y}));
}

/* ---------- upload → read → check ---------- */
function openInsUpload(pre){pre=pre||{};
  openSheet(`<h3>${esc(t("inUp"))}</h3>
   <label>${esc(t("inClient"))}</label><select id="iuC"><option value="">${esc(t("inPick"))}</option>${parties.map(p=>`<option value="${p.id}" ${p.id===pre.clientId?"selected":""}>${esc(p.name)}</option>`).join("")}</select>
   <label>${esc(t("inKind"))}</label><select id="iuK">${IN_KINDS.map(k=>`<option value="${k}" ${k===(pre.kind||"policy")?"selected":""}>${esc(t("inK_"+k))}</option>`).join("")}</select>
   <div id="iuTW"><label>${esc(t("inType"))}</label><select id="iuY"><option value="">${esc(t("inTypeAuto"))}</option>${IN_TYPES.map(y=>`<option value="${y}" ${y===pre.type?"selected":""}>${esc(inTypeName(y))}</option>`).join("")}</select></div>
   <label>${esc(t("inFile"))}</label><input type="file" id="iuF" accept="application/pdf,image/*">
   <label>${esc(t("inPw"))}</label><input id="iuP" type="password" autocomplete="off">
   <div class="err" id="ferr"></div>
   <div class="actions"><button class="btn" id="iuGo">${esc(t("inRead"))}</button><button class="btn ghost" id="iuX">${esc(t("cancel"))}</button></div>`,{k:"insup"});
  const syncT=()=>{$("#iuTW").style.display=["policy","renewal"].includes($("#iuK").value)?"":"none"};$("#iuK").onchange=syncT;syncT();
  $("#iuX").onclick=()=>pre.back?openInsDetail(pre.back):closeSheet();
  $("#iuGo").onclick=async()=>{const f=$("#iuF").files[0];if(!f){$("#ferr").textContent=t("erNeed");return}
    const ctx={clientId:$("#iuC").value,kind:$("#iuK").value,type:$("#iuY").value,pw:$("#iuP").value,prevId:pre.prevId||""};
    $("#iuGo").disabled=true;$("#ferr").textContent=t("inReading");
    try{const res=await insRead(f,ctx);insReview(f,ctx,res)}catch(e){$("#ferr").textContent=t("fErr");$("#iuGo").disabled=false}};
}
const inNum=s=>{if(s==null)return"";const m=String(s).replace(/,/g,"").match(/\d+(\.\d+)?/);return m?String(Math.round(+m[0])):""};
function inDate(s){if(!s)return"";s=String(s).trim();let m=s.match(/^(\d{4})-(\d{2})-(\d{2})/);if(m)return m[0];
  const MO={jan:1,feb:2,mar:3,apr:4,may:5,jun:6,jul:7,aug:8,sep:9,oct:10,nov:11,dec:12};
  m=s.match(/(\d{1,2})[\/\-\. ]([A-Za-z]{3,9})[\/\-\. ,]+(\d{4})/);if(m&&MO[m[2].slice(0,3).toLowerCase()])return`${m[3]}-${p2(MO[m[2].slice(0,3).toLowerCase()])}-${p2(+m[1])}`;
  m=s.match(/(\d{1,2})[\/\-\.](\d{1,2})[\/\-\.](\d{2,4})/);if(m){let y=+m[3];if(y<100)y+=2000;return`${y}-${p2(+m[2])}-${p2(+m[1])}`}return""}
/* rule-based reading (no Claude) */
function insRegex(txt,kind,type){const T=txt.replace(/\s+/g," "),f={},found={};
  const g=(re,i=1)=>{const m=T.match(re);return m?m[i].trim():""};
  f.insurer=IN_INSURERS.find(n=>T.toLowerCase().includes(n.toLowerCase()))||"";
  f.policyNo=g(/policy\s*(?:no|number|#)\.?\s*[:\-]?\s*([A-Z0-9][A-Z0-9\/\-]{5,})/i);
  f.insured=g(/(?:name of (?:the )?insured|insured(?:'s)? name|insured)\s*[:\-]\s*([A-Z][A-Za-z0-9 .&,()-]{3,80}?)(?=\s{2,}|\s(?:address|gstin|policy|period|from)\b|$)/i);
  const DT="(\\d{1,2}[\\/\\-\\.](?:\\d{1,2}|[A-Za-z]{3,9})[\\/\\-\\.](?:\\d{4}|\\d{2}))";
  const per=T.match(new RegExp("(?:period of insurance|policy period|period|from)\\D{0,40}?"+DT+".{0,60}?(?:to|till|upto|-)\\D{0,30}?"+DT,"i"));
  if(per){f.start=inDate(per[1]);f.end=inDate(per[2])}
  if(!f.end)f.end=inDate(g(new RegExp("(?:expiry|expiring|valid (?:till|upto)|end date)\\D{0,25}?"+DT,"i")));
  f.sum=inNum(g(/(?:total\s*)?sum\s*insured\D{0,40}?([\d,]{4,}(?:\.\d+)?)/i));
  f.premium=inNum(g(/(?:total|gross|net)?\s*premium(?:\s*(?:payable|paid|amount|incl\w*\s*gst))?\D{0,40}?([\d,]{3,}(?:\.\d+)?)/i));
  const fx=pdfFacts(txt);f.gstin=(fx.gstins||[])[0]||"";
  if(kind==="renewal")f.renewBy=f.end||inDate(g(new RegExp("(?:due date|renew(?:al)? (?:by|before|date))\\D{0,25}?"+DT,"i")));
  if(kind==="endorse"){f.endNo=g(/endorsement\s*(?:no|number)\.?\s*[:\-]?\s*([A-Z0-9\/\-]{3,})/i);f.endEff=inDate(g(new RegExp("(?:effective|w\\.?e\\.?f\\.?)\\D{0,20}?"+DT,"i")))}
  if(kind==="receipt")f.paidOn=inDate(g(new RegExp("(?:receipt date|date of receipt|paid on|date)\\D{0,15}?"+DT,"i")));
  (IN_EXTRA[type]||[]).forEach(([k,re])=>{const m=T.match(re);found[k]=!!m;if(m&&k==="reg")f.reg=m[0]});
  Object.keys(f).forEach(k=>{if(found[k]===undefined)found[k]=!!f[k]});
  return{f,found,dtype:(IN_TYPE_KW.find(([,re])=>re.test(T))||[])[0]||"",dkind:(IN_KIND_KW.find(([,re])=>re.test(T))||[])[0]||"policy",fx}}
function inFieldList(kind,type){if(kind==="policy")return IN_COMMON.concat((IN_EXTRA[type||"other"]||[]).map(x=>x[0]));return IN_KIND_FIELDS[kind]||IN_KIND_FIELDS.other}
async function insRead(file,ctx){
  const isPdf=/pdf$/i.test(file.type)||/\.pdf$/i.test(file.name);let txt="",pw="",locked=false;
  if(isPdf){try{const r=await pdfTry(file,[ctx.pw].concat(await clientPws(ctx.clientId)));if(r.locked)locked=true;else{txt=r.txt||"";pw=r.pw||""}}catch(e){}}
  const rx=insRegex(txt,ctx.kind,ctx.type);
  let ai=null;
  const canImg=!isPdf&&await erImgOk();
  if(sampleCap&&(txt.trim().length>80||canImg)){
    const type=ctx.type||rx.dtype||"other",fl=inFieldList(ctx.kind,type);
    const prompt=`You read an Indian insurance document for a CA firm. The user says it is: document kind = "${ctx.kind}" (policy schedule / renewal notice / endorsement / premium receipt / other), insurance type = "${ctx.type||"unknown — detect it"}".
Return ONLY JSON: {"detected_kind": one of ${JSON.stringify(IN_KINDS)}, "detected_type": one of ${JSON.stringify(IN_TYPES)}, "fields": {${fl.map(k=>`"${k}": string or null`).join(", ")}}}
Rules: copy values exactly as written; dates as YYYY-MM-DD; amounts as plain rupee numbers without commas (premium = total incl. GST); "sum" = total sum insured; for yes/no style items (perils, hypo, addons, erf, tpa, list, family, basis, mkind, cover, retro, items, machines) give a short description of what the document says, or null if it is not mentioned. Use null for anything not in the document — never guess.
${txt?`DOCUMENT TEXT:\n${txt.slice(0,14000)}`:"The document is attached as an image."}`;
    try{const opts={modelTier:"default"};if(!txt&&canImg)opts.images=[file];
      let v=null;if(sampleCap.json)v=await sampleCap.json(prompt,opts);else{const r=await sampleCap(prompt,opts);const m=(r.text||"").match(/\{[\s\S]*\}/);v=m?JSON.parse(m[0]):null}
      if(v&&v.fields)ai=v}catch(e){}
  }
  return{txt,pw,locked,rx,ai,isPdf}}
function insReview(file,ctx,res){
  const {rx,ai}=res;
  const dtype=(ai&&ai.detected_type)||rx.dtype||"",dkind=(ai&&ai.detected_kind)||rx.dkind||"";
  const type=ctx.type||dtype||"other";
  const fl=inFieldList(ctx.kind,type);
  const f={},found={};
  fl.forEach(k=>{let v=ai&&ai.fields?ai.fields[k]:null;if(v!=null&&v!==""){found[k]=true;f[k]=["start","end","renewBy","endEff","paidOn","nextPrem","maturity","retro"].includes(k)?(inDate(v)||String(v)):["sum","premium"].includes(k)?inNum(v):String(v)}
    else{found[k]=!!rx.found[k];f[k]=rx.f[k]||""}});
  if(ai&&ai.fields)fl.forEach(k=>{if(!found[k]&&rx.f[k]){found[k]=true;f[k]=rx.f[k]}});
  /* client detection */
  let cid=ctx.clientId;const fx=rx.fx||{};const up=(res.txt||"").toUpperCase()+" "+String(f.insured||"").toUpperCase()+" "+String(f.gstin||"").toUpperCase();
  const hit=p=>(p.gsts||[]).some(g=>up.includes(g.gstin))||(p.pan&&up.includes(p.pan))||(p.name&&up.includes(p.name.toUpperCase().replace(/\s+(PRIVATE|PVT\.?)\s+(LIMITED|LTD\.?)$/,"")));
  if(!cid){const m=parties.find(hit);if(m)cid=m.id}
  const p=parties.find(x=>x.id===cid);
  const W=[],OK=[];
  if(!res.txt&&res.isPdf&&!res.locked&&!ai)W.push(t("inW_scan"));if(res.locked)W.push(t("inW_locked"));if(!res.isPdf&&!ai)W.push(t("inW_scan"));
  if(ctx.type&&dtype&&dtype!==ctx.type&&["policy","renewal"].includes(ctx.kind))W.push(t("inW_type",{a:inTypeName(ctx.type),b:inTypeName(dtype)}));
  if(ctx.kind!=="other"&&dkind&&dkind!==ctx.kind&&(res.txt||ai))W.push(t("inW_type",{a:t("inK_"+ctx.kind),b:t("inK_"+dkind)}));
  if(p){if(hit(p))OK.push(t("inOk_client",{x:p.name}));else if(res.txt||ai)W.push(t("inW_client"))}
  const pol=f.policyNo?inPolicies().find(r=>r.f.policyNo&&r.f.policyNo.replace(/\s/g,"").toUpperCase()===String(f.policyNo).replace(/\s/g,"").toUpperCase()):null;
  if(ctx.kind==="policy"){
    if(pol&&pol.id!==ctx.prevId)W.push(t("inW_dup",{x:pol.f.policyNo}));
    const n=inDaysTo(f.end);if(n!=null&&n<0)W.push(t("inW_exp",{d:fmt(f.end)}));else if(n!=null&&n<=45)W.push(t("inW_soon",{n}));
    const prev=ctx.prevId?insItems.find(r=>r.id===ctx.prevId):inLive().filter(r=>r.clientId===cid&&r.type===type&&r.f.end&&(!f.start||r.f.end<f.start)).sort((a,b)=>b.f.end.localeCompare(a.f.end))[0];
    if(prev&&prev.f.end&&f.start){const gap=Math.round((new Date(f.start)-new Date(prev.f.end))/864e5)-1;if(gap>0)W.push(t("inW_gap",{y:inTypeName(type),d:fmt(prev.f.end),n:gap}))}
    ctx.prevId=ctx.prevId||(prev?prev.id:"");
  }else if(["renewal","endorse","receipt"].includes(ctx.kind)){if(pol)OK.push(t("inLinked",{x:pol.f.policyNo}));else W.push(t("inW_noPolicy"))}
  const nF=fl.filter(k=>found[k]).length;
  const dateK=new Set(["start","end","renewBy","endEff","paidOn","nextPrem","maturity"]);
  openSheet(`<h3>${esc(t("inK_"+ctx.kind))}${["policy","renewal"].includes(ctx.kind)?" · "+esc(inTypeName(type)):""}</h3>
   <div class="m">${esc(ai?t("inAiNote"):t("inRx"))}</div>
   ${W.map(w=>`<div class="warn" style="margin-top:6px">⚠ ${esc(w)}</div>`).join("")}${OK.map(w=>`<div class="note" style="margin-top:6px;background:var(--green-soft)">✔ ${esc(w)}</div>`).join("")}
   <h2>${esc(t("inChkT",{k:t("inK_"+ctx.kind),y:["policy","renewal"].includes(ctx.kind)?inTypeName(type):"—"}))}</h2>
   <div class="m" style="margin-bottom:6px"><b>${esc(t("inSum",{n:nF,f:fl.length}))}</b> — ${esc(t("inFix"))}</div>
   <table style="width:100%;border-collapse:collapse;font-size:14px">${fl.map(k=>`<tr style="border-bottom:1px solid var(--line)"><td style="padding:5px 4px">${esc(t("inF_"+k))}</td><td style="padding:5px 4px;color:${found[k]?"var(--green)":"var(--red)"};white-space:nowrap">${found[k]?esc(t("inFound")):esc(t("inMissing"))}</td></tr>`).join("")}</table>
   <h2>${esc(t("inEdit"))}</h2>
   <label>${esc(t("inClient"))}</label><select id="irC"><option value="">${esc(t("inPick"))}</option>${parties.map(x=>`<option value="${x.id}" ${x.id===cid?"selected":""}>${esc(x.name)}</option>`).join("")}</select>
   ${["policy","renewal"].includes(ctx.kind)?`<label>${esc(t("inType"))}</label><select id="irY">${IN_TYPES.map(y=>`<option value="${y}" ${y===type?"selected":""}>${esc(inTypeName(y))}</option>`).join("")}</select>`:""}
   ${fl.map(k=>`<label>${esc(t("inF_"+k))} ${found[k]?"":"<span style='color:var(--red)'>✖</span>"}</label><input class="irF" data-k="${k}" ${dateK.has(k)?'type="date"':["sum","premium","emps","members"].includes(k)?'inputmode="numeric"':""} value="${esc(dateK.has(k)?(inDate(f[k])||""):(f[k]||""))}">`).join("")}
   ${ctx.kind==="policy"?`<div class="row2"><div><label>${esc(t("inF_agent"))}</label><input id="irAg"></div><div><label>${esc(t("inF_agentPh"))}</label><input id="irAp" inputmode="tel"></div></div>`:""}
   <div class="err" id="ferr"></div>
   <div class="actions"><button class="btn green" id="irSave">${esc(t("inSaveB"))}</button><button class="btn ghost" id="irX">${esc(t("cancel"))}</button></div>`,{k:"insrev"});
  $("#irX").onclick=closeSheet;
  $("#irSave").onclick=async()=>{const b=$("#irSave");b.disabled=true;$("#ferr").textContent="";
    try{const vals={};document.querySelectorAll(".irF").forEach(i=>vals[i.dataset.k]=i.value.trim());
      if(ctx.kind==="policy"){vals.agent=($("#irAg")||{}).value||"";vals.agentPh=($("#irAp")||{}).value||""}
      const cid2=$("#irC").value,pp=parties.find(x=>x.id===cid2),type2=$("#irY")?$("#irY").value:"";
      let file1=null;if(assets){const up2=await assets.upload(file);file1={id:up2.id,name:file.name,hash:await fileHash(file)};if(res.pw){const e=await encPw(res.pw);if(e)file1.pwEnc=e}}
      const missing=fl.filter(k=>!vals[k]);
      const now=Date.now();
      if(ctx.kind==="policy"){
        const rec={kind:"policy",type:type2||type,clientId:cid2,client:pp?pp.name:"",f:vals,found,missing,warn:W,ai:!!ai,file:file1,status:"active",prevId:ctx.prevId||"",hist:[],by:me.id||"local",at:now};
        const id=await insSave(rec);
        if(ctx.prevId){const pr=insItems.find(r=>r.id===ctx.prevId);if(pr){pr.status="renewed";pr.nextId=id;await insSave(pr)}}
        await insRemind(Object.assign({id},rec));
        toast(t("inSaved"));openInsDetail(id);
      }else{
        const pol2=vals.policyNo?inPolicies().find(r=>r.f.policyNo&&r.f.policyNo.replace(/\s/g,"").toUpperCase()===vals.policyNo.replace(/\s/g,"").toUpperCase()):null;
        const h={kind:ctx.kind,f:vals,file:file1,by:me.id||"local",at:now};
        if(pol2){pol2.hist=(pol2.hist||[]).concat([h]);if(ctx.kind==="renewal"&&vals.renewBy){pol2.renewBy=vals.renewBy;await insRemind(pol2)}await insSave(pol2);toast(t("inSaved"));openInsDetail(pol2.id)}
        else{const id=await insSave({kind:ctx.kind,type:type2||"",clientId:cid2,client:pp?pp.name:"",f:vals,found,missing,warn:W,file:file1,by:me.id||"local",at:now});toast(t("inSaved"));closeSheet()}
      }
    }catch(e){$("#ferr").textContent=t("saveFail");b.disabled=false}};
}
/* renewal reminder = a normal compliance entry, so it shows on the dashboard, in lists, in "my work" and can be assigned */
async function insRemind(r){const p=parties.find(x=>x.id===r.clientId);const due=r.renewBy||(r.f&&r.f.end);if(!p||!due)return;
  const o={code:"INS-"+r.type+"-"+String(r.f.policyNo||r.id).replace(/[^A-Za-z0-9]/g,"").slice(-12),name:"Insurance renewal – "+(I18N.en["inY_"+r.type]||r.type).replace(/^\S+\s/,"")+(r.f.policyNo?" ("+r.f.policyNo+")":""),cat:"lic",freq:"once",period:"Expiry "+(r.f.end||due),due};
  const key=genKeyOf(p.id,o);let it=items.find(i=>i.genKey===key);
  if(it){if(it.dueDate!==due&&!isFiled(it)){it.dueDate=due;log(it,{k:"edited"});await saveItem(it)}}
  else{it=makeEntry(p,o,new Date().toISOString(),false,todayStr());it.notes=(r.f.insurer||"")+(r.f.agent?" · "+r.f.agent+" "+(r.f.agentPh||""):"");await saveItem(it)}
  if(r.type==="life"&&r.f.nextPrem){const o2={code:"INS-PREM-"+String(r.f.policyNo||r.id).replace(/[^A-Za-z0-9]/g,"").slice(-12),name:"Insurance premium due – "+(r.f.policyNo||""),cat:"lic",freq:"once",period:"Premium "+r.f.nextPrem,due:r.f.nextPrem};
    if(!items.some(i=>i.genKey===genKeyOf(p.id,o2))){const i2=makeEntry(p,o2,new Date().toISOString(),false,todayStr());await saveItem(i2)}}
  /* the old policy's reminder is done once a renewed policy is saved */
  if(r.prevId){const pr=insItems.find(x=>x.id===r.prevId);if(pr){const ok=genKeyOf(p.id,{code:"INS-"+pr.type+"-"+String(pr.f.policyNo||pr.id).replace(/[^A-Za-z0-9]/g,"").slice(-12),period:"Expiry "+(pr.f.end||""),freq:"once"});
    const oi=items.find(i=>i.genKey===ok);if(oi&&!isFiled(oi)){oi.status="filed_noproof";oi.filingDate=todayStr();log(oi,{k:"file",st:"filed_noproof"});if(r.file){oi.proofs=[{id:r.file.id,name:r.file.name}];oi.status="filed_proof"}await saveItem(oi)}}}
  if(mode!=="db")render();
}
function openInsDetail(id){const r=insItems.find(x=>x.id===id);if(!r){closeSheet();return}
  const fl=inFieldList(r.kind,r.type);const prev=r.prevId?insItems.find(x=>x.id===r.prevId):null,next=r.nextId?insItems.find(x=>x.id===r.nextId):null;
  openSheet(`<h3>${esc(inTypeName(r.type))}</h3><div class="m">${esc(r.client||"")}</div><div style="margin:6px 0">${r.status==="renewed"?`<span class="badge b-pending">${esc(t("inRenewed"))}</span>`:inDue(r)}</div>
   <div class="kv">${fl.concat(["agent","agentPh"]).filter(k=>r.f[k]).map(k=>`<div>${esc(t("inF_"+k))}</div><div>${esc(["start","end","renewBy","nextPrem"].includes(k)?fmt(r.f[k]):["sum","premium"].includes(k)?"₹"+Number(r.f[k]).toLocaleString("en-IN"):r.f[k])}</div>`).join("")}</div>
   ${(r.missing||[]).length?`<div class="warn" style="margin-top:8px">✖ ${esc((r.missing||[]).map(k=>t("inF_"+k)).join(", "))}</div>`:""}
   ${(r.warn||[]).map(w=>`<div class="m" style="margin-top:4px">⚠ ${esc(w)}</div>`).join("")}
   ${r.file?`<div style="margin-top:10px"><a href="#" data-blob="${esc(r.file.id)}" data-fname="${esc(r.file.name)}">📎 ${esc(r.file.name)}</a></div>`:""}
   ${(r.f.end||r.renewBy)?`<div class="note" style="margin-top:8px">⏰ ${esc(t("inRemind",{d:fmt(r.renewBy||r.f.end)}))}</div>`:""}
   ${(r.hist||[]).length?`<h2>${esc(t("inHist"))}</h2>`+r.hist.map(h=>`<div class="m" style="margin-bottom:4px">${esc(t("inK_"+h.kind))} · ${esc(new Date(h.at).toLocaleDateString())}${h.f.change?" · "+esc(h.f.change):""}${h.f.premium?" · ₹"+esc(h.f.premium):""}${h.file?` · <a href="#" data-blob="${esc(h.file.id)}" data-fname="${esc(h.file.name)}">📎</a>`:""}</div>`).join(""):""}
   ${prev?`<div class="m" style="margin-top:8px">← <a href="#" id="inPrev">${esc(prev.f.policyNo||"")} (${fmt(prev.f.end)})</a></div>`:""}${next?`<div class="m">→ <a href="#" id="inNext">${esc(next.f.policyNo||"")}</a></div>`:""}
   <div class="actions">${canDo("file")&&r.status!=="renewed"?`<button class="btn green" id="inRen">${esc(t("inRenew"))}</button><button class="btn ghost" id="inAddDoc">+ ${esc(t("inK_endorse"))} / ${esc(t("inK_receipt"))}</button>`:""}
    ${canDo("delete")?`<button class="btn red" id="inDelB">${esc(t("inDel"))}</button>`:""}<button class="btn ghost" id="inX">${esc(t("close"))}</button></div>`,{k:"insdet",id});
  $("#inX").onclick=closeSheet;
  const rb=$("#inRen");if(rb)rb.onclick=()=>openInsUpload({clientId:r.clientId,type:r.type,prevId:r.id,back:r.id});
  const ad=$("#inAddDoc");if(ad)ad.onclick=()=>openInsUpload({clientId:r.clientId,kind:"endorse",back:r.id});
  const db3=$("#inDelB");if(db3)db3.onclick=async()=>{await insDel(r.id);closeSheet()};
  const pv=$("#inPrev");if(pv)pv.onclick=e=>{e.preventDefault();openInsDetail(prev.id)};const nx=$("#inNext");if(nx)nx.onclick=e=>{e.preventDefault();openInsDetail(next.id)};
}
