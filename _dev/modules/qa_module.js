/* ===== 💬 ask about the notice / case — the answer is kept with the case so the whole team learns from it ===== */
Object.assign(I18N.hi,{qaT:"💬 इस नोटिस / केस के बारे में पूछें",qaTxt:"जो भी समझ न आए, यहीं पूछें — Claude पूरा नोटिस, कागज़ और अब तक की कार्रवाई देखकर आसान भाषा में समझाएगा। सवाल-जवाब केस में सेव रहते हैं।",qaPh:"अपना सवाल लिखें…",qaAsk:"पूछें",qaWait:"सोच रहा है…",qaNoAi:"सवाल-जवाब के लिए ऐप Claude में खोलें।",qaGot:"✅ समझ आ गया",qaMore:"और समझाओ",qaGotBy:"✅ समझ आ गया: {n}",qaClear:"बातचीत",qaS1:"ये नोटिस आसान भाषा में समझाओ",qaS2:"हमें अब क्या-क्या करना है, किस क्रम में?",qaS3:"कितना पैसा भरना पड़ सकता है और कब?",qaS4:"अगर हम कुछ न करें तो क्या होगा?",qaS5:"कौन-सी तारीखें सबसे ज़रूरी हैं?",qaS6:"हमारी अपील के मज़बूत और कमज़ोर पॉइंट क्या हैं?",qaNote:"जवाब केस की जानकारी पर आधारित है — पैसे या कानूनी फ़ैसले से पहले सीनियर/CA से पक्का करें।",qaLeft:"क्या कुछ अब भी बाकी है?",qaLeftQ:"इस केस में ऐसा क्या है जो हमने अभी तक नहीं किया या जिसे जाँचना बाकी है? पूरी लिस्ट दो।"});
Object.assign(I18N.en,{qaT:"💬 Ask about this notice / case",qaTxt:"Ask anything you don't understand — Claude reads the whole notice, papers and actions so far and explains in plain words. Questions and answers stay with the case.",qaPh:"Type your question…",qaAsk:"Ask",qaWait:"Thinking…",qaNoAi:"Open the app in Claude to ask questions.",qaGot:"✅ Understood",qaMore:"Explain more",qaGotBy:"✅ Understood: {n}",qaClear:"Conversation",qaS1:"Explain this notice in plain words",qaS2:"What do we need to do now, in what order?",qaS3:"How much may we have to pay, and when?",qaS4:"What happens if we do nothing?",qaS5:"Which dates matter most?",qaS6:"What are the strong and weak points of our appeal?",qaNote:"Answers are based on the case details — confirm with a senior/CA before money or legal decisions.",qaLeft:"Is anything still left?",qaLeftQ:"What in this case have we not done yet or still need to check? Give the full list."});
Object.keys(I18N.en).filter(k=>/^qa/.test(k)).forEach(k=>{if(!I18N.zh[k])I18N.zh[k]=I18N.en[k]});
function qaCtx(r){const p=parties.find(x=>x.id===r.clientId)||{};
  return `You are a senior tax professional at an Indian CA firm explaining a case to a junior colleague or the client. Answer in ${({hi:"simple Hindi (Devanagari), using English only for form names, sections and portal menus",en:"simple English",zh:"simple Chinese"})[lang]}.
Be clear and complete but short (usually under 12 lines); use numbered points for steps. Explain any technical word you use. Base every fact (amounts, dates, sections, DINs) on the case data below; if something is not in the data, say it is not in the papers and what to check. Never invent case law, figures or deadlines; where a rule may have changed, say "confirm with senior". Never ask for passwords or OTPs.
At the end, if relevant, add one line starting with "बाकी:" / "Still open:" listing anything that still needs doing.
TODAY: ${todayStr()}
CLIENT: ${JSON.stringify({name:p.name||r.client,entity:p.entity,pan:p.pan})}
CASE: ${JSON.stringify({dept:r.dept,fields:r.f,issues:r.issues,docsNeeded:r.docs,status:r.status,stage:csStage(r),appealRef:r.appealRef||"",steps:(r.steps||[]).map(x=>({type:x.type,date:x.date,ref:x.ref,amount:x.amount,note:x.note,explain:x.explain,next:x.next,nextWhat:x.nextWhat})),files:(r.files||[]).map(f=>f.name),order:r.order||""})}
REPLY DRAFT (if any, first part): ${(r.draft||"").slice(0,3000)}
NOTICE / PAPERS TEXT:\n${(r.text||"").slice(0,16000)}`}
function qaHtml(r){const C=r.chat||[];
  return `<h2>${esc(t("qaT"))}</h2><div class="m">${esc(t("qaTxt"))}</div>
   <div id="qaLog" style="margin-top:8px">${C.map((c,i)=>`<div style="margin:8px 0"><div style="background:#eef3ff;border-radius:10px;padding:8px 10px"><b>❓ ${esc(c.q)}</b><div class="m">${esc(c.by==="local"?t("you"):nm(c.by))} · ${esc(new Date(c.at).toLocaleDateString())}</div></div>
     <div style="background:#fff;border:1px solid var(--line);border-radius:10px;padding:8px 10px;margin-top:4px;white-space:pre-wrap">${esc(c.a||"")}</div>
     <div class="m" style="margin-top:3px">${(c.got||[]).length?esc(t("qaGotBy",{n:(c.got||[]).map(u=>u==="local"?t("you"):nm(u)).join(", ")}))+" · ":""}${(c.got||[]).includes(me.id||"local")?"":`<a href="#" class="qaGot" data-i="${i}">${esc(t("qaGot"))}</a> · `}<a href="#" class="qaMore" data-i="${i}">${esc(t("qaMore"))}</a></div></div>`).join("")}</div>
   ${sampleCap?`<div class="chips" id="qaSug">${(C.length?["qaLeft","qaS2","qaS3","qaS4"]:["qaS1","qaS2","qaS3","qaS4","qaS5"].concat(r.status==="appeal"?["qaS6"]:[])).map(k=>`<button type="button" class="btn ghost qaS" data-k="${k}" style="padding:5px 10px;font-size:13px">${esc(t(k))}</button>`).join("")}</div>
     <div style="display:flex;gap:6px;margin-top:6px"><textarea id="qaQ" rows="2" placeholder="${esc(t("qaPh"))}" style="flex:1"></textarea><button class="btn" id="qaGo">${esc(t("qaAsk"))}</button></div>
     <div id="qaLive" style="white-space:pre-wrap;margin-top:6px"></div><div class="m">${esc(t("qaNote"))}</div>`:`<div class="m">${esc(t("qaNoAi"))}</div>`}`}
