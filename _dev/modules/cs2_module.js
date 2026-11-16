/* ===== case step v2: attach a paper or write a line → the app reads it, works out what happened, records it, and says what to do next ===== */
Object.assign(I18N.hi,{c2Auto:"— ऐप ख़ुद पहचाने (कागज़ / नोट पढ़कर) —",c2Hint:"बस कागज़ डालें या एक लाइन लिखें (जैसे \"Form 35 से अपील कर दी\") — ऐप पढ़कर बाकी ख़ुद भर देगा।",c2Read:"📄 पढ़ रहा है…",c2Found:"📄 ऐप ने पढ़ा",c2Means:"इसका मतलब",c2Will:"ऐसे दर्ज होगा",c2Check:"ऊपर जो भरा है एक बार देख लें, फिर दर्ज करें।",c2NoRead:"कागज़ से कुछ पढ़ा नहीं जा सका — नीचे ख़ुद चुनें।",c2DoneT:"✔ दर्ज हो गया — अब आगे ये करें",c2Done:"ठीक है",c2Changed:"केस में बदला",c2Closed:"पुराने रिमाइंडर बंद किए: {n}",c2NewRem:"नया रिमाइंडर: {w} — {d}",c2Stage:"केस अब: {s}",c2Fix:"⚠ ये कदम पहले '{a}' के रूप में दर्ज था — कागज़ पढ़कर '{b}' किया गया।"});
Object.assign(I18N.en,{c2Auto:"— let the app detect (reads the paper / note) —",c2Hint:"Just attach the paper or write one line (e.g. \"appeal filed in Form 35\") — the app reads it and fills the rest.",c2Read:"📄 Reading…",c2Found:"📄 The app read",c2Means:"What it means",c2Will:"Will be recorded as",c2Check:"Check what is filled above, then record.",c2NoRead:"Nothing could be read from the paper — choose below.",c2DoneT:"✔ Recorded — now do this next",c2Done:"OK",c2Changed:"Changed in the case",c2Closed:"Old reminders closed: {n}",c2NewRem:"New reminder: {w} — {d}",c2Stage:"Case is now: {s}",c2Fix:"⚠ This step was recorded as '{a}' — after reading the paper it is now '{b}'."});
Object.keys(I18N.en).filter(k=>/^c2/.test(k)).forEach(k=>{if(!I18N.zh[k])I18N.zh[k]=I18N.en[k]});
const C2_MON={jan:1,feb:2,mar:3,apr:4,may:5,jun:6,jul:7,aug:8,sep:9,oct:10,nov:11,dec:12};
function c2Date(s){if(!s)return"";let m=String(s).match(/(\d{1,2})[-\/\. ]([A-Za-z]{3})[A-Za-z]*[-\/\. ,]+(\d{4})/);if(m&&C2_MON[m[2].toLowerCase()])return`${m[3]}-${p2(C2_MON[m[2].toLowerCase()])}-${p2(+m[1])}`;return inDate(s)}
/* rule-based reading of common acknowledgments / orders (works without Claude) */
function c2Detect(txt,note){const T=(txt||"").replace(/\s+/g," "),N=(note||"").toLowerCase(),out={why:[]};
  const g=re=>{const m=T.match(re);return m?m[1]:""};
  const ackNo=g(/Acknowledgement Number[^0-9]{0,60}(\d{12,18})/i)||g(/\b(\d{15})\b/);
  const ackDate=c2Date(g(/Date of e-?Filing[^0-9]{0,40}?(\d{1,2}[-\/ ][A-Za-z]{3}[-\/ ]\d{4}|\d{1,2}[-\/\.]\d{1,2}[-\/\.]\d{4})/i))||c2Date(g(/(\d{1,2}-[A-Za-z]{3}-\d{4})/));
  const form=g(/Form No\.?\s*:?\s*(Form\s*\d+[A-Z]?)/i);
  const set=(type,why)=>{if(!out.type){out.type=type;out.why.push(why)}};
  if(/Form\s*35\b/i.test(form)||/Form No\.?\s*:?\s*Form 35/i.test(T)){set("appeal_filed",bt("ये Form 35 (CIT(A) में अपील) की पावती है","This is the Form 35 (appeal to CIT(A)) acknowledgment"))}
  else if(/Form\s*36\b/i.test(form)||/Appellate Tribunal/i.test(T)&&/Form\s*36/i.test(T))set("next_appeal",bt("ये Form 36 (ITAT में अपील) है","This is Form 36 (appeal to ITAT)"));
  else if(/\bAPL-01\b/i.test(T))set("appeal_filed",bt("ये GST अपील APL-01 है","This is GST appeal APL-01"));
  else if(/\bAPL-02\b/i.test(T))set("appeal_admitted",bt("ये APL-02 — अपील दर्ज होने की पावती है","This is APL-02 — appeal acknowledgment"));
  else if(/\bAPL-04\b/i.test(T)||/order\s*(u\/s|under section)\s*250/i.test(T))set("app_order",bt("ये अपील का फ़ैसला (ऑर्डर) है","This is the appeal order"));
  else if(/notice\s*(u\/s|under section)\s*250|National Faceless Appeal Centre/i.test(T)&&/hearing|notice/i.test(T))set("app_notice",bt("ये अपील (NFAC/CIT(A)) का नोटिस है","This is an appeal (NFAC/CIT(A)) notice"));
  else if(/Response to Outstanding Demand|disagree with (the )?demand/i.test(T))set("demand_resp",bt("ये डिमांड के जवाब की पावती है","This is the outstanding-demand response"));
  else if(/220\s*\(6\)|stay of demand/i.test(T))set(/granted|is hereby stayed|stay is granted/i.test(T)?"stay_granted":"stay_applied",bt("ये डिमांड पर स्टे से जुड़ा कागज़ है","This relates to stay of demand"));
  else if(/Challan|\bCIN\b|BSR Code|DRC-03/i.test(T))set("paid",bt("ये पेमेंट का चालान है","This is a payment challan"));
  else if(/e-?Proceeding|Submission of response|response submitted/i.test(T))set("sub_filed",bt("ये जवाब जमा करने की पावती है","This is a submission acknowledgment"));
  /* the note */
  if(!out.type){if(/form\s*35|appeal|apeal|apil|अपील|cit\s*\(?a\)?/i.test(N))set(/admit|accept|pending|open|दर्ज|स्वीकार/i.test(N)?"appeal_admitted":"appeal_filed",bt("नोट में अपील लिखा है","The note mentions an appeal"));
    else if(/stay|स्टे|रोक/i.test(N))set("stay_applied",bt("नोट में स्टे लिखा है","The note mentions stay"));
    else if(/paid|payment|challan|पेमेंट|भुगतान/i.test(N))set("paid",bt("नोट में पेमेंट लिखा है","The note mentions payment"));
    else if(/hearing|सुनवाई/i.test(N))set("app_notice",bt("नोट में सुनवाई लिखी है","The note mentions a hearing"));
    else if(/order|फ़ैसला|फैसला|आदेश/i.test(N))set("app_order",bt("नोट में ऑर्डर लिखा है","The note mentions an order"));
    else if(/reply|जवाब/i.test(N))set("reply_filed",bt("नोट में जवाब लिखा है","The note mentions a reply"))}
  out.ref=ackNo||g(/\b(AA\d{12}[0-9A-Z])\b/)||g(/\bCIN\s*[:\-]?\s*([0-9A-Z]{15,22})/i)||"";
  out.date=ackDate||"";
  const am=g(/(?:Amount|Total)\s*(?:\(Rs\.?\)|Rs\.?|₹|INR)?\s*[:\-]?\s*([\d,]{3,}(?:\.\d+)?)/i);if(out.type==="paid"&&am)out.amount=inNum(am);
  const ay=g(/Assessment Year\s*:?\s*(20\d{2}-\d{2})/i);if(ay)out.ay=ay;
  const hd=g(/(?:date of hearing|hearing (?:is )?(?:fixed|scheduled) on|on or before)\D{0,20}(\d{1,2}[-\/\.](?:\d{1,2}|[A-Za-z]{3})[-\/\.]\d{4})/i);if(hd){out.next=c2Date(hd);out.nextWhat=out.type==="app_notice"?"Reply / hearing in appeal":"Next date"}
  return out}
