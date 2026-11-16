import json
from playwright.sync_api import sync_playwright
P=[{"id":"p1","name":"ADDENDA","entity":"pvt","pan":"AAPCA8845F","gsts":[]}]
N=[{"id":"n1","dept":"it","clientId":"p1","client":"ADDENDA","f":{"ref":"X1","form":"Demand","period":"AY 2024-25","amount":"1444102","summary":"Penalty"},"issues":["270A"],"docs":[],"status":"appeal","files":[],"log":[],"steps":[],"text":"notice text"}]
with sync_playwright() as p:
    b=p.chromium.launch();pg=b.new_page(viewport={"width":400,"height":900});errs=[];pg.on("pageerror",lambda e:errs.append(str(e)))
    pg.goto("file:///home/claude/compliance-app/index.html")
    pg.evaluate(f"localStorage.setItem('compliance_parties_v1',{json.dumps(json.dumps(P))});localStorage.setItem('compliance_nt_v1',{json.dumps(json.dumps(N))})");pg.reload();pg.wait_for_timeout(400)
    pg.evaluate("sampleCap=async(c,o)=>{window._c=c;o.onText&&o.onText({text:'..'});return{text:'जवाब '+c.length+' बाकी: स्टे'}};1")
    pg.evaluate("openNtDetail('n1')");t=pg.inner_text("#sheet");i=t.find("💬");print(t[i:i+400])
    pg.locator(".qaS").first.click();pg.wait_for_timeout(500)
    pg.fill("#qaQ","20% कब तक भरना है?");pg.click("#qaGo");pg.wait_for_timeout(500)
    print("CONV LEN:",pg.evaluate("_c.length"),"FIRST HAS CTX:",pg.evaluate("_c[0].content.includes('1444102')"))
    t=pg.inner_text("#sheet");i=t.find("❓");print(t[i:i+300])
    pg.locator(".qaGot").first.click();pg.wait_for_timeout(300);print("GOT:", "समझ आ गया: आप" in pg.inner_text("#sheet"))
    print("ERR",errs);b.close()
