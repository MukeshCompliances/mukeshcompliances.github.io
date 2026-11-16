/* ===== attachments with questions: papers / photos the user adds so Claude understands the question better ===== */
Object.assign(I18N.hi,{atL:"📎 साथ में कागज़ / फ़ोटो / स्क्रीनशॉट (वैकल्पिक)",atKeep:"ये कागज़ केस की फ़ाइलों में भी जोड़ें",atRead:"कागज़ पढ़ रहा है…",atBig:"{n} बहुत बड़ी है (10 MB से ज़्यादा) — छोड़ दी",atLocked:"{n} पर पासवर्ड है — पढ़ी नहीं जा सकी",atNoImg:"फ़ोटो पढ़ना इस डिवाइस पर उपलब्ध नहीं — फ़ोटो की बात लिखकर बताएँ",atWith:"साथ में:"});
Object.assign(I18N.en,{atL:"📎 Attach papers / photos / screenshots (optional)",atKeep:"Also add these papers to the case files",atRead:"Reading attachments…",atBig:"{n} is too large (over 10 MB) — skipped",atLocked:"{n} is password-protected — could not be read",atNoImg:"Image reading isn't available on this device — describe the photo in words",atWith:"Attached:"});
Object.keys(I18N.en).filter(k=>/^at[A-Z]/.test(k)).forEach(k=>{if(!I18N.zh[k])I18N.zh[k]=I18N.en[k]});
function attInputHtml(id,withKeep){return `<label style="margin-top:6px">${esc(t("atL"))}</label><input type="file" id="${id}" multiple accept="application/pdf,image/*,.txt,.csv,.json">${withKeep?`<label class="chk" style="margin-top:4px"><input type="checkbox" id="${id}K" checked>${esc(t("atKeep"))}</label>`:""}<div class="m" id="${id}M"></div>`}
async function attRead(files,clientId,upload){const out={texts:[],imgs:[],saved:[],warn:[]};const imgOk=await erImgOk();
  for(const f of (files||[]).slice(0,5)){if(f.size>10*1024*1024){out.warn.push(t("atBig",{n:f.name}));continue}
    const isPdf=/pdf$/i.test(f.type)||/\.pdf$/i.test(f.name),isImg=/^image\//.test(f.type),isTxt=/^text\//.test(f.type)||/\.(txt|csv|json)$/i.test(f.name);
    if(isPdf){try{const r=await pdfTry(f,await clientPws(clientId));if(r.locked)out.warn.push(t("atLocked",{n:f.name}));else if((r.txt||"").trim())out.texts.push({name:f.name,text:r.txt});else if(imgOk)out.warn.push(t("inW_scan"))}catch(e){}}
    else if(isImg){if(imgOk)out.imgs.push(f);else out.warn.push(t("atNoImg"))}
    else if(isTxt){try{out.texts.push({name:f.name,text:(await f.text()).slice(0,20000)})}catch(e){}}
    if(upload&&assets){try{const u=await assets.upload(f);out.saved.push({id:u.id,name:f.name,hash:await fileHash(f)})}catch(e){}}}
  return out}
function attPrompt(a){if(!a||(!a.texts.length&&!a.imgs.length))return"";let left=20000;
  return "\n\nPAPERS ATTACHED WITH THIS QUESTION (read them; they are what the question is about):\n"+a.texts.map(x=>{const s=x.text.slice(0,Math.max(0,Math.min(9000,left)));left-=s.length;return`--- ${x.name} ---\n${s}`}).join("\n")+(a.imgs.length?`\n(${a.imgs.length} image(s) attached: ${a.imgs.map(f=>f.name).join(", ")})`:"")}
