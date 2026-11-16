import json
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b=p.chromium.launch();pg=b.new_page();pg.goto("file:///home/claude/compliance-app/index.html");pg.wait_for_timeout(300)
    d=pg.evaluate("""()=>{const out={};const E=I18N.en,Z=I18N.zh;for(const k of Object.keys(E)){const e=E[k],z=Z[k];if(typeof e!=="string")continue;if(z===undefined||z===e){if(/[A-Za-z]{3}/.test(e))out[k]=e}}return out}""")
    nested=pg.evaluate("""()=>{const out=[];for(const k of Object.keys(I18N.en)){if(typeof I18N.en[k]==="object"&&I18N.en[k]){const zo=I18N.zh[k]||{};for(const kk of Object.keys(I18N.en[k])){const e=I18N.en[k][kk];if(typeof e==="string"&&(zo[kk]===undefined||zo[kk]===e)&&/[A-Za-z]{3}/.test(e))out.push(k+"."+kk)}}}return out}""")
    json.dump(d,open("/tmp/zh_missing.json","w"),ensure_ascii=False,indent=0)
    print(len(d),"flat missing;",len(nested),"nested",nested[:20])
    b.close()
