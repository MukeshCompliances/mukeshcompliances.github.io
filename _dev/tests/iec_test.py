import json
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b=p.chromium.launch();pg=b.new_page(viewport={"width":400,"height":900})
    errs=[];pg.on("pageerror",lambda e:errs.append(str(e)))
    pg.goto("file:///home/claude/compliance-app/index.html");pg.wait_for_timeout(400)
    pg.click("#firstClient");pg.click(".ent[data-e=pvt]");pg.fill("#w_name","Sharma Pvt Ltd");pg.click("#wNext");pg.fill("#w_pan","AAPFU0939F");pg.click("#wNext")
    pg.click(".yn[data-v='1']");pg.fill(".gIn2","27AAPFU0939F1ZV");pg.click("#wNext")
    pg.click(".yn[data-v='0']")
    for v in "1100": pg.click(".yn[data-v='%s']"%v)   # audit adv pf esi
    pg.click(".yn[data-v='0']")  # udyam
    print("STEP:",pg.inner_text("#sheet")[:160])
    pg.click(".yn[data-v='1']");print("IEC prefill:",pg.input_value("#w_iecNo"));pg.check("#w_lut");pg.click("#wNext")
    for v in "000": pg.click(".yn[data-v='%s']"%v)
    print("SUM IEC:", [l for l in pg.inner_text("#sheet").split("\n") if "IEC" in l or "AAPFU" in l][:3])
    pg.click("#wNext");pg.wait_for_timeout(200)
    print("GEN:",pg.inner_text("#gPrev"));pg.click("#go");pg.wait_for_timeout(600)
    pg.click("#nList");print("TILES:",pg.inner_text("#tiles").replace("\n"," | "))
    # inject docs/proofs for docs tab
    pg.evaluate("""()=>{const P=JSON.parse(localStorage.getItem('compliance_parties_v1'));P[0].docs=[{id:'a1',name:'PAN.pdf',label:'docPan',at:'2026-11-13T10:00:00Z'},{id:'a2',name:'IEC cert.pdf',label:'docIec',at:'2026-11-13T10:00:00Z'}];localStorage.setItem('compliance_parties_v1',JSON.stringify(P));
      const I=JSON.parse(localStorage.getItem('compliance_local_v1'));const g=I.find(i=>i.code==='GSTR-1');g.proofs=[{id:'b1',name:'GSTR1_Apr.pdf',at:'2026-11-13T10:00:00Z'}];g.status='filed_noproof';localStorage.setItem('compliance_local_v1',JSON.stringify(I));}""")
    pg.reload();pg.wait_for_timeout(400);pg.click("#nDocs");print("DOCS:",pg.inner_text("#docs").replace("\n"," | "))
    pg.click(".tile[data-f=company]");print("COMPANY:",pg.inner_text("#docs").replace("\n"," | ")[:300])
    pg.click("#dBack");pg.fill("#dQ","gstr");pg.wait_for_timeout(100);print("SEARCH:",pg.inner_text("#docs").replace("\n"," | ")[-200:])
    pg.screenshot(path="/home/claude/tests/docs.png")
    print("ERR",errs);b.close()
