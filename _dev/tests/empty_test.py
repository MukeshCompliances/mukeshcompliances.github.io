from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b=p.chromium.launch();pg=b.new_page(viewport={"width":400,"height":800})
    errs=[];pg.on("pageerror",lambda e:errs.append(str(e)))
    pg.goto("file:///home/claude/compliance-app/index.html");pg.wait_for_timeout(400)
    print(pg.inner_text("header"));print(pg.inner_text("#dash"))
    pg.screenshot(path="/home/claude/tests/empty.png")
    pg.click("#firstClient");print("SHEET:",pg.inner_text("#sheet")[:80])
    print("ERR",errs);b.close()
