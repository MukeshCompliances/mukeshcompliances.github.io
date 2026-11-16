from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b=p.chromium.launch();pg=b.new_page(viewport={"width":400,"height":900})
    errs=[];pg.on("pageerror",lambda e:errs.append(str(e)))
    pg.goto("file:///home/claude/compliance-app/index.html");pg.wait_for_timeout(400)
    pg.click("#firstClient");pg.click(".ent[data-e=pvt]");pg.fill("#w_name","Sharma Pvt Ltd");pg.click("#wNext");pg.click("#wNext")
    pg.click(".yn[data-v='1']");pg.fill(".gIn2","27AAPFU0939F1ZV");pg.click("#wNext")
    pg.click(".yn[data-v='1']");pg.check("#w_tdsSal");pg.click("#wNext")
    for v in "1100011" : pg.click(".yn[data-v='%s']"%v)
    pg.click(".yn[data-v='0']")
    pg.click("#wNext");pg.wait_for_timeout(200);pg.click("#go");pg.wait_for_timeout(500)
    pg.click("#nDash");print(pg.inner_text("#dash"))
    pg.screenshot(path="/home/claude/tests/dash.png",full_page=True)
    print("ERR",errs);b.close()
