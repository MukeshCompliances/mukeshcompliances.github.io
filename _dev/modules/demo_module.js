/* ================= 🧪 demo mode (sample data, kept apart from real data) + self-check ================= */
Object.assign(I18N.hi,{dmB:"🧪 डेमो चलाएँ — सब कुछ एक साथ जाँचें",dmTxt:"नमूना क्लाइंट, कंप्लायंस, बीमा, नोटिस वगैरह के साथ ऐप खुलेगा। असली डेटा पर कोई असर नहीं।",dmBanner:"🧪 डेमो मोड — ये नमूना डेटा है, असली डेटा सुरक्षित है",dmCheck:"🔎 सब जाँचें",dmExit:"डेमो बंद करें",dmReset:"नमूना डेटा दोबारा भरें",dmT:"🔎 पूरे ऐप की जाँच",dmRun:"जाँच चल रही है…",dmPass:"✔ ठीक",dmFail:"✖ दिक्कत",dmWarn:"⚠ देखें",dmSum:"{p} ठीक · {w} देखें · {f} दिक्कत",dmAllOk:"सब ठीक चल रहा है 👍",dmTour:"डेमो में क्या-क्या देखें",dmNoFiles:"डेमो में फ़ाइलें सेव नहीं होतीं — बाकी सब असली जैसा चलता है।",dmAgain:"दोबारा जाँचें",dmCopy:"📋 नतीजा कॉपी करें"});
Object.assign(I18N.en,{dmB:"🧪 Run demo — check everything together",dmTxt:"Opens the app with sample clients, compliances, insurance, notices and more. Real data is not touched.",dmBanner:"🧪 Demo mode — this is sample data; your real data is safe",dmCheck:"🔎 Check everything",dmExit:"Exit demo",dmReset:"Reload sample data",dmT:"🔎 Full app check",dmRun:"Checking…",dmPass:"✔ OK",dmFail:"✖ Problem",dmWarn:"⚠ Look",dmSum:"{p} OK · {w} to look at · {f} problems",dmAllOk:"Everything works 👍",dmTour:"What to try in the demo",dmNoFiles:"Files are not stored in the demo — everything else works like the real app.",dmAgain:"Check again",dmCopy:"📋 Copy result"});
Object.keys(I18N.en).filter(k=>/^dm/.test(k)).forEach(k=>{if(!I18N.zh[k])I18N.zh[k]=I18N.en[k]});
Object.assign(I18N.zh,{dmB:"🧪 运行演示——一次检查全部功能",dmBanner:"🧪 演示模式——示例数据，真实数据不受影响",dmCheck:"🔎 全部检查",dmExit:"退出演示"});

