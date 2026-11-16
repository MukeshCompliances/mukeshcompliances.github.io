from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b=p.chromium.launch();pg=b.new_page(viewport={"width":400,"height":900})
    errs=[];pg.on("pageerror",lambda e:errs.append(str(e)))
    pg.goto("file:///home/claude/compliance-app/index.html");pg.wait_for_timeout(400)
    pg.click("#firstClient");pg.click(".ent[data-e=pvt]");pg.fill("#w_name","ADDENDA CHEMICAL");pg.click("#wNext");pg.fill("#w_pan","AAPFU0939F");pg.click("#wNext")
    pg.click(".yn[data-v='1']");pg.fill(".gIn2","27AAPFU0939F1ZV");pg.click("#wNext")
    pg.click(".yn[data-v='1']");pg.fill("#w_tanNo","JPRS12345A");pg.click("#wNext")
    for v in "1100000000": 
        if pg.locator(".yn").count()==0: break
        pg.click(".yn[data-v='%s']"%v)
    pg.fill("#w_assignee","Mohd Shoeb");pg.click("#wNext");pg.wait_for_timeout(200);pg.click("#cancel");pg.click("#cl");pg.click("#nDash")
    print("DASH:",pg.inner_text("#dash")[:600]);print("SHEETOPEN:",pg.is_visible("#ov.on"))
    pg.screenshot(path="/home/claude/tests/vpdash.png",full_page=True)
    pg.click("#vpDash");print("VAULT:",pg.inner_text("#vault")[:400])
    print("ERR",errs);b.close()
