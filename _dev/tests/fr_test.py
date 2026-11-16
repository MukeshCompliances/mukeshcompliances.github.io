from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b=p.chromium.launch();pg=b.new_page(viewport={"width":400,"height":900});errs=[];pg.on("pageerror",lambda e:errs.append(str(e)))
    pg.route("https://cdnjs.cloudflare.com/**",lambda r:r.abort())
    pg.goto("file:///home/claude/compliance-app/index.html");pg.wait_for_timeout(600)
    pg.evaluate("saveParty({id:'P1',name:'ADDENDA TEST PVT LTD',entity:'pvt',pan:'AAPCA8845F',gsts:[],docs:[]})");pg.wait_for_timeout(200)
    print("before:",pg.evaluate("JSON.stringify(generate(parties[0],'2026-04','2027-04').filter(x=>x.cat==='fin').map(x=>x.code+' '+x.due))"))
    pg.evaluate("openClient('P1')");pg.wait_for_timeout(200);print("box:",pg.locator("#frBox").count(),pg.locator(".frC").count())
    pg.check(".frC[data-k='mis']");pg.wait_for_timeout(400);pg.check(".frC[data-k='q']");pg.wait_for_timeout(400);pg.check(".frC[data-k='prov']");pg.wait_for_timeout(400);pg.select_option("#frDay","15");pg.wait_for_timeout(400)
    print("saved:",pg.evaluate("JSON.stringify(parties[0].fr)"))
    g=pg.evaluate("generate(parties[0],'2026-04','2027-04').filter(x=>x.cat==='fin').map(x=>x.code+' | '+x.period+' | '+x.due)");print(len(g));print("\n".join(g[:6]));print("...",[x for x in g if 'FR-Q' in x][:2],[x for x in g if 'PROV' in x or x.startswith('FS')])
    print("group:",pg.evaluate("JSON.stringify([groupOf({code:'FR-MIS',category:'fin'}),groupOf({code:'FS',category:'roc'}),catName('fin'),t('grp_fin'),ftKeyOfCode('FR-STK')])"))
    pg.screenshot(path="/tmp/fr.png",full_page=True)
    print("ERR",errs);b.close()
