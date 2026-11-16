/* ================= 🗂 notice case file: what we did (timeline), appeal stage, what to do next ================= */
Object.assign(I18N.hi,{csT:"🗂 केस में क्या-क्या किया",csNone:"अभी कुछ दर्ज नहीं — जो भी किया (जवाब, अपील, पेमेंट, सुनवाई) नीचे से जोड़ें।",csAdd:"+ जो किया वो दर्ज करें",csType:"क्या किया / क्या हुआ",csDate:"कब",csRef:"ARN / अक्नॉलेजमेंट / अपील नंबर",csAmt:"रकम (₹, अगर हो)",csNote:"छोटा नोट",csFile:"कागज़ (वैकल्पिक)",csNext:"अगली तारीख (सुनवाई / जवाब / पेमेंट) — रिमाइंडर बनेगा",csNextWhat:"अगली तारीख किस लिए",csSave:"दर्ज करें",csSaved:"दर्ज हो गया",csStage:"अभी की स्थिति",csNextT:"➡ आगे क्या करना है",csAskAi:"🤖 Claude से इस केस का अगला कदम पूछें",csAiWait:"केस पढ़ रहा है…",csAiNote:"ये सलाह केस की जानकारी पर आधारित है — फ़ैसला सीनियर/CA लें।",csEdit:"✏ नोटिस की जानकारी ठीक करें",csEditSave:"सेव करें",csDel:"हटाएँ",csDone:"✔ हो गया",
 cs_reply_filed:"📨 नोटिस का जवाब दिया",cs_hearing_att:"🗣 सुनवाई में गए / VC हुई",cs_order_recv:"📄 ऑर्डर आया",cs_appeal_filed:"⚖️ अपील फ़ाइल की",cs_appeal_admitted:"✅ अपील दर्ज हुई / पेंडिंग दिख रही है",cs_demand_resp:"💬 पोर्टल पर डिमांड का जवाब दिया (असहमत / अपील)",cs_stay_applied:"🛑 डिमांड पर रोक (स्टे) की अर्ज़ी दी",cs_stay_granted:"🟢 स्टे मिला",cs_paid:"💰 पेमेंट किया (पूरा / हिस्सा)",cs_app_notice:"📬 अपील में नोटिस / सुनवाई की तारीख आई",cs_sub_filed:"📎 अपील में लिखित जवाब / कागज़ जमा किए",cs_adjourn:"⏸ समय माँगा (adjournment)",cs_app_order:"🏁 अपील का फ़ैसला आया",cs_next_appeal:"⚖️ ऊपर की अपील की (ITAT / ट्रिब्यूनल)",cs_rectify:"🛠 सुधार की अर्ज़ी (rectification)",cs_other:"📝 कुछ और",
 csSt_notice:"नोटिस का जवाब देना है",csSt_order:"ऑर्डर आ गया — अपील या मानना तय करें",csSt_appeal:"अपील दायर — पहली अपील (CIT(A) / अपीलीय प्राधिकारी) में पेंडिंग",csSt_appealHearing:"अपील में सुनवाई/जवाब चल रहा है",csSt_appealOrder:"अपील का फ़ैसला आ गया",csSt_tribunal:"ऊपर की अपील (ITAT / ट्रिब्यूनल) में",csSt_closed:"केस बंद"});
