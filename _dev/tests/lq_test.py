from playwright.sync_api import sync_playwright
N="/home/claude/tests/npm/node_modules/"
PDF=open(N+"pdfjs-dist/build/pdf.min.js").read();PDFW=open(N+"pdfjs-dist/build/pdf.worker.min.js").read();XL=open(N+"xlsx/dist/xlsx.full.min.js").read()
def route(r):
    u=r.request.url;r.fulfill(status=200,content_type="application/javascript",body=XL if "xlsx" in u else PDFW if "worker" in u else PDF)
with sync_playwright() as p:
    b=p.chromium.launch();ctx=b.new_context(viewport={"width":400,"height":900});ctx.route("https://cdnjs.cloudflare.com/**",route)
    pg=ctx.new_page();errs=[];pg.on("pageerror",lambda e:errs.append(str(e)))
    pg.goto("file:///home/claude/mukeshcompliances.github.io/_dev/index.html");pg.wait_for_timeout(3500);pg.click("#wnOk")
    pg.evaluate("""()=>{assets={upload:async f=>({id:'x'})};
      parties=[{id:'p1',name:'TEST CHEMICALS PVT LTD',entity:'pvt',pan:'AAPCT1234F',gsts:[{gstin:'06AAPCT1234F1ZC',type:'regular',freq:'monthly'}]}];
      items=[{id:'g1',name:'GSTR-3B',code:'GSTR-3B',clientId:'p1',client:'TEST',category:'gst',frequency:'monthly',period:'Oct 2026',dueDate:'2026-11-20',status:'pending',proofs:[],history:[]}];
      luItems=[{id:'u1',cat:'gst',title:{hi:'GSTR-3B में टेबल 3.2 अब लॉक',en:'GSTR-3B table 3.2 now locked'},sum:{hi:'GSTR-3B की टेबल 3.2 अब GSTR-1 से भरी आएगी और बदली नहीं जा सकेगी।',en:'Table 3.2 of GSTR-3B is now auto-filled from GSTR-1 and cannot be edited.'},before:{hi:'टेबल 3.2 में ख़ुद बदल सकते थे',en:'Table 3.2 could be edited'},after:{hi:'GSTR-1 / IFF में ही सुधार करना होगा',en:'Correct it in GSTR-1 / IFF'},who:{hi:'सभी रेगुलर GST करदाता',en:'All regular GST taxpayers'},act:{hi:['GSTR-1 भरते समय इंटर-स्टेट सप्लाई सही डालें'],en:['Report inter-state supplies correctly in GSTR-1']},eff:'2026-11-01',date:'2026-10-20',impact:'high',source:'GSTN',readBy:{}}];
      render();luOpen('u1')}""")
    pg.click(".lqQ[data-k=who]");print("CHIP:",pg.inner_text("#lqOut").replace("\n"," | "))
    for q in ["ye kab se lagu hai","late hua to penalty kitni","3b late fee kitni lagti hai","table 3.2 kaise sudhare","xyz abc qwerty"]:
        pg.fill("#lqIn",q);pg.click("#lqGo");print("Q:",q,"=>",pg.inner_text("#lqOut").replace("\n"," | ")[:330])
    print("ASKED:",pg.evaluate("kbAsked.map(x=>x.q)"))
    pg.screenshot(path="/home/claude/fptest/lq.png",full_page=False)
    print("ERR",errs);b.close()
