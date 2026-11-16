import json
from playwright.sync_api import sync_playwright
Q=[("3b late ho gayi kitna lagega","gst_latefee"),("gstr 3b ki penalty","gst_latefee"),("जीएसटी रिटर्न देर से भरा तो जुर्माना","gst_latefee"),("gst ka byaj kitna","gst_interest"),("r1 kab tak bharna hai","gst_due"),
("asmt-10 aaya hai kya karu","gst_asmt10"),("drc 01a notice ka jawab","gst_drc01a"),("show cause notice gst reply kaise de","gst_drc01"),("gst number cancel hone ka notice","gst_reg17"),("2b me bill nahi dikh raha itc","gst_itc"),
("tds late jama kiya intrest","tds_late"),("tds return ki last date","tds_due"),("traces pe short payment dikha raha","tds_traces"),
("itr ki date nikal gayi ab kya","it_belated"),("return me galti ho gayi sudhar kaise","it_revised"),("143(1) intimation me demand aayi","it_1431"),("defective return notice","it_1399"),("scrutiny notice 143(2) jawab nahi diya to","it_scrutiny"),
("148A notice purana saal","it_148"),("outstanding demand pay karna hai ya nahi","it_demand"),("appeal kab tak file kare aur stay","it_appeal"),("tax audit report ki akhiri tarikh","it_audit"),("ay aur fy me fark","it_ayfy"),("notice asli hai ya nakli","it_fake"),
("aoc 4 late fees","roc_late"),("mgt7 kab tak","roc_due"),("pf kab jama karna hai","pf_due"),("professional tax maharashtra date","pt_due"),("advance tax ki kisht kab","adv_tax"),
("dsc nahi chal raha","err_dsc"),("emsigner eror","err_dsc"),("otp nahi aa raha","err_otp"),("portal submit nahi ho raha","err_portal"),
("rasid upload ki par match nahi ho rahi","app_proof"),("agle mahine ka kaam nahi dikh raha","app_future"),("pasword bhul gaya","app_login"),("backup kaise le","app_backup"),
("mera kutta bimar hai",None),("gratuity kab deni hoti hai",None)]
with sync_playwright() as p:
    b=p.chromium.launch();pg=b.new_page(viewport={"width":400,"height":900});errs=[];pg.on("pageerror",lambda e:errs.append(str(e)))
    pg.route("https://cdnjs.cloudflare.com/**",lambda r:r.abort())
    pg.goto("file:///home/claude/compliance-app/index.html");pg.wait_for_timeout(700)
    ok=0
    for q,exp in Q:
        r=pg.evaluate("q=>{const R=kbSearch(q);return [R.conf,R.hits.slice(0,3).map(h=>h.e.id+':'+h.s.toFixed(2))]}",q)
        top=r[1][0].split(":")[0] if r[1] else None
        good=(exp is None and r[0]!="sure") or (exp is not None and (top==exp or (r[0]=="maybe" and any(x.startswith(exp+":") for x in r[1]))))
        ok+=good
        if not good or r[0]!="sure": print("  " if good else "XX",q,"->",r,"want",exp)
    print("OK",ok,"/",len(Q))
    pg.click("#nMn");pg.wait_for_timeout(300)
    pg.fill("#kbQ","3b late ho gayi kitna lagega");pg.click("#kbGo");pg.wait_for_timeout(200);print("ANS:",pg.inner_text("#kbOut")[:120].replace("\n"," | "))
    pg.fill("#kbQ","gratuity kab deni hoti hai");pg.click("#kbGo");pg.wait_for_timeout(200);print("NONE:",pg.inner_text("#kbOut")[:80]);print("BADGE:",pg.inner_text("#kbUns"))
    pg.screenshot(path="/tmp/kb.png",full_page=False)
    pg.click("#kbUns");pg.wait_for_timeout(200);print("UNS:",pg.inner_text("#sheet")[:60].replace("\n"," | "));print(pg.evaluate("kbUnsText()")[-60:])
    pg.click("#kbX");pg.click("#kbAllB");pg.wait_for_timeout(200);print("ALL rows:",pg.locator(".kbRow").count())
    pg.click("#kbX");pg.click("#erNew");pg.wait_for_timeout(200);pg.fill("#erD","dsc token detect nahi ho raha");pg.click(".kbOpen");pg.wait_for_timeout(200);print("ERR->KB:",pg.inner_text("#sheet #kbOut")[:50].replace("\n"," "))
    print("ERR",errs);b.close()
