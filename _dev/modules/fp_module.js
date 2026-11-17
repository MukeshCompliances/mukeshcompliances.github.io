/* ===== fp: financial statement parts — each part (Balance Sheet, P&L, notes, cash flow, audit report, directors' report, tax audit)
   has its own box with ✅ / ⏳; one combined PDF is split by its headings; BS ↔ P&L ↔ notes cross-check runs as soon as the parts are in;
   the FS entry counts as done only when every part is in. Also: "what's new" card shown once per person. ===== */
NO_ARN.add("FS");
const FP_PARTS=[
 ["bs",["बैलेंस शीट","Balance Sheet"],/balance\s*sheet\s*as\s*(at|on)|statement\s*of\s*assets\s*(and|&)\s*liabilities/i,()=>true],
 ["pl",["प्रॉफ़िट एंड लॉस (P&L)","Profit & Loss"],/statement\s*of\s*profit\s*(and|&)\s*loss|profit\s*(and|&)\s*loss\s*(account|statement)\s*for/i,()=>true],
 ["notes",["नोट्स और शेड्यूल","Notes & schedules"],/notes\s*(forming\s*part|to\s*(the\s*)?(standalone\s*)?financial\s*statements|on\s*(the\s*)?accounts)|significant\s*accounting\s*policies/i,()=>true],
 ["cf",["कैश फ़्लो","Cash flow"],/cash\s*flow\s*statement|statement\s*of\s*cash\s*flows?/i,p=>isCo(p.entity)],
 ["ar",["ऑडिट रिपोर्ट (कंपनी हो तो CARO सहित)","Audit report (with CARO for companies)"],/independent\s*auditor'?s?\s*report|companies\s*\(auditor'?s?\s*report\)\s*order/i,p=>isCo(p.entity)||p.entity==="llp"||!!p.audit],
 ["dr",["डायरेक्टर्स रिपोर्ट","Directors' report"],/(directors'?|board'?s?)\s*report/i,p=>isCo(p.entity)],
 ["tar",["टैक्स ऑडिट रिपोर्ट (3CA/3CB + 3CD)","Tax audit report (3CA/3CB + 3CD)"],/form\s*no\.?\s*3\s*c\s*[abd]\b/i,p=>!!p.audit]];
const fpParty=i=>parties.find(x=>x.id===i.clientId)||{};
const fpList=i=>FP_PARTS.filter(x=>x[3](fpParty(i)));
const fpName=k=>{const x=FP_PARTS.find(z=>z[0]===k);return x?bt(x[1][0],x[1][1]):k};
const fpDone=i=>fpList(i).filter(x=>i.fp&&i.fp[x[0]]).length;
/* text of each page; top = the first lines, where the heading sits */
async function fpPages(file,clientId){const buf=new Uint8Array(await file.arrayBuffer());let doc=null;
  try{doc=await pdfDoc(buf.slice())}catch(e){if(e&&e.needPw){for(const pw of await clientPws(clientId)){try{doc=await pdfDoc(buf.slice(),pw);break}catch(x){}}}else throw e}
  if(!doc)throw{needPw:true};const out=[];
  for(let n=1;n<=Math.min(doc.numPages,150);n++){const c=await(await doc.getPage(n)).getTextContent();const rows=new Map();
    c.items.forEach(it=>{if(!it.str||!it.str.trim())return;const y=Math.round(it.transform[5]/3);const r=rows.get(y)||[];r.push([it.transform[4],it.str]);rows.set(y,r)});
    const lines=[...rows.entries()].sort((a,b)=>b[0]-a[0]).map(([,r])=>r.sort((a,b)=>a[0]-b[0]).map(x=>x[1]).join(" ").replace(/\s+/g," ").trim()).filter(Boolean);
    out.push({n,top:lines.slice(0,8).join(" "),text:lines.join("\n")})}
  return out}
/* which part each page belongs to: a heading near the top starts a part; following pages continue it */
function fpSplit(pages,keys){const res={};let cur=null;
  pages.forEach(pg=>{const hit=FP_PARTS.filter(x=>keys.includes(x[0])).find(x=>x[2].test(pg.top));if(hit)cur=hit[0];
    if(!cur)return;const r=res[cur]||(res[cur]={from:pg.n,to:pg.n,text:""});if(pg.n>r.to+1&&hit){r.to=pg.n}else r.to=Math.max(r.to,pg.n);r.text+=pg.text+"\n"});
  return res}
