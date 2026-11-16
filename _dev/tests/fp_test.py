from playwright.sync_api import sync_playwright
N="/home/claude/tests/npm/node_modules/"
PDF=open(N+"pdfjs-dist/build/pdf.min.js").read();PDFW=open(N+"pdfjs-dist/build/pdf.worker.min.js").read();XL=open(N+"xlsx/dist/xlsx.full.min.js").read()
def route(r):
    u=r.request.url;r.fulfill(status=200,content_type="application/javascript",body=XL if "xlsx" in u else PDFW if "worker" in u else PDF)
with sync_playwright() as p:
    b=p.chromium.launch();ctx=b.new_context(viewport={"width":400,"height":900});ctx.route("https://cdnjs.cloudflare.com/**",route)
    pg=ctx.new_page();errs=[];pg.on("pageerror",lambda e:errs.append(str(e)))
    pg.goto("file:///home/claude/mukeshcompliances.github.io/_dev/index.html");pg.wait_for_timeout(3500)
    print("WHATSNEW:",bool(pg.query_selector("#wnCard")));pg.click("#wnOk");print("after ok:",bool(pg.query_selector("#wnCard")))
    pg.evaluate("""()=>{assets={upload:async f=>({id:'b'+Math.random().toString(36).slice(2)})};
      parties=[{id:'p1',name:'TEST CHEMICALS PRIVATE LIMITED',entity:'pvt',pan:'AAPCT1234F',audit:true,gsts:[]}];
      const mk=(id,code,period,due)=>({id,name:code,code,clientId:'p1',client:'TEST',gstin:'',pan:'AAPCT1234F',category:'fin',frequency:'yearly',period,dueDate:due,status:'pending',proofs:[],history:[]});
      items=[mk('f1','FS','FY 2025-26','2026-09-30')];render()}""")
    pg.evaluate("openDetail('f1')");print("BOX0:",pg.inner_text("#fpBox").replace("\n"," | "))
    pg.set_input_files(".fpOne[data-k=bs]","samples/fp_bsonly.pdf");pg.wait_for_timeout(2500)
    print("BOX1:",pg.inner_text("#fpBox").replace("\n"," | "))
    pg.set_input_files("#fpAll","samples/fp_combined.pdf");pg.wait_for_timeout(3500)
    print("BOX2:",pg.inner_text("#fpBox").replace("\n"," | "))
    print("STATUS:",pg.evaluate("JSON.stringify([items[0].status,items[0].filingDate,items[0].proofs.length])"))
    pg.evaluate("closeSheet();render()");pg.click("[data-view=list]") if pg.query_selector("[data-view=list]") else None
    print("ROW:",pg.evaluate("row(items[0]).match(/📑 [0-9\\/]+/)"))
    print("ERR",errs);b.close()
