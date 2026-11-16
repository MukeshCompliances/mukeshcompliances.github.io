from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b=p.chromium.launch();pg=b.new_page(viewport={"width":400,"height":900})
    errs=[];pg.on("pageerror",lambda e:errs.append(str(e)))
    pg.goto("file:///home/claude/compliance-app/index.html");pg.wait_for_timeout(400)
    pg.click("#addComp") if False else None
    pg.click("#firstAdd");pg.fill("#f input[name=name]","GSTR-3B Oct");pg.click("#f button[type=submit]");pg.wait_for_timeout(300)
    pg.evaluate("()=>{myRole=()=>'junior';paintStatic();render()}")
    print("NAV:",pg.inner_text("nav").replace("\n"," | "))
    pg.click("#dash .item");print("JR BUTTONS:",pg.locator("#sheet .actions").first.inner_text().replace("\n"," | "))
    pg.click("#markFiled");pg.fill("#ff input[name=arn]","AA123");pg.click("#sv");pg.wait_for_timeout(400)
    pg.evaluate("()=>{myRole=()=>'senior';paintStatic();render()}")
    print("DASH:",[l for l in pg.inner_text("#dash").split("\n") if "अप्रूवल" in l or "जूनियर" in l])
    pg.click("#dash .grp .item")
    print("SR BUTTONS:",pg.locator("#sheet .actions").first.inner_text().replace("\n"," | "))
    pg.click("#apOk");pg.wait_for_timeout(300);print("HIST:",pg.inner_text("#sheet .hist")[:200])
    print("ERR",errs);b.close()
