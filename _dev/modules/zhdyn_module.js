/* ===== 中文 for longer texts (manuals, reasons, next steps, law updates): translated once by Claude, then kept for everyone ===== */
let zhCache={},zhQ=new Set(),zhBusy=false,zhTimer=null,zhRef=null,zhFail=new Set();
try{zhCache=JSON.parse(localStorage.getItem("cr_zh_cache_v1")||"{}")}catch(e){zhCache={}}
const zhKey=s=>{let h=5381;for(let i=0;i<s.length;i++)h=((h<<5)+h+s.charCodeAt(i))|0;return"z"+(h>>>0).toString(36)+s.length.toString(36)};
function zhT(en){if(en==null||en==="")return en;en=String(en);if(!/[A-Za-z]{2}/.test(en))return en;const z=zhCache[en];if(z)return z;
  if(!zhFail.has(en)){zhQ.add(en);clearTimeout(zhTimer);zhTimer=setTimeout(zhFlush,500)}return en}
function zhInit(db){if(!db)return;zhRef=db.collection("i18n_zh");zhRef.onSnapshot(s=>{let n=0;s.docs.forEach(d=>{const x=d.data();if(x&&x.e&&x.z&&zhCache[x.e]!==x.z){zhCache[x.e]=x.z;n++}});if(n){zhSaveLocal();if(lang==="zh")zhRepaint()}},()=>{})}
function zhSaveLocal(){try{localStorage.setItem("cr_zh_cache_v1",JSON.stringify(zhCache))}catch(e){}}
const ZH_VIEW=new Set(["detail","client","lu","applic","ntdet","insdet","manual","c2done","dmres","errlist"]);
function zhRepaint(){if(lang!=="zh")return;const ov=$("#ov");const sheetOpen=ov&&ov.classList.contains("on");
  if(!sheetOpen||(openState&&ZH_VIEW.has(openState.k))){const b=document.querySelector('#lang button[data-l="zh"]');if(b){const y=window.scrollY,sh=$("#sheet"),sy=sh?sh.scrollTop:0;b.click();window.scrollTo(0,y);const s2=$("#sheet");if(s2)s2.scrollTop=sy}}
  else{paintStatic();render();renderVault();renderDocs();renderLu();renderMn();renderIns();renderNt()}}
async function zhFlush(){if(zhBusy||!zhQ.size||!sampleCap||lang!=="zh")return;zhBusy=true;
  try{while(zhQ.size){const batch=[...zhQ].slice(0,40);batch.forEach(x=>zhQ.delete(x));
      const prompt=`Translate each string into natural Simplified Chinese for an Indian tax-compliance office app used by Chinese-speaking managers.
Keep unchanged: form and return names (GSTR-3B, Form 35, DRC-01A, AOC-4…), section and rule numbers, acronyms (PAN, GSTIN, TAN, CIN, ARN, DIN, ITR, TDS, TCS, GST, AY, FY, CIT(A), NFAC, ITAT, EPFO, ESIC, DGFT, IEC, LUT, MCA, ROC), portal menu paths in English (e.g. Services → Returns), ₹ amounts, dates, emojis, URLs and placeholders like {n} or {d}. Be short and clear.
Return ONLY a JSON array of ${batch.length} strings in the same order.
${JSON.stringify(batch)}`;
      let v=null;try{if(sampleCap.json)v=await sampleCap.json(prompt,{modelTier:"quick"});else{const r=await sampleCap(prompt,{modelTier:"quick"});const m=(r.text||"").match(/\[[\s\S]*\]/);v=m?JSON.parse(m[0]):null}}catch(e){if(e&&(e.code==="not_granted"||e.code==="rate_limited")){batch.forEach(x=>zhFail.add(x));break}}
      if(!Array.isArray(v)||v.length!==batch.length){batch.forEach(x=>zhFail.add(x));continue}
      batch.forEach((e,i)=>{const z=String(v[i]||"").trim();if(z){zhCache[e]=z;if(zhRef)zhRef.doc(zhKey(e)).set({e,z,at:Date.now()}).catch(()=>{})}else zhFail.add(e)});
      zhSaveLocal();zhRepaint()}}
  finally{zhBusy=false}}
