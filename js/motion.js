// Excelencia Automotriz - Scroll reveal (progressive enhancement)
// Sin JS: contenido visible. Con JS: stagger reveal via transform+opacity.
const DURATION = 300;
const STAGGER = 50;

document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('.section, .card, .cta-banner');
  sections.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(8px)';
    el.style.transition = `opacity ${DURATION}ms cubic-bezier(0.23, 1, 0.32, 1), transform ${DURATION}ms cubic-bezier(0.23, 1, 0.32, 1)`;
    el.style.transitionDelay = `${i * STAGGER}ms`;
  });

  if (!('IntersectionObserver' in window)) {
    sections.forEach(el => { el.style.opacity = '1'; el.style.transform = 'none'; });
    return;
  }

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'none';
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  sections.forEach(el => obs.observe(el));
});
