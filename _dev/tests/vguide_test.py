from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b=p.chromium.launch();pg=b.new_page(viewport={"width":400,"height":900})
    errs=[];pg.on("pageerror",lambda e:errs.append(str(e)))
    pg.goto("file:///home/claude/compliance-app/index.html");pg.wait_for_timeout(400)
    pg.click("#firstClient");pg.click(".ent[data-e=pvt]");pg.fill("#w_name","ADDENDA CHEMICAL");pg.click("#wNext");pg.fill("#w_pan","AAPFU0939F");pg.click("#wNext")
    pg.click(".yn[data-v='1']");pg.fill(".gIn2","27AAPFU0939F1ZV");pg.click("#wNext")
    pg.click(".yn[data-v='1']");pg.fill("#w_tanNo","JPRS12345A");pg.click("#wNext")
    while pg.locator(".yn").count(): pg.click(".yn[data-v='0']") if pg.locator(".yn").count() else None
    pg.click("#wNext");pg.wait_for_timeout(200);pg.click("#cancel");pg.click("#cl")
    pg.click("#nVault");pg.fill("#vm1","master123");pg.fill("#vm2","master123");pg.click("#vSetF button");pg.wait_for_timeout(1500)
    pg.click("#vGuideB");pg.wait_for_timeout(300);print("STEP1:",pg.inner_text("#sheet")[:300]);pg.screenshot(path="/home/claude/tests/guide.png")
    pg.fill("#vfun","addenda_gst");pg.fill("#vfpw","g1");pg.click("#vf button[type=submit]");pg.wait_for_timeout(700)
    print("STEP2:",pg.inner_text("#sheet")[:200]," user:",pg.input_value("#vfun"))
    pg.click("#vfskip");pg.wait_for_timeout(500);print("STEP3:",pg.inner_text("#sheet")[:120])
    print("ERR",errs);b.close()