Object.assign(I18N.en,{csT:"🗂 What we did in this case",csNone:"Nothing recorded yet — add whatever was done (reply, appeal, payment, hearing) below.",csAdd:"+ Record what was done",csType:"What was done / happened",csDate:"When",csRef:"ARN / acknowledgment / appeal number",csAmt:"Amount (₹, if any)",csNote:"Short note",csFile:"Document (optional)",csNext:"Next date (hearing / reply / payment) — creates a reminder",csNextWhat:"Next date is for",csSave:"Record",csSaved:"Recorded",csStage:"Current stage",csNextT:"➡ What to do next",csAskAi:"🤖 Ask Claude for this case's next step",csAiWait:"Reading the case…",csAiNote:"Advice based on the case details — a senior/CA decides.",csEdit:"✏ Correct notice details",csEditSave:"Save",csDel:"Delete",csDone:"✔ Done",
 cs_reply_filed:"📨 Replied to the notice",cs_hearing_att:"🗣 Attended hearing / VC",cs_order_recv:"📄 Order received",cs_appeal_filed:"⚖️ Appeal filed",cs_appeal_admitted:"✅ Appeal registered / shows pending",cs_demand_resp:"💬 Responded to demand on portal (disagree / appeal)",cs_stay_applied:"🛑 Applied for stay of demand",cs_stay_granted:"🟢 Stay granted",cs_paid:"💰 Payment made (full / part)",cs_app_notice:"📬 Notice / hearing date in appeal",cs_sub_filed:"📎 Written submission / documents filed in appeal",cs_adjourn:"⏸ Adjournment sought",cs_app_order:"🏁 Appeal order received",cs_next_appeal:"⚖️ Second appeal filed (ITAT / tribunal)",cs_rectify:"🛠 Rectification application",cs_other:"📝 Something else",
 csSt_notice:"Notice to be answered",csSt_order:"Order received — decide appeal or accept",csSt_appeal:"Appeal filed — pending at first appeal (CIT(A) / appellate authority)",csSt_appealHearing:"Appeal hearing / submissions in progress",csSt_appealOrder:"Appeal order received",csSt_tribunal:"At second appeal (ITAT / tribunal)",csSt_closed:"Case closed"});
Object.keys(I18N.en).filter(k=>/^cs/.test(k)).forEach(k=>{if(!I18N.zh[k])I18N.zh[k]=I18N.en[k]});
const CS_TYPES=["reply_filed","hearing_att","order_recv","appeal_filed","appeal_admitted","demand_resp","stay_applied","stay_granted","paid","app_notice","sub_filed","adjourn","app_order","next_appeal","rectify","other"];
function csStage(r){const s=(r.steps||[]).map(x=>x.type);const has=k=>s.includes(k);
  if(r.status==="closed")return"closed";if(has("next_appeal"))return"tribunal";if(has("app_order"))return"appealOrder";
  if(has("app_notice")||has("sub_filed")||has("adjourn"))return"appealHearing";if(has("appeal_filed")||has("appeal_admitted")||r.status==="appeal")return"appeal";
  if(has("order_recv"))return"order";return"notice"}