function qaWire(r){
  const ask=async(q)=>{q=(q||"").trim();if(!q||!sampleCap)return;const go=$("#qaGo"),live=$("#qaLive");go.disabled=true;$("#qaQ").value="";
    live.innerHTML=`<div style="background:#eef3ff;border-radius:10px;padding:8px 10px"><b>❓ ${esc(q)}</b></div><div style="padding:8px 10px" id="qaA">${esc(t("qaWait"))}</div>`;
    const msgs=[{role:"user",content:qaCtx(r)+"\n\nFirst question: "+((r.chat||[])[0]||{}).q}];
    const prev=(r.chat||[]).slice(-6);
    const conv=[];if(prev.length){conv.push({role:"user",content:qaCtx(r)+"\n\nQUESTION: "+prev[0].q});conv.push({role:"assistant",content:prev[0].a||""});prev.slice(1).forEach(c=>{conv.push({role:"user",content:c.q});conv.push({role:"assistant",content:c.a||""})});conv.push({role:"user",content:q})}
    else conv.push({role:"user",content:qaCtx(r)+"\n\nQUESTION: "+q});
    try{const res=await sampleCap(conv,{modelTier:"default",cache:false,onText:x=>{const a=$("#qaA");if(a)a.textContent=x.text}});
      r.chat=(r.chat||[]).concat([{q,a:res.text,by:me.id||"local",at:Date.now(),got:[]}]);ntLog(r,"question");await ntSave(r);openNtDetail(r.id);
      setTimeout(()=>{const l=$("#qaLog");if(l&&l.lastElementChild)l.lastElementChild.scrollIntoView({block:"start"})},50)}
    catch(e){const a=$("#qaA");if(a)a.textContent=e&&e.code==="not_granted"?"":t("luAskErr");go.disabled=false}};
  const go=$("#qaGo");if(go)go.onclick=()=>ask($("#qaQ").value);
  document.querySelectorAll(".qaS").forEach(b=>b.onclick=()=>ask(b.dataset.k==="qaLeft"?t("qaLeftQ"):t(b.dataset.k)));
  document.querySelectorAll(".qaGot").forEach(a=>a.onclick=async e=>{e.preventDefault();const c=r.chat[+a.dataset.i];c.got=(c.got||[]).concat([me.id||"local"]);await ntSave(r);openNtDetail(r.id)});
  document.querySelectorAll(".qaMore").forEach(a=>a.onclick=e=>{e.preventDefault();const c=r.chat[+a.dataset.i];ask(bt("ये बात और आसान करके, उदाहरण के साथ समझाओ: ","Explain this more simply, with an example: ")+c.q)});
}
