from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b=p.chromium.launch();pg=b.new_page(viewport={"width":400,"height":900})
    errs=[];pg.on("pageerror",lambda e:errs.append(str(e)))
    pg.goto("file:///home/claude/compliance-app/index.html");pg.wait_for_timeout(400)
    pg.evaluate("""()=>{parties=[{id:'p1',name:'ADDENDA',entity:'pvt',pan:'AAPFU0939F',gsts:[],docs:[{id:'d1',name:'MOA.pdf',label:'docMoa',conf:true,allow:[]}]}];localStorage.setItem('compliance_parties_v1',JSON.stringify(parties));render()}""")
    pg.click("#nVault");pg.fill("#vm1","master123");pg.fill("#vm2","master123");pg.click("#vSetF button");pg.wait_for_timeout(1800)
    r=pg.locator(".vst tbody tr").nth(0);r.locator("input[data-f=password]").fill("It@1");pg.click("#vShSave");pg.wait_for_timeout(1200)
    r=pg.locator(".vst tbody tr").nth(1);r.locator("input[data-f=password]").fill("Mca@1");pg.click("#vShSave");pg.wait_for_timeout(1200)
    # become junior with limit 2
    pg.evaluate("()=>{me.id='j1';myRole=()=>'junior';acc.def=2;renderVault();paintStatic()}")
    print("JR has sheet btn:",pg.locator("#vModeB").count())
    item=pg.evaluate("vItems[0].id")
    for n in range(3):
        pg.evaluate(f"vOpenItem('{item}')");pg.wait_for_timeout(300);pg.click("#vRev");pg.wait_for_timeout(400)
        print("try",n+1,"→",pg.inner_text("#sheet")[:60].replace("\n"," | "))
    pg.fill("#acR","GST filing ke liye");pg.click("#acGo");pg.wait_for_timeout(200)
    # senior approves
    pg.evaluate("()=>{me.id='s1';myRole=()=>'senior';render()}");pg.click("#nDash");pg.wait_for_timeout(200)
    print("SR sees:",[l for l in pg.inner_text("#dash").split("\n") if "अनुरोध" in l or "GST filing" in l])
    pg.locator(".rqG[data-n='1']").first.click();pg.wait_for_timeout(200)
    # restrict 2nd item
    item2=pg.evaluate("vItems[1].id");pg.click("#nVault");pg.evaluate(f"vOpenItem('{item2}')");pg.wait_for_timeout(300);pg.click("#vRst");pg.wait_for_timeout(300)
    # junior again
    pg.evaluate("()=>{me.id='j1';myRole=()=>'junior';closeSheet()}")
    pg.evaluate(f"vOpenItem('{item}')");pg.wait_for_timeout(300);pg.click("#vRev");pg.wait_for_timeout(400);print("after grant:",pg.inner_text("#vP"))
    pg.evaluate(f"vOpenItem('{item2}')");pg.wait_for_timeout(300);pg.click("#vRev");pg.wait_for_timeout(300);print("restricted toast:",pg.inner_text("#toast"))
    pg.evaluate("openFileView('d1','MOA.pdf')");pg.wait_for_timeout(300);print("CONF:",pg.inner_text("#sheet")[:120].replace("\n"," | "))
    print("ERR",errs);b.close()
