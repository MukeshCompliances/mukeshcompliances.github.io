/* ===== lq: law update — learn and ask without Claude: plain-language summary, quick questions, free-text questions answered from the
   update itself (intent + sentence match) and from the question bank; unanswered questions go to kb_asked ===== */
const LQ_INT=[
 ["who",/किस\s*पर|किसके|किन\s*पर|kis\s*pe|kis\s*par|kiske|kaun|कौन|who|applicable|applies\s*to/i],
 ["when",/कब|kab|date|तारीख|tarikh|tareekh|from\s*when|effective|since|से\s*लागू/i],
 ["do",/क्या\s*कर|kya\s*kar|karna|करना|what\s*(should|to)\s*do|action|steps?|kaise|कैसे|how/i],
 ["change",/पहले|pehle|before|old|पुराना|purana|बदला|badla|change|अंतर|antar|difference|अब\s*क्या|ab\s*kya/i],
 ["mine",/मेरे|mere|mera|मेरा|my\s*client|हमारे|hamare|क्लाइंट|client/i],
 ["risk",/penalty|पेनल्टी|जुर्माना|jurmana|fine|late|नहीं\s*किया|nahi\s*kiya|na\s*kiya|interest|ब्याज|byaj|risk|नुकसान/i]];
function lqFacts(u){const B=bt,aff=luAffected(u),acts=luArr(u.act);return{
  who:[luTx(u.who),aff.length?B("आपके क्लाइंट जिन पर असर हो सकता है: ","Your clients who may be affected: ")+aff.map(p=>p.name).join(", "):""].filter(Boolean).join("\n")||B("बदलाव में यह साफ़ नहीं लिखा कि किस पर लागू है — स्रोत देखें।","The update does not say clearly whom it applies to — see the source."),
  when:[u.eff?B("लागू: ","Applies from: ")+luDate(u.eff):"",u.date?B("जारी हुआ: ","Issued on: ")+luDate(u.date):""].filter(Boolean).join("\n")||B("तारीख़ नहीं दी गई — स्रोत देखें।","No date given — see the source."),
  do:acts.length?acts.map((a,k)=>(k+1)+". "+a).join("\n"):B("कोई अलग काम नहीं लिखा — बस जानकारी रखें।","No separate action listed — just keep it in mind."),
  change:luTx(u.before)||luTx(u.after)?B("पहले: ","Before: ")+(luTx(u.before)||"—")+"\n"+B("अब: ","Now: ")+(luTx(u.after)||"—"):luTx(u.sum),
  mine:aff.length?aff.map(p=>"🏢 "+p.name).join("\n"):B("आपके किसी क्लाइंट पर सीधा असर नहीं दिखता।","None of your clients seem directly affected."),
  risk:(u.impact==="high"?B("यह ज़रूरी बदलाव है — अनदेखा करने पर फ़ीस / ब्याज / नोटिस का ख़तरा हो सकता है।","This is an important change — ignoring it may lead to fees / interest / notices."):u.impact==="low"?B("इसका असर कम है।","Its impact is low."):B("इसका असर मध्यम है — समय पर ध्यान दें।","Medium impact — act on time."))+(acts.length?"\n"+B("बचने के लिए: ","To stay safe: ")+acts[0]:"")}}
const LQ_QS=[["who","ये किस पर लागू है?","Whom does it apply to?"],["when","कब से लागू है?","From when?"],["change","पहले क्या था, अब क्या?","What was it before, what now?"],["do","मुझे क्या करना है?","What do I have to do?"],["mine","मेरे कौन-से क्लाइंट?","Which of my clients?"],["risk","न करें तो क्या होगा?","What if I don't?"]];
const lqTok=s=>String(s||"").toLowerCase().replace(/[^a-z0-9ऀ-ॿ ]/g," ").split(/\s+/).filter(w=>w.length>2&&!/^(the|and|for|from|with|this|that|है|हैं|का|की|के|को|में|से|पर|और|kya|hai|ka|ki|ke|ko|me|se)$/.test(w));
function lqAnswer(u,q){const F=lqFacts(u),out=[],seen=new Set();
  LQ_INT.forEach(([k,re])=>{if(re.test(q)&&!seen.has(k)){seen.add(k);out.push({h:LQ_QS.find(x=>x[0]===k),t:F[k]})}});
  /* sentences of the update that share words with the question */
  const qt=new Set(lqTok(q)),sents=[luTx(u.title),luTx(u.sum),luTx(u.before),luTx(u.after),luTx(u.who)].concat(luArr(u.act)).join("\n").split(/[\n।.]+/).map(x=>x.trim()).filter(x=>x.length>8);
  const sc=sents.map(x=>[x,lqTok(x).filter(w=>qt.has(w)).length]).filter(x=>x[1]>=2).sort((a,b)=>b[1]-a[1]).slice(0,2);
  if(sc.length&&!out.length)out.push({h:null,t:sc.map(x=>"• "+x[0]).join("\n")});
  let kb=[];try{if(typeof kbSearch==="function"){kbInit();const R=kbSearch(q);if(R.conf!=="none"&&(!out.length||seen.has("risk")))kb=R.hits.slice(0,2).map(h=>h.e)}}catch(e){}
  return{out,kb}}
