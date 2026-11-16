from playwright.sync_api import sync_playwright
import os
N="/home/claude/tests/npm/node_modules/"
def cdn(r):
    u=r.request.url
    f=N+("xlsx/dist/xlsx.full.min.js" if "xlsx" in u else "pdfjs-dist/build/pdf.worker.min.js" if "worker" in u else "pdfjs-dist/build/pdf.min.js")
    r.fulfill(status=200,content_type="application/javascript",body=open(f).read())
with sync_playwright() as p:
    b=p.chromium.launch();pg=b.new_page(viewport={"width":400,"height":900});errs=[];pg.on("pageerror",lambda e:errs.append(str(e)))
    pg.route("https://cdnjs.cloudflare.com/**",cdn)
    pg.goto("file:///home/claude/compliance-app/index.html");pg.wait_for_timeout(600)
    pg.evaluate("saveParty({id:'P1',name:'ADDENDA TEST PVT LTD',entity:'pvt',pan:'AAPCA8845F',tanNo:'DELA45542A',gsts:[],docs:[]})");pg.wait_for_timeout(200)
    pg.evaluate("openClient('P1')");pg.wait_for_timeout(200);print("BTN:",pg.inner_text("#trCB")[:60].replace("\n"," | "))
    pg.click("#trCB");pg.wait_for_timeout(200)
    pg.set_input_files("#trWf","trw.csv");pg.wait_for_timeout(900);print("ROWS:",pg.evaluate("JSON.stringify(trItems[0].rows)"))
    pg.set_input_files("#trCf",["trc1.pdf","trc2.pdf","trc3.pdf","trc4.pdf"]);pg.wait_for_timeout(2000)
    print("CH:",pg.evaluate("JSON.stringify(trItems[0].challans.map(c=>[c.date,c.sec,c.amt,c.int,c.no,c.fy]))"))
    R=pg.evaluate("(()=>{const R=trCompare(trItems[0]);return JSON.stringify({tE:R.tE,tP:R.tP,tInt:R.tInt,rows:R.rows.filter(r=>r.e||r.p).map(r=>[r.m,r.e,r.p,r.st,r.notes.length])})})()");print("CMP:",R)
    pg.set_input_files("#trCf",["trc1.pdf"]);pg.wait_for_timeout(900);print("DUP:",pg.evaluate("trItems[0].challans.length"))
    pg.select_option("#trTq","Q1");pg.fill("#trTn","ABC");pg.fill("#trTa","36900");pg.click("#trTadd");pg.wait_for_timeout(300)
    pg.set_input_files("#trCf",["trbad.pdf"]);pg.wait_for_timeout(1200);print("MSG:",pg.inner_text("#trMsg"));print("NEED:",pg.evaluate("trCompare(trItems[0]).need.length"),pg.locator(".trNok").count())
    pg.fill(".trNd","2026-06-07");pg.fill(".trNa","500");pg.click(".trNok");pg.wait_for_timeout(300);print("AFTER FILL:",pg.evaluate("(()=>{const R=trCompare(trItems[0]);return JSON.stringify([R.need.length,R.tE,R.tP,R.rows.filter(r=>r.e).map(r=>r.st)])})()"))
    pg.evaluate("trItems[0].challans=trItems[0].challans.filter(c=>!c.manual);openTr('P1')");pg.wait_for_timeout(200)
    pg.click(".trAcc");pg.wait_for_timeout(200);pg.fill("#trWhy","₹500 अगले चालान में");pg.click("#trWhyOk");pg.wait_for_timeout(300)
    print("ACC:",pg.evaluate("(()=>{const R=trCompare(trItems[0]);return JSON.stringify([R.tAcc,R.rows.filter(r=>r.e).map(r=>r.st)])})()"));pg.click("#trBk");pg.wait_for_timeout(200);print("BTN2:",pg.inner_text("#trCB").split("\n")[-1]);pg.click("#trCB");pg.wait_for_timeout(200)
    pg.locator(".trCwB").first.click();pg.wait_for_timeout(200);pg.fill("#trCw","पिछले साल का");pg.click("#trCwSkip");pg.wait_for_timeout(300);print("SKIP:",pg.evaluate("JSON.stringify([trCompare(trItems[0]).tP,trItems[0].challans[0].skip])"))
    print(pg.inner_text("#sheet")[:700])
    pg.screenshot(path="/tmp/tr.png",full_page=True)
    print("ERR",errs);b.close()
