from playwright.sync_api import sync_playwright
PDF=open("/home/claude/tests/npm/node_modules/pdfjs-dist/build/pdf.min.js").read()
PDFW=open("/home/claude/tests/npm/node_modules/pdfjs-dist/build/pdf.worker.min.js").read()
def route(r):
    u=r.request.url
    r.fulfill(status=200,content_type="application/javascript",body=PDFW if "worker" in u else PDF)
with sync_playwright() as p:
    b=p.chromium.launch();ctx=b.new_context(viewport={"width":400,"height":900});ctx.route("https://cdnjs.cloudflare.com/**",route)
    pg=ctx.new_page();errs=[];pg.on("pageerror",lambda e:errs.append(str(e)))
    pg.goto("file:///home/claude/compliance-app/index.html");pg.wait_for_timeout(400)
    pg.evaluate("""()=>{assets={upload:async f=>({id:'b'+Math.random().toString(36).slice(2)})};
      const it={id:'c1',name:'GSTR-3B',code:'GSTR-3B',client:'ADDENDA CHEMICAL',gstin:'27AAPFU0939F1ZV',category:'gst',frequency:'monthly',period:'Oct 2026',dueDate:'2026-11-20',status:'pending',proofs:[],history:[]};
      const it2={id:'c2',name:'GSTR-3B',code:'GSTR-3B',client:'ADDENDA CHEMICAL',gstin:'27AAPFU0939F1ZV',category:'gst',frequency:'monthly',period:'Sep 2026',dueDate:'2026-10-20',status:'pending',proofs:[],history:[]};
      items=[it,it2];localStorage.setItem('compliance_local_v1',JSON.stringify(items));render()}""")
    # case 1: wrong month (Sep file on Oct entry)
    pg.evaluate("openFile('c1')");pg.set_input_files("#ff input[name=proof]","sep.pdf");pg.click("#sv");pg.wait_for_timeout(2500)
    print("WRONG MONTH:",pg.inner_text("#pcRes").replace("\n"," | ")[:400],"| BTN:",pg.inner_text("#sv"))
    # case 2: correct file
    pg.set_input_files("#ff input[name=proof]","oct.pdf");pg.click("#sv");pg.wait_for_timeout(2500)
    print("RIGHT saved directly")
    pg.wait_for_timeout(800)
    st=pg.evaluate("JSON.stringify(items.find(x=>x.id==='c1').status)+' '+items.find(x=>x.id==='c1').proofs[0].name");print("SAVED:",st)
    # case 3: same file on Sep entry -> duplicate
    pg.evaluate("openFile('c2')");pg.set_input_files("#ff input[name=proof]","oct.pdf");pg.click("#sv");pg.wait_for_timeout(2500)
    print("DUP:",pg.inner_text("#pcRes").replace("\n"," | ")[:300])
    pg.click("#sv");pg.wait_for_timeout(800);print("FLAGGED:",pg.evaluate("JSON.stringify([items.find(x=>x.id==='c2').status,items.find(x=>x.id==='c2').proofIssue])"))
    pg.evaluate("openDetail('c2')");pg.wait_for_timeout(200);pg.screenshot(path="/home/claude/tests/pc.png",full_page=True)
    print("DETAIL BTNS:",pg.locator("#sheet .actions").first.inner_text().replace("\n"," | "))
    print("ERR",errs);b.close()
