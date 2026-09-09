# -*- coding: utf-8 -*-
"""Añade párrafo único por localidad: referencia típica + precio con usada +
tipo de vehículo frecuente + tiempo real de llegada. Datos del propio home
(index.html grid 31 zonas). Idempotente."""
import io, os, re

ROOT = r"C:\Users\pc\excelencia-build\localidades"

# filename -> (ref, precio_str, vehiculo, minutos, zonas_referencia)
DATA = {
    "usaquen":        ("31H/1250", "$530.000", "SUV y camionetas medianas", "30", "norte"),
    "suba":           ("36/750", "$365.000", "sedanes y camionetas livianas", "30", "norte-occidente"),
    "chapinero":      ("27/1000", "$450.000", "SUV y camionetas", "30", "oriente"),
    "barrios-unidos": ("NS40/560", "$230.000", "taxis y sedanes compactos", "30", "centro-norte"),
    "kennedy":        ("36/750", "$365.000", "sedanes y camionetas livianas", "30", "occidente"),
    "engativa":       ("NS40/560", "$230.000", "taxis y sedanes compactos", "30", "occidente"),
    "fontibon":       ("42/850", "$300.000", "camionetas y vans de trabajo", "30", "occidente"),
    "bosa":           ("36/750", "$365.000", "sedanes y camionetas livianas", "30", "occidente-sur"),
    "ciudad-bolivar": ("36/750", "$365.000", "sedanes y camionetas livianas", "35", "sur"),
    "san-cristobal":  ("36/750", "$365.000", "sedanes y camionetas livianas", "35", "sur"),
    "usme":           ("36/750", "$365.000", "sedanes y camionetas livianas", "40", "sur extremo"),
    "tunjuelito":     ("NS40/560", "$230.000", "taxis y sedanes compactos", "30", "sur"),
    "rafael-uribe":   ("36/750", "$365.000", "sedanes y camionetas livianas", "30", "sur"),
    "antonio-narino": ("NS40/560", "$230.000", "taxis y sedanes compactos", "25", "sur"),
    "teusaquillo":    ("NS40/560", "$230.000", "taxis y sedanes compactos", "25", "centro"),
    "la-candelaria":  ("NS40/560", "$230.000", "taxis y sedanes compactos", "25", "centro"),
    "santa-fe":       ("36/750", "$365.000", "sedanes y camionetas livianas", "25", "oriente"),
    "soacha":         ("36/750", "$365.000", "sedanes y camionetas livianas", "45", "Cundinamarca"),
    "chia":           ("31H/1250", "$530.000", "SUV y camionetas medianas", "50", "Cundinamarca norte"),
    "los-martires":   ("NS40/560", "$230.000", "taxis y sedanes compactos", "25", "centro"),
    "mosquera":       ("36/750", "$365.000", "sedanes y camionetas livianas", "45", "occidente de Cundinamarca"),
    "funza":          ("36/750", "$365.000", "sedanes y camionetas livianas", "45", "occidente de Cundinamarca"),
    "madrid":         ("36/750", "$365.000", "sedanes y camionetas livianas", "50", "occidente de Cundinamarca"),
    "el-rosal":       ("36/750", "$365.000", "sedanes y camionetas livianas", "50", "occidente de Cundinamarca"),
    "cota":           ("31H/1250", "$530.000", "SUV y camionetas medianas", "45", "norte de Cundinamarca"),
    "zipaquira":      ("36/750", "$365.000", "sedanes y camionetas livianas", "60", "norte de Cundinamarca"),
    "sopo":           ("42/850", "$300.000", "camionetas y vans de trabajo", "55", "norte de Cundinamarca"),
    "tenjo":          ("36/750", "$365.000", "sedanes y camionetas livianas", "50", "norte de Cundinamarca"),
    "tabio":          ("36/750", "$365.000", "sedanes y camionetas livianas", "50", "norte de Cundinamarca"),
    "la-calera":      ("36/750", "$365.000", "sedanes y camionetas livianas", "45", "oriente de Cundinamarca"),
}

def read(p):
    with io.open(p, "r", encoding="utf-8") as f:
        return f.read()

def write(p, content):
    with io.open(p, "w", encoding="utf-8", newline="\n") as f:
        f.write(content)

for f in sorted(os.listdir(ROOT)):
    if not f.endswith(".html"):
        continue
    slug = f[:-5]
    if slug not in DATA:
        continue
    ref, precio, vehiculo, minu, zona_ref = DATA[slug]
    p = os.path.join(ROOT, f)
    t = read(p)
    if "con usada" in t and "más instalada" in t:
        print("SKIP (ya único):", f)
        continue
    # párrafo único insertado tras la línea de barrios ("Atendemos ... ")
    m = re.search(r'Atendemos (todos los barrios de|barrios y veredas de).*?</strong>[^<]*</p>', t)
    if not m:
        print("NO BARRIOS LÍNEA:", f)
        continue
    par = ('<p class="mt-3" style="color:#64748B;max-width:800px;">Según el parque vehicular de la zona, '
           'la referencia típica es la <strong style="color:#0F172A;">Willard %s</strong> (%s), '
           'desde <strong style="color:#0F172A;">%s con tu batería usada</strong>. '
           'En la mayoría de los casos llegamos en <strong style="color:#0F172A;">%s minutos</strong> '
           'desde Puente Aranda hasta la zona %s. Cotiza con tu placa y modelo por WhatsApp y '
           'confirmamos la referencia exacta antes de salir.</p>' % (ref, vehiculo, precio, minu, zona_ref))
    t = t.replace(m.group(0), m.group(0) + "\n    " + par, 1)
    write(p, t)
    print("AÑADIDO:", f, "->", ref, precio)

print("done")