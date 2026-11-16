/* ===== 📊 financial statements (Balance Sheet & P&L): entry + checker (tally, rounding vs actual figures, Schedule III basics, UDIN) =====
   Law notes (checked Nov 2026): Schedule III — rounding is mandatory and depends on total income: below ₹100 crore → hundreds / thousands /
   lakhs / millions; ₹100 crore or more → lakhs / millions / crores; one unit throughout. ICAI — UDIN at signing, at the latest within 60 days.
   Companies: accounts go to the AGM, which must be held within 6 months of year end (30 September). */
Object.assign(I18N.hi,{fsB:"📊 बैलेंस शीट / P&L जाँचें",fsT:"📊 बैलेंस शीट और P&L की जाँच",fsTxt:"फ़ाइनेंशियल स्टेटमेंट डालें (PDF या Excel)। साथ में असली आँकड़ों वाली Excel (ट्रायल बैलेंस / ग्रुपिंग — पूरे रुपयों में) डालेंगे तो ऐप लाख/हज़ार में लिखे हर आँकड़े को असली रकम से मिलाएगा।",fsFile:"फ़ाइनेंशियल स्टेटमेंट (PDF / Excel)",fsAct:"असली आँकड़ों की Excel / CSV — पूरे रुपयों में (वैकल्पिक, पर ज़रूरी सलाह)",fsUdin:"UDIN (अगर बन गया हो)",fsSign:"ऑडिट रिपोर्ट साइन होने की तारीख",fsGo:"जाँचें",fsRun:"पढ़ रहा है और जाँच रहा है…",fsRes:"जाँच का नतीजा",fsSum:"{p} ठीक · {w} देखें · {f} दिक्कत",fsSave:"नतीजा सेव करें",fsSaved:"सेव हो गया",fsCsv:"⬇ मिलान की Excel (CSV)",fsAi:"🤖 Claude से पूरी समीक्षा",fsAiWait:"Claude पढ़ रहा है…",fsLast:"पिछली जाँच: {d} — {s}",fsIssue:"बैलेंस शीट में दिक्कत",fsNote:"ये जाँच मदद के लिए है — ऑडिटर / CA की जाँच की जगह नहीं लेती। PDF की टेबल कभी-कभी पूरी नहीं पढ़ी जाती; ⚠ वाले बिंदु ख़ुद देख लें।",fsNoRead:"फ़ाइल से आँकड़े नहीं पढ़े जा सके (स्कैन की हुई PDF?) — Excel या टेक्स्ट वाली PDF डालें।",fsMatchT:"असली रकम बनाम स्टेटमेंट ({u} में)",fsCol1:"मद",fsCol2:"असली ₹",fsCol3:"होना चाहिए",fsCol4:"स्टेटमेंट में",fsUdinRem:"UDIN बनाना — ऑडिट रिपोर्ट"});
Object.assign(I18N.en,{fsB:"📊 Check Balance Sheet / P&L",fsT:"📊 Balance Sheet and P&L check",fsTxt:"Upload the financial statements (PDF or Excel). If you also upload the Excel with actual figures (trial balance / grouping — in full rupees), the app matches every figure shown in lakhs/thousands with the real amount.",fsFile:"Financial statements (PDF / Excel)",fsAct:"Excel / CSV of actual figures — in full rupees (optional but recommended)",fsUdin:"UDIN (if generated)",fsSign:"Date the audit report was signed",fsGo:"Check",fsRun:"Reading and checking…",fsRes:"Result",fsSum:"{p} OK · {w} to look at · {f} problems",fsSave:"Save result",fsSaved:"Saved",fsCsv:"⬇ Matching sheet (CSV for Excel)",fsAi:"🤖 Full review by Claude",fsAiWait:"Claude is reading…",fsLast:"Last check: {d} — {s}",fsIssue:"Problem in financial statements",fsNote:"This check is an aid — it does not replace the auditor / CA. PDF tables are sometimes read incompletely; look at the ⚠ points yourself.",fsNoRead:"No figures could be read from the file (scanned PDF?) — upload Excel or a text PDF.",fsMatchT:"Actual amounts vs statements (in {u})",fsCol1:"Item",fsCol2:"Actual ₹",fsCol3:"Should be",fsCol4:"In statements",fsUdinRem:"Generate UDIN — audit report"});
Object.assign(I18N.zh,{fsB:"📊 检查资产负债表 / 损益表",fsT:"📊 资产负债表与损益表检查",fsTxt:"上传财务报表（PDF 或 Excel）。如同时上传实际金额的 Excel（试算表 / 分组表——以卢比全额），应用会把以十万/千为单位的每个数字与实际金额核对。",fsFile:"财务报表（PDF / Excel）",fsAct:"实际金额 Excel / CSV——卢比全额（可选，建议上传）",fsUdin:"UDIN（如已生成）",fsSign:"审计报告签署日期",fsGo:"检查",fsRun:"正在读取并检查…",fsRes:"检查结果",fsSum:"{p} 项正常 · {w} 项需查看 · {f} 项有问题",fsSave:"保存结果",fsSaved:"已保存",fsCsv:"⬇ 核对表（CSV）",fsAi:"🤖 由 Claude 全面审阅",fsAiWait:"Claude 正在阅读…",fsLast:"上次检查：{d} — {s}",fsIssue:"财务报表有问题",fsNote:"此检查仅供辅助——不能代替审计师 / 注册会计师。PDF 表格有时读取不全；请自行查看 ⚠ 项。",fsNoRead:"无法从文件读取数字（扫描版 PDF？）——请上传 Excel 或文字版 PDF。",fsMatchT:"实际金额与报表对比（单位：{u}）",fsCol1:"项目",fsCol2:"实际 ₹",fsCol3:"应为",fsCol4:"报表中",fsUdinRem:"生成 UDIN——审计报告"});
const FS_UNITS=[["crore",1e7,/crores?/i],["million",1e6,/millions?/i],["lakh",1e5,/lakhs?|lacs?/i],["thousand",1e3,/thousands?|'?000s?\b/i],["hundred",100,/hundreds?/i]];
const fsNum=s=>{s=String(s).trim();const neg=/^\(.*\)$/.test(s)||/^-/.test(s);const v=parseFloat(s.replace(/[(),\s₹-]/g,""));return isNaN(v)?null:(neg?-v:v)};
const FS_NUMRE=/^\(?-?₹?\d[\d,]*(\.\d+)?\)?$/;
function fsParseLine(str){const tok=String(str).replace(/ /g," ").trim().split(/\s+/);let i=tok.findIndex((x,k)=>k>0&&FS_NUMRE.test(x));if(i<0)return{label:str.trim(),nums:[],raw:[]};
  const label=tok.slice(0,i).join(" ");let raw=tok.slice(i).filter(x=>FS_NUMRE.test(x)||x==="-");raw=raw.filter(x=>x!=="-");
  if(raw.length>=3&&/^\d{1,2}$/.test(raw[0]))raw=raw.slice(1); /* note-number column */
  return{label,nums:raw.map(fsNum).filter(v=>v!=null),raw}}
async function fsPdfLines(file,clientId){const buf=new Uint8Array(await file.arrayBuffer());let doc=null;
  try{doc=await pdfDoc(buf.slice())}catch(e){if(e&&e.needPw){for(const pw of await clientPws(clientId)){try{doc=await pdfDoc(buf.slice(),pw);break}catch(x){}}}else throw e}
  if(!doc)throw{needPw:true};const lines=[];
  for(let p=1;p<=Math.min(doc.numPages,60);p++){const c=await(await doc.getPage(p)).getTextContent();const rows=new Map();
    c.items.forEach(it=>{if(!it.str||!it.str.trim())return;const y=Math.round(it.transform[5]/3);if(!rows.has(y))rows.set(y,[]);rows.get(y).push([it.transform[4],it.str])});
    [...rows.entries()].sort((a,b)=>b[0]-a[0]).forEach(([,a])=>lines.push(a.sort((x,y)=>x[0]-y[0]).map(x=>x[1]).join(" ")))}
  return lines}
async function fsXlsLines(file){if(!window.XLSX)await loadScript(XLSX_SRC);const wb=XLSX.read(new Uint8Array(await file.arrayBuffer()),{type:"array"});const out=[];
  wb.SheetNames.forEach(n=>XLSX.utils.sheet_to_json(wb.Sheets[n],{header:1,raw:true,defval:""}).forEach(row=>{const label=row.filter(c=>typeof c==="string"&&/[A-Za-zऀ-ॿ]/.test(c)).join(" ").trim();const nums=row.filter(c=>typeof c==="number"&&isFinite(c));
    const sn=row.filter(c=>typeof c==="string"&&FS_NUMRE.test(c.trim())).map(fsNum).filter(v=>v!=null);out.push({label,nums:nums.concat(sn),raw:nums.concat(sn).map(String),text:row.join(" ")})}));return out}
async function fsRead(file,clientId){if(/\.(xlsx|xls|csv)$/i.test(file.name)||/sheet|excel|csv/i.test(file.type)){const L2=await fsXlsLines(file);return{lines:L2,text:L2.map(x=>x.text).join("\n")}}
  const raw=await fsPdfLines(file,clientId);return{lines:raw.map(fsParseLine),text:raw.join("\n")}}
const fsNorm=s=>String(s||"").toLowerCase().replace(/\(.*?\)/g," ").replace(/[^a-zऀ-ॿ ]/g," ").replace(/\b(total|and|the|of|less|add|note|notes|other|a|b|c|i|ii|iii|iv|v)\b/g," ").replace(/\s+/g," ").trim();
function fsCheck(i,p,fsDoc,act,udin,signDate){
  const R=[],ok=(n,d)=>R.push({s:"p",n,d:d||""}),warn=(n,d)=>R.push({s:"w",n,d:d||""}),bad=(n,d)=>R.push({s:"f",n,d:d||""});
  const T=fsDoc.text,L2=fsDoc.lines.filter(x=>x.label&&x.nums.length),B=(hi,en)=>bt(hi,en),inr=v=>"₹"+Math.round(v).toLocaleString("en-IN");
  const find=re=>L2.find(x=>re.test(x.label));
  /* 1. whose and which year */
  const pf=periodFacts(T),fy=pinfo(i).fy;
  if(pf.fyAll.length)pf.fyAll.includes(fy)?ok(B("साल सही है","Year matches"),fyl(fy)):bad(B("साल अलग है","Different year"),B("एंट्री ","Entry ")+fyl(fy)+B(", फ़ाइल में ",", file has ")+pf.fyAll.map(fyl).join(", "));
  else warn(B("साल नहीं मिला","Year not found"),B("'year ended 31 March …' लिखा होना चाहिए","should say 'year ended 31 March …'"));
  const N=crNorm(T),idHit=[p.cin,p.llpin,p.pan].filter(Boolean).some(x=>N.includes(crNorm(x))),nmHit=p.name&&T.toUpperCase().includes(p.name.toUpperCase().replace(/\s+(PRIVATE|PVT\.?)\s+(LIMITED|LTD\.?)$/,"").trim());
  idHit||nmHit?ok(B("क्लाइंट सही है","Client matches"),idHit?"CIN / PAN":p.name):warn(B("क्लाइंट का नाम / CIN नहीं मिला","Client name / CIN not found"));
  if(isCo(p.entity)&&p.cin&&!N.includes(crNorm(p.cin)))warn(B("CIN स्टेटमेंट पर नहीं दिखा","CIN not shown on the statements"));
  /* 2. unit of figures */
  const um=T.match(/(?:₹|rs\.?|inr|rupees|amounts?|figures)[^\n]{0,40}?\bin\s+(?:indian\s+)?(?:rupees\s+)?(hundreds?|thousands?|lakhs?|lacs?|millions?|crores?)\b/i)||T.match(/\(\s*(?:₹|rs\.?|inr)?\s*in\s+(?:₹|rs\.?)?\s*(hundreds?|thousands?|lakhs?|lacs?|millions?|crores?)\s*\)/i)||T.match(/(?:₹|rs\.?)\s*('?000)\b/i);
  const U=um?FS_UNITS.find(u=>u[2].test(um[1])):null,unit=U?U[1]:1,uName=U?U[0]:"rupees";
  const allRaw=L2.flatMap(x=>x.raw||[]),dec=Math.min(2,allRaw.reduce((m,x)=>{const d=(String(x).replace(/[()]/g,"").split(".")[1]||"").length;return Math.max(m,d)},0));
  /* 3. balance sheet tallies */
  let el=find(/total\s*(equity\s*(and|&)\s*liabilities|liabilities\s*(and|&)\s*equity|capital\s*(and|&)\s*liabilities)/i),as=find(/total\s*assets\b/i);
  if(!el||!as){const tt=L2.filter(x=>/^\W*total\W*$/i.test(x.label));if(tt.length>=2){el=el||tt[0];as=as||tt[1]}}
  if(el&&as){const d=Math.abs(el.nums[0]-as.nums[0]);d<0.006?ok(B("बैलेंस शीट मिलती है","Balance sheet tallies"),B("दोनों तरफ़ ","both sides ")+el.raw[0]):bad(B("बैलेंस शीट नहीं मिलती","Balance sheet does not tally"),`${el.label}: ${el.raw[0]} ≠ ${as.label}: ${as.raw[0]} (${B("अंतर","difference")} ${d.toFixed(dec)})`);
    if(el.nums.length>1&&as.nums.length>1){Math.abs(el.nums[1]-as.nums[1])<0.006?ok(B("पिछले साल के आँकड़े भी मिलते हैं","Previous-year figures tally too")):bad(B("पिछले साल की बैलेंस शीट नहीं मिलती","Previous-year balance sheet does not tally"),`${el.raw[1]} ≠ ${as.raw[1]}`)}
    else warn(B("पिछले साल के आँकड़े नहीं दिखे","Previous-year figures not seen"),B("तुलना के लिए पिछले साल का कॉलम ज़रूरी है","a comparative column is required"))}
  else warn(B("बैलेंस शीट के कुल (Total) नहीं मिले","Balance sheet totals not found"),B("ख़ुद मिलाएँ","check by hand"));
  /* 4. rounding rule (Schedule III) */
  const ti=find(/total\s*(income|revenue)\b/i),tiAmt=ti?Math.abs(ti.nums[0])*unit:0;
  if(isCo(p.entity)){if(unit===1)warn(B("आँकड़े पूरे रुपयों में लगते हैं","Figures seem to be in full rupees"),B("Schedule III में राउंडिंग ज़रूरी है (सौ / हज़ार / लाख / मिलियन)। अगर ऊपर इकाई लिखी है तो ऐप उसे पढ़ नहीं पाया।","Schedule III requires rounding (hundreds / thousands / lakhs / millions). If a unit is printed, the app could not read it."));
    else if(tiAmt){const big=tiAmt>=1e9,allowed=big?[1e5,1e6,1e7]:[100,1e3,1e5,1e6];allowed.includes(unit)?ok(B("राउंडिंग की इकाई नियम के अनुसार","Rounding unit allowed"),`${uName} · ${B("कुल आय","total income")} ${inr(tiAmt)}`):bad(B("राउंडिंग की इकाई नियम के अनुसार नहीं","Rounding unit not allowed"),B(`कुल आय ${inr(tiAmt)} ${big?"(₹100 करोड़ या ज़्यादा) → लाख / मिलियन / करोड़":"(₹100 करोड़ से कम) → सौ / हज़ार / लाख / मिलियन"}; यहाँ ${uName}`,`total income ${inr(tiAmt)} ${big?"(₹100 crore or more) → lakhs / millions / crores":"(below ₹100 crore) → hundreds / thousands / lakhs / millions"}; here ${uName}`))}
    else ok(B("इकाई","Unit"),uName)}
  else if(U)ok(B("इकाई","Unit"),uName);
  /* 5. actual figures vs rounded figures */
  const cmp=[];
  if(act){const FL=L2.map(x=>({x,k:fsNorm(x.label)})).filter(y=>y.k.length>=4);let hit=0,off=0,miss=0,sumDiff=0;const step=Math.pow(10,-dec);
    act.lines.filter(a=>a.label&&a.nums.some(v=>v)).forEach(a=>{const k=fsNorm(a.label);if(k.length<4)return;const v=Math.abs(a.nums.filter(n=>n).slice(-1)[0]);
      const m=FL.find(y=>y.k===k)||FL.find(y=>(y.k.length>=7&&k.includes(y.k))||(k.length>=7&&y.k.includes(k)));
      if(!m){miss++;cmp.push([a.label,v,"","","","not found"]);return}
      const exp=v/unit,got=Math.abs(m.x.nums[0]),d=Math.abs(exp-got);let st="ok";
      if(d<=step/2+1e-9){hit++}else if(d<=step*1.5){st="rounding";off++;sumDiff+=d*unit}else{st="MISMATCH";off+=1e6}
      cmp.push([a.label,v,exp.toFixed(dec),m.x.raw[0],(got-exp).toFixed(Math.max(dec,2)),st])});
    const mism=cmp.filter(c=>c[5]==="MISMATCH"),rd=cmp.filter(c=>c[5]==="rounding");
    if(!hit&&!mism.length&&!rd.length)warn(B("असली आँकड़ों की शीट का कोई मद स्टेटमेंट से नहीं मिला","No item of the actual-figures sheet matched the statements"),B("दोनों में मदों के नाम एक जैसे रखें","use the same item names in both"));
    else{if(mism.length)bad(B(`${mism.length} मद असली रकम से मेल नहीं खाते`,`${mism.length} items do not match the actual amount`),mism.slice(0,8).map(c=>`${c[0]}: ${inr(c[1])} → ${c[2]}, ${B("स्टेटमेंट में","statements")} ${c[3]}`).join(" | "));
      if(rd.length)warn(B(`${rd.length} मद में राउंडिंग का 1 अंक का फ़र्क`,`${rd.length} items off by one in the last digit`),rd.slice(0,6).map(c=>`${c[0]}: ${c[2]} / ${c[3]}`).join(" | ")+B(" — जोड़ मिलाने के लिए किया हो तो ठीक; वरना सुधारें"," — fine if adjusted to make totals add up; otherwise correct"));
      if(hit)ok(B(`${hit} मद असली रकम से मिलते हैं`,`${hit} items match the actual amount`));
      if(miss)warn(B(`${miss} मद स्टेटमेंट में नहीं मिले`,`${miss} items not found in the statements`),B("मिलान की Excel में देखें","see the matching sheet"))}}
  else if(unit>1)warn(B("असली आँकड़ों से मिलान नहीं हुआ","Not matched with actual figures"),B(`स्टेटमेंट ${uName} में है — ट्रायल बैलेंस / ग्रुपिंग की Excel डालें ताकि हर आँकड़ा असली रकम से मिल सके`,`statements are in ${uName} — upload the trial balance / grouping Excel so every figure can be matched`));
  /* 6. P&L and Schedule III basics */
  const pr=find(/profit\s*\/?\s*\(?\s*(loss)?\s*\)?\s*(for the (year|period)|after tax)/i)||find(/(profit|loss) for the (year|period)/i);
  pr?ok(B("साल का मुनाफ़ा/घाटा मिला","Profit/loss for the year found"),pr.raw[0]):warn(B("P&L में 'Profit for the year' नहीं मिला","'Profit for the year' not found in P&L"));
  if(isCo(p.entity)){/earnings?\s*per\s*(equity\s*)?share/i.test(T)?ok("EPS"):warn(B("EPS (प्रति शेयर आय) नहीं दिखा","EPS not shown"));
    /micro[\s,]*(and\s*)?small\s*(and\s*medium\s*)?enterprises/i.test(T)?ok(B("MSME का बकाया अलग दिखाया है","MSME dues shown separately")):warn(B("MSME बकाया का खुलासा नहीं दिखा","MSME dues disclosure not seen"));
    /age?ing/i.test(T)?ok(B("एजिंग शेड्यूल (देनदार/लेनदार)","Ageing schedules (receivables/payables)")):warn(B("एजिंग शेड्यूल नहीं दिखा","Ageing schedules not seen"),B("Schedule III (2021 संशोधन) में ज़रूरी","required by Schedule III (2021 amendment)"));
    /cash\s*flow/i.test(T)?ok(B("कैश फ़्लो स्टेटमेंट","Cash flow statement")):warn(B("कैश फ़्लो स्टेटमेंट नहीं दिखा","Cash flow statement not seen"),B("छोटी कंपनी / OPC को छूट है — जाँचें","small company / OPC are exempt — check"));
    /on behalf of the board/i.test(T)?ok(B("बोर्ड की तरफ़ से साइन","Signed on behalf of the board")):warn(B("'For and on behalf of the Board' नहीं मिला","'For and on behalf of the Board' not found"),B("डायरेक्टरों के साइन और DIN देखें","check directors' signatures and DIN"))}
  /significant\s*accounting\s*polic/i.test(T)?ok(B("अकाउंटिंग पॉलिसी के नोट","Accounting policy notes")):warn(B("अकाउंटिंग पॉलिसी के नोट नहीं दिखे","Accounting policy notes not seen"));
  /* 7. audit report and UDIN */
  const aud=/independent\s*auditor/i.test(T);if(isCo(p.entity)||p.audit)aud?ok(B("ऑडिटर की रिपोर्ट साथ है","Auditor's report included")):warn(B("ऑडिटर की रिपोर्ट इस फ़ाइल में नहीं","Auditor's report not in this file"));
  const du=(T.match(/UDIN\s*[:\-–]?\s*([0-9]{8}[A-Z0-9]{10})\b/i)||[])[1]||"",uu=(udin||"").toUpperCase().replace(/\s/g,"");
  if(uu&&!/^\d{8}[A-Z0-9]{10}$/.test(uu))bad(B("UDIN का फ़ॉर्मैट गलत","UDIN format wrong"),B("18 अक्षर: साल (2) + मेंबरशिप नं. (6) + 10 अक्षर","18 characters: year (2) + membership no. (6) + 10 characters"));
  else if(uu&&du&&uu!==du.toUpperCase())bad(B("UDIN फ़ाइल से अलग है","UDIN differs from the file"),`${uu} ≠ ${du}`);
  else if(uu||du)ok("UDIN",uu||du);
  else if(isCo(p.entity)||p.audit||aud){const lim=signDate?(()=>{const d=new Date(signDate+"T00:00:00");d.setDate(d.getDate()+60);return d.toISOString().slice(0,10)})():"";
    if(lim&&lim<todayStr())bad(B("UDIN नहीं है और 60 दिन निकल गए","No UDIN and 60 days have passed"),B("साइन ","signed ")+fmt(signDate)+B(" — तुरंत CA से बात करें"," — speak to the CA now"));
    else warn(B("UDIN नहीं मिला","UDIN not found"),B("CA को ऑडिट रिपोर्ट साइन करते समय UDIN बनाना होता है — ज़्यादा से ज़्यादा 60 दिन में","the CA must generate a UDIN when signing the audit report — within 60 days at the latest")+(lim?` (${fmt(lim)})`:""))}
  return{R,cmp,unit,uName,dec,udinDoc:du}}
function openFs(id){const i=items.find(x=>x.id===id);if(!i)return;const p=parties.find(x=>x.id===i.clientId)||{name:i.client||""};const last=i.fs;
  openSheet(`<h3>${esc(t("fsT"))}</h3><div class="m">${esc(i.client||"")} · ${esc(i.period||"")}</div><div class="note" style="margin-top:6px">${esc(t("fsTxt"))}</div>
   ${last?`<div class="m" style="margin-top:6px">${esc(t("fsLast",{d:new Date(last.at).toLocaleDateString(),s:t("fsSum",last.sum)}))}</div>`:""}
   <label>${esc(t("fsFile"))}</label><input type="file" id="fsF" accept="application/pdf,.xlsx,.xls,.csv">
   <label>${esc(t("fsAct"))}</label><input type="file" id="fsA" accept=".xlsx,.xls,.csv">
   <div class="row2"><div><label>${esc(t("fsUdin"))}</label><input id="fsU" value="${esc(last&&last.udin||"")}" autocapitalize="characters"></div><div><label>${esc(t("fsSign"))}</label><input type="date" id="fsD" value="${esc(last&&last.signDate||"")}"></div></div>
   <div class="err" id="ferr"></div><div class="actions"><button class="btn" id="fsGo">${esc(t("fsGo"))}</button><button class="btn ghost" id="fsX">${esc(t("close"))}</button></div><div id="fsOut">${last?fsResHtml(last):""}</div>
   <div class="m" style="margin-top:8px">${esc(t("fsNote"))}</div>`,{k:"fs",id});
  $("#fsX").onclick=()=>openDetail(id);
  $("#fsGo").onclick=async()=>{const f=$("#fsF").files[0],a=$("#fsA").files[0];if(!f){$("#ferr").textContent=t("erNeed");return}const b=$("#fsGo");b.disabled=true;$("#ferr").textContent=t("fsRun");
    try{const doc=await fsRead(f,i.clientId);if(!doc.lines.filter(x=>x.nums&&x.nums.length).length){$("#ferr").textContent=t("fsNoRead");b.disabled=false;return}
      const act=a?await fsRead(a,i.clientId):null;const udin=$("#fsU").value.trim(),sd=$("#fsD").value;const res=fsCheck(i,p,doc,act,udin,sd);
      const sum={p:res.R.filter(x=>x.s==="p").length,w:res.R.filter(x=>x.s==="w").length,f:res.R.filter(x=>x.s==="f").length};
      const files=[];if(assets){for(const x of [f,a].filter(Boolean)){try{const u=await assets.upload(x);files.push({id:u.id,name:x.name,hash:await fileHash(x)})}catch(e){}}}
      i.fs={at:Date.now(),by:me.id||"local",sum,rows:res.R.slice(0,40),cmp:res.cmp.slice(0,300),unit:res.uName,udin:udin||res.udinDoc,signDate:sd,files,text:doc.text.slice(0,15000)};
      i.fsIssue=sum.f>0;log(i,{k:"edited"});await saveItem(i);
      if(sd&&!(udin||res.udinDoc)&&p.id){const d=new Date(sd+"T00:00:00");d.setDate(d.getDate()+60);const o={code:"UDIN-FS",name:"UDIN – audit report (within 60 days of signing)",cat:"it",freq:"once",period:i.period,due:d.toISOString().slice(0,10)};
        if(!items.some(z=>z.genKey===genKeyOf(p.id,o)))await saveItem(makeEntry(p,o,new Date().toISOString(),false,todayStr()))}
      $("#ferr").textContent="";toast(t("fsSaved"));openFs(id)}
    catch(e){$("#ferr").textContent=e&&e.needPw?t("inW_locked"):t("fsNoRead");b.disabled=false}};
  fsWire(i)}
function fsResHtml(fs){const col={p:"var(--green)",w:"var(--amber,#9a6700)",f:"var(--red)"},ic={p:"✔",w:"⚠",f:"✖"};
  return `<h2>${esc(t("fsRes"))}</h2><div class="note" style="background:${fs.sum.f?"#fdecec":fs.sum.w?"#fff6e0":"var(--green-soft)"}"><b>${esc(t("fsSum",fs.sum))}</b></div>
   ${fs.rows.slice().sort((a,b)=>"fwp".indexOf(a.s)-"fwp".indexOf(b.s)).map(r=>`<div style="padding:5px 0;border-bottom:1px solid var(--line)"><span style="color:${col[r.s]}">${ic[r.s]}</span> ${esc(r.n)}${r.d?`<div class="m">${esc(r.d)}</div>`:""}</div>`).join("")}
   ${(fs.cmp||[]).length?`<h2>${esc(t("fsMatchT",{u:fs.unit}))}</h2><div style="overflow:auto"><table style="width:100%;border-collapse:collapse;font-size:13px"><tr><th style="text-align:left">${esc(t("fsCol1"))}</th><th>${esc(t("fsCol2"))}</th><th>${esc(t("fsCol3"))}</th><th>${esc(t("fsCol4"))}</th><th></th></tr>${fs.cmp.slice(0,60).map(c=>`<tr style="border-top:1px solid var(--line)"><td>${esc(c[0])}</td><td style="text-align:right">${esc(Number(c[1]).toLocaleString("en-IN"))}</td><td style="text-align:right">${esc(c[2])}</td><td style="text-align:right">${esc(c[3])}</td><td style="color:${c[5]==="ok"?"var(--green)":c[5]==="MISMATCH"?"var(--red)":"var(--amber,#9a6700)"}">${c[5]==="ok"?"✔":c[5]==="MISMATCH"?"✖":"⚠"}</td></tr>`).join("")}</table></div>
     <div class="actions"><button class="btn ghost" id="fsCsv">${esc(t("fsCsv"))}</button></div>`:""}
   ${sampleCap?`<div class="actions"><button class="btn ghost" id="fsAi">${esc(t("fsAi"))}</button></div>`:""}<div id="fsAiOut" style="white-space:pre-wrap">${esc(fs.ai||"")}</div>`}
function fsWire(i){const fs=i.fs;if(!fs)return;
  const c=$("#fsCsv");if(c)c.onclick=async()=>{if(dlCap===undefined)dlCap=(window.claude&&claude.use)?await claude.use("downloads"):null;if(!dlCap){toast(t("fNoDl"));return}
    const q=v=>'"'+String(v).replace(/"/g,'""')+'"';const csv="﻿"+[["Item","Actual (Rs)","Expected in "+fs.unit,"In statements","Difference","Result"]].concat(fs.cmp).map(r=>r.map(q).join(",")).join("\r\n");
    try{await dlCap.save({filename:("FS_matching_"+(i.client||"")+"_"+(i.period||"")).replace(/[^A-Za-z0-9_\-]+/g,"_").slice(0,80)+".csv",data:new Blob([csv],{type:"text/csv"})});toast(t("fSaved"))}catch(e){toast(t("fErr"))}};
  const a=$("#fsAi");if(a)a.onclick=async()=>{const out=$("#fsAiOut");a.disabled=true;out.textContent=t("fsAiWait");const p=parties.find(x=>x.id===i.clientId)||{};
    const prompt=`You review Indian financial statements (Balance Sheet, P&L, notes) for a CA firm before filing. Answer in ${({hi:"simple Hindi (Devanagari), keeping accounting terms in English",en:"simple English",zh:"simple Chinese"})[lang]}.
List up to 10 concrete problems or things to verify, most serious first: arithmetic that does not add up, items that look inconsistent between Balance Sheet, P&L and notes, missing Schedule III disclosures, missing comparatives, sign/label issues, anything a reviewer would query. Quote the figures you rely on. Only use what is in the text; if the text looks incomplete say so. Do not invent figures or cite case law.
ENTITY: ${JSON.stringify({name:p.name,entity:p.entity,period:i.period})}. FIGURES ARE IN: ${fs.unit}. AUTOMATIC CHECK RESULT: ${JSON.stringify(fs.rows.filter(r=>r.s!=="p").map(r=>r.n))}
TEXT:\n${fs.text||""}`;
    try{const r=await sampleCap(prompt,{modelTier:"complex",onText:x=>{out.textContent=x.text}});i.fs.ai=r.text;await saveItem(i);out.textContent=r.text}catch(e){out.textContent=e&&e.code==="not_granted"?"":t("luAskErr")}a.disabled=false}}
Object.assign(MANUAL,{"FS":{grp:"roc",p:MCAP,what:MS("साल के फ़ाइनेंशियल स्टेटमेंट — बैलेंस शीट, P&L, नोट्स (और कैश फ़्लो) — तैयार करना, ऑडिट कराना और मंज़ूर कराना।","Preparing, auditing and approving the year's financial statements — Balance Sheet, P&L, notes (and cash flow)."),when:MS("कंपनी: AGM साल ख़त्म होने के 6 महीने में (30 सितंबर) — उससे पहले ऑडिट और बोर्ड की मंज़ूरी। टैक्स ऑडिट वाले: टैक्स ऑडिट की तारीख से पहले।","Companies: AGM within 6 months of year end (30 September) — audit and board approval before that. Tax-audit cases: before the tax audit date."),
 docs:MS(["ट्रायल बैलेंस और ग्रुपिंग (पूरे रुपयों में) — Excel","बैंक मिलान, स्टॉक, फ़िक्स्ड एसेट रजिस्टर, लोन की पुष्टि","देनदार/लेनदार की एजिंग, MSME सप्लायर की लिस्ट","पिछले साल के स्टेटमेंट","26AS / GST रिटर्न से मिलान"],["Trial balance and grouping (full rupees) — Excel","Bank reconciliations, stock, fixed-asset register, loan confirmations","Receivable/payable ageing, MSME supplier list","Last year's statements","Reconciliation with 26AS / GST returns"]),
 steps:MS(["ट्रायल बैलेंस फ़ाइनल करें, ग्रुपिंग से Schedule III के फ़ॉर्मैट में स्टेटमेंट बनाएँ।","राउंडिंग की इकाई चुनें: कुल आय ₹100 करोड़ से कम → सौ / हज़ार / लाख / मिलियन; ₹100 करोड़ या ज़्यादा → लाख / मिलियन / करोड़। पूरे स्टेटमेंट में एक ही इकाई।","ऐप में 📊 बैलेंस शीट / P&L जाँचें — स्टेटमेंट और असली आँकड़ों की Excel दोनों डालें; ✖ और ⚠ ठीक करें।","बोर्ड मीटिंग में मंज़ूरी, डायरेक्टरों के साइन (DIN के साथ)।","ऑडिटर रिपोर्ट साइन करे और UDIN बनाए (साइन करते समय, ज़्यादा से ज़्यादा 60 दिन में)। UDIN ऐप में डालें।","AGM में पास कराएँ, फिर AOC-4 (30 दिन) और MGT-7 (60 दिन) फ़ाइल करें।"],["Finalise the trial balance; prepare statements in Schedule III format from the grouping.","Choose the rounding unit: total income below ₹100 crore → hundreds / thousands / lakhs / millions; ₹100 crore or more → lakhs / millions / crores. One unit throughout.","In the app: 📊 Check Balance Sheet / P&L — upload the statements and the actual-figures Excel; fix ✖ and ⚠.","Board approval and directors' signatures (with DIN).","Auditor signs the report and generates the UDIN (at signing, within 60 days at the latest). Enter the UDIN in the app.","Adopt at the AGM, then file AOC-4 (30 days) and MGT-7 (60 days)."]),
 mist:MS(["लाख में लिखते समय आँकड़ा गलत उतर जाना — हर मद असली रकम से मिलाएँ","राउंडिंग के बाद जोड़ न मिलना","पिछले साल के आँकड़े दोबारा ग्रुप किए बिना छोड़ देना","UDIN बनाना भूल जाना","MSME बकाया और एजिंग शेड्यूल छूट जाना"],["A figure copied wrongly when converting to lakhs — match every item with the actual amount","Totals not adding up after rounding","Previous-year figures not regrouped","Forgetting the UDIN","Missing MSME dues and ageing schedules"]),
 late:MS("AGM / AOC-4 में देरी पर रोज़ की फ़ीस और पेनल्टी; बिना UDIN का सर्टिफ़िकेट मान्य नहीं माना जाता।","Daily fees and penalties for late AGM / AOC-4; a certificate without UDIN is not treated as valid."),proof:MS("साइन किए हुए स्टेटमेंट और ऑडिट रिपोर्ट अपलोड करें; UDIN डालें।","Upload the signed statements and audit report; enter the UDIN.")}});
const _mnKeyOld3=mnKey;mnKey=function(code){if(/^UDIN/i.test(code||""))return"FS";return _mnKeyOld3(code)};
