from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b=p.chromium.launch();pg=b.new_page(viewport={"width":400,"height":900})
    errs=[];pg.on("pageerror",lambda e:errs.append(str(e)))
    pg.goto("file:///home/claude/compliance-app/index.html");pg.wait_for_timeout(400)
    pg.click("#firstAdd");pg.fill("#f input[name=name]","GSTR-3B");pg.fill("#f input[name=assignee]","Mohd Shoeb");pg.click("#f button[type=submit]");pg.wait_for_timeout(300)
    pg.click("#nTeam");pg.wait_for_timeout(200);print(pg.inner_text("#emBox")[:500])
    pg.fill("#em_owner","owner@example.com");pg.fill(".em_p","shoeb@example");pg.click("#emSave");print("ERR1:",pg.inner_text("#emErr"))
    pg.fill(".em_p","shoeb@example.com");pg.click("#emSave");pg.wait_for_timeout(200);print("SAVED:",pg.evaluate("localStorage.getItem('compliance_email_v1')"))
    print("ERR",errs);b.close()
