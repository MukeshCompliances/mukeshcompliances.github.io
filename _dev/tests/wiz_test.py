import sys
from playwright.sync_api import sync_playwright
url="file:///home/claude/compliance-app/index.html"
with sync_playwright() as p:
    b=p.chromium.launch()
    pg=b.new_page(viewport={"width":400,"height":800})
    errs=[];pg.on("pageerror",lambda e:errs.append(str(e)))
    pg.goto(url);pg.wait_for_timeout(500)
    pg.click("#nClients");pg.click("#addClient")
    pg.click(".ent[data-e=pvt]")
    pg.fill("#w_cin","U74999RJ2019PTC012345");pg.fill("#w_name","Sharma Pvt Ltd")
    print("cin:",pg.inner_text("#cinInfo"))
    pg.click("#addP");pg.fill(".pn","Ramesh");pg.fill(".pd","01234567")
    pg.click("#wNext")
    pg.fill("#w_pan","ABCCS1234K");print("pan:",pg.inner_text("#panInfo"));pg.click("#wNext")
    pg.click(".yn[data-v='1']");pg.fill(".gIn2","27AAPFU0939F1ZV");print("gst:",pg.inner_text(".gstinfo"));pg.click("#wNext")
    pg.click(".yn[data-v='1']");pg.fill("#w_tanNo","JPRS12345A");pg.check("#w_tdsSal");pg.click("#wNext")
    for i in range(3):  # audit, adv, pf(no)
        pg.click(".yn[data-v='%s']"%("1" if i<2 else "0"))
    pg.click(".yn[data-v='0']") # esi
    pg.click(".yn[data-v='0']") # udyam
    pg.click(".yn[data-v='1']");pg.click(".yn[data-v='0']");pg.click(".yn[data-v='0']") # dpt msme adt
    print(pg.inner_text("#sheet")[:600])
    pg.click("#wNext");pg.wait_for_timeout(300)
    print("GEN:",pg.inner_text("#gPrev")[:300])
    pg.click("#go");pg.wait_for_timeout(800)
    pg.click("#nClients");print("CLIENTS:",pg.inner_text("#clients")[:200])
    pg.click("[data-pid]");print("DETAIL:",pg.inner_text("#sheet")[:400])
    pg.screenshot(path="/home/claude/tests/detail.png")
    print("ERRORS:",errs)
    b.close()
