// Excelencia Automotriz - Script oficial
// Datos: localidades (20), precios Willard, comparativa. CTA WhatsApp 3204420417
const WA = '573204420417';

// Data de localidades (extraída del template)
const LOCALIDADES = [
  {id:"usaquen",nombre:"Usaquén",zona:"Norte",ref:"31H/1250",sincomp:false,busquedas:890,x:68,y:18},
  {id:"chapinero",nombre:"Chapinero",zona:"Norte",ref:"27/1000",sincomp:false,busquedas:760,x:58,y:28},
  {id:"suba",nombre:"Suba",zona:"Norte-Occidente",ref:"36/750",sincomp:false,busquedas:1200,x:35,y:22},
  {id:"barrios-unidos",nombre:"Barrios Unidos",zona:"Centro-Norte",ref:"NS40/560",sincomp:false,busquedas:540,x:50,y:38},
  {id:"kennedy",nombre:"Kennedy",zona:"Occidente",ref:"36/750",sincomp:false,busquedas:1100,x:28,y:62},
  {id:"engativa",nombre:"Engativá",zona:"Occidente",ref:"NS40/560",sincomp:false,busquedas:680,x:32,y:45},
  {id:"fontibon",nombre:"Fontibón",zona:"Occidente",ref:"42/850",sincomp:false,busquedas:520,x:18,y:52},
  {id:"bosa",nombre:"Bosa",zona:"Occidente-Sur",ref:"36/750",sincomp:false,busquedas:610,x:25,y:78},
  {id:"ciudad-bolivar",nombre:"Ciudad Bolívar",zona:"Sur",ref:"36/750",sincomp:true,busquedas:430,x:38,y:88},
  {id:"san-cristobal",nombre:"San Cristóbal",zona:"Sur",ref:"36/750",sincomp:true,busquedas:380,x:62,y:78},
  {id:"usme",nombre:"Usme",zona:"Sur Extremo",ref:"36/750",sincomp:true,busquedas:290,x:55,y:92},
  {id:"tunjuelito",nombre:"Tunjuelito",zona:"Sur",ref:"NS40/560",sincomp:true,busquedas:310,x:48,y:82},
  {id:"rafael-uribe",nombre:"Rafael Uribe",zona:"Sur",ref:"36/750",sincomp:true,busquedas:350,x:52,y:70},
  {id:"antonio-narino",nombre:"Antonio Nariño",zona:"Sur",ref:"NS40/560",sincomp:false,busquedas:400,x:50,y:62},
  {id:"teusaquillo",nombre:"Teusaquillo",zona:"Centro",ref:"NS40/560",sincomp:false,busquedas:580,x:48,y:48},
  {id:"candelaria",nombre:"La Candelaria",zona:"Centro",ref:"NS40/560",sincomp:true,busquedas:260,x:55,y:55},
  {id:"puente-aranda",nombre:"Puente Aranda",zona:"Centro-Sur",ref:"42/850",sincomp:true,busquedas:340,x:40,y:58},
  {id:"santa-fe",nombre:"Santa Fe",zona:"Oriente",ref:"36/750",sincomp:true,busquedas:300,x:60,y:48},
  {id:"soacha",nombre:"Soacha",zona:"Cundinamarca",ref:"36/750",sincomp:false,busquedas:750,x:22,y:88},
  {id:"chia",nombre:"Chía / Cajicá",zona:"Cundinamarca Norte",ref:"31H/1250",sincomp:false,busquedas:520,x:45,y:8}
];

// Precios Willard Extrema (del template)
const PRECIOS = [
  {ref:"NS40/560",cca:"560",desde:230000,usada:260000,tipo:"Compacto",vehiculos:"Spark, Picanto, March",ahorro:45000},
  {ref:"NS40/670",cca:"670",desde:250000,usada:270000,tipo:"Compacto",vehiculos:"Logan, Sandero, Sail",ahorro:50000},
  {ref:"NS60/700",cca:"700",desde:280000,usada:300000,tipo:"Sedán",vehiculos:"Versa, Onix, Rio",ahorro:55000},
  {ref:"36/750",cca:"750",desde:365000,usada:386000,tipo:"Sedán",vehiculos:"Corolla, Cerato, Sentra",ahorro:72900,popular:"POPULAR"},
  {ref:"42/850",cca:"850",desde:300000,usada:320000,tipo:"Camioneta",vehiculos:"Duster, Tracker, Kicks",ahorro:60000},
  {ref:"34/1000",cca:"1000",desde:350000,usada:380000,tipo:"Sedán/SUV",vehiculos:"Mazda 3, CX-30, Corolla Cross",ahorro:85000},
  {ref:"27/800",cca:"800",desde:400000,usada:430000,tipo:"SUV",vehiculos:"Tucson, Sportage base",ahorro:90000},
  {ref:"27/1000",cca:"1000",desde:450000,usada:490000,tipo:"Camioneta",vehiculos:"Hilux, BT-50, Ranger",ahorro:110000},
  {ref:"31H/1150",cca:"1150",desde:500000,usada:550000,tipo:"Camioneta",vehiculos:"Hilux, Frontier, L200",ahorro:130000},
  {ref:"31H/1250",cca:"1250",desde:530000,usada:580000,tipo:"SUV/Camioneta",vehiculos:"Tucson, Sportage, Duster",ahorro:145000,popular:"POPULAR SUV"},
  {ref:"31T/1150",cca:"1150",desde:530000,usada:580000,tipo:"SUV",vehiculos:"Fortuner, Prado, Montero",ahorro:140000},
  {ref:"31T/1250",cca:"1250",desde:550000,usada:610000,tipo:"SUV",vehiculos:"TXL, Captiva, Edge",ahorro:150000},
  {ref:"4D/1350B",cca:"1350",desde:790000,usada:850000,tipo:"Camión",vehiculos:"NHR, NPR, FRR",ahorro:304000,popular:"AHORRA $304K"}
];

