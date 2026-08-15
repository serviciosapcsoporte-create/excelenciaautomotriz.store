// Excelencia Automotriz - Script Puro HTML/JS
// Los CTA de WhatsApp usan href nativo con mensaje predefinido por página
// para trazabilidad (página + keyword). Este archivo agrega mejoras progresivas.
document.addEventListener('DOMContentLoaded', () => {
  const floatBtn = document.querySelector('.whatsapp-float');
  if (floatBtn) {
    floatBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const msg = 'Hola Excelencia Automotriz, cotizo batería Willard a domicilio';
      window.open(`https://wa.me/573204420417?text=${encodeURIComponent(msg)}`, '_blank');
    });
  }
});