/* rule-based next steps by department and stage (general guidance; seniors decide) */
function csNextSteps(r){const st=csStage(r),d=r.dept,s=new Set((r.steps||[]).map(x=>x.type)),amt=+(r.f.amount||0),it=d==="it"||d==="tds",gst=d==="gst";const A=[];
  const add=(hi,en)=>A.push(bt(hi,en));
  if(st==="notice"){add("नोटिस की आख़िरी तारीख से पहले जवाब दें — 🤖 ड्राफ़्ट बनाएँ, सीनियर से पास कराएँ, पोर्टल पर जमा करें।","Reply before the deadline — 🤖 draft, get senior approval, file on the portal.");
    add("समय कम हो तो पोर्टल से adjournment (समय) माँगें — तारीख निकलने से पहले।","If short of time, seek adjournment on the portal before the date passes.")}
  if(st==="order"){if(it)add("ऑर्डर/डिमांड मिलने के 30 दिन के अंदर CIT(A) में अपील (Form 35) — या मानकर पेमेंट। सीनियर तय करें।","Within 30 days of the order/demand: appeal to CIT(A) (Form 35) — or accept and pay. Senior decides.");
    if(gst)add("GST ऑर्डर के ख़िलाफ़ अपील APL-01 में तय समय में, टैक्स के विवादित हिस्से का प्री-डिपॉज़िट भरकर — सीनियर तय करें।","GST appeal in APL-01 within the time limit with the pre-deposit of disputed tax — senior decides.")}
  if(["appeal","appealHearing"].includes(st)){
    if(!s.has("appeal_filed")&&!s.has("appeal_admitted"))add("अपील की ARN / अक्नॉलेजमेंट और फ़ाइल करने की तारीख यहाँ 'अपील फ़ाइल की' में दर्ज करें।","Record the appeal ARN / acknowledgment and filing date under 'Appeal filed'.");
    if(it){
      if(!s.has("demand_resp"))add("पोर्टल पर: Pending Actions → Response to Outstanding Demand → 'Disagree with demand' चुनें और अपील की जानकारी डालें — ताकि बाकी सालों का रिफ़ंड इस डिमांड में न कटे।","On the portal: Pending Actions → Response to Outstanding Demand → choose 'Disagree with demand' and give appeal details — so refunds of other years are not adjusted.");
      if(!s.has("stay_applied")&&!s.has("stay_granted"))add(`डिमांड${amt?" (₹"+amt.toLocaleString("en-IN")+")":""} पर रोक (स्टे) के लिए AO को धारा 220(6) की अर्ज़ी पर सीनियर से फ़ैसला लें। CBDT के Office Memorandum के हिसाब से पहली अपील पेंडिंग होने पर आमतौर पर विवादित डिमांड का 20% भरने पर स्टे मिलता है${amt?" (यहाँ लगभग ₹"+Math.round(amt*0.2).toLocaleString("en-IN")+")":""}; बजट 2026 में 10% का प्रस्ताव था पर लागू होने की पुष्टि करें। कई हाई कोर्ट ने कहा है कि 20% की शर्त आँख मूँदकर नहीं लगाई जा सकती।`,`Decide with the senior on a stay application to the AO under section 220(6) for the demand${amt?" (₹"+amt.toLocaleString("en-IN")+")":""}. Under CBDT Office Memoranda, stay during the first appeal is usually granted on paying 20% of the disputed demand${amt?" (about ₹"+Math.round(amt*0.2).toLocaleString("en-IN")+" here)":""}; Budget 2026 proposed 10% — confirm whether it is in force. Several High Courts have held the 20% condition cannot be applied mechanically.`);
      add("हर हफ़्ते पोर्टल पर e-Proceedings / NFAC के नोटिस देखें — CIT(A) का कोई नोटिस आए तो उसकी तारीख यहाँ 'अपील में नोटिस' में डालें, रिमाइंडर बन जाएगा।","Check e-Proceedings / NFAC notices on the portal every week — record any CIT(A) notice date under 'Notice in appeal' to get a reminder.");
      add("अपील में नए कागज़ (जो पहले AO को नहीं दिए) देने हों तो Rule 46A के तहत अतिरिक्त सबूत की अर्ज़ी साथ लगानी पड़ती है — सीनियर से पूछें।","New documents not given to the AO earlier need an additional-evidence application under Rule 46A — ask the senior.");
      add("अपील का फ़ैसला आने तक ये केस खुला रहेगा। फ़ैसला आए तो 'अपील का फ़ैसला आया' दर्ज करें: जीते तो डिमांड हटी या नहीं जाँचें; हारे तो ITAT में Form 36 से अपील की समय-सीमा (आमतौर पर 60 दिन) देखें।","The case stays open until the appeal order. When it comes, record 'Appeal order received': if won, check the demand is removed; if lost, check the ITAT appeal deadline (Form 36, usually 60 days).")}
    else if(gst){add("अपीलीय प्राधिकारी के पोर्टल नोटिस/सुनवाई देखें (Services → User Services → My Applications / Case details)।","Watch appellate notices/hearings (Services → User Services → My Applications / Case details).");
      add("प्री-डिपॉज़िट भरने के बाद बाकी डिमांड की वसूली अपील के दौरान रुकी रहती है — प्री-डिपॉज़िट का चालान यहाँ 'पेमेंट किया' में दर्ज करें।","After the pre-deposit, recovery of the balance stays during the appeal — record the pre-deposit challan under 'Payment made'.");
      add("फ़ैसला आने पर: जीते तो रिफ़ंड/डिमांड हटना जाँचें; हारे तो GSTAT (ट्रिब्यूनल) की समय-सीमा देखें।","On the order: if won, check refund/demand removal; if lost, check the GSTAT deadline.")}
    else add("अपीलीय प्राधिकारी से आने वाले नोटिस और तारीखें यहाँ दर्ज करते रहें।","Keep recording notices and dates from the appellate authority here.")}
  if(st==="appealOrder")add(it?"फ़ैसला पढ़ें: पूरा/आंशिक जीत — AO से 'giving effect' ऑर्डर और डिमांड हटना/रिफ़ंड जाँचें; हार — ITAT अपील (Form 36) की समय-सीमा देखें। सीनियर तय करें।":"फ़ैसला पढ़ें: जीत — डिमांड हटना/रिफ़ंड जाँचें; हार — अगली अपील की समय-सीमा देखें।",it?"Read the order: full/partial relief — check the AO's giving-effect order and demand removal/refund; lost — check the ITAT appeal deadline (Form 36). Senior decides.":"Read the order: won — check demand removal/refund; lost — check the next appeal deadline.");
  if(st==="tribunal")add("ट्रिब्यूनल की सुनवाई की तारीखें यहाँ दर्ज करें; पेपर-बुक और सबमिशन समय पर तैयार करें।","Record tribunal hearing dates here; prepare the paper book and submissions in time.");
  return A}
