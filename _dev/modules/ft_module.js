
/* ===== ft: which services a firm gets (set by the provider) and new updates the firm turns on ===== */
const FTG=[
 {g:"c_gst",n:["GST","GST"],items:[["GSTR-1","GSTR-1 (बिक्री का रिटर्न)","GSTR-1 (outward supplies)"],["GSTR-3B","GSTR-3B (मासिक / तिमाही सार)","GSTR-3B (summary return)"],["PMT-06","PMT-06 (QRMP का मासिक भुगतान)","PMT-06 (QRMP monthly payment)"],["CMP-08","CMP-08 (कंपोज़िशन तिमाही)","CMP-08 (composition quarterly)"],["GSTR-4","GSTR-4 (कंपोज़िशन सालाना)","GSTR-4 (composition annual)"],["GSTR-9","GSTR-9 (सालाना रिटर्न)","GSTR-9 (annual return)"],["GSTR-9C","GSTR-9C (मिलान विवरण)","GSTR-9C (reconciliation)"],["ITC-04","ITC-04 (जॉब वर्क)","ITC-04 (job work)"],["LUT","LUT (निर्यात का बॉन्ड)","LUT (export undertaking)"]]},
 {g:"c_tds",n:["TDS / TCS","TDS / TCS"],items:[["TDS-PAY","TDS / TCS जमा (चालान)","TDS / TCS deposit (challan)"],["TDS-SAL","TDS रिटर्न – वेतन (24Q)","TDS return – salary (24Q)"],["TDS-NON","TDS रिटर्न – वेतन के अलावा (26Q)","TDS return – non-salary (26Q)"],["F16","फ़ॉर्म 16 (वेतन का सर्टिफ़िकेट)","Form 16 (salary certificate)"],["F16A","फ़ॉर्म 16A (TDS सर्टिफ़िकेट)","Form 16A (TDS certificate)"]]},
 {g:"c_it",n:["आयकर","Income tax"],items:[["ITR","आयकर रिटर्न (ITR)","Income-tax return (ITR)"],["TAR","टैक्स ऑडिट रिपोर्ट","Tax audit report"],["ADV","एडवांस टैक्स की किश्तें","Advance-tax instalments"],["ADV3","एडवांस टैक्स (अनुमानित आय, 15 मार्च)","Advance tax (presumptive, 15 March)"]]},
 {g:"c_roc",n:["ROC / कंपनी","ROC / company"],items:[["AOC-4","AOC-4 (वित्तीय विवरण)","AOC-4 (financial statements)"],["MGT-7","MGT-7 / 7A (सालाना रिटर्न)","MGT-7 / 7A (annual return)"],["ADT-1","ADT-1 (ऑडिटर की नियुक्ति)","ADT-1 (auditor appointment)"],["DIR-3","DIR-3 KYC (निदेशक)","DIR-3 KYC (directors)"],["DPT-3","DPT-3 (जमा / ऋण का विवरण)","DPT-3 (return of deposits)"],["LLP-11","LLP फ़ॉर्म 11","LLP Form 11"],["LLP-8","LLP फ़ॉर्म 8","LLP Form 8"],["MSME-1","MSME-1 (छमाही)","MSME-1 (half-yearly)"]]},
 {g:"c_pay",n:["PF · ESI · PT · LWF","PF · ESI · PT · LWF"],items:[["PF","PF (भविष्य निधि)","PF (provident fund)"],["ESI","ESI","ESI"],["PT","प्रोफ़ेशनल टैक्स (PT)","Professional tax (PT)"],["LWF","लेबर वेलफ़ेयर फ़ंड (LWF)","Labour welfare fund (LWF)"]]},
 {g:"c_lic",n:["लाइसेंस और FSSAI","Licences and FSSAI"],items:[["FSSAI","FSSAI रिटर्न (D-1 / D-2)","FSSAI returns (D-1 / D-2)"],["LIC","लाइसेंस का नवीनीकरण","Licence renewals"],["IEC-UPD","IEC का सालाना अपडेट","IEC annual update"]]},
 {g:"c_fs",n:["वित्तीय रिपोर्ट","Financial reports"],items:[["FS","बैलेंस शीट और P&L (सालाना, जाँच सहित)","Balance Sheet & P&L (annual, with checker)"],["UDIN-FS","UDIN (60 दिन में)","UDIN (within 60 days)"],["FR-MIS","मासिक MIS / मैनेजमेंट रिपोर्ट","Monthly MIS / management accounts"],["FR-Q","तिमाही वित्तीय विवरण","Quarterly financial statements"],["FR-STK","बैंक को स्टॉक और देनदारों का विवरण","Stock & debtors statement to bank"],["FR-PROV","प्रोविज़नल बैलेंस शीट (साल के अंत)","Provisional Balance Sheet (year-end)"]]}];
