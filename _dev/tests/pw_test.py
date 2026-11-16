from playwright.sync_api import sync_playwright
PDF=open("/home/claude/tests/npm/node_modules/pdfjs-dist/build/pdf.min.js").read()
PDFW=open("/home/claude/tests/npm/node_modules/pdfjs-dist/build/pdf.worker.min.js").read()
store={}
def route(r):r.fulfill(status=200,content_type="application/javascript",body=PDFW if "worker" in r.request.url else PDF)
with sync_playwright() as p:
    b=p.chromium.launch();ctx=b.new_context(viewport={"width":400,"height":900});ctx.route("https://cdnjs.cloudflare.com/**",route)
    ctx.route("**/_blob/**",lambda r:r.fulfill(status=200,content_type="application/pdf",body=open("/home/claude/tests/tds26q_locked.pdf","rb").read()))
    pg=ctx.new_page();errs=[];pg.on("pageerror",lambda e:errs.append(str(e)))
    pg.goto("http://localhost:8765/index.html");pg.wait_for_timeout(500)
    pg.evaluate("""()=>{assets={upload:async f=>({id:'b'+Math.random().toString(36).slice(2)})};
      parties=[{id:'p1',name:'ADDENDA CHEMICAL',entity:'pvt',pan:'AAPFU0939F',tanNo:'JPRS12345A',tan:true,gsts:[],docs:[]}];localStorage.setItem('compliance_parties_v1',JSON.stringify(parties));
      items=[{id:'t1',name:'TDS return',code:'TDS-NON',clientId:'p1',client:'ADDENDA CHEMICAL',category:'it',period:'Q2 FY 2026-27',dueDate:'2026-10-31',status:'pending',proofs:[],history:[]},
             {id:'t2',name:'TDS return',code:'TDS-NON',clientId:'p1',client:'ADDENDA CHEMICAL',category:'it',period:'Q1 FY 2026-27',dueDate:'2026-07-31',status:'pending',proofs:[],history:[]}];
      localStorage.setItem('compliance_local_v1',JSON.stringify(items));render()}""")
    pg.click("#nVault");pg.fill("#vm1","master123");pg.fill("#vm2","master123");pg.click("#vSetF button");pg.wait_for_timeout(1800)
    pg.evaluate("openFile('t1')");pg.set_input_files("#ff input[name=proof]","tds26q_locked.pdf");pg.click("#sv");pg.wait_for_timeout(2500)
    print("NO PW:",pg.inner_text("#pcRes").replace("\n"," | ")[:150])
    pg.fill("#fpw","JPRS12345A");pg.click("#sv");pg.wait_for_timeout(3000)
    print("SAVED:",pg.evaluate("JSON.stringify([items.find(x=>x.id==='t1').status,!!items.find(x=>x.id==='t1').proofs[0].pwEnc])"))
    # second locked file for same client: auto password
    pg.evaluate("openFile('t2')");pg.set_input_files("#ff input[name=proof]","q1_locked.pdf");pg.click("#sv");pg.wait_for_timeout(3000)
    print("AUTO:",pg.inner_text("#pcRes").replace("\n"," | ")[:200] if pg.locator("#pcRes").count() else "saved directly: "+pg.evaluate("items.find(x=>x.id==='t2').status"))
    if pg.locator("#ov.on").count(): pg.click("#cancel")
    # viewer
    pid=pg.evaluate("items.find(x=>x.id==='t1').proofs[0].id");pg.evaluate(f"openFileView('{pid}','x.pdf')");pg.wait_for_timeout(3000)
    print("VIEW:",pg.inner_text("#fvb")[:120],"canvases:",pg.locator("#fvb canvas").count())
    pg.screenshot(path="/home/claude/tests/pwview.png")
    print("ERR",errs);b.close()