/* reminders for the case: next dates become compliance entries; once an appeal is on record, the original reply/hearing reminders are closed */
async function csReminder(r,step,n){const p=parties.find(x=>x.id===r.clientId);if(!p||!step.next)return;const tag=String(r.f.ref||r.id).replace(/[^A-Za-z0-9]/g,"").slice(-14);
  const o={code:"NOTICE-S-"+String(r.dept).toUpperCase()+"-"+tag+"-"+n,name:(step.nextWhat||"Case follow-up")+" – "+(I18N.en["ntD_"+r.dept]||r.dept)+" "+(r.f.period||""),cat:NT_CAT[r.dept]||"other",freq:"once",period:"Case "+step.next,due:step.next};
  if(!items.some(i=>i.genKey===genKeyOf(p.id,o))){const it=makeEntry(p,o,new Date().toISOString(),false,todayStr());it.assignee=r.assignee||it.assignee;it.notes=(step.note||"").slice(0,300);await saveItem(it)}}
async function csCloseOld(r,why){const p=parties.find(x=>x.id===r.clientId);if(!p)return;
  for(const k of ["reply","hearing"]){const o=ntOpt(r,k);if(!o.due)continue;const it=items.find(i=>i.genKey===genKeyOf(p.id,o));
    if(it&&!isFiled(it)){it.status="filed_noproof";it.filingDate=todayStr();it.notes=((it.notes||"")+" · "+why).slice(0,400);log(it,{k:"file",st:"filed_noproof"});await saveItem(it)}}}
function csHtml(r){const steps=(r.steps||[]).slice().sort((a,b)=>(a.date||"").localeCompare(b.date||"")||a.at-b.at);const st=csStage(r);const nx=csNextSteps(r);
  return `<h2>${esc(t("csStage"))}</h2><div class="note" style="background:#eef3ff"><b>${esc(t("csSt_"+st))}</b></div>
   <h2>${esc(t("csNextT"))}</h2><ol style="margin:4px 0 0 20px;padding:0">${nx.map(x=>`<li style="margin-bottom:6px">${esc(x)}</li>`).join("")}</ol>
   ${sampleCap?`<div class="actions" style="margin-top:6px"><button class="btn ghost" id="csAi">${esc(t("csAskAi"))}</button></div><div id="csAiOut" style="white-space:pre-wrap">${esc(r.nextAi||"")}</div>${r.nextAi?`<div class="m">${esc(t("csAiNote"))}</div>`:""}`:""}
   <h2>${esc(t("csT"))}</h2>
   ${steps.length?`<div style="border-left:3px solid var(--brand);padding-left:10px">${steps.map(x=>`<div style="margin-bottom:10px"><div><b>${esc(x.date?fmt(x.date):"—")}</b> · ${esc(t("cs_"+x.type))}</div>
     ${x.ref?`<div class="m">${esc(t("csRef"))}: ${esc(x.ref)}</div>`:""}${x.amount?`<div class="m">₹${esc(Number(x.amount).toLocaleString("en-IN"))}</div>`:""}${x.note?`<div class="m">${esc(x.note)}</div>`:""}
     ${x.file?`<div><a href="#" data-blob="${esc(x.file.id)}" data-fname="${esc(x.file.name)}">📎 ${esc(x.file.name)}</a></div>`:""}${x.next?`<div class="m">⏰ ${esc(x.nextWhat||"")} ${esc(fmt(x.next))}</div>`:""}
     <div class="m">${esc(x.by==="local"?t("you"):nm(x.by))}${canDo("delete")?` · <a href="#" class="csDel" data-at="${x.at}">${esc(t("csDel"))}</a>`:""}</div></div>`).join("")}</div>`:`<div class="m">${esc(t("csNone"))}</div>`}
   ${canDo("file")?`<div class="actions"><button class="btn" id="csAddB">${esc(t("csAdd"))}</button>${canDo("approve")?`<button class="btn ghost" id="csEdB">${esc(t("csEdit"))}</button>`:""}</div>`:""}`}
