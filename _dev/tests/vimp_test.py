from playwright.sync_api import sync_playwright
LIB=open("/home/claude/tests/npm/node_modules/xlsx/dist/xlsx.full.min.js").read()
with sync_playwright() as p:
    b=p.chromium.launch();ctx=b.new_context(viewport={"width":400,"height":900})
    ctx.route("https://cdnjs.cloudflare.com/**",lambda r:r.fulfill(status=200,content_type="application/javascript",body=LIB))
    pg=ctx.new_page();errs=[];pg.on("pageerror",lambda e:errs.append(str(e)))
    pg.goto("file:///home/claude/compliance-app/index.html");pg.wait_for_timeout(400)
    pg.click("#nVault");pg.fill("#vm1","master123");pg.fill("#vm2","master123");pg.click("#vSetF button");pg.wait_for_timeout(1500)
    pg.click("#vImpB");pg.set_input_files("#vif","/home/claude/tests/pw.xlsx");pg.wait_for_timeout(1500)
    print("MAP:",pg.inner_text("#vimap")[:700]);pg.screenshot(path="/home/claude/tests/vimp.png",full_page=True)
    pg.click("#vigo");pg.wait_for_timeout(3000)
    print("VAULT:",pg.inner_text("#vault")[:500])
    # reimport same: should be unchanged
    pg.click("#vImpB");pg.set_input_files("#vif","/home/claude/tests/pw.xlsx");pg.wait_for_timeout(1500);pg.click("#vigo");pg.wait_for_timeout(2500)
    print("TOAST:",pg.inner_text("#toast"))
    print("ERR",errs);b.close()
