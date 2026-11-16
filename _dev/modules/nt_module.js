/* ================= 📮 notice tracker: upload a notice → read & checked → reply-due reminder → Claude drafts the reply → senior approves → reply filed ================= */
Object.assign(I18N.hi,{navNt:"📮 नोटिस",ntT:"नोटिस (GST / इनकम टैक्स / ROC / PF…)",ntTxt:"नोटिस की PDF या फ़ोटो डालें। ऐप पढ़कर बताएगा कि नोटिस क्या माँग रहा है, जवाब की आख़िरी तारीख का रिमाइंडर बनाएगा, और Claude जवाब का ड्राफ़्ट बना देगा।",ntUp:"📤 नोटिस डालें",
 ntDept:"किस विभाग का?",ntD_gst:"GST",ntD_it:"इनकम टैक्स",ntD_tds:"TDS / TRACES",ntD_roc:"ROC / MCA",ntD_pf:"PF (EPFO)",ntD_esi:"ESI",ntD_dgft:"DGFT / कस्टम",ntD_state:"राज्य विभाग (PT, लेबर आदि)",ntD_other:"अन्य",ntDeptAuto:"— पता नहीं, ऐप पहचाने —",ntForm:"नोटिस का प्रकार / फ़ॉर्म",ntFormPh:"जैसे DRC-01A, ASMT-10, स्क्रूटिनी, डिमांड",
 ntF_ref:"रेफ़रेंस / DIN",ntF_form:"नोटिस का फ़ॉर्म / प्रकार",ntF_noticeDate:"नोटिस की तारीख",ntF_dueDate:"जवाब की आख़िरी तारीख",ntF_hearing:"सुनवाई (हियरिंग) की तारीख",ntF_period:"किस अवधि का (FY / AY / महीना)",ntF_amount:"माँगी गई रकम (₹)",ntF_officer:"अधिकारी / ऑफ़िस",ntF_gstin:"GSTIN / PAN / CIN",ntF_section:"धारा / नियम",ntF_summary:"नोटिस क्या कह रहा है (आसान भाषा)",ntF_issues:"मुद्दे / सवाल",ntF_docs:"जवाब के लिए चाहिए",
 ntSt_new:"नया",ntSt_work:"काम चल रहा",ntSt_draft:"ड्राफ़्ट तैयार — सीनियर देखें",ntSt_ok:"ड्राफ़्ट पास",ntSt_replied:"जवाब दे दिया",ntSt_hearing:"सुनवाई बाकी",ntSt_closed:"बंद",ntSt_appeal:"अपील",
 ntCheck:"नोटिस में ये मिला:",ntSaveB:"सेव करें और रिमाइंडर बनाएँ",ntSaved:"सेव हो गया — जवाब की तारीख का रिमाइंडर बन गया",ntW_noDin:"DIN / रेफ़रेंस नंबर नहीं मिला — जाँचें (इनकम टैक्स के बिना DIN वाले नोटिस पर सवाल उठ सकता है — सीनियर से पूछें)।",ntW_over:"जवाब की तारीख {d} निकल चुकी है! तुरंत सीनियर को बताएँ — समय बढ़ाने (adjournment) की अर्ज़ी देनी पड़ सकती है।",ntW_soon:"जवाब के सिर्फ़ {n} दिन बचे हैं।",ntW_noDue:"जवाब की तारीख नहीं मिली — नोटिस में देखकर भरें (आमतौर पर 7–30 दिन)।",ntW_dup:"ये नोटिस पहले से डाला हुआ है ({x})।",
 ntDraftB:"🤖 जवाब का ड्राफ़्ट बनाएँ",ntFacts:"हमारी तरफ़ से क्या कहना है? (तथ्य, कागज़ जो हैं)",ntFactsPh:"जैसे: अंतर ₹2.4 लाख का है क्योंकि मार्च का क्रेडिट नोट अप्रैल में डाला; इनवॉइस और 2B की कॉपी हैं",ntDrafting:"ड्राफ़्ट बन रहा है…",ntDraft:"जवाब का ड्राफ़्ट",ntDraftNote:"ये सिर्फ़ ड्राफ़्ट है — सीनियर/CA जाँचकर ही भेजें। आँकड़े और कानूनी बातें नोटिस और रिकॉर्ड से मिलाएँ।",ntCopy:"📋 कॉपी",ntDl:"⬇ डाउनलोड (.txt)",ntSaveDraft:"ड्राफ़्ट सेव करें",ntSendRev:"सीनियर को भेजें",ntApprove:"✔ ड्राफ़्ट पास करें",ntReplied:"📨 जवाब दे दिया",ntAck:"जवाब का अक्नॉलेजमेंट / ARN",ntReplyFile:"भेजे गए जवाब की कॉपी",ntClose:"केस बंद करें",ntOrder:"ऑर्डर / नतीजा",ntHearingAdd:"सुनवाई की तारीख",ntAll:"सभी",ntOpen:"खुले",ntDue7:"7 दिन में जवाब",ntOverdue:"तारीख निकली",ntNone:"अभी कोई नोटिस नहीं।",ntDashN:"📮 {n} नोटिस का जवाब 7 दिन में / तारीख निकली — देखें",ntClientB:"📮 नोटिस ({n} खुले)",ntDaysL:"{n} दिन बाकी",ntOverL:"{n} दिन ऊपर",ntExplain:"जूनियर के लिए समझ",ntHow:"📘 जवाब कैसे दें",ntStatus:"स्थिति",ntNoAi:"यहाँ Claude से ड्राफ़्ट नहीं बन सकता (ऐप Claude के बाहर खुला है)।",ntLog:"हिस्ट्री"});
