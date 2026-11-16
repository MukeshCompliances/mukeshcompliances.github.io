from playwright.sync_api import sync_playwright
PDF=open("/home/claude/tests/npm/node_modules/pdfjs-dist/build/pdf.min.js").read()
PDFW=open("/home/claude/tests/npm/node_modules/pdfjs-dist/build/pdf.worker.min.js").read()
def route(r):r.fulfill(status=200,content_type="application/javascript",body=PDFW if "worker" in r.request.url else PDF)
with sync_playwright() as p:
    b=p.chromium.launch();ctx=b.new_context(viewport={"width":400,"height":900});ctx.route("https://cdnjs.cloudflare.com/**",route)
    pg=ctx.new_page();errs=[];pg.on("pageerror",lambda e:errs.append(str(e)))
    pg.goto("file:///home/claude/compliance-app/index.html");pg.wait_for_timeout(400)
    pg.evaluate("""()=>{assets={upload:async f=>({id:'b'+Math.random().toString(36).slice(2)})};
      parties=[{id:'p1',name:'ADDENDA CHEMICAL',entity:'pvt',pan:'AAPFU0939F',tanNo:'JPRS12345A',tan:true,gsts:[{gstin:'27AAPFU0939F1ZV'}],docs:[]}];localStorage.setItem('compliance_parties_v1',JSON.stringify(parties));
      items=[{id:'t1',name:'TDS return – Form 140',code:'TDS-NON',clientId:'p1',client:'ADDENDA CHEMICAL',category:'it',frequency:'quarterly',period:'Q2 FY 2026-27',dueDate:'2026-10-31',status:'pending',proofs:[],history:[]},
             {id:'i1',name:'Income tax return (ITR)',code:'ITR',clientId:'p1',client:'ADDENDA CHEMICAL',category:'it',frequency:'yearly',period:'FY 2025-26',dueDate:'2026-10-31',status:'pending',proofs:[],history:[]}];
      localStorage.setItem('compliance_local_v1',JSON.stringify(items));render()}""")
    for (iid,fn) in [("t1","tds_wrongq.pdf"),("t1","tds26q.pdf"),("i1","itr.pdf")]:
        pg.evaluate(f"openFile('{iid}')");pg.set_input_files("#ff input[name=proof]",fn);pg.click("#sv");pg.wait_for_timeout(2500)
        txt=pg.inner_text("#pcRes") if pg.locator("#pcRes").count() else "(saved directly)"
        print(fn,"→",txt.replace("\n"," | ")[:260])
        if pg.locator("#ov.on").count(): pg.click("#cancel")
    # docs tab: wrong PAN card
    pg.click("#nDocs");pg.evaluate("openDocUpload()");pg.select_option("#duc","p1");pg.select_option("#dut","docPan");pg.set_input_files("#duf","pan_wrong.pdf");pg.click("#dgo");pg.wait_for_timeout(2500)
    print("PAN WRONG:",pg.inner_text("#dupc").replace("\n"," | ")[:250])
    pg.set_input_files("#duf","pan_ok.pdf");pg.click("#dgo");pg.wait_for_timeout(2500)
    print("PAN OK saved:",pg.evaluate("JSON.stringify(parties[0].docs.map(d=>[d.name,d.check.status]))"))
    print("ERR",errs);b.close()