const fpRange=r=>r.from===r.to?bt("पन्ना ","page ")+r.from:bt("पन्ने ","pages ")+r.from+"–"+r.to;
const fpUnit=T=>{const m=String(T||"").match(/in\s*(?:₹|rs\.?|inr|rupees)?\s*(lakhs?|lacs?|thousands?|crores?|millions?|hundreds?)\b/i);return m?m[1].toLowerCase().replace(/lacs?|lakhs/,"lakh").replace(/s$/,""):""};
/* cross-check between the parts that are in */
function fpCross(i){const fp=i.fp||{},keys=fpList(i).map(x=>x[0]),R=[],B=bt;
  const have=k=>fp[k]&&fp[k].text;const miss=ks=>ks.filter(k=>keys.includes(k)&&!fp[k]).map(fpName).join(", ");
  if(!have("bs")||!have("pl")){const m=miss(["bs","pl"]);R.push({s:"wait",n:m?B("जाँच अधूरी — बाक़ी: ","Check incomplete — still missing: ")+m:B("जाँच अधूरी — फ़ाइल से लिखावट नहीं पढ़ी जा सकी (स्कैन?)","Check incomplete — the text could not be read (scan?)")});}
  const fy=pinfo(i).fy;
  ["bs","pl","notes","cf"].filter(have).forEach(k=>{const f=periodFacts(fp[k].text).fyAll;if(f.length&&!f.includes(fy))R.push({s:"f",n:fpName(k)+B(": साल अलग है — ",": different year — ")+f.map(fyl).join(", ")+B(" (एंट्री "," (entry ")+fyl(fy)+")"})});
  const us=["bs","pl","notes"].filter(have).map(k=>[k,fpUnit(fp[k].text)]).filter(x=>x[1]);
  if(us.length>1)new Set(us.map(x=>x[1])).size>1?R.push({s:"f",n:B("आँकड़ों की इकाई अलग-अलग है","Units differ between parts"),d:us.map(x=>fpName(x[0])+": "+x[1]).join(" · ")}):R.push({s:"p",n:B("सब हिस्सों में इकाई एक ही है","Same unit in all parts"),d:us[0][1]});
  if(have("pl")){const L=fp.pl.text.split("\n").map(fsParseLine).filter(x=>x.nums.length);
    const pr=L.find(x=>/profit\s*\/?\s*\(?\s*(loss)?\s*\)?\s*for\s*the\s*(year|period)|(profit|loss)\s*for\s*the\s*(year|period)|profit\s*after\s*tax/i.test(x.label)&&!/statement|ended|ending/i.test(x.label));
    if(!pr)R.push({s:"w",n:B("P&L में 'Profit for the year' नहीं मिला","'Profit for the year' not found in the P&L")});
    else if(have("bs")||have("notes")){const v=pr.nums[0];const O=((have("notes")?fp.notes.text:"")+"\n"+(have("bs")?fp.bs.text:"")).split("\n").map(fsParseLine);
      const hit=O.some(x=>/profit|surplus|loss|retained|P\s*&\s*L|current\s*year/i.test(x.label)&&x.nums.some(n=>Math.abs(Math.abs(n)-Math.abs(v))<0.006));
      hit?R.push({s:"p",n:B("P&L का मुनाफ़ा बैलेंस शीट / नोट्स (रिज़र्व-सरप्लस) से मिलता है","P&L profit matches the Balance Sheet / notes (reserves & surplus)"),d:pr.raw[0]}):
        have("notes")?R.push({s:"w",n:B("P&L का मुनाफ़ा रिज़र्व-सरप्लस में नहीं मिला","P&L profit not found in reserves & surplus"),d:pr.raw[0]+B(" — नोट्स में 'Add: Profit for the year' देखें"," — check 'Add: Profit for the year' in the notes")}):
        R.push({s:"wait",n:B("मुनाफ़े का मिलान नोट्स आने पर होगा","Profit will be matched once the notes are in"),d:pr.raw[0]})}}
  return R}
