/* ===== gr: GST check — firm's own working Excel ↔ GSTR-1 (PDF) ↔ GSTR-3B (PDF) ↔ GSTR-2B (Excel), totals per head.
   The names used in the working (section titles, column headings, summary labels) are per firm: settings/gst_work,
   editable in "⚙ वर्किंग के नाम" by picking from the labels found in the uploaded sheet. One record per client + GSTIN + month
   in collection gst_recon; opened from a GSTR-3B / GSTR-1 entry. ===== */
let grRef=null,grItems=[],grSt={id:null,busy:false,msg:"",files:{}},grCfgRef=null,grCfgU=null;
const GR_DEF={
 sales:["SALES","Outward supplies","Sales register"],p2b:["PURCHASES AS PER GSTR 2-B","Purchases as per 2B","ITC as per 2B"],impg:["IMPG BILLS","Import of goods"],rcm:["RCM Details","Reverse charge"],
 total:["GROSS TOTAL","Total","Grand Total"],tv:["Taxable value","Taxable","Assessable value"],i:["IGST","Integrated"],c:["CGST","Central"],s:["SGST","UTGST","State"],
 elig:["Eligible"],nelig:["Not Eligible","Ineligible","POS InEligible"],
 out:["Sales Tax Payable","Output tax"],rcmPay:["RCM Payable"],pImpg:["Import of Goods"],pOth:["All Other ITC"],pRcm:["Invard Supply Liable to reverse Charge","Inward Supply Liable to reverse Charge"],pIsd:["Inward Supply from ISD"],pRev:["ITC Reverese","ITC Reversed","ITC Reverse"],pNet:["NET ITC Available"]};
const GR_KEYS=[["sales",["बिक्री वाला हिस्सा","Sales section"],"sec"],["p2b",["2B वाली ख़रीद का हिस्सा","Purchases-as-per-2B section"],"sec"],["impg",["इम्पोर्ट (IMPG) का हिस्सा","Import (IMPG) section"],"sec"],["rcm",["RCM का हिस्सा","RCM section"],"sec"],
 ["total",["हिस्से की कुल वाली लाइन","Section total row"],"lab"],["tv",["टैक्सेबल मूल्य का कॉलम","Taxable value column"],"col"],["i",["IGST कॉलम","IGST column"],"col"],["c",["CGST कॉलम","CGST column"],"col"],["s",["SGST कॉलम","SGST column"],"col"],
 ["elig",["'Eligible' वाली लाइन","'Eligible' row"],"lab"],["nelig",["'Not eligible' वाली लाइन","'Not eligible' row"],"lab"],
 ["out",["कुल आउटपुट टैक्स","Total output tax"],"lab"],["rcmPay",["RCM देय","RCM payable"],"lab"],["pImpg",["3B 4A(1) इम्पोर्ट","3B 4A(1) imports"],"lab"],["pOth",["3B 4A(5) बाक़ी ITC","3B 4A(5) other ITC"],"lab"],["pRcm",["3B 4A(3) RCM ITC","3B 4A(3) RCM ITC"],"lab"],["pIsd",["3B 4A(4) ISD","3B 4A(4) ISD"],"lab"],["pRev",["3B 4B रिवर्सल","3B 4B reversal"],"lab"],["pNet",["3B 4C नेट ITC","3B 4C net ITC"],"lab"]];
function grCfg(){const u=grCfgU||{};const o={};Object.keys(GR_DEF).forEach(k=>o[k]=(u[k]&&u[k].length?u[k]:[]).concat(GR_DEF[k]));return o}
function grInit(){if(grInit.done)return;if(appDb){grInit.done=true;grRef=appDb.collection("gst_recon");grRef.onSnapshot(s=>{grItems=s.docs.map(d=>Object.assign({id:d.id},d.data()));if(openState&&openState.k==="gr"&&!grSt.busy)openGr(grSt.id)},()=>{});
    grCfgRef=appDb.collection("settings").doc("gst_work");grCfgRef.onSnapshot(d=>{grCfgU=d.exists?d.data():null},()=>{})}
  else if(typeof mode==="undefined"||mode!=="db"){grInit.done=true;grItems=lget("compliance_gr_v1","[]");grCfgU=lget("compliance_grcfg_v1","null")}}
