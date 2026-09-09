# -*- coding: utf-8 -*-
import io, os, re, json
root = r"C:\Users\pc\excelencia-build\localidades"
missing = []
dupes = []
bad = []
for f in sorted(os.listdir(root)):
    if not f.endswith(".html"):
        continue
    p = os.path.join(root, f)
    with io.open(p, encoding="utf-8") as fh:
        t = fh.read()
    n = t.lower().count("según el parque vehicular de la zona")
    if n == 0:
        missing.append(f)
    elif n > 1:
        dupes.append((f, n))
    for m in re.finditer(r'<script type="application/ld\+json">(.*?)</script>', t, re.S):
        try:
            json.loads(m.group(1).strip())
        except Exception as e:
            bad.append((f, str(e)))
print("sin parrafo unico:", len(missing), missing)
print("duplicados:", dupes)
print("LD invalidos:", len(bad), bad)
print("OK" if not missing and not dupes and not bad else "REVISAR")