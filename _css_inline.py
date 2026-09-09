# -*- coding: utf-8 -*-
"""Inlinea css/style.css en cada página (reemplaza el <link> del stylesheet).
Idempotente: si el archivo ya empieza con <!-- INLINE-CSS --> dentro del <style>, no toca."""
import io, os, re

ROOT = r"C:\Users\pc\excelencia-build"
CSS_P = os.path.join(ROOT, "css", "style.css")
with io.open(CSS_P, encoding="utf-8") as fh:
    css = fh.read()

PAT = re.compile(
    r'\n  <link rel="stylesheet" href="(\.\./)?css/style\.css">',
)

def walk():
    for base in (ROOT, os.path.join(ROOT, "localidades"), os.path.join(ROOT, "blog")):
        for f in sorted(os.listdir(base)):
            if f.endswith(".html"):
                yield os.path.join(base, f)

changed = 0
skipped = 0
no_match = []
for p in walk():
    with io.open(p, encoding="utf-8") as fh:
        t = fh.read()
    if "<style>\n  /* INLINE-CSS-EXCELENCIA */" in t:
        skipped += 1
        continue
    m = PAT.search(t)
    if not m:
        no_match.append(p)
        continue
    block = '\n  <style>\n  /* INLINE-CSS-EXCELENCIA */\n' + css + '\n  </style>'
    t2 = t.replace(m.group(0), block, 1)
    with io.open(p, "w", encoding="utf-8", newline="\n") as fh:
        fh.write(t2)
    changed += 1

print("inlined:", changed, "| ya inline (skip):", skipped, "| no match:", len(no_match))
for p in no_match:
    print("  NO MATCH:", p)