/* ===== learning from questions: Claude proposes one-tap changes to the case, and app-improvement ideas are collected for the next update ===== */
Object.assign(I18N.hi,{fxT:"⚡ इस जवाब से ऐप ये कर सकता है",fxDo:"करें",fxDone:"✔ हो गया",fxAll:"सब करें",fxSug:"💡 ऐप में सुधार का सुझाव सेव हुआ",fxListT:"💡 ऐप सुधार के सुझाव (सवालों से)",fxListTxt:"टीम के सवालों से पता चला कि ऐप में ये चीज़ें जुड़नी या बदलनी चाहिए। ये सूची Claude को दिखाकर कहें \"सुझाव लागू करो\" — वो ऐप में जोड़ देगा।",fxNone:"अभी कोई सुझाव नहीं।",fxMark:"हो गया",fxOpen:"नया",fxClosed:"लागू",fxK_add_step:"केस में दर्ज करें",fxK_reminder:"रिमाइंडर बनाएँ",fxK_fix_field:"जानकारी ठीक करें",fxK_manual_tip:"मैनुअल में टिप जोड़ें",fxK_doc_needed:"ज़रूरी कागज़ की लिस्ट में जोड़ें"});
Object.assign(I18N.en,{fxT:"⚡ From this answer the app can",fxDo:"Do it",fxDone:"✔ Done",fxAll:"Do all",fxSug:"💡 App-improvement idea saved",fxListT:"💡 App improvement ideas (from questions)",fxListTxt:"Team questions showed these should be added or changed in the app. Show this list to Claude and say \"apply the suggestions\" — it will add them to the app.",fxNone:"No ideas yet.",fxMark:"Done",fxOpen:"New",fxClosed:"Applied",fxK_add_step:"Record in the case",fxK_reminder:"Create reminder",fxK_fix_field:"Correct a detail",fxK_manual_tip:"Add tip to the manual",fxK_doc_needed:"Add to documents needed"});
Object.keys(I18N.en).filter(k=>/^fx/.test(k)).forEach(k=>{if(!I18N.zh[k])I18N.zh[k]=I18N.en[k]});
const FX_RULE=`
After your answer, on a new line, add exactly one machine block (it is hidden from the user):
<<<APP {"actions":[...],"suggest":[...]}>>>
"actions": changes to THIS case the user may want right now, ONLY if your answer clearly implies them (max 4), each one of:
 {"kind":"reminder","date":"YYYY-MM-DD","what":"short English label"}  — a dated thing to do;
 {"kind":"add_step","type":one of ${JSON.stringify(CS_TYPES)},"date":"YYYY-MM-DD","ref":"...","note":"..."} — only if the user says something was already done;
 {"kind":"fix_field","field":one of ${JSON.stringify(NT_FIELDS)},"value":"..."} — only if the case data is clearly wrong (e.g. a reply date that is really an old ITR due date);
 {"kind":"doc_needed","text":"..."} — a paper that should be collected;
 {"kind":"manual_tip","manual":one of ${JSON.stringify(Object.keys(MANUAL))},"text":"one practical tip worth keeping for juniors"}.
"suggest": ideas to improve the APP itself that this question revealed (a missing feature, screen, field, rule or manual), max 2, each {"area":"notices|manuals|insurance|compliances|team|other","text":"one sentence in English"}. Use [] when nothing.
Never put dates or amounts in actions that are not supported by the case data or your answer.`;
function fxParse(text){const m=String(text||"").match(/<<<APP\s*([\s\S]*?)>>>/);let data={actions:[],suggest:[]};if(m){try{const v=JSON.parse(m[1]);data.actions=Array.isArray(v.actions)?v.actions.slice(0,4):[];data.suggest=Array.isArray(v.suggest)?v.suggest.slice(0,2):[]}catch(e){}}
  return{clean:String(text||"").replace(/<<<APP[\s\S]*?(>>>|$)/,"").trim(),data}}
function fxLabel(a){const d=a.date?fmt(a.date):"";
  if(a.kind==="reminder")return`⏰ ${a.what||""} — ${d}`;if(a.kind==="add_step")return`🗂 ${t("cs_"+a.type)}${d?" · "+d:""}${a.ref?" · "+a.ref:""}`;
  if(a.kind==="fix_field")return`✏ ${t("ntF_"+a.field)} → ${a.field&&/date|hearing/i.test(a.field)?fmt(a.value):a.value}`;if(a.kind==="doc_needed")return`📎 ${a.text}`;if(a.kind==="manual_tip")return`📘 ${mnName(a.manual)}: ${a.text}`;return JSON.stringify(a)}
function fxValid(a){if(!a||!a.kind)return false;const dOk=v=>/^\d{4}-\d{2}-\d{2}$/.test(v||"");
  if(a.kind==="reminder")return dOk(a.date)&&!!a.what;if(a.kind==="add_step")return CS_TYPES.includes(a.type);if(a.kind==="fix_field")return NT_FIELDS.includes(a.field)&&a.value!=null&&a.value!=="";
  if(a.kind==="doc_needed")return!!a.text;if(a.kind==="manual_tip")return!!MANUAL[a.manual]&&!!a.text;return false}
