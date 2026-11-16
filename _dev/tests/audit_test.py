from playwright.sync_api import sync_playwright
PDF=open("/home/claude/tests/npm/node_modules/pdfjs-dist/build/pdf.min.js").read()
PDFW=open("/home/claude/tests/npm/node_modules/pdfjs-dist/build/pdf.worker.min.js").read()
B={"pan1":"pan_ok.pdf","pan2":"pan_wrong.pdf","q2":"tds26q.pdf","q1":"tds_wrongq.pdf","dup":"tds26q.pdf"}
def route(r):r.fulfill(status=200,content_type="application/javascript",body=PDFW if "worker" in r.request.url else PDF)
with sync_playwright() as p:
    b=p.chromium.launch();ctx=b.new_context(viewport={"width":400,"height":900});ctx.route("https://cdnjs.cloudflare.com/**",route)
    ctx.route("**/_blob/**",lambda r:r.fulfill(status=200,content_type="application/pdf",body=open("/home/claude/tests/"+B[r.request.url.split("/_blob/")[1]],"rb").read()))
    pg=ctx.new_page();errs=[];pg.on("pageerror",lambda e:errs.append(str(e)))
    pg.goto("http://localhost:8765/index.html");pg.wait_for_timeout(400)
    pg.evaluate("""()=>{
      parties=[{id:'p1',name:'ADDENDA CHEMICAL',entity:'pvt',pan:'AAPFU0939F',tanNo:'JPRS12345A',tan:true,gsts:[{gstin:'27AAPFU0939F1ZV'}],docs:[{id:'pan1',name:'PAN.pdf',label:'docPan'},{id:'pan2',name:'PAN copy.pdf',label:'docPan'}]}];localStorage.setItem('compliance_parties_v1',JSON.stringify(parties));
      items=[{id:'t1',name:'TDS return',code:'TDS-NON',clientId:'p1',client:'ADDENDA CHEMICAL',category:'it',period:'Q2 FY 2026-27',dueDate:'2026-10-31',status:'filed_proof',proofs:[{id:'q2',name:'q2.pdf'}],history:[]},
             {id:'t2',name:'TDS return',code:'TDS-NON',clientId:'p1',client:'ADDENDA CHEMICAL',category:'it',period:'Q1 FY 2026-27',dueDate:'2026-07-31',status:'filed_proof',proofs:[{id:'q1',name:'q1.pdf'},{id:'dup',name:'again.pdf'}],history:[]}];
      localStorage.setItem('compliance_local_v1',JSON.stringify(items));render()}""")
    pg.click("#nDocs");pg.click("#dAud");pg.click("#auGo");pg.wait_for_timeout(6000)
    print(pg.inner_text("#auR").replace("\n"," | ")[:900])
    print("ERR",errs);b.close()
