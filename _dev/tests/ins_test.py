import json
from playwright.sync_api import sync_playwright
PDF=open("/home/claude/tests/npm/node_modules/pdfjs-dist/build/pdf.min.js").read()
PDFW=open("/home/claude/tests/npm/node_modules/pdfjs-dist/build/pdf.worker.min.js").read()
def route(r): r.fulfill(status=200,content_type="application/javascript",body=PDFW if "worker" in r.request.url else PDF)
P=[{"id":"p1","name":"ADDENDA CHEMICAL INDIA PRIVATE LIMITED","entity":"pvt","pan":"AAPCA8845F","gsts":[{"gstin":"06AAPCA8845F1ZC","type":"regular","freq":"monthly"}],"prof":{"acts":["mfg","export"],"to":"o10","emp":45,"locs":[{"st":"06","kind":"factory","emp":45}],"lic":[]}}]
with sync_playwright() as p:
    b=p.chromium.launch();ctx=b.new_context(viewport={"width":400,"height":900});ctx.route("https://cdnjs.cloudflare.com/**",route)
    pg=ctx.new_page();errs=[];pg.on("pageerror",lambda e:errs.append(str(e)))
    pg.goto("file:///home/claude/compliance-app/index.html")
    pg.evaluate(f"localStorage.setItem('compliance_parties_v1',{json.dumps(json.dumps(P))})");pg.reload();pg.wait_for_timeout(400)
    pg.evaluate("assets={upload:async f=>({id:'b'+Math.random().toString(36).slice(2)})}")
    pg.click("#nIns");pg.wait_for_timeout(200);print("TAB:",pg.inner_text("#ins")[:200])
    pg.click("#inUpB");pg.select_option("#iuY","fire");pg.set_input_files("#iuF","fire_policy.pdf");pg.click("#iuGo");pg.wait_for_timeout(3000)
    print("REVIEW:",pg.inner_text("#sheet")[:1400])
    pg.click("#irSave");pg.wait_for_timeout(800);print("DETAIL:",pg.inner_text("#sheet")[:700])
    print("REMINDER:",pg.evaluate("JSON.stringify(items.filter(i=>i.code.startsWith('INS')).map(i=>[i.name,i.dueDate,i.category]))"))
    # wrong type selected: EC doc as fire, via fake Claude
    pg.evaluate("""sampleCap=async()=>({text:''});sampleCap.json=async(pr)=>({detected_kind:'policy',detected_type:'ec',fields:{insurer:'ICICI Lombard',policyNo:'4011/EC/2026/778',insured:'ADDENDA CHEMICAL INDIA PRIVATE LIMITED',start:'2026-01-15',end:'2027-01-14',sum:null,premium:'12400',gstin:null,location:null,items:null,perils:null,hypo:null,addons:null}});sampleCap.limits=async()=>({images:true})""")
    pg.evaluate("closeSheet()");pg.click("#inUpB");pg.select_option("#iuY","fire");pg.set_input_files("#iuF","ec_policy.pdf");pg.click("#iuGo");pg.wait_for_timeout(2500)
    print("REVIEW2:",pg.inner_text("#sheet")[:700])
    pg.evaluate("closeSheet();show('dash')");pg.wait_for_timeout(200);print("DASH:",pg.inner_text("#dash")[:150])
    pg.evaluate("openClient('p1')");print("CLIENT:",pg.inner_text("#inCB"))
    pg.fill("#gsQ","new india") if pg.is_visible("#gsQ") else None
    print("ERR",errs);b.close()
