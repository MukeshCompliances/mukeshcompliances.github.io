from playwright.sync_api import sync_playwright
N="/home/claude/tests/npm/node_modules/"
PDF=open(N+"pdfjs-dist/build/pdf.min.js").read();PDFW=open(N+"pdfjs-dist/build/pdf.worker.min.js").read();XL=open(N+"xlsx/dist/xlsx.full.min.js").read()
def route(r):
    u=r.request.url;r.fulfill(status=200,content_type="application/javascript",body=XL if "xlsx" in u else PDFW if "worker" in u else PDF)
with sync_playwright() as p:
    b=p.chromium.launch();ctx=b.new_context(viewport={"width":400,"height":900});ctx.route("https://cdnjs.cloudflare.com/**",route)
    pg=ctx.new_page();errs=[];pg.on("pageerror",lambda e:errs.append(str(e)))
    pg.goto("file:///home/claude/compliance-app/index.html");pg.wait_for_timeout(400)
    pg.evaluate("""()=>{assets={upload:async f=>({id:'b'+Math.random().toString(36).slice(2)})};
      parties=[{id:'p1',name:'ADDENDA CHEMICAL INDIA PRIVATE LIMITED',entity:'pvt',pan:'AAPCA8845F',cin:'U74999DL2017PTC321640',tan:true,tanNo:'DELA45542A',tdsNon:true,audit:true,gsts:[{gstin:'06AAPCA8845F1ZC',type:'regular',freq:'monthly'}]}];
      const g=generate(parties[0],'2026-04','2027-03');window._g=g.filter(o=>o.code==='FS').map(o=>o.period+' '+o.due);
      const mk=(id,code,period,due)=>({id,name:code,code,clientId:'p1',client:'ADDENDA',gstin:'',pan:'AAPCA8845F',category:'it',frequency:'yearly',period,dueDate:due,status:'pending',proofs:[],history:[]});
      items=[mk('f1','FS','FY 2025-26','2026-09-30'),mk('t1','TDS-PAY','Apr 2026','2026-05-07')];render()}""")
    print("GEN FS:",pg.evaluate("_g"))
    pg.evaluate("openDetail('f1')");pg.click("#fsB");pg.set_input_files("#fsF","fs.pdf");pg.set_input_files("#fsA","tb.csv");pg.fill("#fsD","2026-09-01");pg.click("#fsGo");pg.wait_for_timeout(3500)
    print(pg.inner_text("#fsOut")[:2200]);print("FERR:",pg.inner_text("#ferr"))
    print("ITEMS:",pg.evaluate("JSON.stringify(items.map(i=>[i.code,i.dueDate,i.fsIssue||false]))"))
    for fn in ["tds_chal.pdf","tds_chal_old.pdf"]:
        pg.evaluate("openFile('t1')");pg.set_input_files("#ff input[name=proof]",fn);pg.click("#sv");pg.wait_for_timeout(2000)
        el=pg.query_selector("#pcRes");print(fn,"=>",(el.inner_text() if el else "(saved OK) "+pg.evaluate("items.find(i=>i.id=='t1').status")).replace("\n"," | ")[:300]);pg.evaluate("closeSheet();items.find(i=>i.id=='t1').status='pending';items.find(i=>i.id=='t1').proofs=[]")
    print("ERR",errs);b.close()
