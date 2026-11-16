/* ================= full backup (all data + files) and import — used to move everything to the independent site ================= */
Object.assign(I18N.hi,{fbT:"📦 पूरा बैकअप / दूसरी जगह ले जाना",fbTxt:"सारा डेटा (क्लाइंट, कंप्लायंस, पासवर्ड वॉल्ट — लॉक ही रहेगा, बीमा, नोटिस, टिप्स) और चाहें तो सारी फ़ाइलें एक .json फ़ाइल में। इसी फ़ाइल से नई वेबसाइट में सब कुछ आ जाता है।",fbFiles:"फ़ाइलें (PDF/फ़ोटो) भी शामिल करें",fbGo:"⬇ पूरा बैकअप डाउनलोड करें",fbRun:"तैयार हो रहा है… {n}",fbDone:"बैकअप डाउनलोड हो गया ({c} रिकॉर्ड, {f} फ़ाइलें)",fbImpT:"📥 बैकअप से डेटा डालें",fbImpTxt:"पुराने ऐप से डाउनलोड किया पूरा बैकअप यहाँ डालें। जो रिकॉर्ड पहले से हैं वो दोबारा नहीं बनेंगे।",fbImpGo:"डालें",fbImpRun:"डाल रहा है… {n}/{t}",fbImpDone:"हो गया — {c} रिकॉर्ड और {f} फ़ाइलें डाली गईं",fbImpBad:"ये सही बैकअप फ़ाइल नहीं है",fbFileFail:"{n} फ़ाइलें नहीं आ पाईं",
 ivT:"👥 टीम में किसी को जोड़ें (ईमेल से)",ivTxt:"जिसका Gmail यहाँ जोड़ेंगे, वही Google से लॉगिन करके ऐप खोल पाएगा। बाकी कोई नहीं।",ivEmail:"Gmail पता",ivRole:"भूमिका",ivAdd:"जोड़ें",ivList:"बुलाए गए लोग",ivDel:"हटाएँ",ivBad:"सही ईमेल डालें",ivDone:"जोड़ दिया — अब वो लॉगिन कर सकते हैं"});
Object.assign(I18N.en,{fbT:"📦 Full backup / move elsewhere",fbTxt:"All data (clients, compliances, password vault — stays locked, insurance, notices, tips) and optionally all files in one .json file. The new website imports everything from this file.",fbFiles:"Include files (PDF/photos)",fbGo:"⬇ Download full backup",fbRun:"Preparing… {n}",fbDone:"Backup downloaded ({c} records, {f} files)",fbImpT:"📥 Import from backup",fbImpTxt:"Upload the full backup downloaded from the old app. Records that already exist are not duplicated.",fbImpGo:"Import",fbImpRun:"Importing… {n}/{t}",fbImpDone:"Done — {c} records and {f} files imported",fbImpBad:"This is not a valid backup file",fbFileFail:"{n} files could not be copied",
 ivT:"👥 Add someone to the team (by email)",ivTxt:"Only Gmail addresses added here can sign in with Google and open the app.",ivEmail:"Gmail address",ivRole:"Role",ivAdd:"Add",ivList:"Invited",ivDel:"Remove",ivBad:"Enter a valid email",ivDone:"Added — they can sign in now"});
Object.keys(I18N.en).filter(k=>/^(fb|iv)/.test(k)).forEach(k=>{if(!I18N.zh[k])I18N.zh[k]=I18N.en[k]});

let appDb=null;
const BK_COLLS=["compliances","clients","parties","vault_items","vault_log","access_requests","law_updates","law_reads","manual_notes","error_cases","insurance","notices"];
const BK_DOCS=["vault/meta","settings/email","settings/access"];
/* reads a file kept by the app, wherever it lives */
async function blobGet(id){if(window.__blobGet)return window.__blobGet(id);const r=await fetch("/_blob/"+encodeURIComponent(id));if(!r.ok)throw new Error("blob");return r.blob()}
function blobImgs(root){(root||document).querySelectorAll("img[data-bimg]").forEach(async im=>{try{const b=await blobGet(im.dataset.bimg);im.src=URL.createObjectURL(b)}catch(e){im.alt="—"}})}
function bkFileIds(data){const ids=new Set();const walk=v=>{if(!v||typeof v!=="object")return;if(Array.isArray(v)){v.forEach(walk);return}
  if(typeof v.id==="string"&&typeof v.name==="string"&&(v.hash!==undefined||v.orig!==undefined||/\.[a-z0-9]{2,5}$/i.test(v.name)))ids.add(v.id);
  if(Array.isArray(v.imgs))v.imgs.forEach(x=>typeof x==="string"&&ids.add(x));Object.values(v).forEach(walk)};walk(data);ids.delete("demo_file");return[...ids]}