Object.assign(I18N.en,{navNt:"📮 Notices",ntT:"Notices (GST / income tax / ROC / PF…)",ntTxt:"Upload the notice PDF or photo. The app reads it, tells you what it asks for, creates the reply-deadline reminder, and Claude drafts the reply.",ntUp:"📤 Upload notice",
 ntDept:"Which department?",ntD_gst:"GST",ntD_it:"Income tax",ntD_tds:"TDS / TRACES",ntD_roc:"ROC / MCA",ntD_pf:"PF (EPFO)",ntD_esi:"ESI",ntD_dgft:"DGFT / customs",ntD_state:"State department (PT, labour etc.)",ntD_other:"Other",ntDeptAuto:"— not sure, let the app detect —",ntForm:"Notice type / form",ntFormPh:"e.g. DRC-01A, ASMT-10, scrutiny, demand",
 ntF_ref:"Reference / DIN",ntF_form:"Notice form / type",ntF_noticeDate:"Notice date",ntF_dueDate:"Reply due date",ntF_hearing:"Hearing date",ntF_period:"Period (FY / AY / month)",ntF_amount:"Amount demanded (₹)",ntF_officer:"Officer / office",ntF_gstin:"GSTIN / PAN / CIN",ntF_section:"Section / rule",ntF_summary:"What the notice says (plain words)",ntF_issues:"Issues / questions",ntF_docs:"Needed for the reply",
 ntSt_new:"New",ntSt_work:"In progress",ntSt_draft:"Draft ready — senior to review",ntSt_ok:"Draft approved",ntSt_replied:"Replied",ntSt_hearing:"Hearing pending",ntSt_closed:"Closed",ntSt_appeal:"Appeal",
 ntCheck:"Found in the notice:",ntSaveB:"Save and create reminder",ntSaved:"Saved — reply-deadline reminder created",ntW_noDin:"No DIN / reference found — check (an income-tax notice without DIN may be questionable — ask a senior).",ntW_over:"Reply date {d} has passed! Tell a senior now — an adjournment request may be needed.",ntW_soon:"Only {n} days left to reply.",ntW_noDue:"No reply date found — read the notice and fill it (usually 7–30 days).",ntW_dup:"This notice is already saved ({x}).",
 ntDraftB:"🤖 Draft the reply",ntFacts:"What do we want to say? (facts, papers we have)",ntFactsPh:"e.g. ₹2.4 lakh difference because March credit note was booked in April; invoices and 2B copy available",ntDrafting:"Drafting…",ntDraft:"Reply draft",ntDraftNote:"Draft only — a senior/CA must check before sending. Match figures and legal points with the notice and records.",ntCopy:"📋 Copy",ntDl:"⬇ Download (.txt)",ntSaveDraft:"Save draft",ntSendRev:"Send to senior",ntApprove:"✔ Approve draft",ntReplied:"📨 Reply submitted",ntAck:"Reply acknowledgment / ARN",ntReplyFile:"Copy of the reply sent",ntClose:"Close case",ntOrder:"Order / outcome",ntHearingAdd:"Hearing date",ntAll:"All",ntOpen:"Open",ntDue7:"Reply in 7 days",ntOverdue:"Overdue",ntNone:"No notices yet.",ntDashN:"📮 {n} notices due in 7 days / overdue — view",ntClientB:"📮 Notices ({n} open)",ntDaysL:"{n} days left",ntOverL:"{n} days over",ntExplain:"Explained for juniors",ntHow:"📘 How to reply",ntStatus:"Status",ntNoAi:"Drafting with Claude isn't available here (app opened outside Claude).",ntLog:"History"});
Object.keys(I18N.en).filter(k=>/^nt/.test(k)||k==="navNt").forEach(k=>{if(!I18N.zh[k])I18N.zh[k]=I18N.en[k]});
Object.assign(I18N.zh,{navNt:"📮 通知",ntT:"税务通知",ntUp:"📤 上传通知",ntSt_new:"新",ntSt_work:"处理中",ntSt_draft:"草稿待审核",ntSt_ok:"草稿已批准",ntSt_replied:"已回复",ntSt_hearing:"待听证",ntSt_closed:"已结案",ntSt_appeal:"上诉"});

