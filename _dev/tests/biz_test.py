import json
from playwright.sync_api import sync_playwright
P=[{"id":"p1","name":"ADDENDA","entity":"pvt","pan":"AAPCA8845F","cin":"U74999DL2017PTC321640","tan":True,"tdsSal":True,"tdsNon":True,"audit":True,"advTax":True,"msme":True,"dpt3":True,
    "gsts":[{"gstin":"06AAPCA8845F1ZC","type":"regular","freq":"monthly","to2":True,"to5":True},{"gstin":"27AAPCA8845F1Z8","type":"regular","freq":"monthly","to2":True,"to5":True}]}]
with sync_playwright() as p:
    b=p.chromium.launch();pg=b.new_page(viewport={"width":400,"height":900})
    errs=[];pg.on("pageerror",lambda e:errs.append(str(e)))
    pg.goto("file:///home/claude/compliance-app/index.html")
    pg.evaluate(f"localStorage.setItem('compliance_parties_v1',{json.dumps(json.dumps(P))})");pg.reload();pg.wait_for_timeout(400)
    pg.evaluate("openClient('p1')");pg.wait_for_timeout(200);print("BTN:",pg.inner_text("#apBtn"))
    pg.click("#apBtn");pg.wait_for_timeout(200);print("APPLIC1:",pg.inner_text("#sheet")[:500])
    pg.click("#apEd");pg.wait_for_timeout(200)
    pg.click(".bzAct[data-a=mfg]");pg.click(".bzAct[data-a=export]");pg.click(".bzAct[data-a=jobwork]")
    pg.select_option("#bzTo","o10");pg.fill("#bzEmp","45")
    locs=pg.locator("#bzLocs .bzLoc");print("LOCS prefilled:",locs.count())
    locs.nth(0).locator(".bzKd").select_option("factory");locs.nth(0).locator(".bzEh").fill("30")
    locs.nth(1).locator(".bzEh").fill("15")
    pg.click("#bzAddLic");pg.locator("#bzLics .bzLic").nth(0).locator(".bzLe").fill("2027-03-31")
    pg.click("#bzSave");pg.wait_for_timeout(300)
    print("APPLIC2:",pg.inner_text("#sheet"))
    pg.click("#apGen");pg.wait_for_timeout(300);print("GEN:",pg.inner_text("#gPrev"))
    pg.screenshot(path="/tmp/biz.png",full_page=False)
    print("ERR",errs);b.close()