async function c2Read(file,note,r){let txt="";
  if(file&&(/pdf$/i.test(file.type)||/\.pdf$/i.test(file.name))){try{const x=await pdfTry(file,await clientPws(r.clientId));txt=x.txt||""}catch(e){}}
  let d=c2Detect(txt,note);
  if(sampleCap&&(txt.trim().length>40||note||(file&&!/pdf/i.test(file.type)))){
    const prompt=`A junior at an Indian CA firm is recording a step in a tax/regulatory case. Read the attached document text (and/or image) and the junior's note, and work out what happened.
Return ONLY JSON: {"type": one of ${JSON.stringify(CS_TYPES)}, "date": "YYYY-MM-DD" (date of the event, e.g. date of e-filing), "ref": acknowledgment/ARN/appeal/challan number or null, "amount": number or null, "next": "YYYY-MM-DD" of any next date the document fixes (hearing/reply/payment) or null, "nextWhat": short English label for that next date or null, "explain": 1-2 sentences in ${({hi:"simple Hindi (Devanagari)",en:"simple English",zh:"simple Chinese"})[lang]} saying what this document is and what it means for the case}
Never guess numbers or dates that are not written. CASE: ${JSON.stringify({dept:r.dept,period:r.f.period,notice:r.f.form,amount:r.f.amount,status:r.status})}
JUNIOR'S NOTE: ${note||"(none)"}
${txt?"DOCUMENT TEXT:\n"+txt.slice(0,9000):""}`;
    try{const opts={modelTier:"default"};if(!txt&&file&&/^image\//.test(file.type)&&await erImgOk())opts.images=[file];
      let v=null;if(sampleCap.json)v=await sampleCap.json(prompt,opts);else{const x=await sampleCap(prompt,opts);const m=(x.text||"").match(/\{[\s\S]*\}/);v=m?JSON.parse(m[0]):null}
      if(v&&CS_TYPES.includes(v.type)){d=Object.assign({},d,{type:v.type,date:inDate(v.date)||d.date,ref:v.ref||d.ref,amount:v.amount?inNum(v.amount):d.amount,next:inDate(v.next)||d.next,nextWhat:v.nextWhat||d.nextWhat,explain:v.explain||"",ai:true})}}catch(e){}}
  return{d,txt}}
function csAddForm(r){
  openSheet(`<h3>${esc(t("csAdd"))}</h3><div class="m">${esc(r.client||"")} · ${esc(t("ntD_"+r.dept))} ${esc(r.f.period||"")}</div>
   <div class="note" style="margin-top:6px">${esc(t("c2Hint"))}</div>
   <label>${esc(t("csFile"))}</label><input type="file" id="csFi" accept="application/pdf,image/*">
   <label>${esc(t("csNote"))}</label><textarea id="csNo" rows="2"></textarea>
   <div id="c2Box"></div>
   <label>${esc(t("csType"))}</label><select id="csTy"><option value="">${esc(t("c2Auto"))}</option>${CS_TYPES.map(k=>`<option value="${k}">${esc(t("cs_"+k))}</option>`).join("")}</select>
   <label>${esc(t("csDate"))}</label><input type="date" id="csDt" value="${todayStr()}">
   <label>${esc(t("csRef"))}</label><input id="csRf"><label>${esc(t("csAmt"))}</label><input id="csAm" inputmode="numeric">
   <label>${esc(t("csNext"))}</label><div class="row2"><div><input type="date" id="csNx"></div><div><input id="csNw" placeholder="${esc(t("csNextWhat"))}"></div></div>
   <div class="err" id="ferr"></div><div class="actions"><button class="btn green" id="csSv">${esc(t("csSave"))}</button><button class="btn ghost" id="csX">${esc(t("cancel"))}</button></div>`,{k:"csadd",id:r.id});
  $("#csX").onclick=()=>openNtDetail(r.id);
  let detected=null,busy=null,touched=new Set();
  ["csTy","csDt","csRf","csAm","csNx","csNw"].forEach(id=>$("#"+id).addEventListener("input",()=>touched.add(id)));
  const fill=(id,v)=>{if(v&&!touched.has(id))$("#"+id).value=v};
  const run=async()=>{const f=$("#csFi").files[0],note=$("#csNo").value.trim();if(!f&&!note)return;const box=$("#c2Box");box.innerHTML=`<div class="m">${esc(t("c2Read"))}</div>`;
    const p=c2Read(f,note,r);busy=p;const {d}=await p;if(busy!==p)return;detected=d;
    if(!d.type){box.innerHTML=`<div class="warn">${esc(t("c2NoRead"))}</div>`;return}
    fill("csTy",d.type);fill("csDt",d.date);fill("csRf",d.ref);fill("csAm",d.amount);fill("csNx",d.next);fill("csNw",d.nextWhat);
    box.innerHTML=`<div class="note" style="background:var(--green-soft);margin-top:8px"><b>${esc(t("c2Found"))}</b>${d.why.length?"<br>"+esc(d.why.join(" · ")):""}${d.explain?`<br><b>${esc(t("c2Means"))}:</b> ${esc(d.explain)}`:""}
      <br><b>${esc(t("c2Will"))}:</b> ${esc(t("cs_"+d.type))}${d.date?" · "+esc(fmt(d.date)):""}${d.ref?" · "+esc(d.ref):""}${d.amount?" · ₹"+esc(Number(d.amount).toLocaleString("en-IN")):""}<div class="m">${esc(t("c2Check"))}</div></div>`};
  $("#csFi").onchange=run;let tm;$("#csNo").oninput=()=>{clearTimeout(tm);if(!$("#csFi").files[0])tm=setTimeout(run,700)};
  $("#csSv").onclick=async()=>{const b=$("#csSv");b.disabled=true;try{
    if(busy)await busy;
    const ty=$("#csTy").value||(detected&&detected.type)||"other";
    const step={type:ty,date:$("#csDt").value,ref:$("#csRf").value.trim(),amount:inNum($("#csAm").value),note:$("#csNo").value.trim(),next:$("#csNx").value,nextWhat:$("#csNw").value.trim()||t("cs_"+ty).replace(/^\S+\s/,""),by:me.id||"local",at:Date.now()};
    if(detected&&detected.explain)step.explain=detected.explain;
    const f=$("#csFi").files[0];if(f&&assets){const u=await assets.upload(f);step.file={id:u.id,name:f.name}}
    const res=await c2Apply(r,step);openC2Done(r,res)}
    catch(e){$("#ferr").textContent=t("saveFail");b.disabled=false}};
}
/* apply a step: update stage/status, close reminders that no longer apply, create the next reminder */
async function c2Apply(r,step,replaceAt){const before=csStage(r),res={closed:0,rem:null,changes:[]};
  if(replaceAt)r.steps=(r.steps||[]).map(x=>x.at===replaceAt?step:x);else r.steps=(r.steps||[]).concat([step]);
  const cnt=()=>items.filter(i=>!isFiled(i)).length,c0=cnt();
  if(["appeal_filed","appeal_admitted","next_appeal","app_notice","sub_filed","stay_applied","stay_granted","demand_resp"].includes(step.type)&&r.status!=="closed"){
    if(r.status!=="appeal"){r.status="appeal";res.changes.push(t("ntStatus")+": "+t("ntSt_appeal"))}
    if(["appeal_filed","appeal_admitted"].includes(step.type)&&step.ref&&!r.appealRef){r.appealRef=step.ref;res.changes.push(t("csRef")+": "+step.ref)}
    await csCloseOld(r,"appeal on record")}
  else if(step.type==="reply_filed"&&NT_OPEN.has(r.status)&&r.status!=="appeal"){r.status="replied";if(step.ref)r.ack=step.ref;await ntMarkEntryDone(r,step.file,"reply");res.changes.push(t("ntStatus")+": "+t("ntSt_replied"))}
  res.closed=Math.max(0,c0-cnt());
  /* if this answers an earlier reminder for the same kind of date, close it */
  const p=parties.find(x=>x.id===r.clientId);
  if(p&&["sub_filed","adjourn","hearing_att"].includes(step.type)){const tag=String(r.f.ref||r.id).replace(/[^A-Za-z0-9]/g,"").slice(-14);
    for(const it of items.filter(i=>i.clientId===p.id&&String(i.code||"").startsWith("NOTICE-S-"+String(r.dept).toUpperCase()+"-"+tag)&&!isFiled(i)&&i.dueDate<=(step.date||todayStr()))){it.status=step.file?"filed_proof":"filed_noproof";it.filingDate=step.date||todayStr();if(step.file)it.proofs=[step.file];log(it,{k:"file",st:it.status});await saveItem(it);res.closed++}}
  ntLog(r,"step:"+step.type,{ref:step.ref});await ntSave(r);
  if(step.next){await csReminder(r,step,(r.steps||[]).length);res.rem={w:step.nextWhat,d:step.next}}
  const after=csStage(r);if(after!==before)res.changes.push(t("c2Stage",{s:t("csSt_"+after)}));
  return res}
function openC2Done(r,res){const nx=csNextSteps(r);
  openSheet(`<h3>${esc(t("c2DoneT"))}</h3><div class="m">${esc(r.client||"")} · ${esc(r.f.period||"")}</div>
   ${res.changes.length||res.closed||res.rem?`<h2>${esc(t("c2Changed"))}</h2><ul style="margin:4px 0 0 20px;padding:0">${res.changes.map(x=>`<li>${esc(x)}</li>`).join("")}${res.closed?`<li>${esc(t("c2Closed",{n:res.closed}))}</li>`:""}${res.rem?`<li>${esc(t("c2NewRem",{w:res.rem.w,d:fmt(res.rem.d)}))}</li>`:""}</ul>`:""}
   <h2>${esc(t("csNextT"))}</h2><ol style="margin:4px 0 0 20px;padding:0">${nx.map(x=>`<li style="margin-bottom:6px">${esc(x)}</li>`).join("")}</ol>
   <div class="actions"><button class="btn" id="c2Ok">${esc(t("c2Done"))}</button></div>`,{k:"c2done",id:r.id});
  $("#c2Ok").onclick=()=>openNtDetail(r.id)}
/* steps saved before the app could read papers: re-read the attached paper and correct the step (seniors) */
async function c2Recheck(r,at){const st=(r.steps||[]).find(x=>x.at===at);if(!st||!st.file)return;
  let blob;try{blob=await blobGet(st.file.id)}catch(e){toast(t("fErr"));return}
  const file=new File([blob],st.file.name,{type:blob.type||"application/pdf"});const {d}=await c2Read(file,st.note,r);
  if(!d.type){toast(t("c2NoRead"));return}
  const old=st.type;const ns=Object.assign({},st,{type:d.type,date:d.date||st.date,ref:st.ref||d.ref,amount:st.amount||d.amount,next:st.next||d.next,nextWhat:st.next?st.nextWhat:(d.nextWhat||st.nextWhat),explain:d.explain||st.explain});
  const res=await c2Apply(r,ns,at);if(old!==ns.type)res.changes.unshift(t("c2Fix",{a:t("cs_"+old),b:t("cs_"+ns.type)}));openC2Done(r,res)}