const money = (n) => '$' + n.toLocaleString('es-CO');

function waLink(msg) {
  return `https://wa.me/${WA}?text=${encodeURIComponent(msg)}`;
}

// --- Batería 3D: fade al hacer scroll ---
document.addEventListener('DOMContentLoaded', () => {
  const bw = document.querySelector('.battery-wrap');
  if (bw) {
    const onScroll = () => {
      const r = bw.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = Math.min(1, Math.max(0, (r.top - vh * 0.15) / (vh * 0.6)));
      bw.classList.toggle('scrolled', progress > 0.15);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // --- Mapa de localidades ---
  const canvas = document.getElementById('map-canvas');
  const list = document.getElementById('map-list');
  const search = document.getElementById('map-search');
  let activePin = null;

  if (canvas && list) {
    function renderPins(items) {
      canvas.innerHTML = '';
      items.forEach(l => {
        const pin = document.createElement('div');
        pin.className = 'map-pin' + (l.sincomp ? ' sincomp' : '');
        pin.style.left = l.x + '%';
        pin.style.top = l.y + '%';
        pin.innerHTML = l.nombre[0];
        pin.title = l.nombre;
        pin.addEventListener('mouseenter', () => showTip(l, pin));
        pin.addEventListener('mouseleave', () => { if (activePin !== l.id) canvas.querySelector('.map-tooltip')?.remove(); });
        pin.addEventListener('click', () => { select(l.id); });
        canvas.appendChild(pin);
      });
    }
    function showTip(l, pin) {
      const tip = document.createElement('div');
      tip.className = 'map-tooltip';
      tip.textContent = `${l.nombre} — Willard ${l.ref}`;
      canvas.appendChild(tip);
      const pr = pin.getBoundingClientRect();
      const cr = canvas.getBoundingClientRect();
      tip.style.left = (pr.left - cr.left + pr.width / 2) + 'px';
      tip.style.top = (pr.top - cr.top) + 'px';
      canvas.querySelectorAll('.map-tooltip').forEach(t => { if (t !== tip) t.remove(); });
    }
    function renderList(items) {
      list.innerHTML = '';
      items.forEach(l => {
        const el = document.createElement('div');
        el.className = 'map-item';
        el.innerHTML = `<div><div class="nm">${l.nombre}</div>
          <div class="zn">${l.zona}</div></div>
          <div class="rf">${l.ref}</div>`;
        el.addEventListener('click', () => select(l.id));
        list.appendChild(el);
      });
    }
    function select(id) {
      activePin = id;
      const l = LOCALIDADES.find(x => x.id === id);
      if (!l) return;
      const pin = canvas.querySelectorAll('.map-pin')[LOCALIDADES.indexOf(l)];
      canvas.querySelectorAll('.map-pin').forEach(p => p.style.background = '');
      if (pin) pin.style.background = '#FFCC00';
      const tooltip = document.createElement('div');
      tooltip.className = 'map-tooltip';
      tooltip.textContent = `${l.nombre} — Willard ${l.ref}`;
      canvas.appendChild(tooltip);
      const pr = pin.getBoundingClientRect();
      const cr = canvas.getBoundingClientRect();
      tooltip.style.left = (pr.left - cr.left + pr.width / 2) + 'px';
      tooltip.style.top = (pr.top - cr.top) + 'px';
      window.open(waLink(`Hola Excelencia, cotizo batería Willard ${l.ref} para ${l.nombre}`), '_blank');
      setTimeout(() => tooltip.remove(), 2500);
    }

    const filter = () => {
      const q = (search ? search.value : '').toLowerCase();
      const items = q ? LOCALIDADES.filter(l => (l.nombre + ' ' + l.zona).toLowerCase().includes(q)) : LOCALIDADES;
      renderPins(items);
      renderList(items);
    };
    renderPins(LOCALIDADES);
    renderList(LOCALIDADES);
    if (search) search.addEventListener('input', filter);
  }

  // --- Tabla de precios ---
  const tbody = document.getElementById('precios-body');
  if (tbody) {
    PRECIOS.forEach(p => {
      const tr = document.createElement('tr');
      if (p.popular) tr.className = 'popular';
      tr.innerHTML = `
        <td class="ref">${p.ref}${p.popular ? `<span class="badge-popular">${p.popular}</span>` : ''}</td>
        <td class="cc">${p.cca} CCA</td>
        <td>${p.tipo}</td>
        <td>${p.vehiculos}</td>
        <td class="usada">${money(p.desde)}</td>
        <td>${money(p.usada)}</td>
        <td><span class="badge-ahorro">AHORRA ${money(p.ahorro)}</span></td>
        <td><a class="cta-top" style="height:34px;padding:0 14px;font-size:12px" href="${waLink('Hola, cotizo batería Willard ' + p.ref + ' para mi ' + p.vehiculos.split(',')[0])}">Cotizar</a></td>`;
      tbody.appendChild(tr);
    });
  }
});