function lqBoxHtml(u){const B=bt,F=lqFacts(u);
  return `<div class="grp" id="lqBox" style="padding:10px 12px;margin-top:12px"><b>📘 ${esc(B("आसान भाषा में समझें","Understand it simply"))}</b>
   <div style="font-size:14px;margin-top:6px;white-space:pre-wrap"><b>${esc(B("क्या बदला: ","What changed: "))}</b>${esc(F.change)}</div>
   <div style="font-size:14px;margin-top:4px;white-space:pre-wrap"><b>${esc(B("कब से: ","From when: "))}</b>${esc(F.when)}</div>
   <div style="font-size:14px;margin-top:4px;white-space:pre-wrap"><b>${esc(B("आपको क्या करना है: ","What you have to do: "))}</b>${esc(F.do)}</div>
   <div class="m" style="margin-top:10px">${esc(B("सवाल चुनें या अपने शब्दों में पूछें:","Pick a question or ask in your own words:"))}</div>
   <div class="chips">${LQ_QS.map(x=>`<button class="chip lqQ" data-k="${x[0]}" style="cursor:pointer;border:0">${esc(B(x[1],x[2]))}</button>`).join("")}</div>
   <div style="display:flex;gap:6px;margin-top:8px"><input id="lqIn" style="flex:1" placeholder="${esc(B("जैसे: ye kis pe lagu hai, late hua to kya hoga","e.g. who does this apply to, what if I'm late"))}"><button class="btn" id="lqGo">${esc(B("पूछें","Ask"))}</button></div>
   <div id="lqOut" style="margin-top:8px"></div></div>`}
function lqShow(u,blocks,q){const o=$("#lqOut");if(!o)return;const B=bt;
  o.innerHTML=(q?`<div class="m">❓ ${esc(q)}</div>`:"")+blocks.out.map(b=>`<div class="note" style="margin:6px 0;white-space:pre-wrap">${b.h?`<b>${esc(B(b.h[1],b.h[2]))}</b>\n`:""}${esc(b.t)}</div>`).join("")+
   (blocks.kb.length?`<div class="m" style="margin-top:8px">${esc(B("📚 इससे जुड़े सवाल:","📚 Related questions:"))}</div>`+blocks.kb.map(e=>`<details style="margin:4px 0"><summary style="cursor:pointer">${esc(B(e.q[0],e.q[1]))}</summary><div class="note" style="white-space:pre-wrap;margin-top:4px">${esc(B(e.a[0],e.a[1]))}</div></details>`).join(""):"")+
   (q&&!blocks.out.length&&!blocks.kb.length?`<div class="warn">${esc(B("इसका जवाब अभी ऐप में नहीं है। सवाल सेव कर लिया है — 📚 सवाल-जवाब में 'बिना जवाब के सवाल' में दिखेगा।","The app has no answer to this yet. The question is saved — it shows under 'unanswered questions' in 📚 Question bank."))}</div>`:"")}
const _lqOpen=luOpen;luOpen=function(id){_lqOpen(id);const u=luItems.find(x=>x.id===id);if(!u||document.querySelector("#sheet #lqBox"))return;
  const ls=document.querySelectorAll("#sheet label"),anchor=ls[ls.length-1];
  if(!anchor)return;anchor.insertAdjacentHTML("beforebegin",lqBoxHtml(u));
  document.querySelectorAll("#sheet .lqQ").forEach(c=>c.onclick=()=>{const k=c.dataset.k,h=LQ_QS.find(x=>x[0]===k);lqShow(u,{out:[{h,t:lqFacts(u)[k]}],kb:[]},"")});
  const go=$("#lqGo"),inp=$("#lqIn");go.onclick=()=>{const q=inp.value.trim();if(!q)return;const r=lqAnswer(u,q);
    if(!r.out.length&&!r.kb.length&&typeof kbSaveAsk==="function")kbSaveAsk("["+luTx(u.title).slice(0,60)+"] "+q,"none",[]);lqShow(u,r,q)};
  inp.onkeydown=e=>{if(e.key==="Enter"){e.preventDefault();go.click()}}};
