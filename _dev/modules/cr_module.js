/* ===== is this paper part of this notice case? → if yes: add it to the case record and update the status ===== */
Object.assign(I18N.hi,{crYes:"✔ ये कागज़ इसी नोटिस / केस का है",crMaybe:"❔ पक्का नहीं कि ये इसी केस का है",crNo:"⚠ ये कागज़ इस नोटिस से जुड़ा नहीं लगता",crAdded:"केस की फ़ाइलों में जोड़ा",crNotAdded:"केस में नहीं जोड़ा",crAddAnyway:"फिर भी इस केस में जोड़ें",crStatus:"स्थिति अपडेट: {s}",crKeep:"इसी केस का हो तो फ़ाइलों में जोड़ें और स्थिति अपडेट करें",crOther:"ये कागज़ शायद इस केस का है: {c} — वहाँ जोड़ें?",crToCase:"📂 इस केस में जोड़ें",crNew:"नया केस बनाएँ",crMatchT:"ये पहले से चल रहे केस का कागज़ लगता है",crWhy_pan:"PAN/GSTIN मिला",crWhy_panX:"किसी और का PAN/GSTIN है",crWhy_name:"क्लाइंट का नाम मिला",crWhy_ay:"वही अवधि ({p})",crWhy_ayX:"अवधि अलग है ({p})",crWhy_ref:"वही DIN / रेफ़रेंस / ARN",crWhy_amt:"वही रकम",crWhy_sec:"वही धारा",crWhy_ai:"Claude: {x}",crDup:"ये कागज़ पहले से केस में है"});
Object.assign(I18N.en,{crYes:"✔ This paper belongs to this notice / case",crMaybe:"❔ Not sure this paper belongs to this case",crNo:"⚠ This paper does not seem related to this notice",crAdded:"Added to the case files",crNotAdded:"Not added to the case",crAddAnyway:"Add to this case anyway",crStatus:"Status updated: {s}",crKeep:"If it belongs to this case, add it to the files and update the status",crOther:"This paper may belong to case: {c} — add it there?",crToCase:"📂 Add to this case",crNew:"Create a new case",crMatchT:"This looks like a paper for a case already running",crWhy_pan:"PAN/GSTIN matches",crWhy_panX:"PAN/GSTIN of someone else",crWhy_name:"client name found",crWhy_ay:"same period ({p})",crWhy_ayX:"different period ({p})",crWhy_ref:"same DIN / reference / ARN",crWhy_amt:"same amount",crWhy_sec:"same section",crWhy_ai:"Claude: {x}",crDup:"This paper is already in the case"});
Object.keys(I18N.en).filter(k=>/^cr[A-Z]/.test(k)).forEach(k=>{if(!I18N.zh[k])I18N.zh[k]=I18N.en[k]});
const crNorm=s=>String(s||"").toUpperCase().replace(/[^A-Z0-9]/g,"");
function crPeriods(text){const T=String(text||"");const out=new Set();(T.match(/20\d{2}\s*-\s*\d{2,4}/g)||[]).forEach(x=>{const m=x.replace(/\s/g,"").match(/(20\d{2})-(\d{2,4})/);if(m)out.add(m[1]+"-"+m[2].slice(-2))});return[...out]}
function crRefs(r){const S=new Set();const add=v=>{const n=crNorm(v);if(n.length>=9)S.add(n)};add(r.f.ref);add(r.appealRef);add(r.ack);(r.steps||[]).forEach(x=>add(x.ref));
  (String(r.text||"").match(/ITBA\/[A-Z]{3}\/[A-Z]\/[0-9A-Z()]+\/20\d{2}-\s*\d{2}\/\d{6,}\(\d\)/g)||[]).forEach(add);
  (String(r.text||"").match(/\b\d{15}\b/g)||[]).forEach(add);return[...S]}