function fpBoxHtml(i){const fp=i.fp||{},L=fpList(i),done=fpDone(i),can=canDo("file"),cr=fpCross(i),ic={p:"✔",w:"⚠",f:"✖",wait:"⏳"},col={p:"var(--green)",w:"#9a6700",f:"var(--red)",wait:"var(--mute)"};
  return `<div class="grp" id="fpBox" style="padding:10px 12px;margin-top:12px"><div style="display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap"><b>📑 ${esc(bt("स्टेटमेंट के हिस्से","Parts of the statements"))}</b><span class="badge ${done===L.length?"b-filed":"b-pending"}">${done} / ${L.length} ${esc(bt("पूरा","done"))}</span></div>
   ${can?`<div class="m" style="margin:6px 0">${esc(bt("सब कुछ एक ही PDF में है? उसे डालें — ऐप शीर्षक पढ़कर हिस्से अपने-आप पहचान लेगा।","Everything in one PDF? Upload it — the app reads the headings and finds the parts itself."))}</div><label class="btn ghost" style="display:inline-block;margin:0 0 6px;cursor:pointer">📎 ${esc(bt("एक PDF में सब — डालें","All in one PDF — upload"))}<input type="file" id="fpAll" accept="application/pdf" hidden></label>`:""}
   ${L.map(([k])=>{const r=fp[k];return `<div style="display:flex;align-items:center;gap:8px;padding:6px 0;border-top:1px solid var(--line)"><span>${r?"✅":"⏳"}</span><div style="flex:1;min-width:0"><div>${esc(fpName(k))}</div><div class="m">${r?esc([r.pages,r.name].filter(Boolean).join(" · ")):esc(bt("बाक़ी","pending"))}</div></div>
     ${can?`<label class="btn ghost" style="padding:5px 9px;cursor:pointer" title="${esc(bt("फ़ाइल डालें","Upload file"))}">📎<input type="file" class="fpOne" data-k="${k}" accept="application/pdf,.xlsx,.xls,.csv,image/*" hidden></label>${r?`<button class="btn ghost fpRm" data-k="${k}" style="padding:5px 9px">✕</button>`:""}`:""}</div>`}).join("")}
   <div style="margin-top:8px"><b style="font-size:14px">${esc(bt("आपस में मिलान","Cross-check"))}</b>${cr.length?cr.map(r=>`<div style="padding:3px 0"><span style="color:${col[r.s]}">${ic[r.s]}</span> ${esc(r.n)}${r.d?`<div class="m">${esc(r.d)}</div>`:""}</div>`).join(""):`<div class="m">—</div>`}</div>
   <div class="err" id="fpErr"></div></div>`}
async function fpSave(id,mut){const it=JSON.parse(JSON.stringify(items.find(x=>x.id===id)));it.fp=it.fp||{};it.proofs=it.proofs||[];mut(it);
  const L=fpList(it),done=fpDone(it);
  if(done===L.length&&L.length&&!isFiled(it)){it.status="filed_proof";it.filingDate=it.filingDate||todayStr();if(myRole()==="junior")it.needsApproval=true;log(it,{k:"file",filed:it.filingDate})}
  else if(done<L.length&&it.status==="filed_proof"&&it.fpAuto){it.status="pending"}
  if(done===L.length)it.fpAuto=true;
  await saveItem(it);return it}
