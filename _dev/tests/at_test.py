from playwright.sync_api import sync_playwright
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
    pg.evaluate("openClient('P1')");pg.wait_for_timeout(200);pg.click("#atCB");pg.wait_for_timeout(200)
    pg.set_input_files("#atLf","at_ly.pdf");pg.wait_for_timeout(1500);print("LY:",pg.evaluate("JSON.stringify(atItems[0].ly)"))
    pg.set_input_files("#atPf","at_pl.pdf");pg.wait_for_timeout(1500);print("MSG:",pg.inner_text("#atMsg"))
    print("PL:",pg.evaluate("JSON.stringify([atItems[0].pl.profit,atItems[0].pl.base,atItems[0].pl.heads.map(h=>[h.label,h.amt,h.cls,h.add?1:0,h.k||''])])"))
    print("TDSH:",pg.evaluate("JSON.stringify([atItems[0].pl.tdsHeads,atItems[0].pl.lyMiss])"))
    pg.set_input_files("#atCf",["atc1.pdf","atc2.pdf","atc3.pdf"]);pg.wait_for_timeout(2500);print("MSG2:",pg.inner_text("#atMsg"))
    print("CH:",pg.evaluate("JSON.stringify(atItems[0].challans.map(c=>[c.date,c.amt,c.skip||'']))"))
    print("CALC:",pg.evaluate("(()=>{const C=atCalc(atItems[0],parties[0]);return JSON.stringify({reg:C.reg,profit:C.profit,add:C.add,itDep:C.itDep,ti:C.ti,T:C.T,net:C.net,inst:C.inst.map(i=>[i.due,i.req,i.paid,i.st,i.intr])})})()"))
    pg.fill('.atE[data-k="tds"]',"40000");pg.dispatch_event('.atE[data-k="tds"]',"change");pg.wait_for_timeout(300)
    print(pg.inner_text("#sheet")[:900])
    pg.evaluate("window.__dl=[];dlCap={save:async o=>{window.__dl.push([o.filename,o.data.size])}}");pg.click("#atDl");pg.wait_for_timeout(1200);print("DL:",pg.evaluate("JSON.stringify(window.__dl)"))
    pg.screenshot(path="/tmp/at.png",full_page=True)
    print("ERR",errs);b.close()
