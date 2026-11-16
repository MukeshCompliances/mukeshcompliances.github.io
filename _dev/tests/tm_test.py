from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b=p.chromium.launch();pg=b.new_page(viewport={"width":400,"height":900});errs=[];pg.on("pageerror",lambda e:errs.append(str(e)))
    pg.goto("file:///home/claude/compliance-app/index.html#demo");pg.wait_for_timeout(1500)
    print("DASH:",pg.inner_text("#dash")[:160].replace("\n"," | "))
    r=pg.evaluate("""JSON.stringify([['TAR FY26-27',{code:'TAR',period:'FY 2026-27',dueDate:'2027-09-30',status:'pending'}],['3B Nov',{code:'GSTR-3B',period:'Nov 2026',dueDate:'2026-12-20',status:'pending'}],['3B Oct',{code:'GSTR-3B',period:'Oct 2026',dueDate:'2026-11-20',status:'pending'}],['3B Sep late',{code:'GSTR-3B',period:'Sep 2026',dueDate:'2026-10-20',status:'pending'}],['TDS Q3',{code:'TDS-NON',period:'Q3 FY 2026-27',dueDate:'2027-01-31',status:'pending'}],['ADV Dec',{code:'ADV3',period:'FY 2026-27',dueDate:'2026-12-15',status:'pending'}],['DIR3',{code:'DIR-3',period:'FY 2026-27',dueDate:'2026-09-30',status:'pending'}],['ITR FY25-26',{code:'ITR',period:'FY 2025-26',dueDate:'2026-11-21',status:'pending'}]].map(([n,i])=>n+': '+timing(i)))""")
    print(r)
    pg.evaluate("show('list')");pg.wait_for_timeout(300);print("TILES:",pg.inner_text("#tiles")[:400].replace("\n"," | "))
    pg.locator("[data-grp=it]").click();pg.wait_for_timeout(300);print("IT:",pg.inner_text("#listBody")[:500].replace("\n"," | "))
    print("ERR",errs);b.close()