const FTM=[
 {k:"m_nt",n:["📮 नोटिस ट्रैकर","📮 Notice tracker"],d:["नोटिस, केस का इतिहास, रिमाइंडर","Notices, case history, reminders"]},
 {k:"m_ins",n:["🛡 बीमा ट्रैकर","🛡 Insurance tracker"],d:["पॉलिसी, नवीनीकरण के रिमाइंडर","Policies, renewal reminders"]},
 {k:"m_vault",n:["🔐 पासवर्ड तिजोरी","🔐 Password vault"],d:["पोर्टल के लॉगिन सुरक्षित रखना","Safe storage of portal logins"]},
 {k:"m_lu",n:["📰 कानून के नए बदलाव","📰 Law updates"],d:["नए नियम और तारीख़ों के बदलाव","New rules and date changes"]},
 {k:"m_mn",n:["📘 सीखें और सवाल-जवाब","📘 Learn and question bank"],d:["भरने के तरीक़े, सवालों के जवाब, एरर मदद","Filing manuals, answers, error help"]},
 {k:"m_tr",n:["🧮 TDS जाँच","🧮 TDS check"],d:["वर्किंग ↔ चालान ↔ सर्टिफ़िकेट","Working ↔ challans ↔ certificates"]},
 {k:"m_at",n:["🧾 एडवांस टैक्स जाँच","🧾 Advance-tax check"],d:["टैक्स कितना बनता था ↔ कितना भरा","Tax due ↔ tax paid"]}];
/* one flat list: every single compliance (p_<code>) and every feature (m_…) */
const FT=[];FTG.forEach(G=>G.items.forEach(it=>FT.push({k:"p_"+it[0],g:G.g,t:"comp",n:[it[1],it[2]],d:[G.n[0],G.n[1]]})));FTM.forEach(x=>FT.push(Object.assign({t:"mod"},x)));
window.__FT={groups:FTG,mods:FTM,all:FT};
let ftSeen=null,ftRef=null,itemsRaw=null;
const ftSite=()=>window.__site&&window.__site.firm?window.__site.firm:null;
const ftG=k=>{const f=FT.find(x=>x.k===k);return f&&f.g||""};
function ftAllowed(k){const f=ftSite();if(!f)return true;const m=f.features;if(!m)return true;if(m[k]!==undefined)return m[k]===true;const g=ftG(k);return g?m[g]===true:false}
const ftSeenHas=k=>!ftSeen||!!ftSeen[k]||!!(ftG(k)&&ftSeen[ftG(k)]);
function ftOn(k){const f=ftSite();if(!f)return true;if(!ftAllowed(k))return false;return ftSeenHas(k)}
function ftKeyOfCode(code){code=String(code||"");if(/^NOTICE-/.test(code))return"m_nt";if(/^INS-/.test(code))return"m_ins";
  const base=/^PT-/.test(code)?"PT":/^LWF-/.test(code)?"LWF":/^LIC-/.test(code)?"LIC":/^FSSAI-/.test(code)?"FSSAI":/^MSME-1/.test(code)?"MSME-1":code;return FT.some(x=>x.k==="p_"+base)?"p_"+base:""}
const ftItemOn=i=>{const k=ftKeyOfCode(i.code);return !k||ftOn(k)};
function ftNew(){if(!ftSite()||!ftSeen)return[];return FT.filter(f=>ftAllowed(f.k)&&!ftSeenHas(f.k))}
function ftRefresh(){try{ftPrune()}catch(e){}if(itemsRaw){items=itemsRaw.filter(ftItemOn)}try{render()}catch(e){}}
window.ftRefresh=ftRefresh;
function ftInit(){if(ftInit.done||!ftSite()||!appDb)return;ftInit.done=true;ftRef=appDb.doc("settings/features");
  ftRef.onSnapshot(async d=>{if(d.exists){ftSeen=(d.data()||{}).seen||{};ftPrune();ftRefresh();return}
    /* first time: everything the firm has today is simply on; only later additions come as updates */
    const seen={};FT.forEach(f=>{if(ftAllowed(f.k))seen[f.k]=new Date().toISOString()});ftSeen=seen;ftRefresh();if(myRole()==="admin"){try{await ftRef.set({seen,at:Date.now()})}catch(e){}}},()=>{})}
/* something the provider took away is forgotten here, so if it is given again it arrives as a fresh update */
function ftPrune(){if(!ftSeen||!ftRef||myRole()!=="admin")return;const gone=Object.keys(ftSeen).filter(k=>/^[pm]_/.test(k)&&!ftAllowed(k));if(!gone.length)return;const seen=Object.assign({},ftSeen);gone.forEach(k=>delete seen[k]);ftSeen=seen;ftRef.set({seen,at:Date.now()}).catch(()=>{})}
function ftApplyUi(){const f=ftSite();if(!f)return;ftInit();
  [["nNt","m_nt"],["nIns","m_ins"],["nVault","m_vault"],["nLu","m_lu"],["nMn","m_mn"]].forEach(([id,k])=>{const e=document.getElementById(id);if(e)e.style.display=ftOn(k)?"":"none"});
  const d=document.getElementById("dash");if(!d||d.hidden)return;let b=document.getElementById("ftBan");const N=ftNew();
  if(!N.length){if(b)b.remove();return}if(!b){b=document.createElement("div");b.id="ftBan";b.className="note";b.style.cssText="background:#e8f5e9;cursor:pointer;margin-bottom:10px";d.insertBefore(b,d.firstChild)}
  b.innerHTML=`<b>🆕 ${N.length} ${esc(bt("नया अपडेट उपलब्ध","new update(s) available"))}</b>: ${esc(N.slice(0,4).map(x=>bt(x.n[0],x.n[1])).join(", "))}${N.length>4?" …":""} — <u>${esc(bt("देखें और चालू करें","see and turn on"))}</u>`;b.onclick=openFt}
