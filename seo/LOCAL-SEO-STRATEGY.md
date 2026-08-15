# LOCAL-SEO-STRATEGY — Excelencia Automotriz (Baterías Willard a Domicilio)

> Sitio: https://excelenciaautomotriz.store/
> Negocio: venta e instalación de baterías Willard a domicilio en Bogotá + Cundinamarca.
> Tipo: **Híbrido** (dirección física Cra. 56 #14-56, Puente Aranda + área de servicio en 20 localidades).
> Última actualización: 14/08/2026

---

## 1. Objetivo del SEO local

Posicionar el negocio en el **Map Pack / resultados locales de Google** (y en IA local: ChatGPT, Perplexity, AI Overviews) para búsquedas como:

- `batería a domicilio puente aranda`
- `baterías a domicilio bogotá` (5k/mes, competencia baja)
- `batería willard <localidad>` (Kennedy, Suba, Usaquén, Soacha, …)
- `batería de carro 24 horas <zona>`

La palanca principal es **local: relevancia local + proximidad + reputación** (reviews). La señal de cobertura (área de servicio) NO influye en rankings hasta que el GBP esté validado con dirección; lo que posiciona hoy es el contenido on-page + schema + citas NAP.

---

## 2. Diagnóstico actual (14/08/2026)

| Señal | Estado | Acción |
|---|---|---|
| NAP en footer + schema | ✅ Consistente (Cra. 56 #14-56) | Mantener |
| LocalBusiness + Service schema | ✅ Todas las páginas | Mejorar props (geo 5 decimales, openingHoursSpecification, sameAs, image) |
| Página Puente Aranda (foco) | ✅ Creada | Optimizar títulos/ contenido local |
| 4 páginas de localidad | ✅ Kennedy, Suba, Usaquén, Soacha | Interlink desde home |
| Lista de 20 localidades | ⚠️ Solo en JS (no indexable) | Añadir sección HTML estática con keywords |
| Google Business Profile | ❌ No verificado/confirmado | **Prioridad externa #1** |
| Reseñas | ❌ Sin widget ni estímulo | Widget + CTA de reseñas |
| Citas NAP (directorios) | ❌ No creadas | Google, Waze, 2GIS, DogWeb, Yelp |
| openingHoursSpecification | ❌ | Añadir (24 horas) |
| geo con 5 decimales | ⚠️ 4 decimales | Precisar |
| sameAs (dogweb.lat) | ⚠️ Solo en algunas | Añadir en todas |

---

## 3. Pilares de la estrategia

### Pilar A — Relevancia local on-page (lo que estamos ejecutando ahora)
1. **Títulos/H1** con patrón `[Servicio] + [Localidad/Bogotá] + [Diferenciador]`. Ya implementado en la mayoría; auditar el resto.
2. **Contenido estático con las 20 localidades** (no solo JS): sección HTML en home con anchor text por localidad → enlaza a las páginas de localidad. **Google no indexa el contenido renderizado por JS de forma fiable**.
3. **Schema LocalBusiness completo**: geo con 5 decimales, `openingHoursSpecification` 24h, `sameAs` → dogweb.lat, `image` → og-image, `url`, `areaServed`.
4. **Cobertura (areaServed)** en el schema de Service ya lista las 20 localidades.

### Pilar B — Google Business Profile (acción externa #1)
- Crear/completar GBP con nombre exacto **Excelencia Automotriz**, categoría **Tienda de baterías automotrices**, dirección Cra. 56 #14-56, teléfono 3204420417, horario 24 h, atributos (entrega a domicilio).
- Vincular página web y WhatsApp.
- **Fuera del alcance del código**: requiere cuenta del dueño. Entregar checklist.

### Pilar C — Reputación (reviews)
- CTA de reseña Google en la página de contacto y en el mensaje de WhatsApp post-entrega.
- Widget de reseñas en home (consolidado, sin fabricar reseñas).

### Pilar D — Citas NAP consistentes
- Directorios locales (Google Maps, Waze, 2GIS, Yelp, DogWeb=dogweb.lat, Páginas Amarillas).
- NAP idéntico en TODAS: `Excelencia Automotriz · Cra. 56 #14-56, Puente Aranda, Bogotá · 3204420417`.

### Pilar E — Interlinking local
- Home → 4 páginas de localidad → blog → precios, con anchors `batería a domicilio Kennedy`, etc.
- Expandir a las 20 localidades como páginas propias en fases.

---

## 4. Keywords de localización (de KEYWORD-STUDY.md)

### Foco principal
| Keyword | Volumen | Página |
|---|---|---|
| `batería a domicilio puente aranda` | 🎯 foco | puente-aranda.html |
| `baterías a domicilio bogotá` | 5.000 (Baja) | index.html |
| `bateria a domicilio bogota` | 50.000 (Alta) | index.html (acumular) |

### Por localidad (páginas propias)
| Localidad | Keyword objetivo |
|---|---|
| Kennedy | `batería willard kennedy` |
| Suba | `batería willard suba` |
| Usaquén | `batería willard usaquén` |
| Soacha | `batería willard soacha` |

### Por zona (contenido estático home)
Norte (Usaquén, Chapinero, Suba, Barrios Unidos) · Occidente (Kennedy, Engativá, Fontibón, Bosa) · Centro (Teusaquillo, La Candelaria, Puente Aranda, Antonio Nariño, Santa Fe) · Sur (Ciudad Bolívar, San Cristóbal, Usme, Tunjuelito, Rafael Uribe) · Cundinamarca (Soacha, Chía/Cajicá).

---

## 5. Plan de implementación en el sitio (este sprint)

1. ✅ **seo/LOCAL-SEO-STRATEGY.md** — este documento.
2. ⏳ **Schema**: añadir a todas las páginas — `openingHoursSpecification` (24h), `sameAs` (dogweb.lat), `image`, geo a 5 decimales.
3. ⏳ **Sección estática de localidades** en index.html: lista HTML con las 20 zonas + anchors a páginas de localidad.
4. ⏳ **Auditoría de títulos/H1/meta** por página (keywords de localización ya presentes).
5. ⏳ Commit + deploy + verificación (sitemap incluye localidades).

---

## 6. Checklist externo (requiere al dueño)

- [ ] Crear y verificar **Google Business Profile** (nombre, categoría, dirección, horario 24h, web, WhatsApp).
- [ ] Publicar 3+ fotos reales (local, baterías, instalaciones).
- [ ] Pedir **reseñas Google** a clientes reales (vía WhatsApp post-entrega).
- [ ] Citas NAP en: Google Maps, Waze, 2GIS, Yelp, Páginas Amarillas, DogWeb.
- [ ] Conectar **Search Console** con excelenciaautomotriz.store y enviar sitemap.
- [ ] Conectar **Bing Webmaster Tools** + IndexNow (ya configurado el workflow de Pages).

---

## 7. KPIs locales

| Métrica | 3 meses | 6 meses |
|---|---|---|
| Posición Map Pack "batería a domicilio puente aranda" | top 3 | top 1 |
| Posición "baterías a domicilio bogotá" | top 20 | top 10 |
| Reseñas Google acumuladas | 10 | 30 |
| Leads WhatsApp por búsqueda local/mes | 20 | 60 |
| Páginas de localidad indexadas | 5 | 20 |