async function grCfgSave(u){grCfgU=u;if(grCfgRef)await grCfgRef.set(u);else lset("compliance_grcfg_v1",u)}
const GR_MON=["january","february","march","april","may","june","july","august","september","october","november","december"];
const GR_ST={"01":"JK","02":"HP","03":"PB","04":"CH","05":"UK","06":"HR","07":"DL","08":"RJ","09":"UP","10":"BR","18":"AS","19":"WB","20":"JH","21":"OD","22":"CG","23":"MP","24":"GJ","27":"MH","29":"KA","30":"GA","32":"KL","33":"TN","36":"TS","37":"AP"};
const grN=v=>{if(typeof v==="number")return v;const s=String(v??"").replace(/[₹,\s]/g,"");if(!s||s==="-")return 0;const n=parseFloat(s);return isNaN(n)?0:n};
const grIsNum=v=>typeof v==="number"||/^-?[\d,]+(\.\d+)?$/.test(String(v??"").replace(/[₹\s]/g,""));
const grNorm=s=>String(s??"").toLowerCase().replace(/[^a-z0-9ऀ-ॿ]+/g," ").trim();
const grIs=(cell,names)=>{const c=grNorm(cell);return!!c&&names.some(n=>c===grNorm(n))};
const grStarts=(cell,names)=>{const c=grNorm(cell);return!!c&&names.some(n=>{const m=grNorm(n);return m&&(c===m||c.startsWith(m+" "))})};
const grKey=i=>String(i.clientId+"_"+(i.gstin||"x")+"_"+i.period).replace(/[^A-Za-z0-9_-]/g,"_");
function grYm(fy,mon){const m=GR_MON.findIndex(x=>x.startsWith(String(mon||"").toLowerCase().slice(0,3)))+1;const y=parseInt(fy,10);if(!m||!y)return"";return(m>=4?y:y+1)+"-"+String(m).padStart(2,"0")}
/* PDF → rows of {t, c:[{x,r,s}]} (r = right edge of the text) */
async function grPdfRows(file,clientId){const buf=new Uint8Array(await file.arrayBuffer());let doc=null;
  try{doc=await pdfDoc(buf.slice())}catch(e){if(e&&e.needPw){for(const pw of await clientPws(clientId)){try{doc=await pdfDoc(buf.slice(),pw);break}catch(x){}}}else throw e}
  if(!doc)throw{needPw:true};const out=[];
  for(let n=1;n<=Math.min(doc.numPages,40);n++){const c=await(await doc.getPage(n)).getTextContent();const rows=new Map();
    c.items.forEach(it=>{if(!it.str||!it.str.trim())return;const y=Math.round(it.transform[5]/3);const r=rows.get(y)||[];r.push({x:it.transform[4],r:it.transform[4]+(it.width||0),s:it.str.trim()});rows.set(y,r)});
    [...rows.entries()].sort((a,b)=>b[0]-a[0]).forEach(([,r])=>{r.sort((a,b)=>a.x-b.x);out.push({t:r.map(x=>x.s).join(" "),c:r})})}
  return out}
function grCols(row,hx){const v=hx.map(()=>null);row.c.forEach(c=>{if(!grIsNum(c.s))return;let k=-1;hx.forEach((x,j)=>{if(x<=c.r+1)k=j});if(k>=0&&v[k]===null)v[k]=grN(c.s)});return v.map(x=>x||0)}
function grHead(row,words){const hx=[];words.forEach(w=>{const c=row.c.find(c=>c.s.toLowerCase().startsWith(w));if(c)hx.push(c.x)});return hx.length===words.length?hx:null}
function grIdent(rows){const T=rows.slice(0,25).map(r=>r.t).join(" ");const g=(T.match(/\b\d{2}[A-Z]{5}\d{4}[A-Z][0-9A-Z]Z[0-9A-Z]\b/)||[])[0]||"";
  const fy=(T.match(/(?:Financial\s*year|Year)\s*(\d{4})-\d{2}/i)||[])[1];const mon=(T.match(/(?:Tax\s*period|Period)\s*([A-Za-z]+)/i)||[])[1];return{gstin:g,ym:grYm(fy,mon)}}
/* GSTR-3B */
function grParse3B(rows){const o=Object.assign(grIdent(rows),{t31:{},t4:{}});let sec="",hx=null,sub="";
  for(const r of rows){const t=r.t;
    if(/^3\.1\s+Details/i.test(t)){sec="31";hx=null;continue}if(/^3\.1\.1\b/.test(t)){sec="";continue}
    if(/^4\.\s*Eligible\s*ITC/i.test(t)){sec="4";hx=null;continue}if(/^5\s+Values/i.test(t)){sec="";continue}
    if(sec==="31"&&!hx){hx=grHead(r,["total","integrated","central","state","cess"]);continue}
    if(sec==="4"&&!hx){hx=grHead(r,["integrated","central","state","cess"]);continue}
    if(!hx)continue;
    if(sec==="31"){const m=t.match(/^\((a|b|c|d|e)\s*\)/i);if(m){const v=grCols(r,hx);o.t31[m[1].toLowerCase()]={tv:v[0],i:v[1],c:v[2],s:v[3],x:v[4]}}}
    if(sec==="4"){const a=t.match(/^([A-C])\.\s/);if(a){sub=a[1];if(sub==="C"){const v=grCols(r,hx);o.t4.C={i:v[0],c:v[1],s:v[2],x:v[3]}}continue}
      if(/^\(D\)/.test(t)){sub="D";continue}const m=t.match(/^\((\d)\)/);if(m&&sub){const v=grCols(r,hx);o.t4[sub+m[1]]={i:v[0],c:v[1],s:v[2],x:v[3]}}}}
  o.ok=!!(o.t31.a||o.t4.C);return o}
