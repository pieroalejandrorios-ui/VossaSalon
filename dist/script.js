const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
const header = document.querySelector('#header');
function closeMenu() { navigation.classList.remove('open'); menuButton.setAttribute('aria-expanded', 'false'); menuButton.setAttribute('aria-label', 'Abrir menú'); }
menuButton.addEventListener('click', () => { const open = menuButton.getAttribute('aria-expanded') !== 'true'; navigation.classList.toggle('open', open); menuButton.setAttribute('aria-expanded', String(open)); menuButton.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú'); });
document.querySelectorAll('.nav-link').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
document.addEventListener('click', event => { if (!header.contains(event.target)) closeMenu(); });
window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 15), { passive: true });
const links = [...document.querySelectorAll('.nav-link')];
const sections = links.map(link => document.querySelector(link.getAttribute('href')));
const observer = new IntersectionObserver(entries => { entries.forEach(entry => { if (entry.isIntersecting) { links.forEach(link => { const active = link.getAttribute('href') === '#' + entry.target.id; link.classList.toggle('active', active); if (active) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current'); }); } }); }, { rootMargin: '-15% 0px -60% 0px', threshold: 0 });
sections.forEach(section => observer.observe(section));
const booking = document.querySelector('#booking');
const service = document.querySelector('#service');
function updateWhatsApp() { const message = service.value === 'Quiero orientación' ? 'Hola, Vossa. Me gustaría conocer sus servicios y coordinar una cita.' : 'Hola, Vossa. Me interesa el servicio de ' + service.value.toLowerCase() + '. ¿Podrían indicarme disponibilidad y precio para reservar una cita?'; document.querySelectorAll('.whatsapp-line').forEach(link => { link.href = 'https://wa.me/' + link.dataset.phone + '?text=' + encodeURIComponent(message); }); }
document.querySelectorAll('.reserve').forEach(button => button.addEventListener('click', () => { service.value = button.dataset.service || 'Quiero orientación'; updateWhatsApp(); closeMenu(); booking.showModal(); }));
service.addEventListener('change', updateWhatsApp);
document.querySelector('.dialog-close').addEventListener('click', () => booking.close());
booking.addEventListener('click', event => { if (event.target === booking) { const rect = booking.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) booking.close(); } });
document.querySelectorAll('.service-list details').forEach(detail => detail.addEventListener('toggle', () => { if (detail.open) document.querySelectorAll('.service-list details').forEach(other => { if (other !== detail) other.open = false; }); }));
document.querySelector('#year').textContent = new Date().getFullYear();
updateWhatsApp();
const videoGallery = document.querySelector('#video-gallery');
const videoNavigation = [...document.querySelectorAll('.reel-nav')];
function updateVideoNavigation() {
  const maxScroll = videoGallery.scrollWidth - videoGallery.clientWidth;
  videoNavigation.forEach(button => { button.disabled = Number(button.dataset.direction) < 0 ? videoGallery.scrollLeft <= 2 : videoGallery.scrollLeft >= maxScroll - 2; });
}
videoNavigation.forEach(button => button.addEventListener('click', () => {
  const card = videoGallery.querySelector('.reel-card');
  const gap = parseFloat(getComputedStyle(videoGallery).gap) || 0;
  videoGallery.scrollBy({left:(card.getBoundingClientRect().width + gap) * Number(button.dataset.direction),behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'});
}));
videoGallery.addEventListener('scroll', updateVideoNavigation, {passive:true});
new ResizeObserver(updateVideoNavigation).observe(videoGallery);
updateVideoNavigation();
const heroPhotoPane = document.querySelector('.hero-background');
const heroPhoto = heroPhotoPane.querySelector('img');
const mobileHero = window.matchMedia('(max-width: 600px)');
function configureMobileHero() {
  if (mobileHero.matches) {
    heroPhotoPane.setAttribute('tabindex', '0');
    heroPhotoPane.setAttribute('role', 'region');
    heroPhotoPane.setAttribute('aria-label', 'Foto del equipo: desliza horizontalmente para verla completa');
    heroPhotoPane.scrollLeft = (heroPhotoPane.scrollWidth - heroPhotoPane.clientWidth) / 2;
  } else {
    heroPhotoPane.removeAttribute('tabindex');
    heroPhotoPane.removeAttribute('role');
    heroPhotoPane.removeAttribute('aria-label');
    heroPhotoPane.scrollLeft = 0;
  }
}
mobileHero.addEventListener('change', configureMobileHero);
heroPhoto.addEventListener('load', configureMobileHero);
new ResizeObserver(() => { if (mobileHero.matches) configureMobileHero(); }).observe(heroPhotoPane);
configureMobileHero();
