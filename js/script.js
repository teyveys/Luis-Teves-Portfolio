document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initHamburgerMenu();
  initBackToTop();
  initScrollAnimations();
  initLightbox();
  initProjectFilter();
});

/* ===================== THEME TOGGLE ===================== */
function initThemeToggle() {
  const toggle = document.getElementById('theme-toggle');
  const icon = toggle?.querySelector('i');
  const stored = localStorage.getItem('theme');

  if (stored === 'light') {
    document.body.classList.add('light-theme');
    if (icon) icon.className = 'fa-solid fa-sun';
  }

  toggle?.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    const isLight = document.body.classList.contains('light-theme');
    if (icon) icon.className = isLight ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  });
}

/* ===================== HAMBURGER MENU ===================== */
function initHamburgerMenu() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.querySelector('.nav-links');

  hamburger?.addEventListener('click', () => {
    navLinks?.classList.toggle('nav-open');
    hamburger.classList.toggle('active');
  });

  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks?.classList.remove('nav-open');
      hamburger?.classList.remove('active');
    });
  });
}

/* ===================== BACK TO TOP ===================== */
function initBackToTop() {
  const btn = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    btn?.classList.toggle('show', window.scrollY > 400);
  });

  btn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ===================== SCROLL ANIMATIONS ===================== */
function initScrollAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

/* ===================== LIGHTBOX ===================== */
function initLightbox() {
  const overlay = document.getElementById('lightbox-overlay');
  const img = document.getElementById('lightbox-img');
  const close = document.getElementById('lightbox-close');

  document.querySelectorAll('.project-thumb').forEach(thumb => {
    thumb.addEventListener('click', () => {
      if (overlay && img) {
        img.src = thumb.src;
        overlay.classList.add('active');
      }
    });
  });

  close?.addEventListener('click', () => overlay?.classList.remove('active'));
  overlay?.addEventListener('click', (e) => {
    if (e.target === overlay) overlay.classList.remove('active');
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') overlay?.classList.remove('active');
  });
}

/* ===================== PROJECT FILTER ===================== */
function initProjectFilter() {
  const tabs = document.querySelectorAll('.filter-tab');
  const cards = document.querySelectorAll('.project-card');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.dataset.filter;

      cards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}
