import json
from playwright.sync_api import sync_playwright
P=[{"id":"p1","name":"ADDENDA","entity":"pvt","pan":"AAPCA8845F","gsts":[]}]
N=[{"id":"n1","dept":"it","clientId":"p1","client":"ADDENDA","f":{"ref":"X1","form":"Demand","period":"AY 2024-25","amount":"1444102","dueDate":"2024-11-30"},"issues":[],"docs":[],"status":"appeal","files":[],"log":[],"steps":[],"text":"t"}]
ANS='समझाया... बाकी: स्टे\\n<<<APP {"actions":[{"kind":"reminder","date":"2026-11-21","what":"Respond to outstanding demand"},{"kind":"fix_field","field":"dueDate","value":"2026-10-25"},{"kind":"doc_needed","text":"Form 35 का पूरा PDF"},{"kind":"manual_tip","manual":"NOTICE-IT","text":"अपील के बाद Response to Outstanding Demand ज़रूर भरें"},{"kind":"reminder","date":"bad"}],"suggest":[{"area":"notices","text":"Track stay application status separately"}]}>>>'
with sync_playwright() as p:
    b=p.chromium.launch();pg=b.new_page(viewport={"width":400,"height":900});errs=[];pg.on("pageerror",lambda e:errs.append(str(e)))
    pg.goto("file:///home/claude/compliance-app/index.html")
    pg.evaluate(f"localStorage.setItem('compliance_parties_v1',{json.dumps(json.dumps(P))});localStorage.setItem('compliance_nt_v1',{json.dumps(json.dumps(N))})");pg.reload();pg.wait_for_timeout(400)
    pg.evaluate("sampleCap=async(c,o)=>{window._c=c;return{text:'"+ANS+"'}};1")
    pg.evaluate("openNtDetail('n1')");pg.locator(".qaS").first.click();pg.wait_for_timeout(600)
    t=pg.inner_text("#sheet");i=t.find("❓");print(t[i:i+700])
    print("CTX has rule:",pg.evaluate("_c[0].content.includes('<<<APP')"))
    pg.click(".fxAll");pg.wait_for_timeout(600)
    print("AFTER:",pg.evaluate("JSON.stringify([ntItems[0].f.dueDate,ntItems[0].docs,items.map(i=>[i.name.slice(0,30),i.dueDate]),mnNotes.map(n=>n.k)])"))
    pg.evaluate("closeSheet();show('team')");pg.wait_for_timeout(200);t=pg.inner_text("#team");i=t.find("💡");print("TEAM:",t[i:i+250])
    print("ERR",errs);b.close()