function demoEnter(){try{sessionStorage.setItem("cr_demo","1")}catch(e){}location.hash="demo";location.reload()}
function demoExit(){try{sessionStorage.removeItem("cr_demo")}catch(e){}history.replaceState(null,"",location.pathname+location.search);location.reload()}
function demoClear(){try{Object.keys(localStorage).filter(k=>k.startsWith("demo_")).forEach(k=>localStorage.removeItem(k))}catch(e){}}
function demoSeed(force){
  if(!force&&lget(PKEY,"[]").length)return;
  demoClear();
  const td=todayStr(),add=n=>{const d=new Date(td+"T00:00:00");d.setDate(d.getDate()+n);return d.toISOString().slice(0,10)};
  const P=[
   {id:"demo_p1",name:"DEMO ABC CHEMICALS PRIVATE LIMITED",entity:"pvt",cin:"U24100MH2015PTC260001",pan:"AABCD1234E",tan:true,tanNo:"MUMD12345E",tdsSal:true,tdsNon:true,audit:true,advTax:true,msme:true,dpt3:true,adt1:false,pf:true,pfCode:"MHBAN0012345000",esi:true,esiCode:"31000123450001001",iec:"AABCD1234E",hasIec:true,lut:true,assignee:"Ravi (junior)",
    gsts:[{gstin:"27AABCD1234E1Z5",type:"regular",freq:"monthly"},{gstin:"06AABCD1234E1Z9",type:"regular",freq:"monthly"}],
    prof:{acts:["mfg","export","jobwork"],to:"o10",emp:45,locs:[{st:"27",kind:"factory",city:"Pune",emp:30},{st:"06",kind:"warehouse",city:"Gurugram",emp:15}],lic:[{type:"factory",no:"FL/PUNE/889",exp:add(40)},{type:"pcb",no:"CTO-2231",exp:add(200)}]},docs:[]},
   {id:"demo_p2",name:"DEMO SHARMA TRADERS",entity:"prop",pan:"BXYPS4321K",tan:false,audit:false,advTax:true,assignee:"Ravi (junior)",
    gsts:[{gstin:"07BXYPS4321K1Z3",type:"regular",freq:"quarterly"}],prof:{acts:["trade"],to:"1to2",emp:3,locs:[{st:"07",kind:"shop",city:"Delhi",emp:3}],lic:[]},docs:[]},
   {id:"demo_p3",name:"DEMO XYZ CONSULTING LLP",entity:"llp",llpin:"ABC-1234",pan:"AAKFX9876Q",tan:true,tanNo:"BLRX54321A",tdsSal:true,tdsNon:true,audit:false,advTax:true,pf:false,esi:true,esiCode:"53000987650001001",assignee:"Neha (senior)",
    gsts:[{gstin:"29AAKFX9876Q1Z2",type:"regular",freq:"monthly"}],prof:{acts:["service"],to:"2to5",emp:12,locs:[{st:"29",kind:"office",city:"Bengaluru",emp:12}],lic:[]},docs:[]}];
  lset(PKEY,P);parties=P;
  /* compliances from 1 April 2026; most past ones filed with proof, a few left late so the dashboard has something to show */
  const now=new Date().toISOString(),list=[];
  P.forEach(p=>generate(p,DEFAULT_START,add(120).slice(0,7)).forEach(o=>{const it=makeEntry(p,o,now,true,td);
    if(it.status==="filed_noproof"){it.status="filed_proof";it.arn=needsArn(it)?"AA"+String(Math.floor(1e12+Math.random()*9e12)):"";it.filingDate=o.due;it.proofs=[{id:"demo_file",name:(o.code||"proof")+".pdf"}]}
    list.push(it)}));
  /* leave a handful late / proof pending */
  const past=list.filter(i=>i.dueDate<td).sort((a,b)=>b.dueDate.localeCompare(a.dueDate));
  past.slice(0,3).forEach(i=>{i.status="pending";i.arn="";i.proofs=[];i.filingDate=""});
  past.slice(3,5).forEach(i=>{i.status="filed_noproof";i.proofs=[]});
  lset(LKEY,list);items=list;
  /* insurance */
  const IN=[{id:"demo_i1",kind:"policy",type:"fire",clientId:"demo_p1",client:P[0].name,f:{insurer:"New India Assurance",policyNo:"DEMO/FIRE/2025/001",insured:P[0].name,start:add(-345),end:add(20),sum:"250000000",premium:"38940",gstin:"27AABCD1234E1Z5",location:"Plot 12, MIDC, Pune",items:"Building, plant & machinery, stock",perils:"STFI, earthquake",hypo:"",addons:""},found:{},missing:["hypo","addons"],warn:[],status:"active",hist:[],by:"local",at:Date.now()},
    {id:"demo_i2",kind:"policy",type:"ec",clientId:"demo_p1",client:P[0].name,f:{insurer:"ICICI Lombard",policyNo:"DEMO/EC/2026/77",insured:P[0].name,start:add(-60),end:add(305),sum:"",premium:"12400",emps:"45",wages:"₹1.6 crore",location:"Pune"},found:{},missing:["sum","gstin"],warn:[],status:"active",hist:[],by:"local",at:Date.now()}];
  lset("compliance_ins_v1",IN);insItems=IN;
  /* notices */
  const NT=[{id:"demo_n1",dept:"gst",clientId:"demo_p1",client:P[0].name,f:{ref:"ZD2711260099999",form:"DRC-01A",noticeDate:add(-10),dueDate:add(5),hearing:"",period:"2023-24",amount:"245600",section:"73(5)",officer:"Superintendent, Range-4, Pune",gstin:"27AABCD1234E1Z5",summary:"FY 2023-24 में GSTR-3B में लिया ITC, GSTR-2A से ₹2,45,600 ज़्यादा है। टैक्स भरें या 15 दिन में जवाब दें।"},
     issues:["3B और 2A के ITC में अंतर ₹2,45,600"],docs:["FY 2023-24 का 2A बनाम बुक्स मिलान","सप्लायरों के इनवॉइस","सप्लायरों की GSTR-1 फ़ाइलिंग की स्थिति"],status:"new",assignee:"Ravi (junior)",draft:"",facts:"",text:"FORM GST DRC-01A ... Reference No ZD2711260099999 ... reply on or before ...",log:[{k:"created",by:"local",at:Date.now()}],by:"local",at:Date.now()},
    {id:"demo_n2",dept:"it",clientId:"demo_p3",client:P[2].name,f:{ref:"ITBA/AST/S/2026-27/1000012345(1)",form:"Scrutiny notice",noticeDate:add(-25),dueDate:add(-2),period:"AY 2025-26",amount:"",section:"",officer:"Faceless Assessment Unit",gstin:"AAKFX9876Q",summary:"AY 2025-26 की रिटर्न स्क्रूटिनी में है — बैंक की बड़ी जमा राशि और खर्चों के कागज़ माँगे हैं।"},
     issues:["₹38 लाख नकद जमा का स्रोत","प्रोफ़ेशनल फ़ीस के ख़र्च के बिल"],docs:["बैंक स्टेटमेंट","ख़र्च के बिल","लेजर"],status:"work",assignee:"Neha (senior)",draft:"",facts:"",text:"",log:[{k:"created",by:"local",at:Date.now()}],by:"local",at:Date.now()}];
  lset("compliance_nt_v1",NT);ntItems=NT;
  /* law updates and an error case */
  lset("compliance_lu_v1",[{id:"demo_l1",cat:"pf",date:"2026-09-17",eff:"2026-09-17",number:"S.O. 5109(E)",source:"MoLE",impact:"high",title:{hi:"PF की वेतन सीमा ₹25,000 (डेमो)",en:"PF wage ceiling ₹25,000 (demo)"},sum:{hi:"₹25,000 तक वेतन वालों को PF में जोड़ना ज़रूरी।",en:"Employees up to ₹25,000 must be covered."},readBy:{}},
    {id:"demo_l2",cat:"it",date:"2026-09-28",number:"Circular 07/2026",source:"CBDT",impact:"high",title:{hi:"ऑडिट वाले ITR की तारीख 21 नवंबर (डेमो)",en:"Audit-case ITR due 21 Nov (demo)"},sum:{hi:"टैक्स ऑडिट 21 अक्टूबर, ITR 21 नवंबर 2026।",en:"Tax audit 21 Oct, ITR 21 Nov 2026."},readBy:{}}]);
  lset("compliance_errs_v1",[{id:"demo_e1",k:"GSTR-1",desc:"GSTR-1 में B2B सेव करते समय 'Invalid GSTIN of recipient'",imgs:[],answer:"1) ग्राहक का GSTIN गलत या रद्द है।\n2) GST पोर्टल पर Search Taxpayer में GSTIN जाँचें।\n3) सही GSTIN डालें; रद्द हो तो बिल B2C में डालें।",by:"local",at:Date.now(),worked:["local"],solved:true}]);
}
function demoAfter(){
  const b=$("#banner");b.innerHTML=`<div style="display:flex;flex-wrap:wrap;gap:8px;align-items:center;justify-content:space-between"><span>${esc(t("dmBanner"))}</span><span><button class="btn" id="dmChk" style="padding:4px 10px">${esc(t("dmCheck"))}</button> <button class="btn ghost" id="dmRs" style="padding:4px 10px">${esc(t("dmReset"))}</button> <button class="btn ghost" id="dmEx" style="padding:4px 10px">${esc(t("dmExit"))}</button></span></div>`;
  b.style.display="block";b.style.background="#efe7ff";b.style.color="#4b2a99";
  $("#dmChk").onclick=demoCheck;$("#dmEx").onclick=demoExit;$("#dmRs").onclick=()=>{demoSeed(true);location.reload()};
  if(window.claude&&claude.use)claude.use("sample").then(s=>{sampleCap=s}).catch(()=>{});
}
function demoBtnHtml(){return DEMO?"":`<div class="note" style="margin-top:14px"><div class="m">${esc(t("dmTxt"))}</div><button class="btn ghost" id="dmGo" style="margin-top:6px;width:100%">${esc(t("dmB"))}</button></div>`}
/* ---------- self-check ---------- */
async function demoCheck(){
  openSheet(`<h3>${esc(t("dmT"))}</h3><div id="dmOut" class="m">${esc(t("dmRun"))}</div>`,{k:"dmcheck"});
  const R=[],ok=(g,n,d)=>R.push({s:"p",g,n,d:d||""}),bad=(g,n,d)=>R.push({s:"f",g,n,d:d||""}),warn=(g,n,d)=>R.push({s:"w",g,n,d:d||""});
  const errs=[];const onErr=e=>errs.push(String(e.message||e.reason||e));window.addEventListener("error",onErr);window.addEventListener("unhandledrejection",onErr);
  const B=(hi,en)=>bt(hi,en);
  const sheetHtml=$("#sheet").innerHTML;
  /* 1. every tab opens */
  const views=["dash","list","clients","vault","docs","nt","ins","lu","mn","team"];
  for(const v of views){const before=errs.length;try{show(v);await new Promise(r=>setTimeout(r,30));const el=$("#"+v);
      if(el&&el.innerHTML.trim().length>20&&errs.length===before)ok(B("टैब","Tabs"),B("खुलता है: ","Opens: ")+v);else bad(B("टैब","Tabs"),B("नहीं खुला: ","Did not open: ")+v,errs.slice(before).join("; "))}catch(e){bad(B("टैब","Tabs"),v,String(e))}}
  show("dash");
  /* 2. compliance generation per client */
  const need={pvt:["gst","tds","it","roc","pf","pt","lic","iex"],prop:["gst","it"],llp:["gst","tds","it","roc","pf","pt"]};
  for(const p of parties){let g;try{g=generate(p,DEFAULT_START,"2027-03")}catch(e){bad(B("कंप्लायंस बनना","Generation"),p.name,String(e));continue}
    const cats=new Set(g.map(o=>groupOf({category:o.cat,code:o.code})));const miss=(need[p.entity]||[]).filter(c=>!cats.has(c));
    if(!g.length)bad(B("कंप्लायंस बनना","Generation"),p.name,B("एक भी नहीं बना","none created"));
    else if(miss.length)warn(B("कंप्लायंस बनना","Generation"),p.name+` (${g.length})`,B("ये क्षेत्र नहीं बने: ","Areas missing: ")+miss.map(c=>t("grp_"+c)).join(", "));
    else ok(B("कंप्लायंस बनना","Generation"),p.name,g.length+B(" कंप्लायंस, सारे क्षेत्र: "," compliances, areas: ")+[...cats].map(c=>t("grp_"+c)).join(", "));
    const keys=g.map(o=>genKeyOf(p.id,o));const dup=keys.length-new Set(keys).size;if(dup)bad(B("कंप्लायंस बनना","Generation"),p.name,dup+B(" डुप्लिकेट"," duplicates"));
  }
  /* 3. due-date rules (spot checks against the rules researched in Nov 2026) */
  const due=(pid,code,period,gi)=>{const p=parties.find(x=>x.id===pid);if(!p)return null;const o=generate(p,DEFAULT_START,"2027-06").find(o=>o.code===code&&o.period===period&&(!gi||o.gi===gi));return o?o.due:null};
  const expect=[["demo_p1","GSTR-3B","Oct 2026","27AABCD1234E1Z5","2026-11-20","GSTR-3B monthly → 20th"],["demo_p1","GSTR-1","Oct 2026","27AABCD1234E1Z5","2026-11-11","GSTR-1 monthly → 11th"],
    ["demo_p1","TDS-PAY","Oct 2026","","2026-11-07","TDS deposit → 7th"],["demo_p1","TDS-PAY","Mar 2027","","2027-04-30","March TDS → 30 April"],["demo_p1","PF","Oct 2026","","2026-11-15","PF → 15th"],
    ["demo_p1","PT-27","Oct 2026","","2026-11-15","Maharashtra PT → 15th"],["demo_p3","PT-29","Oct 2026","","2026-11-20","Karnataka PT → 20th"]];
  expect.forEach(([pid,code,per,gi,want,lab])=>{const got=due(pid,code,per,gi);if(got===want)ok(B("ड्यू डेट नियम","Due-date rules"),lab,fmt(got));else if(got===null)warn(B("ड्यू डेट नियम","Due-date rules"),lab,B("एंट्री नहीं मिली","entry not found"));else bad(B("ड्यू डेट नियम","Due-date rules"),lab,B("मिली ","got ")+fmt(got)+B(", चाहिए ",", expected ")+fmt(want))});
  {const p2=parties.find(x=>x.id==="demo_p2");if(p2){const g=generate(p2,DEFAULT_START,"2027-03").filter(o=>o.code==="GSTR-3B");const d=g[0]&&g[0].due.slice(8);
    if(d==="24")ok(B("ड्यू डेट नियम","Due-date rules"),"QRMP GSTR-3B Delhi → 24th",fmt(g[0].due));else if(d==="22")bad(B("ड्यू डेट नियम","Due-date rules"),"QRMP GSTR-3B Delhi","22nd ≠ 24th");else warn(B("ड्यू डेट नियम","Due-date rules"),"QRMP GSTR-3B Delhi",d?d+"th":B("नहीं मिली","not found"))}}
  /* 4. which compliances apply and why */
  {const p=parties.find(x=>x.id==="demo_p1");if(p){const A=applic(p),f=(re,st)=>A.find(r=>re.test(r.title)&&r.st===st);
    f(/Maharashtra/,"yes")?ok(B("लागू है या नहीं","Applicability"),B("Maharashtra PT लागू","Maharashtra PT applies")):bad(B("लागू है या नहीं","Applicability"),"Maharashtra PT");
    f(/Haryana/,"no")?ok(B("लागू है या नहीं","Applicability"),B("Haryana PT लागू नहीं","Haryana PT does not apply")):bad(B("लागू है या नहीं","Applicability"),"Haryana PT");
    A.find(r=>r.title==="ITC-04"&&r.st==="yes")?ok(B("लागू है या नहीं","Applicability"),B("जॉब-वर्क → ITC-04","Job work → ITC-04")):bad(B("लागू है या नहीं","Applicability"),"ITC-04")}
   const s=parties.find(x=>x.id==="demo_p2");if(s){const A=applic(s);A.find(r=>r.cat==="roc"&&r.st==="no")?ok(B("लागू है या नहीं","Applicability"),B("प्रोपराइटर → ROC नहीं","Proprietor → no ROC")):bad(B("लागू है या नहीं","Applicability"),"Proprietor ROC")}}
  /* 5. document readers (built-in, without Claude) */
  {const x=insRegex("The New India Assurance Co. Ltd. Policy Schedule Policy No: 31020011260100000123 Name of Insured: DEMO ABC CHEMICALS PRIVATE LIMITED Period of Insurance: From 01/12/2025 to 30/11/2026 Total Sum Insured: 2,50,00,000 Perils: Fire, STFI, Earthquake Total Premium (incl. GST): 38,940","policy","fire");
    const got=[x.f.insurer&&"insurer",x.f.policyNo&&"policyNo",x.f.end==="2026-11-30"&&"end",x.f.sum==="25000000"&&"sum",x.f.premium==="38940"&&"premium",x.found.perils&&"perils"].filter(Boolean);
    got.length===6?ok(B("बीमा पॉलिसी पढ़ना","Policy reader"),B("नमूना पॉलिसी की 6/6 चीज़ें मिलीं","6/6 fields from a sample policy")):bad(B("बीमा पॉलिसी पढ़ना","Policy reader"),got.length+"/6",JSON.stringify(x.f));
    x.dtype==="fire"?ok(B("बीमा पॉलिसी पढ़ना","Policy reader"),B("पॉलिसी का प्रकार पहचाना: फ़ायर","Type detected: fire")):warn(B("बीमा पॉलिसी पढ़ना","Policy reader"),B("प्रकार नहीं पहचाना","Type not detected"),x.dtype)}
  {const x=ntRegex("FORM GST DRC-01A Intimation under section 73(5) Reference No: ZD0611260012345 Date: 05/11/2026 GSTIN: 27AABCD1234E1Z5 Tax period: F.Y. 2023-24 Total demand of Rs. 2,45,600 You are requested to pay or file reply on or before 20/11/2026.");
    const got=[x.f.ref==="ZD0611260012345"&&"ref",x.f.form==="DRC-01A"&&"form",x.f.dueDate==="2026-11-20"&&"due",x.f.amount==="245600"&&"amount",x.dept==="gst"&&"dept"].filter(Boolean);
    got.length===5?ok(B("नोटिस पढ़ना","Notice reader"),B("नमूना नोटिस की 5/5 चीज़ें मिलीं","5/5 fields from a sample notice")):bad(B("नोटिस पढ़ना","Notice reader"),got.length+"/5",JSON.stringify(x.f))}
  /* 6. reminders exist for insurance and notices */
  {const fire=insItems.find(r=>r.id==="demo_i1");if(fire){await insRemind(fire);items.some(i=>/^INS-fire/.test(i.code))?ok(B("रिमाइंडर","Reminders"),B("बीमा रिन्यूअल का काम बना","Insurance renewal task created")):bad(B("रिमाइंडर","Reminders"),B("बीमा रिन्यूअल","Insurance renewal"))}
   const n1=ntItems.find(r=>r.id==="demo_n1");if(n1){await ntRemind(n1);items.some(i=>/^NOTICE-GST/.test(i.code))?ok(B("रिमाइंडर","Reminders"),B("नोटिस के जवाब का काम बना","Notice reply task created")):bad(B("रिमाइंडर","Reminders"),B("नोटिस रिमाइंडर","Notice reminder"))}
   const alerts=[ntAlertN(),inAlertN()];alerts[0]&&alerts[1]?ok(B("रिमाइंडर","Reminders"),B("डैशबोर्ड पर चेतावनी: ","Dashboard alerts: ")+`📮 ${alerts[0]} · 🛡 ${alerts[1]}`):warn(B("रिमाइंडर","Reminders"),B("डैशबोर्ड चेतावनी","Dashboard alerts"),alerts.join(" / "))}
  /* 7. a manual for every compliance the app creates */
  {const codes=[...new Set(items.map(i=>i.code))];const miss=codes.filter(c=>!mnKey(c));
    miss.length?warn(B("मैनुअल","Manuals"),miss.length+B(" कंप्लायंस का मैनुअल नहीं"," compliances without a manual"),miss.slice(0,12).join(", ")):ok(B("मैनुअल","Manuals"),B(`सारे ${codes.length} तरह के कंप्लायंस का मैनुअल है`,`All ${codes.length} compliance types have a manual`))}
  /* 8. search */
  {const box=$("#gsRes");try{gsRun("DRC");const h=box.innerText;(/DRC/.test(h))?ok(B("खोज","Search"),B("'DRC' खोजने पर नोटिस मिला","'DRC' finds the notice")):bad(B("खोज","Search"),"DRC");gsRun("New India");/New India/.test(box.innerText)?ok(B("खोज","Search"),B("बीमा कंपनी के नाम से पॉलिसी मिली","Policy found by insurer name")):bad(B("खोज","Search"),"New India")}catch(e){bad(B("खोज","Search"),String(e))}finally{gsClose()}}
  /* 9. each sheet opens without error */
  const sheets=[["openClient","demo_p1"],["openApplic","demo_p1"],["openInsDetail","demo_i1"],["openNtDetail","demo_n1"],["openManual","GSTR-3B"],["openDetail",(items[0]||{}).id],["openErrList"],["openInsUpload"],["openNtUpload"],["luOpen","demo_l1"]];
  for(const [fn,arg] of sheets){const before=errs.length;try{await window[fn]&&window[fn](arg);await new Promise(r=>setTimeout(r,20));errs.length===before?ok(B("स्क्रीन","Screens"),fn):bad(B("स्क्रीन","Screens"),fn,errs.slice(before).join("; "))}catch(e){bad(B("स्क्रीन","Screens"),fn,String(e))}}
  /* 10. translations */
  {const H=Object.keys(I18N.hi),E=new Set(Object.keys(I18N.en)),Z=new Set(Object.keys(I18N.zh));const mE=H.filter(k=>!E.has(k)),mZ=H.filter(k=>!Z.has(k));
    mE.length?warn(B("भाषा","Languages"),mE.length+B(" शब्द English में नहीं"," keys missing in English"),mE.slice(0,10).join(", ")):ok(B("भाषा","Languages"),B("हिंदी → English पूरा","Hindi → English complete"));
    mZ.length?warn(B("भाषा","Languages"),mZ.length+B(" शब्द 中文 में नहीं (English दिखेगा)"," keys missing in Chinese (English shown)"),mZ.slice(0,10).join(", ")):ok(B("भाषा","Languages"),B("中文 पूरा","Chinese complete"))}
  /* 11. Claude connection */
  if(sampleCap){ok("Claude",B("Claude से जुड़ा है — पॉलिसी/नोटिस पढ़ना, ड्राफ़्ट, एरर हल चलेंगे","Connected — policy/notice reading, drafts, error fixes available"))}else warn("Claude",B("Claude नहीं जुड़ा (ऐप Claude के बाहर खुला है) — AI वाले बटन नहीं चलेंगे","Not connected (opened outside Claude) — AI buttons won't work"));
  if(errs.length)bad(B("सामान्य","General"),errs.length+B(" JavaScript एरर"," JavaScript errors"),[...new Set(errs)].slice(0,5).join(" | "));else ok(B("सामान्य","General"),B("कोई JavaScript एरर नहीं","No JavaScript errors"));
  window.removeEventListener("error",onErr);window.removeEventListener("unhandledrejection",onErr);
  demoShow(R);
}
function demoShow(R){
  const p=R.filter(r=>r.s==="p").length,w=R.filter(r=>r.s==="w").length,f=R.filter(r=>r.s==="f").length;
  const groups=[...new Set(R.map(r=>r.g))];
  const txt=R.map(r=>`${r.s==="p"?"✔":r.s==="w"?"⚠":"✖"} [${r.g}] ${r.n}${r.d?" — "+r.d:""}`).join("\n");
  openSheet(`<h3>${esc(t("dmT"))}</h3><div class="note" style="background:${f?"#fdecec":w?"#fff6e0":"var(--green-soft)"}"><b>${esc(t("dmSum",{p,w,f}))}</b>${!f&&!w?"<br>"+esc(t("dmAllOk")):""}</div>
   ${groups.map(g=>`<h2>${esc(g)}</h2>`+R.filter(r=>r.g===g).sort((a,b)=>"fwp".indexOf(a.s)-"fwp".indexOf(b.s)).map(r=>`<div style="padding:5px 0;border-bottom:1px solid var(--line)"><span style="color:${r.s==="p"?"var(--green)":r.s==="w"?"var(--amber,#9a6700)":"var(--red)"}">${r.s==="p"?"✔":r.s==="w"?"⚠":"✖"}</span> ${esc(r.n)}${r.d?`<div class="m">${esc(r.d)}</div>`:""}</div>`).join("")).join("")}
   <div class="m" style="margin-top:10px">${esc(t("dmNoFiles"))}</div>
   <h2>${esc(t("dmTour"))}</h2><ol style="margin:4px 0 0 20px;padding:0">${(lang==="hi"?["📊 डैशबोर्ड: लेट काम, नोटिस (5 दिन) और बीमा (20 दिन) की चेतावनी","🏢 क्लाइंट → DEMO ABC → 📋 क्या लागू है और क्यों","📮 नोटिस → DRC-01A → तथ्य लिखकर 🤖 ड्राफ़्ट बनाएँ","🛡 बीमा → फ़ायर पॉलिसी → 🔁 रिन्यू करके देखें","📘 सीखें → GSTR-3B मैनुअल → 🆘 एरर","🔍 ऊपर खोज में 'DRC' या 'New India' लिखें","सबसे ऊपर भाषा बदलकर English / 中文 देखें"]:["📊 Dashboard: late work, notice (5 days) and insurance (20 days) alerts","🏢 Clients → DEMO ABC → 📋 What applies and why","📮 Notices → DRC-01A → add facts → 🤖 Draft","🛡 Insurance → fire policy → try 🔁 Renew","📘 Learn → GSTR-3B manual → 🆘 Error","🔍 Search 'DRC' or 'New India'","Switch language to English / 中文 at the top"]).map(x=>`<li style="margin-bottom:4px">${esc(x)}</li>`).join("")}</ol>
   <div class="actions"><button class="btn" id="dmAg">${esc(t("dmAgain"))}</button><button class="btn ghost" id="dmCp">${esc(t("dmCopy"))}</button><button class="btn ghost" id="dmX">${esc(t("close"))}</button></div>`,{k:"dmres"});
  $("#dmAg").onclick=demoCheck;$("#dmX").onclick=closeSheet;$("#dmCp").onclick=async()=>{try{await navigator.clipboard.writeText(txt);toast(t("vCopied"))}catch(e){toast(t("fErr"))}};
}
