# -*- coding: utf-8 -*-
"""IndexNow ping a Bing: URLs actualizadas de excelenciaautomotriz.store."""
import json, io, os
import urllib.request

KEY = "9528ea1dd6374feca020c08055a730090f314c9f"
BASE = "https://excelenciaautomotriz.store"

urls = [
    f"{BASE}/",
    f"{BASE}/index.html",
    f"{BASE}/willard.html",
    f"{BASE}/puente-aranda.html",
    f"{BASE}/baterias-a-domicilio.html",
    f"{BASE}/contacto.html",
    f"{BASE}/comparativas.html",
    f"{BASE}/marcas-vehiculos.html",
    f"{BASE}/blog.html",
    f"{BASE}/404.html",
]
for f in sorted(os.listdir(r"C:\Users\pc\excelencia-build\localidades")):
    if f.endswith(".html"):
        urls.append(f"{BASE}/localidades/{f}")
for f in sorted(os.listdir(r"C:\Users\pc\excelencia-build\blog")):
    if f.endswith(".html"):
        urls.append(f"{BASE}/blog/{f}")

payload = {"host": "excelenciaautomotriz.store", "key": KEY, "urlList": urls}
q = urllib.parse.urlencode({"url": payload["host"], "key": payload["key"]})
data = json.dumps({"host": payload["host"], "key": payload["key"], "urlList": payload["urlList"]}).encode("utf-8")
req = urllib.request.Request("https://api.indexnow.org/indexnow?" + q, data=data,
                             headers={"Content-Type": "application/json; charset=utf-8"})
try:
    with urllib.request.urlopen(req, timeout=60) as resp:
        print("HTTP", resp.status, resp.read().decode()[:200])
except urllib.error.HTTPError as e:
    print("HTTPError", e.code, e.read().decode()[:300])
except Exception as e:
    print("Error", e)
print("urls enviadas:", len(urls))