async function fpUpload(file){if(!assets)return null;const u=await assets.upload(file);return{id:u.id,orig:file.name,hash:await fileHash(file)}}
function fpWire(i){const id=i.id,err=()=>$("#fpErr"),busy=s=>{const e=err();if(e)e.textContent=s||""};
  const addParts=async(file,found,only)=>{const up=await fpUpload(file);const ks=Object.keys(found);
    await fpSave(id,it=>{ks.forEach(k=>{const r=found[k];it.fp[k]={name:file.name,pages:r.from?fpRange(r):"",text:(r.text||"").slice(0,12000),at:new Date().toISOString(),by:me.id,file:up?up.id:""}});
      if(up&&!it.proofs.some(p=>p.hash&&p.hash===up.hash))it.proofs.push({id:up.id,name:file.name,orig:up.orig,hash:up.hash,at:new Date().toISOString(),by:me.id,check:{status:"unk",rows:[]}});
      log(it,{text:bt("हिस्से जोड़े: ","Parts added: ")+ks.map(fpName).join(", ")})});
    toast(bt("✅ जुड़ गया: ","✅ Added: ")+ks.map(fpName).join(", "));openDetail(id)};
  const all=$("#fpAll");if(all)all.onchange=async()=>{const f=all.files[0];if(!f)return;busy(bt("PDF पढ़ रहा है…","Reading the PDF…"));
    try{const pages=await fpPages(f,i.clientId),keys=fpList(i).map(x=>x[0]);
      if(!pages.some(p=>p.text.trim())){busy("");fpManual(i,f);return}
      const found=fpSplit(pages,keys);if(!Object.keys(found).length){busy(bt("इस PDF में कोई शीर्षक नहीं मिला — हर हिस्सा 📎 से अलग डालें।","No headings found in this PDF — upload each part with 📎."));return}
      await addParts(f,found)}catch(e){busy(e&&e.needPw?t("inW_locked"):bt("PDF नहीं पढ़ी जा सकी।","The PDF could not be read."))}};
  document.querySelectorAll("#sheet .fpOne").forEach(inp=>inp.onchange=async()=>{const f=inp.files[0],k=inp.dataset.k;if(!f)return;busy(bt("पढ़ रहा है…","Reading…"));
    try{let found={};if(/pdf/i.test(f.type)||/\.pdf$/i.test(f.name)){const pages=await fpPages(f,i.clientId);const sp=fpSplit(pages,fpList(i).map(x=>x[0]));
        const txt=pages.map(p=>p.text).join("\n");found=sp;if(!found[k])found[k]={from:pages.length?1:0,to:pages.length,text:txt}}
      else if(/\.(xlsx|xls|csv)$/i.test(f.name)){const d=await fsRead(f,i.clientId);found[k]={text:d.text}}
      else found[k]={text:""};
      await addParts(f,found)}catch(e){busy(e&&e.needPw?t("inW_locked"):bt("फ़ाइल नहीं पढ़ी जा सकी।","The file could not be read."))}});
  document.querySelectorAll("#sheet .fpRm").forEach(b=>b.onclick=async()=>{const k=b.dataset.k;await fpSave(id,it=>{delete it.fp[k];log(it,{text:bt("हिस्सा हटाया: ","Part removed: ")+fpName(k)})});openDetail(id)})}
/* scanned PDF: the person ticks which parts are inside and writes the pages */
function fpManual(i,file){const L=fpList(i);
  openSheet(`<h3>📑 ${esc(bt("स्कैन की हुई PDF","Scanned PDF"))}</h3><div class="note">${esc(bt("इस PDF की लिखावट पढ़ी नहीं जा सकती। बताइए इसमें कौन-से हिस्से हैं और किन पन्नों पर।","The text of this PDF can't be read. Tick the parts it contains and their pages."))}</div>
   ${L.map(([k])=>`<div style="display:flex;gap:8px;align-items:center;margin:6px 0"><label class="chk" style="flex:1;margin:0"><input type="checkbox" class="fmC" data-k="${k}">${esc(fpName(k))}</label><input class="fmP" data-k="${k}" placeholder="${esc(bt("पन्ने, जैसे 3-4","pages, e.g. 3-4"))}" style="width:120px"></div>`).join("")}
   <div class="err" id="fmErr"></div><div class="actions"><button class="btn green" id="fmGo">${esc(t("save"))}</button><button class="btn ghost" id="fmX">${esc(t("cancel"))}</button></div>`,{k:"detail",id:i.id});
  $("#fmX").onclick=()=>openDetail(i.id);
  $("#fmGo").onclick=async()=>{const ks=[...document.querySelectorAll("#sheet .fmC")].filter(c=>c.checked).map(c=>c.dataset.k);if(!ks.length){$("#fmErr").textContent=bt("कम से कम एक हिस्सा चुनें","Tick at least one part");return}
    $("#fmGo").disabled=true;const up=await fpUpload(file).catch(()=>null);
    await fpSave(i.id,it=>{ks.forEach(k=>{const pg=(document.querySelector(`#sheet .fmP[data-k="${k}"]`).value||"").trim();it.fp[k]={name:file.name,pages:pg?bt("पन्ने ","pages ")+pg:"",text:"",at:new Date().toISOString(),by:me.id,file:up?up.id:"",scan:true}});
      if(up&&!it.proofs.some(p=>p.hash&&p.hash===up.hash))it.proofs.push({id:up.id,name:file.name,orig:up.orig,hash:up.hash,at:new Date().toISOString(),by:me.id,check:{status:"unk",rows:[]}});
      log(it,{text:bt("हिस्से जोड़े (स्कैन): ","Parts added (scan): ")+ks.map(fpName).join(", ")})});
    toast(bt("✅ सेव हो गया","✅ Saved"));openDetail(i.id)}}
