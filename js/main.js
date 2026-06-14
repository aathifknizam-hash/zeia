// Mobile Menu Toggle
const menuToggle = document.querySelector('.nav-menu-toggle');
const mobileMenu = document.querySelector('.nav-mobile-menu');
const menuOverlay = document.querySelector('.nav-menu-overlay');

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    menuOverlay.classList.toggle('active');
  });
}

if (menuOverlay) {
  menuOverlay.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    menuOverlay.classList.remove('active');
  });
}

// Close mobile menu when a link is clicked
const mobileLinks = document.querySelectorAll('.nav-mobile-menu a');
mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    menuOverlay.classList.remove('active');
  });
});

// Scroll Reveal Animation
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 60);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

reveals.forEach(el => observer.observe(el));
