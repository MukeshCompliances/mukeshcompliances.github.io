from playwright.sync_api import sync_playwright
PDF=open("/home/claude/tests/npm/node_modules/pdfjs-dist/build/pdf.min.js").read()
PDFW=open("/home/claude/tests/npm/node_modules/pdfjs-dist/build/pdf.worker.min.js").read()
def route(r): r.fulfill(status=200,content_type="application/javascript",body=PDFW if "worker" in r.request.url else PDF)
with sync_playwright() as p:
    b=p.chromium.launch();ctx=b.new_context(viewport={"width":400,"height":900});ctx.route("https://cdnjs.cloudflare.com/**",route)
    pg=ctx.new_page();errs=[];pg.on("pageerror",lambda e:errs.append(str(e)))
    pg.goto("file:///home/claude/compliance-app/index.html");pg.wait_for_timeout(400)
    pg.evaluate("""()=>{assets={upload:async f=>({id:'b'+Math.random().toString(36).slice(2)})};
      parties=[{id:'p1',name:'ADDENDA CHEMICAL INDIA PRIVATE LIMITED',entity:'pvt',pan:'AAPCA8845F',cin:'U74999DL2017PTC321640',gsts:[{gstin:'06AAPCA8845F1ZC'}]}];
      const mk=(id,code,period,due,gst)=>({id,name:code,code,clientId:'p1',client:'ADDENDA',gstin:gst||'',pan:'AAPCA8845F',category:'it',frequency:'yearly',period,dueDate:due,status:'pending',proofs:[],history:[]});
      items=[mk('t1','TAR','FY 2025-26','2026-10-21'),mk('t2','GSTR-3B','Oct 2026','2026-11-20','06AAPCA8845F1ZC'),mk('t3','AOC-4','FY 2025-26','2026-10-30'),mk('t4','ITR','FY 2025-26','2026-11-21')];render()}""")
    for id,fn in [("t1","tar_ack.pdf"),("t1","tar_wrong.pdf"),("t2","gst_oct.pdf"),("t3","fs_ye.pdf"),("t4","tar_ack.pdf")]:
        pg.evaluate(f"openFile('{id}')");pg.set_input_files("#ff input[name=proof]",fn);pg.click("#sv");pg.wait_for_timeout(2000)
        el=pg.query_selector("#pcRes");print(id,fn,"=>",(el.inner_text() if el else "(saved directly: OK)").replace("\n"," | ")[:260]);pg.evaluate("closeSheet()")
    print("FACTS:",pg.evaluate("JSON.stringify(periodFacts('Assessment Year : 2026-27 Financial Year : -'))"))
    print("REL:",pg.evaluate("JSON.stringify([crPeriods('AY 2024-25'),crPeriods('Assessment Year : 2024-25'),crPeriods('F.Y. 2023-24'),crPeriods('for 2024-25')])"))
    print("ERR",errs);b.close()