const _fpOpenDetail=openDetail;openDetail=function(id){_fpOpenDetail(id);const i=items.find(x=>x.id===id);if(!i||i.code!=="FS"||document.querySelector("#sheet #fpBox"))return;
  const a=document.querySelector("#sheet .actions");if(!a)return;a.insertAdjacentHTML("afterend",fpBoxHtml(i));fpWire(i)};
const _fpRow=row;row=function(i){const h=_fpRow(i);if(i.code!=="FS")return h;const L=fpList(i).length;if(!L)return h;const d=fpDone(i);
  return h.replace('<div style="margin-top:6px">','<div style="margin-top:6px"><span class="badge '+(d===L?"b-filed":"b-up")+'" style="margin-right:4px">📑 '+d+"/"+L+"</span>")};

/* ===== what's new: shown once per person; add a new entry at the top for each change ===== */
const WHATS_NEW=[{id:"2026-11-17",items:[
 ["🧮 GST जाँच: अपनी वर्किंग, GSTR-1, GSTR-3B और GSTR-2B डालें — ऐप हेड-वार मिलाकर फ़र्क़ दिखाएगा। वर्किंग के नाम अपनी शीट के हिसाब से ⚙ में बदलें।","🧮 GST check: upload your working, GSTR-1, GSTR-3B and GSTR-2B — the app compares them head-wise. Set your sheet's names in ⚙."]]},{id:"2026-11-16b",items:[
 ["📰 कानून के बदलाव में अब 📘 आसान भाषा में समझें, तैयार सवाल और अपना सवाल पूछने का डिब्बा — बिना Claude के जवाब।","📰 Law updates now have 📘 a plain-language summary, ready questions and an ask box — answered without Claude."]]},{id:"2026-11-16",items:[
 ["ITR में नया 'Tax Year' (इनकम-टैक्स एक्ट 2025) भी पहचाना जाता है — FY 2026-27 से।","ITR proof check now understands the new 'Tax Year' (Income-tax Act 2025) — from FY 2026-27."],
 ["बैलेंस शीट / P&L की जाँच: जोड़, राउंडिंग, असली आँकड़ों से मिलान, UDIN।","Balance Sheet / P&L checker: totals, rounding, match with actual figures, UDIN."],
 ["फ़ाइनेंशियल स्टेटमेंट के हिस्से अलग-अलग (✅ / ⏳), एक PDF से अपने-आप पहचान, और आपस में मिलान।","Financial statements in separate parts (✅ / ⏳), auto-detected from one PDF, and cross-checked."],
 ["हर क्लाइंट के लिए वित्तीय रिपोर्ट: मासिक MIS, तिमाही, बैंक स्टॉक स्टेटमेंट, प्रोविज़नल बैलेंस शीट।","Financial reports per client: monthly MIS, quarterly, bank stock statement, provisional Balance Sheet."],
 ["TDS और एडवांस टैक्स की जाँच।","TDS and advance-tax checks."]]}];
function wnShow(){const w=WHATS_NEW[0];if(!w||document.getElementById("wnCard"))return;let key="wn_seen_"+((typeof me!=="undefined"&&me&&me.id)||"x");
  try{if(localStorage.getItem(key)===w.id)return}catch(e){if(wnShow.seen===w.id)return}
  const d=document.createElement("div");d.id="wnCard";d.style.cssText="position:fixed;top:72px;right:12px;z-index:25;width:min(calc(100vw - 24px),380px);max-height:70vh;overflow:auto;background:var(--card);border:1px solid var(--line);border-radius:14px;box-shadow:0 8px 30px rgba(20,25,40,.18);padding:14px 16px";
  d.innerHTML=`<b>🆕 ${esc(bt("नया क्या है","What's new"))}</b><ul style="margin:8px 0 10px;padding-left:18px;font-size:14px">${w.items.map(x=>`<li style="margin:4px 0">${esc(bt(x[0],x[1]))}</li>`).join("")}</ul><div style="text-align:right"><button class="btn" id="wnOk">${esc(bt("ठीक है","OK"))}</button></div>`;
  document.body.appendChild(d);document.getElementById("wnOk").onclick=()=>{try{localStorage.setItem(key,w.id)}catch(e){}wnShow.seen=w.id;d.remove()}}
setTimeout(function wnTry(){if(typeof mode!=="undefined"&&mode==="loading"){setTimeout(wnTry,1500);return}wnShow()},2500);