const NT_DEPTS=["gst","it","tds","roc","pf","esi","dgft","state","other"];
const NT_ST=["new","work","draft","ok","replied","hearing","closed","appeal"];
const NT_OPEN=new Set(["new","work","draft","ok","hearing","appeal"]);
const NT_FIELDS=["ref","form","noticeDate","dueDate","hearing","period","amount","section","officer","gstin"];
const NT_DEPT_KW=[["gst",/\bGSTIN\b|DRC-0|ASMT-1|REG-\d|CGST|SGST|IGST|Goods and Services Tax/i],["tds",/TRACES|TDS|tax deduction account|\bTAN\b/i],["it",/Income[- ]?tax|\bAY\b|assessment year|e-?proceeding|\bDIN\b.*ITBA|faceless/i],["roc",/Registrar of Companies|Companies Act|\bCIN\b|MCA/i],["pf",/EPFO|Provident Fund|EPF\b/i],["esi",/ESIC|Employees'? State Insurance/i],["dgft",/DGFT|Foreign Trade|Customs|IEC\b/i]];
const NT_CAT={gst:"gst",it:"it",tds:"tds",roc:"roc",pf:"pf",esi:"pf",dgft:"iex",state:"pt",other:"other"};

let ntItems=[],ntRef=null,ntState={f:"open",cl:""};
function ntInit(db){if(db){ntRef=db.collection("notices");ntRef.onSnapshot(s=>{ntItems=s.docs.map(d=>Object.assign({id:d.id},d.data()));renderNt();ntBadge();if(!$("#dash").hidden)render()},()=>{})}
  else{ntItems=lget("compliance_nt_v1","[]");ntBadge()}}
async function ntSave(r){if(ntRef){if(r.id){const id=r.id,d=Object.assign({},r);delete d.id;await ntRef.doc(id).set(d);return id}const x=await ntRef.add(r);return x.id}
  if(!r.id)r.id="n"+Date.now()+Math.random().toString(36).slice(2,5);const i=ntItems.findIndex(x=>x.id===r.id);if(i>=0)ntItems[i]=r;else ntItems.push(r);lset("compliance_nt_v1",ntItems);renderNt();ntBadge();return r.id}
const ntIsOpen=r=>NT_OPEN.has(r.status||"new");
const ntDue=r=>r.status==="hearing"&&r.f.hearing?r.f.hearing:(r.status==="replied"||r.status==="closed"?"":r.f.dueDate);
function ntAlertN(){return ntItems.filter(r=>ntIsOpen(r)).filter(r=>{const n=inDaysTo(ntDue(r));return n!=null&&n<=7}).length}
function ntBadge(){const b=$("#nNt");if(!b)return;const n=ntAlertN();b.innerHTML=esc(t("navNt"))+(n?` <span class="badge b-late" style="padding:0 6px">${n}</span>`:"")}
function ntDashHtml(){const n=ntAlertN();return n?`<button class="btn ghost" id="ntDash" style="width:100%;text-align:left;margin:0 0 12px;background:#fdecec;color:var(--red)">${esc(t("ntDashN",{n}))}</button>`:""}
function ntDueBadge(r){if(!ntIsOpen(r))return`<span class="badge b-filed_proof">${esc(t("ntSt_"+r.status))}</span>`;const n=inDaysTo(ntDue(r));if(n==null)return`<span class="badge b-pending">${esc(t("ntSt_"+(r.status||"new")))}</span>`;
  return n<0?`<span class="badge b-late">${esc(t("ntOverL",{n:-n}))}</span>`:n<=7?`<span class="badge b-filed_noproof">${esc(t("ntDaysL",{n}))}</span>`:`<span class="badge b-pending">${esc(t("ntDaysL",{n}))}</span>`}

function renderNt(){
  const el=$("#nt");if(!el||el.hidden)return;
  let L=ntItems.slice();if(ntState.cl)L=L.filter(r=>r.clientId===ntState.cl);
  if(ntState.f==="open")L=L.filter(ntIsOpen);else if(ntState.f==="due7")L=L.filter(r=>ntIsOpen(r)&&(n=>n!=null&&n>=0&&n<=7)(inDaysTo(ntDue(r))));else if(ntState.f==="over")L=L.filter(r=>ntIsOpen(r)&&(n=>n!=null&&n<0)(inDaysTo(ntDue(r))));
  L.sort((a,b)=>(!ntIsOpen(a))-(!ntIsOpen(b))||(ntDue(a)||"9").localeCompare(ntDue(b)||"9"));
  const seg=(k,lab)=>`<button data-f="${k}" class="${ntState.f===k?"on":""}">${esc(lab)}</button>`;
  el.innerHTML=`<h2 style="margin-top:4px">${esc(t("ntT"))}</h2><div class="note" style="margin-bottom:10px">${esc(t("ntTxt"))}</div>
   ${canDo("file")?`<div class="actions" style="margin:0 0 10px"><button class="btn" id="ntUpB" style="flex:1">${esc(t("ntUp"))}</button></div>`:""}
   <div class="filters"><select id="ntCl"><option value="">${esc(t("allClients"))}</option>${parties.map(p=>`<option value="${p.id}" ${p.id===ntState.cl?"selected":""}>${esc(p.name)}</option>`).join("")}</select></div>
   <div class="lang seg" id="ntF" style="flex-wrap:wrap;margin-bottom:8px">${seg("open",t("ntOpen"))}${seg("due7",t("ntDue7"))}${seg("over",t("ntOverdue"))}${seg("",t("ntAll"))}</div>
   ${L.map(r=>`<div class="item ntRow" data-id="${esc(r.id)}"><div class="main"><div class="t">${esc(t("ntD_"+r.dept))} · ${esc(r.f.form||"")}</div>
     <div class="m">${esc(r.client||"")}${r.f.period?" · "+esc(r.f.period):""}${r.f.amount?" · ₹"+esc(Number(r.f.amount).toLocaleString("en-IN")):""}</div>
     <div class="m">${esc((r.f.summary||"").slice(0,90))}</div><div class="m">${esc(t("ntStatus"))}: ${esc(t("ntSt_"+(r.status||"new")))}${r.assignee?" · 👤 "+esc(r.assignee):""}</div></div>
     <div class="due">${ntDueBadge(r)}${ntDue(r)?`<div class="m">${fmt(ntDue(r))}</div>`:""}</div></div>`).join("")||`<div class="empty">${esc(t("ntNone"))}</div>`}`;
  const ub=$("#ntUpB");if(ub)ub.onclick=()=>openNtUpload({clientId:ntState.cl});
  $("#ntCl").onchange=e=>{ntState.cl=e.target.value;renderNt()};
  el.querySelectorAll("#ntF button").forEach(b=>b.onclick=()=>{ntState.f=b.dataset.f;renderNt()});
  el.querySelectorAll(".ntRow").forEach(r=>r.onclick=()=>openNtDetail(r.dataset.id));
}
function openNtUpload(pre){pre=pre||{};
  openSheet(`<h3>${esc(t("ntUp"))}</h3>
   <label>${esc(t("inClient"))}</label><select id="nuC"><option value="">${esc(t("inPick"))}</option>${parties.map(p=>`<option value="${p.id}" ${p.id===pre.clientId?"selected":""}>${esc(p.name)}</option>`).join("")}</select>
   <label>${esc(t("ntDept"))}</label><select id="nuD"><option value="">${esc(t("ntDeptAuto"))}</option>${NT_DEPTS.map(d=>`<option value="${d}">${esc(t("ntD_"+d))}</option>`).join("")}</select>
   <label>${esc(t("ntForm"))}</label><input id="nuT" placeholder="${esc(t("ntFormPh"))}">
   <label>${esc(t("inFile"))}</label><input type="file" id="nuF" accept="application/pdf,image/*" multiple>
   <label>${esc(t("inPw"))}</label><input id="nuP" type="password" autocomplete="off">
   <div class="err" id="ferr"></div>
   <div class="actions"><button class="btn" id="nuGo">${esc(t("inRead"))}</button><button class="btn ghost" id="nuX">${esc(t("cancel"))}</button></div>`,{k:"ntup"});
  $("#nuX").onclick=closeSheet;
  $("#nuGo").onclick=async()=>{const files=[...$("#nuF").files];if(!files.length){$("#ferr").textContent=t("erNeed");return}
    const ctx={clientId:$("#nuC").value,dept:$("#nuD").value,form:$("#nuT").value.trim(),pw:$("#nuP").value};
    $("#nuGo").disabled=true;$("#ferr").textContent=t("inReading");
    try{const res=await ntRead(files,ctx);ntReview(files,ctx,res)}catch(e){$("#ferr").textContent=t("fErr");$("#nuGo").disabled=false}};
}
function ntRegex(txt){const T=txt.replace(/\s+/g," "),f={};const g=(re,i=1)=>{const m=T.match(re);return m?m[i].trim():""};
  const DT="(\\d{1,2}[\\/\\-\\.](?:\\d{1,2}|[A-Za-z]{3,9})[\\/\\-\\.](?:\\d{4}|\\d{2}))";
  f.ref=g(/\b(?:DIN|Document Identification Number)\s*[:\-]?\s*([A-Z0-9\/\-]{8,})/i)||g(/(?:reference|ref\.?)\s*(?:no|number)?\.?\s*[:\-]?\s*([A-Z0-9][A-Z0-9\/\-]{6,})/i);
  f.form=g(/\b(DRC-0\d[A-Z]?|ASMT-1\d|REG-\d{2}|RFD-\d{2}|ADT-0\d|CMP-0\d|GSTR-3A)\b/i)||g(/\b(show cause notice|scrutiny|intimation|demand notice|penalty|defective return|reassessment|notice of hearing)\b/i);
  f.noticeDate=inDate(g(new RegExp("(?:date(?:d)?|issue date|date of notice)\\s*[:\\-]?\\s*"+DT,"i")));
  f.dueDate=inDate(g(new RegExp("(?:on or before|within .{0,20}?by|last date|due date|reply by|submit .{0,40}?by|latest by)\\D{0,20}?"+DT,"i")));
  f.hearing=inDate(g(new RegExp("(?:personal hearing|hearing)\\D{0,40}?"+DT,"i")));
  f.period=g(/\b(?:F\.?Y\.?|financial year|tax period)\s*[:\-]?\s*(20\d{2}\s*-\s*\d{2,4})/i)||g(/\b(?:A\.?Y\.?|assessment year)\s*[:\-]?\s*(20\d{2}\s*-\s*\d{2,4})/i);
  f.amount=inNum(g(/(?:total|amount|demand|tax)\s*(?:demand(?:ed)?|payable|due)?\s*(?:of)?\s*(?:Rs\.?|₹|INR)\s*([\d,]{3,}(?:\.\d+)?)/i));
  f.section=g(/\b(?:section|u\/s|sec\.?|rule)\s*([0-9]{1,3}[A-Z]{0,3}(?:\(\d+[a-z]?\))*)/i);
  const fx=pdfFacts(txt);f.gstin=(fx.gstins||[])[0]||(fx.pans||[])[0]||(fx.cins||[])[0]||"";
  return{f,fx,dept:(NT_DEPT_KW.find(([,re])=>re.test(T))||[])[0]||""}}
async function ntRead(files,ctx){
  let txt="",pw="",locked=false;const imgs=[];
  for(const file of files){const isPdf=/pdf$/i.test(file.type)||/\.pdf$/i.test(file.name);
    if(isPdf){try{const r=await pdfTry(file,[ctx.pw].concat(await clientPws(ctx.clientId)));if(r.locked)locked=true;else{txt+=(r.txt||"")+"\n";pw=pw||r.pw||""}}catch(e){}}else imgs.push(file)}
  const rx=ntRegex(txt);let ai=null;
  const canImg=imgs.length&&await erImgOk();
  if(sampleCap&&(txt.trim().length>80||canImg)){
    const langName={hi:"simple Hindi (Devanagari)",en:"simple English",zh:"simple Chinese"}[lang];
    const prompt=`You read an Indian tax/regulatory notice for a CA firm. The user says: department="${ctx.dept||"unknown"}", notice type="${ctx.form||"unknown"}".
Return ONLY JSON: {"dept": one of ${JSON.stringify(NT_DEPTS)}, "fields": {"ref": DIN or reference number, "form": form/notice type e.g. "DRC-01A" or "Scrutiny notice", "noticeDate": "YYYY-MM-DD", "dueDate": reply due date "YYYY-MM-DD" (if the notice says "within N days", compute from notice date), "hearing": "YYYY-MM-DD", "period": FY/AY/tax period, "amount": total amount demanded as plain number, "section": section/rule cited, "officer": officer designation and office, "gstin": GSTIN/PAN/CIN of the addressee}, "summary": 2-3 sentences in ${langName} saying what the notice is about and what it asks, "issues": [each issue/question raised, in ${langName}], "docs": [documents/data needed to reply, in ${langName}], "risk": "high"|"med"|"low"}
Use null for anything not in the notice — never guess numbers or dates.
${txt?`NOTICE TEXT:\n${txt.slice(0,16000)}`:"The notice is attached as image(s)."}`;
    try{const opts={modelTier:"default"};if(!txt.trim()&&canImg)opts.images=imgs.slice(0,4);
      let v=null;if(sampleCap.json)v=await sampleCap.json(prompt,opts);else{const r=await sampleCap(prompt,opts);const m=(r.text||"").match(/\{[\s\S]*\}/);v=m?JSON.parse(m[0]):null}
      if(v&&v.fields)ai=v}catch(e){}
  }
  return{txt,pw,locked,rx,ai,hasImg:imgs.length>0}}
function ntReview(files,ctx,res){
  const {rx,ai}=res;const f={},found={};
  NT_FIELDS.forEach(k=>{let v=ai&&ai.fields?ai.fields[k]:null;if(v!=null&&v!==""){found[k]=true;f[k]=["noticeDate","dueDate","hearing"].includes(k)?(inDate(v)||String(v)):k==="amount"?inNum(v):String(v)}else{f[k]=rx.f[k]||"";found[k]=!!f[k]}});
  if(ctx.form&&!f.form)f.form=ctx.form;
  const dept=ctx.dept||(ai&&ai.dept)||rx.dept||"other";
  let cid=ctx.clientId;const up=(res.txt||"").toUpperCase()+" "+String(f.gstin||"").toUpperCase();
  const hit=p=>(p.gsts||[]).some(g=>up.includes(g.gstin))||(p.pan&&up.includes(p.pan))||(p.cin&&up.includes(p.cin))||(p.name&&up.includes(p.name.toUpperCase().replace(/\s+(PRIVATE|PVT\.?)\s+(LIMITED|LTD\.?)$/,"")));
  if(!cid){const m=parties.find(hit);if(m)cid=m.id}const p=parties.find(x=>x.id===cid);
  const W=[],OK=[];
  if(res.locked)W.push(t("inW_locked"));if(!res.txt.trim()&&!ai)W.push(t("inW_scan"));
  if(p){if(hit(p))OK.push(t("inOk_client",{x:p.name}));else if(res.txt||ai)W.push(t("inW_client"))}
  if(!f.ref&&["it","tds","gst"].includes(dept))W.push(t("ntW_noDin"));
  const n=inDaysTo(f.dueDate);if(!f.dueDate)W.push(t("ntW_noDue"));else if(n<0)W.push(t("ntW_over",{d:fmt(f.dueDate)}));else if(n<=7)W.push(t("ntW_soon",{n}));
  const dup=f.ref?ntItems.find(r=>r.f.ref&&r.f.ref.replace(/\s/g,"").toUpperCase()===f.ref.replace(/\s/g,"").toUpperCase()):null;if(dup)W.push(t("ntW_dup",{x:dup.f.ref}));
  const summary=(ai&&ai.summary)||"",issues=(ai&&ai.issues)||[],docs=(ai&&ai.docs)||[];
  const dateK=new Set(["noticeDate","dueDate","hearing"]);
  openSheet(`<h3>📮 ${esc(t("ntD_"+dept))}${f.form?" · "+esc(f.form):""}</h3><div class="m">${esc(ai?t("inAiNote"):t("inRx"))}</div>
   ${W.map(w=>`<div class="warn" style="margin-top:6px">⚠ ${esc(w)}</div>`).join("")}${OK.map(w=>`<div class="note" style="margin-top:6px;background:var(--green-soft)">✔ ${esc(w)}</div>`).join("")}
   ${summary?`<h2>${esc(t("ntF_summary"))}</h2><div>${esc(summary)}</div>`:""}
   ${issues.length?`<h2>${esc(t("ntF_issues"))}</h2><ol style="margin:4px 0 0 20px;padding:0">${issues.map(x=>`<li>${esc(x)}</li>`).join("")}</ol>`:""}
   ${docs.length?`<h2>${esc(t("ntF_docs"))}</h2>${docs.map(x=>`<label class="chk" style="margin:3px 0"><input type="checkbox">${esc(x)}</label>`).join("")}`:""}
   <h2>${esc(t("ntCheck"))} <span class="m">${esc(t("inSum",{n:NT_FIELDS.filter(k=>found[k]).length,f:NT_FIELDS.length}))}</span></h2>
   <label>${esc(t("inClient"))}</label><select id="nrC"><option value="">${esc(t("inPick"))}</option>${parties.map(x=>`<option value="${x.id}" ${x.id===cid?"selected":""}>${esc(x.name)}</option>`).join("")}</select>
   <label>${esc(t("ntDept"))}</label><select id="nrD">${NT_DEPTS.map(d=>`<option value="${d}" ${d===dept?"selected":""}>${esc(t("ntD_"+d))}</option>`).join("")}</select>
   ${NT_FIELDS.map(k=>`<label>${esc(t("ntF_"+k))} ${found[k]?"<span style='color:var(--green)'>✔</span>":"<span style='color:var(--red)'>✖</span>"}</label><input class="nrF" data-k="${k}" ${dateK.has(k)?'type="date"':k==="amount"?'inputmode="numeric"':""} value="${esc(dateK.has(k)?(inDate(f[k])||""):(f[k]||""))}">`).join("")}
   <label>${esc(t("ntF_summary"))}</label><textarea id="nrS" rows="3">${esc(summary)}</textarea>
   <label>${esc(t("assignDef"))}</label><input id="nrA" value="${esc(p&&p.assignee||"")}">
   <div class="err" id="ferr"></div>
   <div class="actions"><button class="btn green" id="nrSave">${esc(t("ntSaveB"))}</button><button class="btn ghost" id="nrX">${esc(t("cancel"))}</button></div>`,{k:"ntrev"});
  $("#nrX").onclick=closeSheet;
  $("#nrSave").onclick=async()=>{const b=$("#nrSave");b.disabled=true;
    try{const vals={};document.querySelectorAll(".nrF").forEach(i=>vals[i.dataset.k]=i.value.trim());vals.summary=$("#nrS").value.trim();
      const cid2=$("#nrC").value,pp=parties.find(x=>x.id===cid2);const fl=[];
      if(assets)for(const file of files){const u=await assets.upload(file);const fr={id:u.id,name:file.name,hash:await fileHash(file)};if(res.pw){const e=await encPw(res.pw);if(e)fr.pwEnc=e}fl.push(fr)}
      const rec={dept:$("#nrD").value,clientId:cid2,client:pp?pp.name:"",f:vals,issues,docs,risk:(ai&&ai.risk)||"",found,warn:W,ai:!!ai,files:fl,text:(res.txt||"").slice(0,20000),status:"new",assignee:$("#nrA").value.trim(),draft:"",facts:"",log:[{k:"created",by:me.id||"local",at:Date.now()}],by:me.id||"local",at:Date.now()};
      const id=await ntSave(rec);await ntRemind(Object.assign({id},rec));toast(t("ntSaved"));openNtDetail(id)}
    catch(e){$("#ferr").textContent=t("saveFail");b.disabled=false}};
}
/* reply deadline (and hearing) become normal compliance entries → dashboard, lists, "my work", assignment */
function ntOpt(r,kind){const tag=String(r.f.ref||r.id).replace(/[^A-Za-z0-9]/g,"").slice(-14);
  return kind==="hearing"?{code:"NOTICE-H-"+String(r.dept).toUpperCase()+"-"+tag,name:"Notice hearing – "+(I18N.en["ntD_"+r.dept]||r.dept)+" "+(r.f.form||""),cat:NT_CAT[r.dept]||"other",freq:"once",period:"Hearing "+(r.f.hearing||""),due:r.f.hearing}
   :{code:"NOTICE-"+String(r.dept).toUpperCase()+"-"+tag,name:"Notice reply – "+(I18N.en["ntD_"+r.dept]||r.dept)+" "+(r.f.form||"")+(r.f.period?" ("+r.f.period+")":""),cat:NT_CAT[r.dept]||"other",freq:"once",period:"Notice "+(r.f.ref||r.f.noticeDate||""),due:r.f.dueDate}}
async function ntRemind(r){const p=parties.find(x=>x.id===r.clientId);if(!p)return;
  for(const k of ["reply","hearing"]){const o=ntOpt(r,k);if(!o.due)continue;const key=genKeyOf(p.id,o);let it=items.find(i=>i.genKey===key);
    if(it){if(it.dueDate!==o.due&&!isFiled(it)){it.dueDate=o.due;log(it,{k:"edited"});await saveItem(it)}}
    else{it=makeEntry(p,o,new Date().toISOString(),false,todayStr());it.assignee=r.assignee||it.assignee;it.notes=(r.f.summary||"").slice(0,300);await saveItem(it)}}}
async function ntMarkEntryDone(r,proof,kind){const p=parties.find(x=>x.id===r.clientId);if(!p)return;const o=ntOpt(r,kind||"reply");const it=items.find(i=>i.genKey===genKeyOf(p.id,o));
  if(it&&!isFiled(it)){it.status=proof?"filed_proof":"filed_noproof";it.filingDate=todayStr();if(r.ack)it.arn=r.ack;if(proof)it.proofs=[{id:proof.id,name:proof.name}];log(it,{k:"file",st:it.status});await saveItem(it)}}
function ntLog(r,k,extra){r.log=(r.log||[]).concat([Object.assign({k,by:me.id||"local",at:Date.now()},extra||{})])}
function openNtDetail(id){const r=ntItems.find(x=>x.id===id);if(!r){closeSheet();return}
  const st=r.status||"new",senior=canDo("approve");
  const kv=NT_FIELDS.filter(k=>r.f[k]).map(k=>`<div>${esc(t("ntF_"+k))}</div><div>${esc(["noticeDate","dueDate","hearing"].includes(k)?fmt(r.f[k]):k==="amount"?"₹"+Number(r.f[k]).toLocaleString("en-IN"):r.f[k])}</div>`).join("");
  openSheet(`<h3>📮 ${esc(t("ntD_"+r.dept))}${r.f.form?" · "+esc(r.f.form):""}</h3><div class="m">${esc(r.client||"")}</div>
   <div style="margin:6px 0">${ntDueBadge(r)} <span class="m">${esc(t("ntStatus"))}: ${esc(t("ntSt_"+st))}</span></div>
   ${r.f.summary?`<div class="note">${esc(r.f.summary)}</div>`:""}
   <div class="kv" style="margin-top:8px">${kv}${r.assignee?`<div>👤</div><div>${esc(r.assignee)}</div>`:""}${r.ack?`<div>${esc(t("ntAck"))}</div><div>${esc(r.ack)}</div>`:""}</div>
   ${(r.issues||[]).length?`<h2>${esc(t("ntF_issues"))}</h2><ol style="margin:4px 0 0 20px;padding:0">${r.issues.map(x=>`<li>${esc(x)}</li>`).join("")}</ol>`:""}
   ${(r.docs||[]).length?`<h2>${esc(t("ntF_docs"))}</h2>${r.docs.map(x=>`<label class="chk" style="margin:3px 0"><input type="checkbox">${esc(x)}</label>`).join("")}`:""}
   <div style="margin-top:8px">${(r.files||[]).map(fl=>`<div><a href="#" data-blob="${esc(fl.id)}" data-fname="${esc(fl.name)}">📎 ${esc(fl.name)}</a></div>`).join("")}${r.replyFile?`<div>📨 <a href="#" data-blob="${esc(r.replyFile.id)}" data-fname="${esc(r.replyFile.name)}">${esc(r.replyFile.name)}</a></div>`:""}</div>
   <div class="actions"><button class="btn ghost" id="ntHowB">${esc(t("ntHow"))}</button></div>
   <h2>${esc(t("ntDraft"))}</h2>
   ${canDo("file")&&NT_OPEN.has(st)?`<label>${esc(t("ntFacts"))}</label><textarea id="ntFa" rows="3" placeholder="${esc(t("ntFactsPh"))}">${esc(r.facts||"")}</textarea>
     <div class="actions" style="margin-top:6px"><button class="btn" id="ntDr">${esc(t("ntDraftB"))}</button></div>`:""}
   <textarea id="ntTx" rows="${r.draft?14:4}" style="margin-top:6px;font-family:inherit" ${canDo("file")&&NT_OPEN.has(st)?"":"readonly"}>${esc(r.draft||"")}</textarea>
   <div class="m">${esc(t("ntDraftNote"))}</div>
   <div class="actions" style="margin-top:6px"><button class="btn ghost" id="ntCp">${esc(t("ntCopy"))}</button><button class="btn ghost" id="ntDl">${esc(t("ntDl"))}</button>
     ${canDo("file")&&NT_OPEN.has(st)?`<button class="btn ghost" id="ntSv">${esc(t("ntSaveDraft"))}</button>`:""}
     ${canDo("file")&&!senior&&["new","work"].includes(st)?`<button class="btn" id="ntRv">${esc(t("ntSendRev"))}</button>`:""}
     ${senior&&["new","work","draft"].includes(st)&&r.draft?`<button class="btn green" id="ntAp">${esc(t("ntApprove"))}</button>`:""}</div>
   ${canDo("file")&&NT_OPEN.has(st)&&st!=="hearing"&&(senior||st==="ok")?`<h2>${esc(t("ntReplied"))}</h2><label>${esc(t("ntAck"))}</label><input id="ntAk" value="${esc(r.ack||"")}"><label>${esc(t("ntReplyFile"))}</label><input type="file" id="ntRf" accept="application/pdf,image/*">
     <label>${esc(t("ntHearingAdd"))}</label><input type="date" id="ntHd" value="${esc(r.f.hearing||"")}"><div class="actions"><button class="btn green" id="ntRp">${esc(t("ntReplied"))}</button></div>`:""}
   ${senior&&st!=="closed"?`<h2>${esc(t("ntClose"))}</h2><label>${esc(t("ntOrder"))}</label><input id="ntOr" value="${esc(r.order||"")}"><div class="actions"><button class="btn ghost" id="ntCl2">${esc(t("ntClose"))}</button><button class="btn ghost" id="ntAppeal">${esc(t("ntSt_appeal"))}</button></div>`:""}
   <h2>${esc(t("ntLog"))}</h2><div class="hist">${(r.log||[]).map(l=>`<div class="m">${esc(new Date(l.at).toLocaleString())} · ${esc(l.k)} · ${esc(l.by==="local"?t("you"):nm(l.by))}</div>`).join("")}</div>
   <div class="err" id="ferr"></div>
   <div class="actions">${canDo("delete")?`<button class="btn red" id="ntDel">${esc(t("inDel"))}</button>`:""}<button class="btn ghost" id="ntX">${esc(t("close"))}</button></div>`,{k:"ntdet",id});
  $("#ntX").onclick=closeSheet;
  $("#ntHowB").onclick=()=>openManual(r.dept==="it"||r.dept==="tds"?"NOTICE-IT":r.dept==="gst"?"NOTICE-GST":"NOTICE-GST");
  $("#ntCp").onclick=async()=>{try{await navigator.clipboard.writeText($("#ntTx").value);toast(t("vCopied"))}catch(e){toast(t("fErr"))}};
  $("#ntDl").onclick=async()=>{if(dlCap===undefined)dlCap=(window.claude&&claude.use)?await claude.use("downloads"):null;if(!dlCap){toast(t("fNoDl"));return}
    try{await dlCap.save({filename:("Reply_"+(r.client||"")+"_"+(r.f.form||"notice")).replace(/[^A-Za-z0-9_\-]+/g,"_").slice(0,80)+".txt",data:new Blob([$("#ntTx").value],{type:"text/plain"})});toast(t("fSaved"))}catch(e){toast(t("fErr"))}};
  const save=async(st2,k)=>{r.draft=$("#ntTx").value;const fa=$("#ntFa");if(fa)r.facts=fa.value;if(st2)r.status=st2;ntLog(r,k||"draft-saved");await ntSave(r);openNtDetail(r.id)};
  const sv=$("#ntSv");if(sv)sv.onclick=()=>save(r.status==="new"?"work":null,"draft-saved");
  const rv=$("#ntRv");if(rv)rv.onclick=()=>save("draft","sent-for-review");
  const ap=$("#ntAp");if(ap)ap.onclick=()=>save("ok","approved");
  const dr=$("#ntDr");if(dr)dr.onclick=()=>ntDraft(r);
  const rp=$("#ntRp");if(rp)rp.onclick=async()=>{rp.disabled=true;try{r.ack=$("#ntAk").value.trim();const f2=$("#ntRf").files[0];
      if(f2&&assets){const u=await assets.upload(f2);r.replyFile={id:u.id,name:f2.name}}
      r.draft=$("#ntTx").value;const hd=$("#ntHd").value;if(hd){r.f.hearing=hd;r.status="hearing"}else r.status="replied";
      ntLog(r,"replied",{ack:r.ack});await ntSave(r);await ntMarkEntryDone(r,r.replyFile,"reply");if(hd)await ntRemind(r);openNtDetail(r.id)}catch(e){$("#ferr").textContent=t("saveFail");rp.disabled=false}};
  const cl=$("#ntCl2");if(cl)cl.onclick=async()=>{r.order=$("#ntOr").value.trim();r.status="closed";ntLog(r,"closed",{order:r.order});await ntSave(r);await ntMarkEntryDone(r,null,"reply");if(r.f.hearing)await ntMarkEntryDone(r,null,"hearing");openNtDetail(r.id)};
  const apl=$("#ntAppeal");if(apl)apl.onclick=async()=>{r.order=$("#ntOr").value.trim();r.status="appeal";ntLog(r,"appeal",{order:r.order});await ntSave(r);openNtDetail(r.id)};
  const dl=$("#ntDel");if(dl)dl.onclick=async()=>{if(ntRef)await ntRef.doc(r.id).delete();else{ntItems=ntItems.filter(x=>x.id!==r.id);lset("compliance_nt_v1",ntItems);renderNt();ntBadge()}closeSheet()};
}
async function ntDraft(r){
  if(!sampleCap){$("#ferr").textContent=t("ntNoAi");return}
  const facts=$("#ntFa").value.trim();r.facts=facts;const out=$("#ntTx");const btn=$("#ntDr");btn.disabled=true;out.value=t("ntDrafting");out.rows=14;
  const p=parties.find(x=>x.id===r.clientId)||{};
  const prompt=`Draft a formal reply to an Indian ${I18N.en["ntD_"+r.dept]||r.dept} notice, for a CA firm to file on behalf of its client. Write the reply in English (as filed with the department), as a letter: To (officer/office from the notice), Subject with notice reference/DIN and period, opening reference to the notice, point-wise reply to each issue, list of enclosures, closing request (e.g. drop proceedings / accept reply / grant personal hearing if needed), signature block for the authorised signatory of the client.
Rules:
- Use ONLY facts from the notice text and the firm's facts below. Where a fact, figure or document is needed but not given, write [TO CONFIRM: ...] — never invent figures, dates, invoice numbers or case law.
- You may cite the section/rule only as it appears in the notice. Do not cite judgments.
- Keep a respectful, factual tone. No admissions of liability unless the firm's facts say so.
- After the letter, add a line "---" and then 3-5 short bullet notes in ${({hi:"simple Hindi (Devanagari)",en:"simple English",zh:"simple Chinese"})[lang]} for the junior: what to attach, what to double-check, and where to file the reply (portal path).
CLIENT: ${JSON.stringify({name:p.name||r.client,entity:p.entity,gstins:(p.gsts||[]).map(g=>g.gstin),pan:p.pan,cin:p.cin})}
NOTICE FIELDS: ${JSON.stringify(r.f)}
ISSUES: ${JSON.stringify(r.issues||[])}
FIRM'S FACTS / POSITION: ${facts||"(none given — mark all factual points as [TO CONFIRM])"}
NOTICE TEXT:\n${(r.text||"").slice(0,14000)||"(not available — use the fields above)"}`;
  try{const res=await sampleCap(prompt,{modelTier:"complex",onText:x=>{out.value=x.text}});out.value=res.text;r.draft=res.text;if(r.status==="new")r.status="work";ntLog(r,"draft-ai");await ntSave(r)}
  catch(e){out.value=r.draft||"";$("#ferr").textContent=e&&e.code==="not_granted"?"":t("luAskErr")}
  btn.disabled=false;
}
/* manuals for replying */
Object.assign(MANUAL,{
 "NOTICE-GST":{grp:"gst",p:GSTP,what:MS("GST नोटिस (ASMT-10, DRC-01A, DRC-01, REG-03/17 आदि) का जवाब देना।","Replying to GST notices (ASMT-10, DRC-01A, DRC-01, REG-03/17 etc.)."),when:MS("नोटिस में लिखी तारीख तक — आमतौर पर 15–30 दिन। ASMT-10 का जवाब ASMT-11 में।","By the date in the notice — usually 15–30 days. ASMT-10 is answered in ASMT-11."),
  docs:MS(["नोटिस की PDF","उस अवधि की GSTR-1, 3B, 2A/2B","इनवॉइस, क्रेडिट नोट, बही-खाते का मिलान","सीनियर से पास किया जवाब (PDF)"],["Notice PDF","GSTR-1, 3B, 2A/2B for the period","Invoices, credit notes, reconciliation","Senior-approved reply (PDF)"]),
  steps:MS(["GST पोर्टल पर लॉगिन → Services → User Services → View Notices and Orders।","नोटिस खोलें → 'Reply' (या Additional Notices and Orders टैब में Case details → Replies → Add)।","जवाब का टेक्स्ट डालें या PDF अटैच करें, सबूत अटैच करें (साइज़ सीमा देखें)।","पेमेंट करके मानना हो तो DRC-03 से पेमेंट करके उसका रेफ़रेंस दें।","DSC/EVC से सबमिट → अक्नॉलेजमेंट डाउनलोड करें।","ऐप में: 📨 जवाब दे दिया → अक्नॉलेजमेंट नंबर और PDF डालें।"],["Log in → Services → User Services → View Notices and Orders.","Open the notice → 'Reply' (or Additional Notices and Orders → Case details → Replies → Add).","Enter reply text or attach PDF, attach evidence (check size limits).","If accepting, pay via DRC-03 and quote the reference.","Submit with DSC/EVC → download the acknowledgment.","In the app: 📨 Reply submitted → enter ack number and PDF."]),
  mist:MS(["तारीख निकल जाना — एकतरफ़ा ऑर्डर आ सकता है","बिना मिलान के 'हम सहमत हैं' लिख देना","हियरिंग माँगनी हो तो जवाब में न लिखना"],["Missing the date — ex-parte order","Agreeing without reconciling","Not asking for a hearing when needed"]),late:MS("एकतरफ़ा डिमांड ऑर्डर, ब्याज, पेनल्टी।","Ex-parte demand order, interest, penalty."),proof:MS("जवाब का अक्नॉलेजमेंट और भेजा गया जवाब अपलोड करें।","Upload the reply acknowledgment and the reply sent.")},
 "NOTICE-IT":{grp:"it",p:ITP,what:MS("इनकम टैक्स / TDS नोटिस का ई-फ़ाइलिंग पोर्टल पर जवाब (e-Proceedings)।","Replying to income-tax / TDS notices on the e-filing portal (e-Proceedings)."),when:MS("नोटिस में लिखी तारीख तक। समय चाहिए तो पोर्टल से adjournment माँगें।","By the date in the notice. Seek adjournment on the portal if needed."),
  docs:MS(["नोटिस और उसका DIN","ITR, कम्प्यूटेशन, AIS/26AS","सवालों के हिसाब से बैंक स्टेटमेंट, इनवॉइस, कॉन्ट्रैक्ट","सीनियर से पास किया जवाब (PDF)"],["Notice and its DIN","ITR, computation, AIS/26AS","Bank statements, invoices, contracts as asked","Senior-approved reply (PDF)"]),
  steps:MS(["ई-फ़ाइलिंग पर लॉगिन → Pending Actions → e-Proceedings।","सही AY और नोटिस चुनें → 'Submit Response'।","पूरा/आंशिक जवाब चुनें, टेक्स्ट और PDF अटैच करें (साइज़ सीमा देखें)।","समय चाहिए तो 'Seek Adjournment'; हियरिंग चाहिए तो वीडियो-कॉन्फ़्रेंस का अनुरोध।","सबमिट → अक्नॉलेजमेंट डाउनलोड करें।","TDS डिफ़ॉल्ट/शॉर्ट-पेमेंट के लिए TRACES पर सुधार (correction) रिटर्न भी देखें।"],["Log in → Pending Actions → e-Proceedings.","Choose the AY and notice → 'Submit Response'.","Choose full/partial response, add text and PDFs (check size limits).","Need time: 'Seek Adjournment'; need a hearing: request video conference.","Submit → download the acknowledgment.","For TDS defaults, also check correction returns on TRACES."]),
  mist:MS(["DIN जाँचे बिना जवाब देना","आंशिक जवाब को पूरा मान लेना","सवालों के नंबर के हिसाब से जवाब न देना"],["Not checking DIN","Treating a partial response as complete","Not answering question-wise"]),late:MS("बेस्ट-जजमेंट असेसमेंट, पेनल्टी।","Best-judgment assessment, penalty."),proof:MS("अक्नॉलेजमेंट और भेजा गया जवाब अपलोड करें।","Upload the acknowledgment and the reply sent.")}
});
const _mnKeyOld=mnKey;mnKey=function(code){const c=(code||"").toUpperCase();if(/^NOTICE/.test(c))return/^NOTICE-(H-)?(IT|TDS)-/.test(c)?"NOTICE-IT":"NOTICE-GST";return _mnKeyOld(code)};
