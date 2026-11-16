from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b=p.chromium.launch();pg=b.new_page(viewport={"width":400,"height":900})
    errs=[];pg.on("pageerror",lambda e:errs.append(str(e)))
    pg.goto("file:///home/claude/compliance-app/index.html");pg.wait_for_timeout(400)
    pg.click("#firstClient");pg.click(".ent[data-e=prop]");pg.fill("#w_name","Gupta Traders");pg.click("#wNext");pg.click("#wNext")
    pg.click(".yn[data-v='1']");pg.fill(".gIn2","08ABCDE1234F1Z0");pg.select_option(".gF","monthly");pg.click("#wNext")
    pg.click(".yn[data-v='1']");pg.click("#wNext")   # tds yes (non-salary default)
    for v in "01000": pg.click(".yn[data-v='%s']"%v)  # audit,adv,pf,esi,udyam
    pg.wait_for_timeout(100);print("step:",pg.inner_text("#sheet")[:40])
    pg.click("#wNext");pg.wait_for_timeout(200)
    print("start default:",pg.input_value("#gFrom"))
    # simulate old behaviour: only from Sep
    pg.select_option("#gFrom","2026-09");pg.click("#go");pg.wait_for_timeout(600)
    pg.click("#nDash");print("DASH warn:",[t for t in pg.locator(".warn").all_inner_texts()])
    pg.click("#fillDash");print("FILL:",pg.inner_text("#sheet")[:300])
    pg.click("#go");pg.wait_for_timeout(800)
    pg.click("#nList");pg.click("[data-grp=gst]");pg.select_option("#pq","3");pg.select_option("#pm","2026-10")
    print("OCT by period:",pg.inner_text("#listBody")[:300])
    pg.click("#basis button[data-b=due]");pg.select_option("#pq","3");pg.select_option("#pm","2026-10")
    print("OCT by due:",pg.inner_text("#listBody")[:300])
    pg.screenshot(path="/home/claude/tests/oct.png")
    print("ERR",errs);b.close()
