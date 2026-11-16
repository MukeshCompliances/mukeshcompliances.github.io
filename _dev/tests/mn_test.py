import json
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b=p.chromium.launch();pg=b.new_page(viewport={"width":400,"height":900})
    errs=[];pg.on("pageerror",lambda e:errs.append(str(e)))
    pg.goto("file:///home/claude/compliance-app/index.html");pg.wait_for_timeout(400)
    pg.click("#nMn");pg.wait_for_timeout(200);print(pg.inner_text("#mn")[:400])
    print("ROWS:",pg.locator(".mnRow").count())
    pg.fill("#mnQ","3B");print("Q:",pg.locator(".mnRow").count())
    pg.locator(".mnRow").first.click();pg.wait_for_timeout(200);print(pg.inner_text("#sheet")[:900])
    pg.fill("#mnTip","OTP मालिक के फ़ोन पर");pg.click("#mnTipB");pg.wait_for_timeout(200);print("TIP:", "OTP मालिक" in pg.inner_text("#sheet"))
    # fake sample capability
    pg.evaluate("""sampleCap=async(prompt,opts)=>{window._p=prompt;window._imgs=(opts.images||[]).length;opts.onText&&opts.onText({text:'partial'});return {text:'1) GSTIN गलत है\\n2) ...'}};sampleCap.limits=async()=>({images:true})""")
    pg.click("#mnErr");pg.wait_for_timeout(200)
    pg.set_input_files("#erF","/tmp/err.png");pg.fill("#erD","GSTR-1 में B2B सेव करते समय");pg.click("#erGo");pg.wait_for_timeout(500)
    print("ANS:",pg.inner_text("#erAns"));print("IMGS sent:",pg.evaluate("window._imgs"));print("PROMPT has key:", "GSTR-3B" in pg.evaluate("window._p"))
    pg.click("#erW");pg.wait_for_timeout(200);print("AFTER:",pg.inner_text("#erAfter"))
    print("CASES:",pg.evaluate("localStorage.getItem('compliance_errs_v1')")[:200])
    pg.click("#erX");pg.click("#nMn") if pg.is_visible("#nMn") else None
    pg.evaluate("closeSheet();show('mn')");pg.click("#erList");pg.wait_for_timeout(200);print("LIST:",pg.inner_text("#sheet")[:200])
    print("ERR",errs);b.close()
