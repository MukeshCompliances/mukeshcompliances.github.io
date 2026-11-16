from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b=p.chromium.launch();pg=b.new_page(viewport={"width":400,"height":900})
    errs=[];pg.on("pageerror",lambda e:errs.append(str(e)))
    pg.goto("file:///home/claude/compliance-app/index.html");pg.wait_for_timeout(400)
    pg.click("#firstClient");pg.click(".ent[data-e=pvt]");pg.fill("#w_name","ADDENDA CHEMICAL");pg.click("#wNext");pg.fill("#w_pan","AAPFU0939F");pg.click("#wNext")
    pg.click(".yn[data-v='1']");pg.fill(".gIn2","27AAPFU0939F1ZV");pg.click("#wNext")
    pg.click(".yn[data-v='1']");pg.fill("#w_tanNo","JPRS12345A");pg.click("#wNext")
    while pg.locator(".yn").count(): pg.click(".yn[data-v='0']")
    pg.click("#wNext");pg.wait_for_timeout(200);pg.click("#cancel");pg.click("#cl")
    pg.click("#nVault");pg.fill("#vm1","master123");pg.fill("#vm2","master123");pg.click("#vSetF button");pg.wait_for_timeout(1800)
    # sheet: fill GST with expiry in 10 days
    r0=pg.locator(".vst tbody tr").nth(0);r0.locator("input[data-f=password]").fill("g1");r0.locator("input[data-f=expiresOn]").fill("2026-11-24")
    pg.click("#vShSave");pg.wait_for_timeout(1500)
    # card view: income tax with 90-day policy via form
    pg.click("#vModeB");pg.wait_for_timeout(300);pg.locator(".vmiss").first.click();pg.wait_for_timeout(300)
    pg.fill("#vfpw","it1");pg.select_option("#vfexd","90");pg.click("#vf button[type=submit]");pg.wait_for_timeout(800)
    print("ITEM:",[l for l in pg.inner_text("#sheet").split("\n") if "एक्सपायर" in l or "दिन" in l][:4])
    pg.click("#vCl2");pg.click("#nDash");pg.wait_for_timeout(200)
    print("DASH:",[l for l in pg.inner_text("#dash").split("\n") if "एक्सपायर" in l or "GST पोर्टल" in l][:5])
    pg.fill("#gsQ","traces");pg.wait_for_timeout(250);print("GS:",pg.inner_text("#gsRes").replace("\n"," | ")[:200])
    pg.screenshot(path="/home/claude/tests/exp.png")
    print("ERR",errs);b.close()
