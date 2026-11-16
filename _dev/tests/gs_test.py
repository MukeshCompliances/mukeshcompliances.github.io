from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b=p.chromium.launch();pg=b.new_page(viewport={"width":400,"height":900})
    errs=[];pg.on("pageerror",lambda e:errs.append(str(e)))
    pg.goto("file:///home/claude/compliance-app/index.html");pg.wait_for_timeout(400)
    pg.click("#firstClient");pg.click(".ent[data-e=pvt]");pg.fill("#w_name","ADDENDA CHEMICAL");pg.click("#wNext");pg.fill("#w_pan","AAPFU0939F");pg.click("#wNext")
    pg.click(".yn[data-v='1']");pg.fill(".gIn2","27AAPFU0939F1ZV");pg.click("#wNext")
    pg.click(".yn[data-v='1']");pg.fill("#w_tanNo","JPRS12345A");pg.click("#wNext")
    while pg.locator(".yn").count(): pg.click(".yn[data-v='0']")
    pg.click("#wNext");pg.wait_for_timeout(200);pg.click("#go");pg.wait_for_timeout(500)
    pg.evaluate("""()=>{const P=JSON.parse(localStorage.getItem('compliance_parties_v1'));P[0].docs=[{id:'a1',name:'PAN_Addenda.pdf',label:'docPan',at:'2026-11-13T10:00:00Z'},{id:'a2',name:'TAN.pdf',label:'docTan',at:'2026-11-13T10:00:00Z'}];localStorage.setItem('compliance_parties_v1',JSON.stringify(P));}""")
    pg.reload();pg.wait_for_timeout(400)
    for q in ["addenda pan","gstr-3b oct","tan","traces","27AAP"]:
        pg.fill("#gsQ",q);pg.wait_for_timeout(250);print("Q=",q,"→",pg.inner_text("#gsRes").replace("\n"," | ")[:260])
    pg.fill("#gsQ","gstr-3b oct");pg.wait_for_timeout(250);pg.screenshot(path="/home/claude/tests/gs.png")
    pg.locator(".gsa[data-a=comp]").first.click();pg.wait_for_timeout(200);print("OPENED:",pg.inner_text("#sheet")[:60])
    print("ERR",errs);b.close()