const b64of=async blob=>{const u=new Uint8Array(await blob.arrayBuffer());let s="";for(let i=0;i<u.length;i+=0x8000)s+=String.fromCharCode.apply(null,u.subarray(i,i+0x8000));return btoa(s)};
const blobOf=(b64,type)=>{const s=atob(b64),u=new Uint8Array(s.length);for(let i=0;i<s.length;i++)u[i]=s.charCodeAt(i);return new Blob([u],{type:type||"application/octet-stream"})};
async function bkCollect(withFiles,prog){
  const out={app:"compliance-record",version:2,exportedAt:new Date().toISOString(),colls:{},docs:{},files:{}};
  if(appDb){for(const c of BK_COLLS){try{const s=await appDb.collection(c).get();out.colls[c]=s.docs.map(d=>Object.assign({_id:d.id},d.data()));prog&&prog(c)}catch(e){out.colls[c]=[]}}
    for(const p of BK_DOCS){try{const s=await appDb.doc(p).get();if(s.exists)out.docs[p]=s.data()}catch(e){}}}
  else{out.colls.compliances=items.map(i=>Object.assign({_id:i.id},i));out.colls.parties=parties.map(p=>Object.assign({_id:p.id},p));out.colls.insurance=insItems.map(x=>Object.assign({_id:x.id},x));out.colls.notices=ntItems.map(x=>Object.assign({_id:x.id},x))}
  out.colls.parties=(out.colls.parties||[]);
  if(withFiles){const ids=bkFileIds(out);let i=0;for(const id of ids){i++;prog&&prog(`${i}/${ids.length}`);try{const b=await blobGet(id);out.files[id]={type:b.type,b64:await b64of(b)}}catch(e){}}}
  return out}
function fbHtml(admin){if(!admin)return"";
  return `<div class="grp" style="padding:14px"><h3 style="margin-top:0">${esc(t("fbT"))}</h3><div class="m">${esc(t("fbTxt"))}</div>
   <label class="chk" style="margin-top:8px"><input type="checkbox" id="fbF" checked>${esc(t("fbFiles"))}</label>
   <div class="actions"><button class="btn" id="fbGo">${esc(t("fbGo"))}</button></div><div class="m" id="fbMsg"></div>
   <h3>${esc(t("fbImpT"))}</h3><div class="m">${esc(t("fbImpTxt"))}</div><input type="file" id="fbIn" accept=".json,application/json"><div class="actions"><button class="btn ghost" id="fbImp">${esc(t("fbImpGo"))}</button></div><div class="m" id="fbIMsg"></div></div>`}