async function fxApply(r,a){
  if(a.kind==="reminder"){await csReminder(r,{next:a.date,nextWhat:a.what,note:""},"q"+Date.now().toString(36))}
  else if(a.kind==="add_step"){await c2Apply(r,{type:a.type,date:inDate(a.date)||todayStr(),ref:a.ref||"",amount:"",note:a.note||"",next:"",nextWhat:"",by:me.id||"local",at:Date.now()})}
  else if(a.kind==="fix_field"){const old=JSON.parse(JSON.stringify(r));r.f[a.field]=["noticeDate","dueDate","hearing"].includes(a.field)?(inDate(a.value)||a.value):String(a.value);ntLog(r,"edited:"+a.field);await ntSave(r);
    if(a.field==="dueDate"||a.field==="hearing"){const p=parties.find(x=>x.id===r.clientId);if(p){const k=a.field==="dueDate"?"reply":"hearing";const it=items.find(i=>i.genKey===genKeyOf(p.id,ntOpt(old,k)));if(it&&!isFiled(it)){if(r.status==="appeal"||r.status==="closed"){it.status="filed_noproof";it.filingDate=todayStr()}else it.dueDate=r.f[a.field];log(it,{k:"edited"});await saveItem(it)}}}}
  else if(a.kind==="doc_needed"){r.docs=(r.docs||[]).concat([a.text]);await ntSave(r)}
  else if(a.kind==="manual_tip"){await mnAddNote(a.manual,a.text)}
}
let fxRef=null,fxItems=[];
function fxInit(db){if(db){fxRef=db.collection("app_feedback");fxRef.onSnapshot(s=>{fxItems=s.docs.map(d=>Object.assign({id:d.id},d.data()));if(!$("#team").hidden)renderTeam()},()=>{})}else fxItems=lget("compliance_fx_v1","[]")}
async function fxSaveSuggest(list,ctx){for(const s of list||[]){if(!s||!s.text)continue;if(fxItems.some(x=>x.text===s.text))continue;const rec={area:s.area||"other",text:String(s.text).slice(0,400),from:ctx||"",by:me.id||"local",at:Date.now(),status:"new"};
  if(fxRef)await fxRef.add(rec).catch(()=>{});else{rec.id="fx"+Date.now();fxItems.push(rec);lset("compliance_fx_v1",fxItems)}}}
function fxListHtml(admin){if(!admin)return"";const L2=fxItems.slice().sort((a,b)=>(a.status==="done")-(b.status==="done")||b.at-a.at);
  return `<div class="grp" style="padding:14px"><h3 style="margin-top:0">${esc(t("fxListT"))}</h3><div class="m">${esc(t("fxListTxt"))}</div>
   ${L2.map(x=>`<div class="item" style="cursor:default"><div class="main"><div class="t">${esc(x.text)}</div><div class="m">${esc(x.area)} · ${esc(x.from||"")} · ${esc(new Date(x.at).toLocaleDateString())}</div></div>${x.status==="done"?`<span class="badge b-filed_proof">${esc(t("fxClosed"))}</span>`:`<button class="btn ghost fxMk" data-id="${esc(x.id)}">${esc(t("fxMark"))}</button>`}</div>`).join("")||`<div class="m">${esc(t("fxNone"))}</div>`}</div>`}
function fxListWire(){document.querySelectorAll(".fxMk").forEach(b=>b.onclick=async()=>{const x=fxItems.find(y=>y.id===b.dataset.id);if(!x)return;x.status="done";
  if(fxRef){const d=Object.assign({},x);delete d.id;await fxRef.doc(x.id).set(d)}else lset("compliance_fx_v1",fxItems);renderTeam()})}
function fxHtml(c,i){const acts=(c.acts||[]).filter(fxValid);if(!acts.length&&!(c.sug||[]).length)return"";
  return `${acts.length?`<div class="note" style="margin-top:4px;background:#fff8e6"><b>${esc(t("fxT"))}</b>${acts.map((a,j)=>`<div style="display:flex;gap:6px;align-items:center;margin-top:5px"><span style="flex:1">${esc(fxLabel(a))}</span>${a.done?`<span class="badge b-filed_proof">${esc(t("fxDone"))}</span>`:canDo("file")?`<button class="btn ghost fxDo" data-i="${i}" data-j="${j}" style="padding:4px 10px">${esc(t("fxDo"))}</button>`:""}</div>`).join("")}
   ${canDo("file")&&acts.filter(a=>!a.done).length>1?`<div class="actions" style="margin-top:6px"><button class="btn fxAll" data-i="${i}" style="padding:5px 12px">${esc(t("fxAll"))}</button></div>`:""}</div>`:""}
   ${(c.sug||[]).length?`<div class="m" style="margin-top:3px">${esc(t("fxSug"))}: ${esc(c.sug.map(s=>s.text).join(" · "))}</div>`:""}`}
function fxWire(r){
  const run=async(i,js)=>{const c=r.chat[i];const acts=(c.acts||[]).filter(fxValid);for(const j of js){const a=acts[j];if(!a||a.done)continue;try{await fxApply(r,a);a.done=true}catch(e){}}c.acts=acts;await ntSave(r);openNtDetail(r.id)};
  document.querySelectorAll(".fxDo").forEach(b=>b.onclick=()=>{b.disabled=true;run(+b.dataset.i,[+b.dataset.j])});
  document.querySelectorAll(".fxAll").forEach(b=>b.onclick=()=>{b.disabled=true;const c=r.chat[+b.dataset.i];run(+b.dataset.i,(c.acts||[]).filter(fxValid).map((a,j)=>j))});
}
