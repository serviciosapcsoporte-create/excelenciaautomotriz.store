// Excelencia Automotriz - Script oficial
// Datos: localidades (20), precios Willard, comparativa. CTA WhatsApp 3204420417
const WA = '573204420417';

// Data de localidades (extraída del template)
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
function initVehicleSearch() {
  const marcaSel = document.getElementById('vs-marca');
  const modeloSel = document.getElementById('vs-modelo');
  const cta = document.getElementById('vs-cta');
  if (!marcaSel || !modeloSel || !cta) { console.error('[vehicle-search] ids no encontrados', {marcaSel, modeloSel, cta}); return; }
  console.log('[vehicle-search] init');
  const DATA = {
    "Toyota": { modelos: ["Hilux","Corolla","Corolla Cross","Prado","Fortuner"], ref: "27/1000" },
    "Chevrolet": { modelos: ["Spark","Onix","Captiva","Sail","Tracker"], ref: "36/750" },
    "Mazda": { modelos: ["Mazda 3","CX-30","CX-5","BT-50"], ref: "34/1000" },
    "Hyundai": { modelos: ["Tucson","Accent","Elantra","Santa Fe"], ref: "31H/1250" },
    "Kia": { modelos: ["Sportage","Picanto","Rio","Cerato"], ref: "36/750" },
    "Renault": { modelos: ["Duster","Sandero","Logan","Kwid"], ref: "42/850" }
  };
  const populateModelo = (marca) => {
    modeloSel.innerHTML = '<option value="">Modelo</option>';
    const hasMarca = !!marca && !!DATA[marca];
    modeloSel.disabled = !hasMarca;
    modeloSel.setAttribute('aria-disabled', String(!hasMarca));
    cta.disabled = true;
    cta.setAttribute('aria-disabled', 'true');
    if (!hasMarca) return;
    DATA[marca].modelos.forEach(m => {
      const o = document.createElement('option');
      o.value = m; o.textContent = m;
      modeloSel.appendChild(o);
    });
    console.log('[vehicle-search] marca', marca, 'modelos', DATA[marca].modelos);
    try { modeloSel.focus(); } catch(e) {}
  };
  marcaSel.addEventListener('change', () => populateModelo(marcaSel.value));
  modeloSel.addEventListener('change', () => {
    const hasModelo = !!modeloSel.value;
    cta.disabled = !hasModelo;
    cta.setAttribute('aria-disabled', String(!hasModelo));
    if (hasModelo) { console.log('[vehicle-search] modelo', modeloSel.value); try{ cta.focus(); }catch(e){} }
  });
  cta.addEventListener('click', () => {
    const marca = marcaSel.value;
    const modelo = modeloSel.value;
    if (!marca || !modelo) { console.warn('[vehicle-search] click sin marca/modelo'); return; }
    const ref = (DATA[marca] && DATA[marca].ref) || '36/750';
    const msg = `Hola Excelencia, cotizo batería Willard ${ref} para mi ${marca} ${modelo}`;
    console.log('[vehicle-search] cta', marca, modelo, ref);
    window.open(waLink(msg), '_blank');
  });
}
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initVehicleSearch);
} else {
  try { initVehicleSearch(); } catch(e) { console.error(e); }
}



document.addEventListener('DOMContentLoaded', () => {
  // --- Hero reveal clip-path (Sprint A) ---
  const batteryImg = document.querySelector('.battery-img');
  if (batteryImg) {
    batteryImg.setAttribute('data-reveal','');
    void batteryImg.offsetWidth;
    requestAnimationFrame(() => requestAnimationFrame(() => batteryImg.removeAttribute('data-reveal')));
    setTimeout(() => batteryImg.removeAttribute('data-reveal'), 80);
  }
  // --- Hero secuencia Design Engineering (blur + stagger) ---
  const heroEls = document.querySelectorAll('.hero [data-hero]');
  if (heroEls.length) {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      heroEls.forEach(el => { el.classList.add('is-visible'); });
    } else {
      void document.querySelector('.hero').offsetWidth;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => heroEls.forEach(el => el.classList.add('is-visible')));
      });
    }
  }
  // Pausar video hero si reduce motion
  const heroVideo = document.querySelector('.hero-video');
  if (heroVideo) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      heroVideo.pause();
      heroVideo.removeAttribute('autoplay');
    } else {
      heroVideo.play().catch(()=>{});
    }
  }

  // --- Batería 3D: fade al hacer scroll ---

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

  // --- Mapa removido (ahorro 3KB) ---
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

  // --- Sprint B: Cards stagger reveal (IntersectionObserver) ---
  const cards = document.querySelectorAll('.grid .card');
  cards.forEach(c => c.setAttribute('data-reveal-cards',''));
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const idx = Array.from(el.parentElement.children).indexOf(el) % 4;
          el.style.transitionDelay = (idx * 55) + 'ms';
          el.classList.add('is-visible');
          el.removeAttribute('data-reveal-cards');
          io.unobserve(el);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    cards.forEach(c => io.observe(c));
  } else {
    cards.forEach(c => { c.classList.add('is-visible'); c.removeAttribute('data-reveal-cards'); });
  }

  // --- Sprint B: FAQ grid wrap para animacion ---
  document.querySelectorAll('.faq-item .faq-body').forEach(body => {
    if (body.firstElementChild && body.firstElementChild.hasAttribute && body.firstElementChild.hasAttribute('data-faq-inner')) return;
    if (body.children.length === 1 && body.firstElementChild && body.firstElementChild.tagName === 'DIV' && body.firstElementChild.hasAttribute('data-faq-inner')) return;
    const inner = document.createElement('div');
    inner.setAttribute('data-faq-inner','');
    inner.style.overflow = 'hidden';
    while (body.firstChild) inner.appendChild(body.firstChild);
    body.appendChild(inner);
  });

  // --- Sprint B: Tabla scroll hint mask ---
  const tableWrap = document.querySelector('.table-wrap');
  if (tableWrap) {
    const updateMask = () => {
      const maxScroll = tableWrap.scrollWidth - tableWrap.clientWidth;
      tableWrap.classList.toggle('is-at-end', tableWrap.scrollLeft >= maxScroll - 8);
    };
    tableWrap.addEventListener('scroll', updateMask, { passive: true });
    window.addEventListener('resize', updateMask);
    updateMask();
  }
});