function openFt(){const f=ftSite();if(!f)return;const adm=myRole()==="admin",N=ftNew().map(x=>x.k);
  const row=x=>{const al=ftAllowed(x.k),on=ftOn(x.k),nw=N.includes(x.k);return `<div class="item" style="cursor:default"><div class="main"><div class="t">${esc(bt(x.n[0],x.n[1]))} ${nw?`<span class="badge b-late">${esc(bt("नया","new"))}</span>`:""}</div>${x.t==="mod"?`<div class="m">${esc(bt(x.d[0],x.d[1]))}</div>`:""}</div>
    ${on?`<span style="color:var(--green);white-space:nowrap">✔ ${esc(bt("चालू","on"))}</span>`:nw?(adm?`<button class="btn ftOk" data-k="${x.k}">${esc(bt("चालू करें","Turn on"))}</button>`:`<span class="m">${esc(bt("एडमिन चालू करेंगे","admin will turn on"))}</span>`):`<span class="m" style="white-space:nowrap">🔒 ${esc(bt("आपकी सेवा में नहीं","not in your plan"))}</span>`}</div>`};
  openSheet(`<h3>${esc(bt("🧩 आपकी सेवाएँ और अपडेट","🧩 Your services and updates"))}</h3><div class="m">${esc(f.name||"")}</div>
   ${N.length?`<div class="note" style="background:#e8f5e9">${esc(bt("नीचे \"नया\" लिखी चीज़ें आपके लिए खोली गई हैं। \"चालू करें\" दबाते ही वे ऐप में आ जाएँगी।","Items marked \"new\" have been opened for you. Tap \"Turn on\" and they appear in the app."))}</div>`:""}
   ${FTG.map(G=>`<h2>${esc(bt(G.n[0],G.n[1]))}</h2>`+FT.filter(x=>x.g===G.g).map(row).join("")).join("")}<h2>${esc(bt("सुविधाएँ","Features"))}</h2>${FT.filter(x=>x.t==="mod").map(row).join("")}
   <div class="m" style="margin-top:8px">${esc(bt("🔒 वाली चीज़ें चाहिए हों तो ऐप चलाने वाले से संपर्क करें","To get the 🔒 items, contact the app provider"))}${window.__site.support?": "+esc(window.__site.support):""}</div>
   <div class="actions">${adm&&N.length>1?`<button class="btn" id="ftAll">${esc(bt("सब चालू करें","Turn on all"))}</button>`:""}<button class="btn ghost" id="ftX">${esc(t("close"))}</button></div>`,{k:"ft"});
  $("#ftX").onclick=closeSheet;const ok=async ks=>{const seen=Object.assign({},ftSeen||{});ks.forEach(k=>seen[k]=new Date().toISOString());ftSeen=seen;try{await ftRef.set({seen,at:Date.now(),by:me.id||""})}catch(e){toast(t("saveFail"))}ftRefresh();openFt()};
  document.querySelectorAll(".ftOk").forEach(b=>b.onclick=()=>ok([b.dataset.k]));const al=$("#ftAll");if(al)al.onclick=()=>ok(N)}
/* wiring: the app shows only what is on */
const _ftRender=render;render=function(){_ftRender();try{ftApplyUi()}catch(e){}};
const _ftGenerate=generate;generate=function(p,s,to){return _ftGenerate(p,s,to).filter(x=>ftItemOn(x))};
const _ftOpenClient=openClient;openClient=function(pid){_ftOpenClient(pid);if(!ftSite())return;[["trCB","m_tr"],["atCB","m_at"],["ntCB","m_nt"],["inCB","m_ins"]].forEach(([id,k])=>{const e=document.querySelector("#sheet #"+id);if(e&&!ftOn(k))e.remove()})};
const _ftRenderTeam=renderTeam;renderTeam=function(){_ftRenderTeam();const el=document.getElementById("team");if(!ftSite()||!el||el.hidden||el.querySelector("#ftOpen"))return;el.insertAdjacentHTML("afterbegin",`<button class="btn ghost" id="ftOpen" style="width:100%;text-align:left;margin-bottom:10px">${esc(bt("🧩 आपकी सेवाएँ और अपडेट","🧩 Your services and updates"))}${ftNew().length?` <span class="badge b-late">${ftNew().length} ${esc(bt("नया","new"))}</span>`:""}</button>`);$("#ftOpen").onclick=openFt};