/* GSTR-1: totals of each table */
function grParse1(rows){const o=Object.assign(grIdent(rows),{t:{},amend:{tv:0,i:0,c:0,s:0,x:0}});let hx=null,sec="",got=false;
  const add=(a,v)=>{a.tv+=v[0];a.i+=v[1];a.c+=v[2];a.s+=v[3];a.x+=v[4]};
  for(const r of rows){const t=r.t;if(!hx||/^Description/.test(t)){const h=grHead(r,["value","integrated","central","state","cess"]);if(h){hx=h;continue}}
    const m=t.match(/^(4A|4B|5|6A|6B|6C|7|8|9A|9B|9C|10|11A\(1\)|11B\(1\)|11A|11B|12|13|14A|14|15A|15)\s*[-–,]/);
    if(m){sec=m[1];if(sec==="9B")sec+=/CDNUR/.test(t)?"ur":"r";got=false;continue}
    if(!hx||!sec)continue;
    if(/^Net\s+differential/i.test(t)&&/^(9A|9C|10|11A|11B|14A|15A)$/.test(sec)){add(o.amend,grCols(r,hx));continue}
    if(!got&&/^Total\b/i.test(t)){const v=grCols(r,hx);o.t[sec]={tv:v[0],i:v[1],c:v[2],s:v[3],x:v[4]};got=true}}
  const z={tv:0,i:0,c:0,s:0,x:0};const out=Object.assign({},z);["4A","5","6A","6B","6C","7","9Br","9Bur"].forEach(k=>{const v=o.t[k];if(v)Object.keys(z).forEach(q=>out[q]+=v[q])});
  Object.keys(z).forEach(k=>out[k]+=o.amend[k]+((o.t["11A(1)"]||z)[k]-(o.t["11B(1)"]||z)[k]));
  o.out=out;o.hsn=o.t["12"]||null;o.ok=!!o.t["4A"];return o}
/* Excel → {sheet: rows} */
async function grSheets(file){if(!window.XLSX)await loadScript(XLSX_SRC);const wb=XLSX.read(new Uint8Array(await file.arrayBuffer()),{type:"array"});
  const o={};wb.SheetNames.forEach(n=>o[n]=XLSX.utils.sheet_to_json(wb.Sheets[n],{header:1,raw:true,defval:""}));return o}
/* GSTR-2B Excel (portal download — fixed format) */
function grParse2B(sh){const o={gstin:"",ym:"",a:{},na:{i:0,c:0,s:0,x:0}};const rm=sh["Read me"]||[];
  const g=k=>{const r=rm.find(r=>String(r[0]).trim().toLowerCase()===k);return r?String(r[2]||r[1]||"").trim():""};o.gstin=g("gstin");o.ym=grYm(g("financial year"),g("tax period"));
  const v=r=>({i:grN(r[3]),c:grN(r[4]),s:grN(r[5]),x:grN(r[6])});let part="";
  (sh["ITC Available"]||[]).forEach(r=>{const a=String(r[0]).trim(),h=String(r[1]);if(/^Part\s*A/i.test(a))part="A";if(/^Part\s*B/i.test(a))part="B";
    if(!/^(I|II|III|IV|V|VI)$/.test(a))return;const k=part==="B"?"cn":/all\s*other/i.test(h)?"oth":/import\s*of\s*goods/i.test(h)?"impg":/ISD/.test(h)?"isd":/reverse\s*charge/i.test(h)?"rcm":null;
    if(k){const x=v(r);if(o.a[k])["i","c","s","x"].forEach(z=>o.a[k][z]+=x[z]);else o.a[k]=x}});
  (sh["ITC not available"]||[]).forEach(r=>{if(/^(I|II|III|IV|V|VI)$/.test(String(r[0]).trim())){const x=v(r);["i","c","s","x"].forEach(z=>o.na[z]+=x[z])}});
  o.ok=!!Object.keys(o.a).length;return o}
