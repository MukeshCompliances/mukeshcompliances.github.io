from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b=p.chromium.launch();ctx=b.new_context(viewport={"width":400,"height":900});ctx.grant_permissions(["clipboard-read","clipboard-write"])
    pg=ctx.new_page();errs=[];pg.on("pageerror",lambda e:errs.append(str(e)))
    pg.goto("file:///home/claude/compliance-app/index.html");pg.wait_for_timeout(400)
    pg.click("#nVault");print(pg.inner_text("#vault")[:120])
    pg.fill("#vm1","master123");pg.fill("#vm2","master123");pg.click("#vSetF button");pg.wait_for_timeout(1500)
    print("AFTER SET:",pg.inner_text("#vault")[:80])
    pg.click("#vAddB");pg.select_option("#vfp","gst");pg.fill("#vfl","27AAPFU0939F1ZV");pg.fill("#vfun","sharma_gst");pg.fill("#vfpw","Old@123");pg.click("#vf button[type=submit]");pg.wait_for_timeout(800)
    pg.click("#vEd");pg.wait_for_timeout(300);pg.fill("#vfpw","New@456");pg.click("#vf button[type=submit]");pg.wait_for_timeout(800)
    pg.click("#vRev");pg.wait_for_timeout(300);print("REVEAL:",pg.inner_text("#vP"))
    pg.click("details.tgf summary");pg.click(".vor");pg.wait_for_timeout(300);print("OLD:",pg.inner_text(".vo"))
    print("SHEET:",pg.inner_text("#sheet")[-250:])
    pg.screenshot(path="/home/claude/tests/vault.png")
    # lock & wrong password
    pg.click("#vCl2");pg.click("#vLockB");pg.fill("#vm","wrongpass");pg.click("#vUnF button");pg.wait_for_timeout(1500);print("WRONG:",pg.inner_text("#verr"))
    pg.fill("#vm","master123");pg.click("#vUnF button");pg.wait_for_timeout(1500);print("UNLOCKED:",pg.inner_text("#vault")[:150])
    print("stored:",pg.evaluate("localStorage.getItem('compliance_vault_v1')")[:200])
    print("ERR",errs);b.close()