function fbWire(){const g=$("#fbGo");if(!g)return;
  g.onclick=async()=>{g.disabled=true;const msg=$("#fbMsg");try{if(dlCap===undefined)dlCap=(window.claude&&claude.use)?await claude.use("downloads"):null;if(!dlCap){msg.textContent=t("fNoDl");g.disabled=false;return}
      const data=await bkCollect($("#fbF").checked,n=>msg.textContent=t("fbRun",{n}));const c=Object.values(data.colls).reduce((a,x)=>a+x.length,0),f=Object.keys(data.files).length;
      await dlCap.save({filename:"compliance-full-backup-"+todayStr()+".json",data:new Blob([JSON.stringify(data)],{type:"application/json"})});msg.textContent=t("fbDone",{c,f})}catch(e){msg.textContent=t("fErr")}g.disabled=false};
  $("#fbImp").onclick=async()=>{const f=$("#fbIn").files[0];const msg=$("#fbIMsg");if(!f)return;const b=$("#fbImp");b.disabled=true;
    try{let data=JSON.parse(await f.text());if(!data||data.app!=="compliance-record"){msg.textContent=t("fbImpBad");b.disabled=false;return}
      if(data.version===1)data={colls:{compliances:(data.compliances||[]).map(x=>Object.assign({_id:x.id},x)),parties:(data.parties||[]).map(x=>Object.assign({_id:x.id},x)),vault_items:((data.vault||{}).items||[]).map(x=>Object.assign({_id:x.id},x))},docs:(data.vault&&data.vault.meta)?{"vault/meta":data.vault.meta}:{},files:{}};
      /* files first, so references can point to the new copies */
      const map={};let ff=0,fail=0;const fids=Object.keys(data.files||{});
      for(const id of fids){msg.textContent=t("fbImpRun",{n:"📎 "+(ff+fail+1),t:fids.length});try{const x=data.files[id];const r=await assets.upload(blobOf(x.b64,x.type));map[id]=r.id;ff++}catch(e){fail++}}
      let js=JSON.stringify({colls:data.colls,docs:data.docs});Object.entries(map).forEach(([o,n])=>{js=js.split(JSON.stringify(o)).join(JSON.stringify(n))});const d2=JSON.parse(js);
      const ops=[];Object.entries(d2.colls||{}).forEach(([c,arr])=>(arr||[]).forEach(x=>{const id=x._id;const body=Object.assign({},x);delete body._id;delete body.id;if(id)ops.push([c,id,body])}));
      let n=0;for(const [c,id,body] of ops){n++;if(n%10===0)msg.textContent=t("fbImpRun",{n,t:ops.length});
        for(let tr=0;tr<4;tr++){try{const ref=appDb.collection(c).doc(id);const ex=await ref.get();if(!ex.exists)await ref.set(body);break}catch(e){await new Promise(r=>setTimeout(r,800*(tr+1)))}}}
      for(const [p,body] of Object.entries(d2.docs||{})){try{const ref=appDb.doc(p);const ex=await ref.get();if(!ex.exists)await ref.set(body)}catch(e){}}
      msg.textContent=t("fbImpDone",{c:ops.length,f:ff})+(fail?" · "+t("fbFileFail",{n:fail}):"")}
    catch(e){msg.textContent=t("fbImpBad")}b.disabled=false};
}
/* invite-by-email (only on the independent site, where sign-in is open to any Google account) */
function ivHtml(admin){if(!admin||!window.__site)return"";const L2=window.__site.invites||[];
  return `<div class="grp" style="padding:14px"><h3 style="margin-top:0">${esc(t("ivT"))}</h3><div class="m">${esc(t("ivTxt"))}</div>
   <div class="row2"><div><label>${esc(t("ivEmail"))}</label><input id="ivE" type="email" autocomplete="off"></div><div><label>${esc(t("ivRole"))}</label><select id="ivR">${ROLES.filter(r=>r!=="admin").concat(["admin"]).map(r=>`<option value="${r}" ${r==="junior"?"selected":""}>${esc(roleName(r))}</option>`).join("")}</select></div></div>
   <div class="actions"><button class="btn" id="ivGo">${esc(t("ivAdd"))}</button></div><div class="err" id="ivErr"></div>
   ${L2.length?`<h3>${esc(t("ivList"))}</h3>`+L2.map(x=>`<div class="item" style="cursor:default"><div class="main"><div class="t">${esc(x.email)}</div><div class="m">${esc(roleName(x.role))}</div></div><button class="btn ghost ivDel" data-e="${esc(x.email)}">${esc(t("ivDel"))}</button></div>`).join(""):""}</div>`}
function ivWire(){const g=$("#ivGo");if(!g)return;
  g.onclick=async()=>{const e=$("#ivE").value.trim().toLowerCase();if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(e)){$("#ivErr").textContent=t("ivBad");return}
    try{await window.__site.invite(e,$("#ivR").value);toast(t("ivDone"));renderTeam()}catch(x){$("#ivErr").textContent=t("saveFail")}};
  document.querySelectorAll(".ivDel").forEach(b=>b.onclick=async()=>{try{await window.__site.uninvite(b.dataset.e);renderTeam()}catch(x){toast(t("saveFail"))}});
}
