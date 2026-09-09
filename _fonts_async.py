# -*- coding: utf-8 -*-
"""Reemplaza <link stylesheet css> por preconnect + stylesheet css + font async.
Idempotente: si ya contiene fonts.googleapis.com, no toca."""
import io, os, re

ROOT = r"C:\Users\pc\excelencia-build"
FONT_URL = "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"

PAT = re.compile(
    r'<link rel="stylesheet" href="(\.\./)?css/style\.css">',
)

REPL = """  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="{css}">
  <link rel="stylesheet" href="{font}" media="print" onload="this.media='all'">
  <noscript><link rel="stylesheet" href="{font}"></noscript>"""

def walk():
    for base in (ROOT, os.path.join(ROOT, "localidades"), os.path.join(ROOT, "blog")):
        for f in sorted(os.listdir(base)):
            if f.endswith(".html"):
                yield os.path.join(base, f)

changed = 0
skipped = 0
for p in walk():
    with io.open(p, encoding="utf-8") as fh:
        t = fh.read()
    if "fonts.googleapis.com" in t:
        skipped += 1
        continue
    m = PAT.search(t)
    if not m:
        print("NO MATCH:", p)
        continue
    css = ("../" if m.group(1) else "") + "css/style.css"
    block = REPL.format(css=css, font=FONT_URL)
    t2 = t.replace(m.group(0), block, 1)
    with io.open(p, "w", encoding="utf-8", newline="\n") as fh:
        fh.write(t2)
    changed += 1

print("cambiados:", changed, "| ya con font (skip):", skipped)