/* score how strongly a paper's text points at this case */
function crRelate(r,text,note){const T=String(text||"")+" "+String(note||""),U=T.toUpperCase(),N=crNorm(T),p=parties.find(x=>x.id===r.clientId)||{},why=[];let sc=0,neg=false;
  if(!String(text||"").trim()&&!note)return{v:"maybe",why,score:0};
  const ids=[p.pan,p.cin,p.llpin,p.tanNo].concat((p.gsts||[]).map(g=>g.gstin)).filter(Boolean).map(crNorm);
  const myPan=ids.some(x=>x&&N.includes(x));if(myPan){sc+=2;why.push(t("crWhy_pan"))}
  const fx=pdfFacts(T);const others=(fx.pans||[]).concat(fx.gstins||[]).filter(x=>!ids.some(i=>i===crNorm(x)||crNorm(x).includes(i)));
  if(!myPan&&others.length){neg=true;why.push(t("crWhy_panX"))}
  const nm2=(p.name||r.client||"").toUpperCase().replace(/\s+(PRIVATE|PVT\.?)\s+(LIMITED|LTD\.?)$/,"").trim();if(nm2&&nm2.length>4&&U.includes(nm2)){sc+=1;why.push(t("crWhy_name"))}
  const casePer=crPeriods(r.f.period),docPer=crPeriods(T);
  if(casePer.length&&docPer.length){if(docPer.some(x=>casePer.includes(x))){sc+=2;why.push(t("crWhy_ay",{p:casePer[0]}))}else{sc-=2;why.push(t("crWhy_ayX",{p:docPer.join(", ")}))}}
  if(crRefs(r).some(x=>N.includes(x))){sc+=3;why.push(t("crWhy_ref"))}
  const amt=String(r.f.amount||"").replace(/\D/g,"");if(amt.length>=4&&T.replace(/[,\s]/g,"").includes(amt)){sc+=2;why.push(t("crWhy_amt"))}
  const sec=(String(r.f.section||"").match(/\b\d{2,3}[A-Z]{0,3}\b/)||[])[0];if(sec&&new RegExp("\\b(section|u\\/s|sec\\.?)\\s*"+sec+"\\b","i").test(T)){sc+=1;why.push(t("crWhy_sec"))}
  const v=neg?"no":sc>=3?"yes":sc>=1?"maybe":(String(text||"").trim().length>200?"no":"maybe");return{v,why,score:sc}}
function crBadge(rel){if(!rel)return"";const col={yes:"var(--green-soft)",maybe:"#fff8e6",no:"#fdecec"}[rel.v];
  return `<div class="note" style="margin-top:6px;background:${col}"><b>${esc(t(rel.v==="yes"?"crYes":rel.v==="no"?"crNo":"crMaybe"))}</b>${rel.why.length?`<div class="m">${esc(rel.why.join(" · "))}</div>`:""}</div>`}
/* add papers to the case record (no duplicates) */
function crAddFiles(r,saved,texts){const have=new Set((r.files||[]).map(f=>f.hash).filter(Boolean));let n=0;
  (saved||[]).forEach(f=>{if(f.hash&&have.has(f.hash))return;r.files=(r.files||[]).concat([f]);n++});
  if(texts&&texts.length)r.text=((r.text||"")+"\n\n"+texts.map(x=>`[${x.name}]\n${x.text}`).join("\n")).slice(0,60000);return n}
/* one paper → relate, add, classify, update status */
async function crIngest(r,file,saved,text,note,force){
  const rel=crRelate(r,text,note);let ai=null;
  if(sampleCap&&(rel.v==="maybe"||!String(text||"").trim())){const {d}=await c2Read(file,note,r);ai=d;if(d&&d.related===true&&rel.v!=="no"){rel.v="yes";rel.why.push(t("crWhy_ai",{x:d.relWhy||"✔"}))}else if(d&&d.related===false){rel.v=rel.v==="yes"?"maybe":"no";rel.why.push(t("crWhy_ai",{x:d.relWhy||"✖"}))}}
  const res={name:file?file.name:"",rel,added:false,stage:null};
  if(rel.v!=="yes"&&!force)return res;
  const dupe=saved&&saved.hash&&(r.files||[]).some(f=>f.hash===saved.hash);
  crAddFiles(r,saved?[saved]:[],text?[{name:file?file.name:"paper",text}]:[]);res.added=!dupe;res.dupe=!!dupe;
  const d=ai||c2Detect(text,note);
  if(d&&d.type&&!dupe){const step={type:d.type,date:d.date||todayStr(),ref:d.ref||"",amount:d.amount||"",note:note||"",next:d.next||"",nextWhat:d.nextWhat||"",explain:d.explain||"",file:saved||null,by:me.id||"local",at:Date.now()+Math.floor(Math.random()*1000)};
    const before=csStage(r);await c2Apply(r,step);res.stage=csStage(r)!==before?t("csSt_"+csStage(r)):t("cs_"+d.type)}
  else await ntSave(r);
  return res}
/* new notice upload: is it really a paper for a case that is already open? */
function crFindCase(cid,text){const L2=ntItems.filter(r=>ntIsOpen(r)&&(!cid||r.clientId===cid)).map(r=>({r,rel:crRelate(r,text,"")})).filter(x=>x.rel.v==="yes").sort((a,b)=>b.rel.score-a.rel.score);return L2[0]||null}
