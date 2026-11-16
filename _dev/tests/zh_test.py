import json,re
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b=p.chromium.launch();pg=b.new_page(viewport={"width":400,"height":900});errs=[];pg.on("pageerror",lambda e:errs.append(str(e)))
    pg.goto("file:///home/claude/compliance-app/index.html#demo");pg.wait_for_timeout(1500)
    pg.evaluate("sampleCap=async()=>({text:''});sampleCap.json=async(pr)=>{window._n=(window._n||0)+1;const arr=JSON.parse(pr.slice(pr.lastIndexOf('\\n[')+1));return arr.map(s=>'中'+s.slice(0,12))};1")
    pg.click('#lang button[data-l="zh"]');pg.wait_for_timeout(300)
    for v in ["dash","nt","ins","mn","team","clients"]:
        pg.evaluate(f"show('{v}')");pg.wait_for_timeout(1500);pg.evaluate(f"show('{v}')");pg.wait_for_timeout(200)
        t=pg.inner_text("#"+v);eng=re.findall(r"\b[a-z]{4,}\b",t);print(v,"english words:",len(eng),eng[:8])
    pg.evaluate("openManual('GSTR-3B')");pg.wait_for_timeout(1500);t=pg.inner_text("#sheet");print("MANUAL:",t[:300].replace("\n"," | "));print("calls:",pg.evaluate("window._n"),"cache:",pg.evaluate("Object.keys(zhCache).length"))
    pg.evaluate("openNtDetail('demo_n2')");pg.wait_for_timeout(1500);t=pg.inner_text("#sheet");i=t.find("➡");print("NEXT:",t[i:i+200].replace("\n"," | "))
    pg.evaluate("demoCheck()");pg.wait_for_timeout(3500);print("CHECK:",pg.inner_text("#sheet")[:200].replace("\n"," | "))
    print("ERR",errs);b.close()