function csWire(r){
  const ab=$("#csAddB");if(ab)ab.onclick=()=>csAddForm(r);const eb=$("#csEdB");if(eb)eb.onclick=()=>csEditForm(r);
  document.querySelectorAll(".csDel").forEach(a=>a.onclick=async e=>{e.preventDefault();r.steps=(r.steps||[]).filter(x=>String(x.at)!==a.dataset.at);ntLog(r,"step-deleted");await ntSave(r);openNtDetail(r.id)});
  const ai=$("#csAi");if(ai)ai.onclick=async()=>{const out=$("#csAiOut");ai.disabled=true;out.textContent=t("csAiWait");
    const prompt=`You advise a junior at an Indian CA firm on the NEXT STEPS in a tax/regulatory case. Answer in ${({hi:"simple Hindi (Devanagari)",en:"simple English",zh:"simple Chinese"})[lang]}, max 10 numbered points, most urgent first, each with who/what/by-when if known.
Use only the case data below and standard procedure. If a deadline or rule is uncertain, say "confirm with senior" instead of guessing. Do not cite case law. Never ask for passwords.
TODAY: ${todayStr()}
CASE: ${JSON.stringify({dept:r.dept,notice:r.f,issues:r.issues,status:r.status,stage:csStage(r),steps:(r.steps||[]).map(x=>({type:x.type,date:x.date,ref:x.ref,amount:x.amount,note:x.note,next:x.next,nextWhat:x.nextWhat})),files:(r.files||[]).map(f=>f.name),summary:r.f.summary})}`;
    try{const res=await sampleCap(prompt,{modelTier:"default",onText:x=>{out.textContent=x.text}});r.nextAi=res.text;await ntSave(r);openNtDetail(r.id);return}catch(e){out.textContent=e&&e.code==="not_granted"?"":t("luAskErr")}ai.disabled=false};
}
function csAddForm(r){
  openSheet(`<h3>${esc(t("csAdd"))}</h3><div class="m">${esc(r.client||"")} · ${esc(t("ntD_"+r.dept))} ${esc(r.f.period||"")}</div>
   <label>${esc(t("csType"))}</label><select id="csTy">${CS_TYPES.map(k=>`<option value="${k}">${esc(t("cs_"+k))}</option>`).join("")}</select>
   <label>${esc(t("csDate"))}</label><input type="date" id="csDt" value="${todayStr()}">
   <label>${esc(t("csRef"))}</label><input id="csRf"><label>${esc(t("csAmt"))}</label><input id="csAm" inputmode="numeric">
   <label>${esc(t("csNote"))}</label><textarea id="csNo" rows="2"></textarea>
   <label>${esc(t("csFile"))}</label><input type="file" id="csFi" accept="application/pdf,image/*">
   <label>${esc(t("csNext"))}</label><div class="row2"><div><input type="date" id="csNx"></div><div><input id="csNw" placeholder="${esc(t("csNextWhat"))}"></div></div>
   <div class="err" id="ferr"></div><div class="actions"><button class="btn green" id="csSv">${esc(t("csSave"))}</button><button class="btn ghost" id="csX">${esc(t("cancel"))}</button></div>`,{k:"csadd",id:r.id});
  $("#csX").onclick=()=>openNtDetail(r.id);
  $("#csSv").onclick=async()=>{const b=$("#csSv");b.disabled=true;try{
    const step={type:$("#csTy").value,date:$("#csDt").value,ref:$("#csRf").value.trim(),amount:inNum($("#csAm").value),note:$("#csNo").value.trim(),next:$("#csNx").value,nextWhat:$("#csNw").value.trim()||t("cs_"+$("#csTy").value).replace(/^\S+\s/,""),by:me.id||"local",at:Date.now()};
    const f=$("#csFi").files[0];if(f&&assets){const u=await assets.upload(f);step.file={id:u.id,name:f.name}}
    r.steps=(r.steps||[]).concat([step]);
    if(["appeal_filed","appeal_admitted","next_appeal"].includes(step.type)){r.status="appeal";if(step.ref&&!r.appealRef)r.appealRef=step.ref;await csCloseOld(r,"appeal filed")}
    else if(step.type==="reply_filed"&&NT_OPEN.has(r.status)&&r.status!=="appeal"){r.status="replied";if(step.ref)r.ack=step.ref;await ntMarkEntryDone(r,step.file,"reply")}
    else if(step.type==="app_order"&&r.status==="appeal"){/* stays open until a senior closes it */}
    ntLog(r,"step:"+step.type,{ref:step.ref});await ntSave(r);await csReminder(r,step,r.steps.length);toast(t("csSaved"));openNtDetail(r.id)}
    catch(e){$("#ferr").textContent=t("saveFail");b.disabled=false}};
}
function csEditForm(r){const dk=new Set(["noticeDate","dueDate","hearing"]);
  openSheet(`<h3>${esc(t("csEdit"))}</h3>${NT_FIELDS.map(k=>`<label>${esc(t("ntF_"+k))}</label><input class="ceF" data-k="${k}" ${dk.has(k)?'type="date"':""} value="${esc(r.f[k]||"")}">`).join("")}
   <label>${esc(t("ntF_summary"))}</label><textarea id="ceS" rows="3">${esc(r.f.summary||"")}</textarea><label>${esc(t("assignDef"))}</label><input id="ceA" value="${esc(r.assignee||"")}">
   <div class="err" id="ferr"></div><div class="actions"><button class="btn green" id="ceSv">${esc(t("csEditSave"))}</button><button class="btn ghost" id="ceX">${esc(t("cancel"))}</button></div>`,{k:"csedit",id:r.id});
  $("#ceX").onclick=()=>openNtDetail(r.id);
  $("#ceSv").onclick=async()=>{const old=JSON.parse(JSON.stringify(r));document.querySelectorAll(".ceF").forEach(i=>r.f[i.dataset.k]=i.value.trim());r.f.summary=$("#ceS").value.trim();r.assignee=$("#ceA").value.trim();
    r.warn=[];ntLog(r,"edited");
    try{await ntSave(r);
      /* move reminders to the corrected dates; a hearing date that changed replaces the old reminder */
      const p=parties.find(x=>x.id===r.clientId);if(p){const ro=items.find(i=>i.genKey===genKeyOf(p.id,ntOpt(old,"reply")));if(ro&&!isFiled(ro)){if(r.f.dueDate&&r.f.dueDate!==ro.dueDate&&r.status!=="appeal"){ro.dueDate=r.f.dueDate;log(ro,{k:"edited"});await saveItem(ro)}}
        if(old.f.hearing&&old.f.hearing!==r.f.hearing){const ho=items.find(i=>i.genKey===genKeyOf(p.id,ntOpt(old,"hearing")));if(ho&&!isFiled(ho)){ho.status="filed_noproof";ho.filingDate=todayStr();ho.notes=((ho.notes||"")+" · date corrected").slice(0,400);await saveItem(ho)}}
        if(NT_OPEN.has(r.status)&&r.status!=="appeal"&&r.status!=="replied")await ntRemind(r)}
      openNtDetail(r.id)}catch(e){$("#ferr").textContent=t("saveFail")}};
}
