#!/usr/bin/env python3
"""Builds the independent site (site/out/index.html) from the same index.html the Claude artifact uses."""
import json, os, sys
here=os.path.dirname(os.path.abspath(__file__))
src=open(os.path.join(here,"..","index.html"),encoding="utf-8").read()
cfg_path=os.path.join(here,"firebase_config.json")
cfg=open(cfg_path).read() if os.path.exists(cfg_path) else '{"apiKey":"TEST","authDomain":"test.firebaseapp.com","projectId":"test"}'
json.loads(cfg)
shim=open(os.path.join(here,"shim.html"),encoding="utf-8").read().replace("__FIREBASE_CONFIG__",cfg)
assert src.count("<body>")==1
out=src.replace("<body>","<body>\n"+shim,1)
out=out.replace('<meta name="viewport" content="width=device-width, initial-scale=1">','<meta name="viewport" content="width=device-width, initial-scale=1">\n<meta name="theme-color" content="#1f4fd1">\n<meta name="google-site-verification" content="0z9lx5LPH3LpMKj8Zf6bDn8M0cDAMnfVWD7FPrtMaOQ">\n<meta name="description" content="Mukesh Compliances – कंप्लायंस रिकॉर्ड: GST, TDS, ROC, PF/ESI की तारीख़ें, प्रूफ़ और नोटिस एक जगह।">\n<link rel="manifest" href="manifest.json">',1)
os.makedirs(os.path.join(here,"out"),exist_ok=True)
open(os.path.join(here,"out","index.html"),"w",encoding="utf-8").write(out)
open(os.path.join(here,"out","manifest.json"),"w").write(json.dumps({"name":"कंप्लायंस रिकॉर्ड","short_name":"Compliance","start_url":".","display":"standalone","background_color":"#f5f6f8","theme_color":"#1f4fd1","icons":[{"src":"icon.svg","sizes":"any","type":"image/svg+xml"}]},ensure_ascii=False))
open(os.path.join(here,"out","icon.svg"),"w").write('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#1f4fd1"/><path d="M18 34l9 9 19-21" stroke="#fff" stroke-width="7" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>')
if not os.path.exists(os.path.join(here,"out","law_updates.json")):open(os.path.join(here,"out","law_updates.json"),"w").write("[]")
open(os.path.join(here,"out",".nojekyll"),"w").write("")
print("built",len(out))
