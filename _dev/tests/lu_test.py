import json
from playwright.sync_api import sync_playwright
U=[{"id":"a","cat":"gst","date":"2026-11-10","eff":"2026-11-01","number":"07/2026-CT","source":"CBIC","impact":"high","title":{"hi":"स्क्रैप पर 2% GST TDS","en":"2% GST TDS on scrap"},"sum":{"hi":"सार","en":"summary"},"before":{"hi":"पहले","en":"before"},"after":{"hi":"अब","en":"now"},"who":{"hi":"स्क्रैप खरीदने वाले","en":"scrap buyers"},"act":{"hi":["एक","दो"],"en":["one","two"]},"url":"https://cbic-gst.gov.in","readBy":{}},
   {"id":"b","cat":"pf","date":"2026-09-17","number":"S.O. 5109(E)","source":"MoLE","impact":"med","title":{"hi":"PF सीमा 25000","en":"PF ceiling 25000"},"sum":{"hi":"x","en":"x"},"readBy":{}}]
P=[{"id":"p1","name":"ADDENDA","entity":"pvt","gsts":[{"gstin":"06AAPCA8845F1ZC"}]}]
with sync_playwright() as p:
    b=p.chromium.launch();pg=b.new_page(viewport={"width":400,"height":900})
    errs=[];pg.on("pageerror",lambda e:errs.append(str(e)))
    pg.goto("file:///home/claude/compliance-app/index.html")
    pg.evaluate(f"localStorage.setItem('compliance_lu_v1',{json.dumps(json.dumps(U))});localStorage.setItem('compliance_parties_v1',{json.dumps(json.dumps(P))})")
    pg.reload();pg.wait_for_timeout(500)
    print("NAV:",pg.inner_text("#nLu"));print("DASH:",pg.inner_text("#dash")[:80])
    pg.click("#luDash");pg.wait_for_timeout(200);print(pg.inner_text("#lu")[:700])
    pg.click("#luMi");pg.wait_for_timeout(100);print("MINE rows:",pg.locator(".luRow").count())
    pg.click("#luMi");pg.fill("#luQ","PF");pg.wait_for_timeout(100);print("Q rows:",pg.locator(".luRow").count())
    pg.fill("#luQ","");pg.locator(".luRow").first.click();pg.wait_for_timeout(200);print("SHEET:",pg.inner_text("#sheet")[:600])
    pg.click("#luReadB");pg.wait_for_timeout(200);print("AFTER:",pg.inner_text("#sheet")[-200:]);print("NAV2:",pg.inner_text("#nLu"))
    pg.click("#luClose");pg.click("#lang button[data-l=en]");pg.wait_for_timeout(100);print(pg.inner_text("#lu")[:200])
    pg.click("#luAddB");pg.fill("#lfT","Test add");pg.click("#lfSave");pg.wait_for_timeout(200);print("COUNT:",pg.locator(".luRow").count())
    pg.screenshot(path="/tmp/lu.png",full_page=True)
    print("ERR",errs);b.close()