/* the firm's working: names come from grCfg() */
function grWorkSheets(sh){const C=grCfg();return Object.keys(sh).filter(n=>sh[n].some(r=>r.slice(0,3).some(c=>grIs(c,C.sales))))}
function grPickSheet(sh,gstin){const L=grWorkSheets(sh);if(L.length<=1)return L[0]||"";const ab=GR_ST[String(gstin).slice(0,2)]||"",nm=(STATES[String(gstin).slice(0,2)]||"").toLowerCase();
  return L.find(n=>ab&&new RegExp("\\b"+ab+"\\b","i").test(n))||L.find(n=>nm&&n.toLowerCase().includes(nm))||""}
function grParseWork(rows){const C=grCfg(),o={ok:false,miss:[]};
  const t=rows.slice(0,3).map(r=>r.join(" ")).join(" ");const mm=t.match(/\b(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\W*'?\s*(\d{4})/i);
  if(mm){const m=GR_MON.findIndex(x=>x.startsWith(mm[1].toLowerCase()))+1;o.ym=mm[2]+"-"+String(m).padStart(2,"0")}
  const sect=key=>{const i=rows.findIndex(r=>r.slice(0,3).some(c=>grIs(c,C[key])));if(i<0){o.miss.push(key);return null}
    let h=-1;for(let k=i+1;k<Math.min(rows.length,i+6);k++)if(rows[k].some(c=>grStarts(c,C.tv)||grStarts(c,C.i))){h=k;break}
    if(h<0){o.miss.push("tv");return null}const H=rows[h];const col=names=>H.findIndex(c=>grStarts(c,names));
    const cx={tv:col(C.tv),i:col(C.i),c:col(C.c),s:col(C.s)};if(key==="sales")["tv","i","c","s"].forEach(q=>{if(cx[q]<0&&!o.miss.includes(q))o.miss.push(q)});
    let tot=-1;for(let k=h+1;k<rows.length;k++){if(rows[k].slice(0,3).some(c=>grIs(c,C.total))){tot=k;break}if(rows[k].slice(0,3).some(c=>grIs(c,C.sales.concat(C.p2b,C.impg,C.rcm))))break}
    if(tot<0){if(!o.miss.includes("total"))o.miss.push("total");return null}
    const get=r=>({tv:cx.tv>=0?grN(r[cx.tv]):0,i:cx.i>=0?grN(r[cx.i]):0,c:cx.c>=0?grN(r[cx.c]):0,s:cx.s>=0?grN(r[cx.s]):0});const el={};
    for(let k=tot+1;k<Math.min(rows.length,tot+5);k++){const r=rows[k];if(r.some(c=>grIs(c,C.elig)))el.elig=get(r);else if(r.some(c=>grIs(c,C.nelig)))el.nelig=grSum(el.nelig,get(r));else if(String(r[0]??"").trim())break}
    return Object.assign(get(rows[tot]),{el})};
  o.sales=sect("sales");o.p2b=sect("p2b");o.impg=sect("impg");o.rcm=sect("rcm");
  const lab=key=>{for(const r of rows){const j=r.findIndex(c=>typeof c==="string"&&grStarts(c,C[key]));if(j>=0){const n=r.slice(j+1).filter(c=>c!==""&&grIsNum(c)).slice(0,3).map(grN);if(n.length)return{i:n[0]||0,c:n[1]||0,s:n[2]||0}}}return null};
  o.out=lab("out");o.rcmPay=lab("rcmPay");o.p={impg:lab("pImpg"),oth:lab("pOth"),rcm:lab("pRcm"),isd:lab("pIsd"),rev:lab("pRev"),net:lab("pNet")};
  if(!o.out&&!o.sales)o.miss.push("out");o.ok=!!(o.sales||o.out);return o}
/* labels found in a sheet — choices for "⚙ वर्किंग के नाम" */
function grLabels(rows){const s=new Set();rows.forEach(r=>r.forEach(c=>{if(typeof c==="string"){const v=c.trim();if(v.length>1&&v.length<70&&/[A-Za-zऀ-ॿ]/.test(v)&&!/^\d{2}[A-Z]{5}\d{4}/.test(v))s.add(v)}}));return[...s].slice(0,400)}
/* checks */
const GR_H={tv:["मूल्य","Value"],i:["IGST","IGST"],c:["CGST","CGST"],s:["SGST","SGST"],x:["Cess","Cess"]};
function grSum(...a){const o={tv:0,i:0,c:0,s:0,x:0};a.filter(Boolean).forEach(v=>Object.keys(o).forEach(k=>o[k]+=+v[k]||0));return o}
const grSub=(a,b)=>{const o={};["tv","i","c","s","x"].forEach(k=>o[k]=(+((a||{})[k])||0)-(+((b||{})[k])||0));return o};
function grChecks(d){const B=bt,sw=d.w&&d.w.ok?d.w:null,s1=d.r1&&d.r1.ok?d.r1:null,s3=d.b3&&d.b3.ok?d.b3:null,s2=d.b2&&d.b2.ok?d.b2:null,L=[];const P=(sw&&sw.p)||{};
  const C=(name,keys,lines,note)=>{const ls=lines.filter(l=>l[1]);if(ls.length<2){L.push({name,keys,lines:ls,st:"wait",note:B("मिलान के लिए कम से कम दो फ़ाइलें / आँकड़े चाहिए","Needs at least two files / figures to compare")});return}
    let bad=false;for(let a=0;a<ls.length;a++)for(let b=a+1;b<ls.length;b++)keys.forEach(k=>{if(Math.abs((+ls[a][1][k]||0)-(+ls[b][1][k]||0))>1.5)bad=true});L.push({name,keys,lines:ls,st:bad?"bad":"ok",note})};
  const W=B("वर्किंग","Working");
  C(B("बिक्री (आउटवर्ड सप्लाई)","Sales (outward supplies)"),["tv","i","c","s"],[[W,sw&&(sw.sales||sw.out)],["GSTR-1",s1&&s1.out],["GSTR-3B 3.1(a)+(b)",s3&&grSum(s3.t31.a,s3.t31.b)]]);
  if(s1&&s1.hsn)C(B("GSTR-1: HSN सारांश बनाम बिल","GSTR-1: HSN summary vs invoices"),["tv","i","c","s"],[["GSTR-1 "+B("बिल","invoices"),s1.out],["GSTR-1 HSN",s1.hsn]]);
  C(B("RCM टैक्स (देना)","RCM tax payable"),["i","c","s"],[[W,sw&&(sw.rcmPay||sw.rcm)],["GSTR-3B 3.1(d)",s3&&s3.t31.d]]);
  C(B("ITC — इम्पोर्ट ऑफ़ गुड्स","ITC — import of goods"),["i"],[[W,sw&&(P.impg||sw.impg)],["GSTR-2B",s2&&(s2.a.impg||{i:0})],["GSTR-3B 4(A)(1)",s3&&s3.t4.A1]]);
  C(B("ITC — बाक़ी सब, 4(A)(5)","ITC — all other, 4(A)(5)"),["i","c","s"],[[W,sw&&(P.oth||(sw.p2b&&sw.p2b.el.elig))],["GSTR-2B "+B("(क्रेडिट नोट घटाकर)","(less credit notes)"),s2&&grSub(s2.a.oth,s2.a.cn)],["GSTR-3B 4(A)(5)",s3&&s3.t4.A5]]);
  C(B("ITC — RCM, 4(A)(3)","ITC — reverse charge, 4(A)(3)"),["i","c","s"],[[W,sw&&P.rcm],["GSTR-3B 4(A)(3)",s3&&s3.t4.A3]],B("2B में सिर्फ़ रजिस्टर्ड सप्लायर वाला RCM आता है, इसलिए 2B से नहीं मिलाया।","2B shows only RCM from registered suppliers, so it is not compared."));
  C(B("ITC रिवर्सल, 4(B)","ITC reversed, 4(B)"),["i","c","s"],[[W,sw&&P.rev],["GSTR-3B 4(B)",s3&&grSum(s3.t4.B1,s3.t4.B2)]]);
  C(B("नेट ITC, 4(C)","Net ITC, 4(C)"),["i","c","s"],[[W,sw&&P.net],["GSTR-3B 4(C)",s3&&s3.t4.C]]);
  if(s2&&s3){const av=grSub(grSum(s2.a.oth,s2.a.isd),s2.a.cn),cl=grSum(s3.t4.A5,s3.t4.A4);const ex=["i","c","s"].some(k=>cl[k]-av[k]>1.5);
    L.push({name:B("2B से ज़्यादा ITC तो नहीं लिया?","ITC claimed above 2B?"),keys:["i","c","s"],lines:[["GSTR-3B 4(A)(4)+(5)",cl],["GSTR-2B",av]],st:ex?"bad":"ok",note:ex?B("3B में 2B से ज़्यादा ITC लिया गया है — कारण देखें (पिछले महीने के बिल / गलत हेड)।","3B claims more ITC than 2B — check why (earlier bills / wrong head)."):""});
    const na=s2.na,d2=s3.t4.D2||{i:0,c:0,s:0};if(na.i+na.c+na.s>1.5)L.push({name:B("2B में 'ITC उपलब्ध नहीं'","2B 'ITC not available'"),keys:["i","c","s"],lines:[["GSTR-2B",na],["GSTR-3B 4(D)(2)",d2]],st:Math.abs(na.i+na.c+na.s-(d2.i+d2.c+d2.s))>1.5?"warn":"ok",note:B("यह रक़म 3B की 4(D)(2) में दिखानी होती है।","This amount goes in 3B table 4(D)(2).")})}
  return L}
function grIdentNotes(d,i){const B=bt,want=pinfo(i).m,g=i.gstin||"",n=[];[["w",B("वर्किंग","Working")],["r1","GSTR-1"],["b3","GSTR-3B"],["b2","GSTR-2B"]].forEach(([k,lab])=>{const x=d[k];if(!x)return;
  if(x.gstin&&g&&x.gstin!==g)n.push("✖ "+lab+B(": GSTIN अलग है — ",": different GSTIN — ")+x.gstin);if(x.ym&&want&&x.ym!==want)n.push("✖ "+lab+B(": महीना अलग है — ",": different month — ")+x.ym);
  if(!x.ok)n.push("⚠ "+lab+B(": फ़ाइल से आँकड़े नहीं पढ़े जा सके",": figures could not be read from the file"));
  if(k==="w"&&x.miss&&x.miss.length)n.push("⚠ "+B("वर्किंग में ये नहीं मिले — '⚙ वर्किंग के नाम' में अपनी शीट वाला नाम चुनें: ","Not found in the working — pick your sheet's name in '⚙ Working names': ")+x.miss.map(m=>{const g=GR_KEYS.find(z=>z[0]===m);return g?bt(g[1][0],g[1][1]):m}).join(", "))});return n}
const grFmt=v=>(Math.round((+v||0)*100)/100).toLocaleString("en-IN",{minimumFractionDigits:2,maximumFractionDigits:2});
function grTableHtml(c){const ic={ok:"✔",bad:"✖",warn:"⚠",wait:"⏳"},col={ok:"var(--green)",bad:"var(--red)",warn:"#9a6700",wait:"var(--mute)"};
  const head=`<tr><th></th>${c.keys.map(k=>`<th style="text-align:right">${esc(bt(GR_H[k][0],GR_H[k][1]))}</th>`).join("")}</tr>`;
  const f0=c.lines[0]&&c.lines[0][1],rows=c.lines.map((l,j)=>`<tr><td>${esc(l[0])}</td>${c.keys.map(k=>{const off=j>0&&Math.abs((+l[1][k]||0)-(+f0[k]||0))>1.5;return `<td style="text-align:right${off?";color:var(--red);font-weight:600":""}">${grFmt(l[1][k])}${off?`<div style="font-size:11px">${(l[1][k]-f0[k]>0?"+":"")+grFmt(l[1][k]-f0[k])}</div>`:""}</td>`}).join("")}</tr>`).join("");
  const diff="";
  return `<div style="border-top:1px solid var(--line);padding:8px 0"><div><span style="color:${col[c.st]}">${ic[c.st]}</span> <b>${esc(c.name)}</b></div>${c.lines.length?`<div style="overflow-x:auto"><table style="width:100%;font-size:12.5px;border-collapse:collapse;margin-top:4px">${head}${rows}${diff}</table></div>`:""}${c.note?`<div class="m">${esc(c.note)}</div>`:""}</div>`}
async function grSave(rec){rec.at=new Date().toISOString();rec.by=me.id;const body=JSON.parse(JSON.stringify(rec));delete body.id;
  if(grRef)await grRef.doc(rec.id).set(body);else{const k=grItems.findIndex(x=>x.id===rec.id);k>=0?grItems[k]=rec:grItems.push(rec);lset("compliance_gr_v1",grItems)}}
const GR_SLOTS=[["w",["आपकी GST वर्किंग (Excel)","Your GST working (Excel)"],".xlsx,.xls"],["r1",["GSTR-1 (पोर्टल की PDF)","GSTR-1 (portal PDF)"],"application/pdf"],["b3",["GSTR-3B (पोर्टल की PDF)","GSTR-3B (portal PDF)"],"application/pdf"],["b2",["GSTR-2B (पोर्टल की Excel)","GSTR-2B (portal Excel)"],".xlsx,.xls"]];
async function grReadWork(rec,i,f,sheet){const S=await grSheets(f);const L=grWorkSheets(S);const n=sheet&&S[sheet]?sheet:(grPickSheet(S,i.gstin)||L[0]||Object.keys(S)[0]);
  grSt.files[rec.id]={f,S};const w=grParseWork(S[n]||[]);rec.w=Object.assign(w,{file:f.name,sheet:n,sheets:L.length?L:Object.keys(S)})}
function openGr(itemId){grInit();const i=items.find(x=>x.id===itemId);if(!i){closeSheet();return}grSt.id=itemId;const key=grKey(i);const rec=grItems.find(x=>x.id===key)||{id:key,clientId:i.clientId,gstin:i.gstin||"",period:i.period};
  const can=canDo("file"),checks=grChecks(rec),idn=grIdentNotes(rec,i),bad=checks.filter(c=>c.st==="bad"||c.st==="warn").length,okN=checks.filter(c=>c.st==="ok").length;
  openSheet(`<h3>🧮 ${esc(bt("GST जाँच","GST check"))}</h3><div class="m">${esc([i.client,i.gstin,i.period].filter(Boolean).join(" · "))}</div>
   <div class="note" style="margin:8px 0">${esc(bt("चारों फ़ाइलें डालें — ऐप कुल रक़म हेड-वार मिलाएगा (बिल-दर-बिल नहीं)।","Upload the four files — the app compares totals head-wise (not bill by bill)."))}</div>
   ${GR_SLOTS.map(([k,l,acc])=>{const x=rec[k];return `<div style="display:flex;align-items:center;gap:8px;padding:6px 0;border-top:1px solid var(--line)"><span>${x?(x.ok?"✅":"⚠"):"⏳"}</span><div style="flex:1;min-width:0"><div>${esc(bt(l[0],l[1]))}</div><div class="m">${x?esc([x.file,x.sheet].filter(Boolean).join(" · ")):esc(bt("बाक़ी","pending"))}</div>
     ${k==="w"&&x&&x.sheets&&x.sheets.length>1&&can?`<select class="grSh" style="margin-top:4px">${x.sheets.map(n=>`<option ${n===x.sheet?"selected":""}>${esc(n)}</option>`).join("")}</select>`:""}</div>
     ${can?`<label class="btn ghost" style="padding:5px 9px;cursor:pointer">📎<input type="file" class="grF" data-k="${k}" accept="${acc}" hidden></label>`:""}</div>`}).join("")}
   ${can?`<button class="btn ghost" id="grCfgB" style="margin-top:6px">⚙ ${esc(bt("वर्किंग के नाम (अपनी शीट के हिसाब से)","Working names (to match your sheet)"))}</button>`:""}
   <div class="err" id="grErr">${esc(grSt.msg||"")}</div>
   ${idn.length?`<div class="warn" style="margin:8px 0;white-space:pre-wrap">${esc(idn.join("\n"))}</div>`:""}
   <div style="margin-top:10px"><b>${esc(bt("नतीजा","Result"))}</b> <span class="m">${okN} ✔ · ${bad} ✖/⚠</span>${checks.map(grTableHtml).join("")}</div>
   <div class="m" style="margin-top:6px">${esc(bt("₹1.5 तक का फ़र्क़ राउंडिंग मानकर ठीक माना गया है।","Differences up to ₹1.5 are treated as rounding."))}</div>
   <div class="actions"><button class="btn ghost" id="grBk">${esc(bt("‹ काम","‹ Entry"))}</button><button class="btn ghost" id="grX">${esc(t("close"))}</button></div>`,{k:"gr",id:itemId});
  grSt.msg="";$("#grX").onclick=closeSheet;$("#grBk").onclick=()=>openDetail(itemId);const cb=$("#grCfgB");if(cb)cb.onclick=()=>openGrCfg(itemId);
  const sh=document.querySelector("#sheet .grSh");if(sh)sh.onchange=async()=>{const m=grSt.files[key];if(!m){grSt.msg=bt("शीट बदलने के लिए वर्किंग फ़ाइल फिर से डालें","Upload the working again to change the sheet");openGr(itemId);return}
    await grReadWork(rec,i,m.f,sh.value);await grSave(rec);openGr(itemId)};
  document.querySelectorAll("#sheet .grF").forEach(inp=>inp.onchange=async()=>{const f=inp.files[0],k=inp.dataset.k;if(!f)return;grSt.busy=true;$("#grErr").textContent=bt("पढ़ रहा है…","Reading…");
    try{if(k==="w")await grReadWork(rec,i,f);
      else{let x;if(k==="b2")x=grParse2B(await grSheets(f));else{const rows=await grPdfRows(f,i.clientId);if(!rows.length)throw{msg:bt("PDF में लिखावट नहीं है (स्कैन?) — पोर्टल से डाउनलोड की PDF डालें","The PDF has no text (scan?) — upload the PDF downloaded from the portal")};x=k==="b3"?grParse3B(rows):grParse1(rows)}
        x.file=f.name;rec[k]=x;if(!x.ok)grSt.msg=bt("फ़ाइल पढ़ी, पर आँकड़े नहीं मिले — सही फ़ाइल है?","File read but no figures found — is it the right file?")}
      await grSave(rec)}
    catch(e){grSt.msg=e&&e.needPw?t("inW_locked"):(e&&e.msg)||bt("फ़ाइल नहीं पढ़ी जा सकी","The file could not be read")}
    grSt.busy=false;openGr(itemId)})}
/* ⚙ names used in this firm's working */
function openGrCfg(itemId){const i=items.find(x=>x.id===itemId);const key=grKey(i),m=grSt.files[key],rec=grItems.find(x=>x.id===key)||{};const C=grCfg(),U=JSON.parse(JSON.stringify(grCfgU||{}));
  const labs=m&&rec.w?grLabels(m.S[rec.w.sheet]||[]):[];const miss=(rec.w&&rec.w.miss)||[];
  const ord=GR_KEYS.slice().sort((a,b)=>(miss.includes(b[0])?1:0)-(miss.includes(a[0])?1:0));
  openSheet(`<h3>⚙ ${esc(bt("वर्किंग के नाम","Working names"))}</h3><div class="note">${esc(bt("आपकी Excel में हर हिस्से / कॉलम का जो नाम है, वह चुनें या लिखें। यह आपकी फ़र्म के लिए सेव होगा और हर क्लाइंट पर चलेगा।","Pick or type the name each section / column has in your Excel. It is saved for your firm and used for every client."))}${labs.length?"":"<br>"+esc(bt("चुनने की सूची के लिए पहले वर्किंग फ़ाइल डालें।","Upload the working first to get a list to pick from."))}</div>
   ${ord.map(([k,l])=>`<div style="padding:7px 0;border-top:1px solid var(--line)"><div>${miss.includes(k)?"⚠ ":""}<b>${esc(bt(l[0],l[1]))}</b></div><div class="m">${esc(bt("अभी पहचाने जाने वाले नाम: ","Names recognised now: "))}${esc(C[k].slice(0,5).join(" · "))}</div>
     <div style="display:flex;gap:6px;margin-top:4px">${labs.length?`<select class="gcS" data-k="${k}" style="flex:1;min-width:0"><option value="">${esc(bt("— शीट से चुनें —","— pick from sheet —"))}</option>${labs.map(v=>`<option>${esc(v)}</option>`).join("")}</select>`:""}<input class="gcI" data-k="${k}" placeholder="${esc(bt("या लिखें","or type"))}" style="flex:1;min-width:0"></div>
     ${(U[k]||[]).length?`<div class="m">${esc(bt("आपके नाम: ","Your names: "))}${(U[k]||[]).map((v,j)=>`<span class="chip">${esc(v)} <a href="#" class="gcR" data-k="${k}" data-j="${j}">✕</a></span>`).join(" ")}</div>`:""}</div>`).join("")}
   <div class="actions"><button class="btn green" id="gcGo">${esc(t("save"))}</button><button class="btn ghost" id="gcX">${esc(t("cancel"))}</button></div>`,{k:"gr",id:itemId});
  $("#gcX").onclick=()=>openGr(itemId);
  document.querySelectorAll("#sheet .gcR").forEach(a=>a.onclick=async e=>{e.preventDefault();U[a.dataset.k].splice(+a.dataset.j,1);await grCfgSave(U);openGrCfg(itemId)});
  $("#gcGo").onclick=async()=>{GR_KEYS.forEach(([k])=>{[document.querySelector(`#sheet .gcS[data-k="${k}"]`),document.querySelector(`#sheet .gcI[data-k="${k}"]`)].forEach(el=>{const v=el&&el.value.trim();if(v){U[k]=U[k]||[];if(!U[k].some(x=>grNorm(x)===grNorm(v)))U[k].unshift(v)}})});
    await grCfgSave(U);if(m&&rec.id){await grReadWork(rec,i,m.f,rec.w&&rec.w.sheet);await grSave(rec)}toast(bt("✅ सेव हो गया","✅ Saved"));openGr(itemId)}}
const _grOpenDetail=openDetail;openDetail=function(id){_grOpenDetail(id);const i=items.find(x=>x.id===id);if(!i||!/^GSTR-(1|3B)$/.test(i.code)||document.querySelector("#sheet #grB"))return;
  const a=document.querySelector("#sheet .actions");if(!a)return;grInit();const r=grItems.find(x=>x.id===grKey(i));let sub=bt("वर्किंग ↔ GSTR-1 ↔ 3B ↔ 2B","Working ↔ GSTR-1 ↔ 3B ↔ 2B");
  if(r){const c=grChecks(r),b=c.filter(x=>x.st==="bad"||x.st==="warn").length;sub=(b?"⚠ "+b+bt(" जगह फ़र्क़"," differences"):"✔ "+bt("सब मिला","all matched"))+" · "+c.filter(x=>x.st==="ok").length+" ✔"}
  a.insertAdjacentHTML("afterend",`<button class="btn ghost" id="grB" style="width:100%;text-align:left;margin-top:10px">🧮 ${esc(bt("GST जाँच","GST check"))}<div class="m">${esc(sub)}</div></button>`);$("#grB").onclick=()=>openGr(id)};
