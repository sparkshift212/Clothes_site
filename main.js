/* ============================================
   AURÈLE — Premium Fashion E-Commerce
   Interactive JavaScript
   ============================================ */

'use strict';

/* ---------- ANNOUNCEMENT BAR ---------- */
const annBar   = document.getElementById('announcement-bar');
const annClose = document.getElementById('ann-close');
if (annClose) {
  annClose.addEventListener('click', () => {
    annBar.style.maxHeight = annBar.offsetHeight + 'px';
    requestAnimationFrame(() => {
      annBar.style.transition = 'max-height 0.4s ease, opacity 0.4s ease';
      annBar.style.maxHeight  = '0';
      annBar.style.opacity    = '0';
    });
    setTimeout(() => annBar.remove(), 420);
  });
}

/* ---------- NAVBAR SCROLL STATE ---------- */
const navbar = document.getElementById('navbar');
let lastScroll = 0;
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  navbar.classList.toggle('scrolled', y > 40);
  lastScroll = y;
}, { passive: true });

/* ---------- SEARCH OVERLAY ---------- */
const searchBtn     = document.getElementById('search-btn');
const searchOverlay = document.getElementById('search-overlay');
const searchClose   = document.getElementById('search-close');
const searchInput   = document.getElementById('search-input');

searchBtn.addEventListener('click', () => {
  searchOverlay.classList.add('active');
  setTimeout(() => searchInput.focus(), 200);
});
searchClose.addEventListener('click', () => searchOverlay.classList.remove('active'));
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') searchOverlay.classList.remove('active');
});

/* ---------- HAMBURGER / MOBILE MENU ---------- */
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  hamburger.classList.toggle('active', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});
mobileMenu.querySelectorAll('.mobile-nav-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('active');
    document.body.style.overflow = '';
  });
});

/* ---------- CART DRAWER ---------- */
const cartBtn     = document.getElementById('cart-btn');
const cartDrawer  = document.getElementById('cart-drawer');
const cartOverlay = document.getElementById('cart-overlay');
const cartClose   = document.getElementById('cart-close');

function openCart() {
  cartDrawer.classList.add('open');
  cartOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closeCart() {
  cartDrawer.classList.remove('open');
  cartOverlay.classList.remove('active');
  document.body.style.overflow = '';
}
cartBtn.addEventListener('click', openCart);
cartClose.addEventListener('click', closeCart);
cartOverlay.addEventListener('click', closeCart);

/* Cart quantity buttons */
document.querySelectorAll('.qty-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const wrap = btn.closest('.cart-item-qty');
    const qtyEl = wrap.querySelector('.qty-value');
    let qty = parseInt(qtyEl.textContent, 10);
    if (btn.dataset.action === 'increase') qty = Math.min(qty + 1, 99);
    if (btn.dataset.action === 'decrease') qty = Math.max(qty - 1, 1);
    qtyEl.textContent = qty;
    recalcCart();
  });
});

function recalcCart() {
  // Simple demo recalc — real app would use state management
  const items = document.querySelectorAll('.cart-item');
  let count = 0;
  items.forEach(item => {
    const qty = parseInt(item.querySelector('.qty-value').textContent, 10);
    count += qty;
  });
  document.getElementById('cart-count').textContent = count;
  document.getElementById('cart-drawer-count').textContent = `(${count})`;
}

/* ---------- TOAST NOTIFICATION ---------- */
const toast    = document.getElementById('toast');
const toastMsg = document.getElementById('toast-msg');
let toastTimer = null;

function showToast(msg = 'Added to cart!') {
  toastMsg.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3000);
}

/* ---------- ADD TO CART — QUICK ADD BUTTONS ---------- */
document.querySelectorAll('.btn-quick-add').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const name  = btn.dataset.product;
    const price = btn.dataset.price;

    // Animate button
    btn.textContent = '✓ Added!';
    btn.style.background = '#2ECC71';
    setTimeout(() => {
      btn.textContent = 'Add to Cart';
      btn.style.background = '';
    }, 1800);

    // Update cart count
    const countEl = document.getElementById('cart-count');
    countEl.textContent = parseInt(countEl.textContent, 10) + 1;
    countEl.style.transform = 'scale(1.5)';
    setTimeout(() => countEl.style.transform = '', 300);

    showToast(`${name} added to cart!`);
  });
});

/* ---------- STL ADD BUTTONS ---------- */
document.querySelectorAll('.stl-add-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const name  = btn.dataset.product;
    const origText = btn.textContent;
    btn.textContent = '✓';
    btn.style.background = '#2ECC71';
    setTimeout(() => {
      btn.textContent = origText;
      btn.style.background = '';
    }, 1800);
    const countEl = document.getElementById('cart-count');
    countEl.textContent = parseInt(countEl.textContent, 10) + 1;
    showToast(`${name} added to cart!`);
  });
});

/* ---------- STL ADD ALL BUTTON ---------- */
const stlAllBtn = document.getElementById('stl-all-btn');
if (stlAllBtn) {
  stlAllBtn.addEventListener('click', () => {
    stlAllBtn.textContent = '✓ All Items Added!';
    stlAllBtn.disabled = true;
    stlAllBtn.style.background = '#2ECC71';
    const countEl = document.getElementById('cart-count');
    countEl.textContent = parseInt(countEl.textContent, 10) + 4;
    showToast('Complete look added to cart!');
    setTimeout(() => {
      stlAllBtn.textContent = 'Add All to Cart';
      stlAllBtn.disabled = false;
      stlAllBtn.style.background = '';
    }, 2500);
  });
}

/* ---------- WISHLIST BUTTONS ---------- */
document.querySelectorAll('.wishlist-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const svg = btn.querySelector('svg path, btn.querySelector svg polyline');
    btn.classList.toggle('active');
    if (btn.classList.contains('active')) {
      btn.style.color = '#e74c3c';
      btn.querySelector('svg').style.fill = '#e74c3c';
      showToast('Added to wishlist ♥');
    } else {
      btn.style.color = '';
      btn.querySelector('svg').style.fill = 'none';
    }
  });
});

/* ---------- NEWSLETTER FORM ---------- */
const newsletterForm = document.getElementById('newsletter-form');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const input  = document.getElementById('newsletter-email');
    const email  = input.value.trim();
    if (!email) return;
    const btn = newsletterForm.querySelector('.newsletter-submit');
    btn.textContent = '✓ Subscribed!';
    btn.style.background = '#2ECC71';
    btn.style.color = '#fff';
    input.value = '';
    input.disabled = true;
    showToast('Welcome to AURÈLE! Check your inbox for your 10% off code.');
    setTimeout(() => {
      btn.textContent = 'Subscribe';
      btn.style.background = '';
      btn.style.color = '';
      input.disabled = false;
    }, 5000);
  });
}

/* ---------- FOOTER FORM ---------- */
const footerForm = document.getElementById('footer-form');
if (footerForm) {
  footerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = footerForm.querySelector('button');
    btn.textContent = '✓';
    setTimeout(() => btn.textContent = '→', 2500);
    showToast('You\'re subscribed! Look out for exclusive drops.');
  });
}

/* ---------- SCROLL REVEAL (Intersection Observer) ---------- */
const revealEls = document.querySelectorAll('.reveal-up');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -48px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

/* ---------- TESTIMONIALS CAROUSEL ---------- */
const track = document.getElementById('testimonials-track');
const dots  = document.querySelectorAll('.t-dot');
let currentSlide = 0;
let slideInterval;

function getSlideWidth() {
  const card = track.querySelector('.review-card');
  return card ? card.offsetWidth + 24 : 0; // card width + gap
}

function goToSlide(index) {
  const maxSlide = track.children.length - getSlidesVisible();
  currentSlide = Math.max(0, Math.min(index, maxSlide));
  const offset  = currentSlide * getSlideWidth();
  track.style.transform = `translateX(-${offset}px)`;
  dots.forEach((d, i) => d.classList.toggle('active', i === currentSlide));
}

function getSlidesVisible() {
  if (window.innerWidth < 640) return 1;
  if (window.innerWidth < 900) return 2;
  return 3;
}

dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    goToSlide(i);
    resetInterval();
  });
});

function resetInterval() {
  clearInterval(slideInterval);
  slideInterval = setInterval(() => {
    const maxSlide = track.children.length - getSlidesVisible();
    goToSlide(currentSlide >= maxSlide ? 0 : currentSlide + 1);
  }, 5000);
}
resetInterval();

// Touch support for testimonials
let touchStartX = 0;
track.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
track.addEventListener('touchend', e => {
  const diff = touchStartX - e.changedTouches[0].clientX;
  if (Math.abs(diff) > 50) {
    goToSlide(diff > 0 ? currentSlide + 1 : currentSlide - 1);
    resetInterval();
  }
});

window.addEventListener('resize', () => goToSlide(currentSlide));

/* ---------- BACK TO TOP ---------- */
const btt = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
  btt.classList.toggle('visible', window.scrollY > 600);
}, { passive: true });
btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* ---------- HERO PARALLAX ---------- */
const heroImg = document.querySelector('.hero-img');
if (heroImg) {
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y < window.innerHeight) {
      heroImg.style.transform = `translateY(${y * 0.28}px)`;
    }
  }, { passive: true });
}

/* ---------- PRODUCT CARD HOVER TILT (subtle) ---------- */
document.querySelectorAll('.product-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect   = card.getBoundingClientRect();
    const cx     = rect.left + rect.width  / 2;
    const cy     = rect.top  + rect.height / 2;
    const dx     = (e.clientX - cx) / (rect.width  / 2);
    const dy     = (e.clientY - cy) / (rect.height / 2);
    card.style.transform = `translateY(-6px) rotateX(${-dy * 2}deg) rotateY(${dx * 2}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform 0.6s ease, box-shadow 0.35s ease';
    setTimeout(() => card.style.transition = '', 600);
  });
});

/* ---------- CATEGORY CARD RIPPLE ---------- */
document.querySelectorAll('.category-card').forEach(card => {
  card.addEventListener('click', (e) => {
    const circle = card.querySelector('.category-circle');
    const ripple = document.createElement('span');
    ripple.style.cssText = `
      position:absolute; border-radius:50%; pointer-events:none;
      background:rgba(10,10,10,0.10); transform:scale(0);
      animation:ripple 0.55s ease-out forwards;
      width:100%; height:100%; top:0; left:0;
    `;
    if (!document.querySelector('#ripple-style')) {
      const s = document.createElement('style');
      s.id = 'ripple-style';
      s.textContent = '@keyframes ripple{to{transform:scale(2.5);opacity:0}}';
      document.head.appendChild(s);
    }
    circle.style.position = 'relative';
    circle.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});

/* ---------- SMOOTH ACTIVE NAV LINK ---------- */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');
const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { rootMargin: '-40% 0px -40% 0px' });
sections.forEach(s => navObserver.observe(s));

/* ---------- PRODUCT IMAGE LAZY LOAD EFFECT ---------- */
document.querySelectorAll('.product-img, .stl-img, .promo-img').forEach(img => {
  img.addEventListener('load', () => {
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.5s ease';
    requestAnimationFrame(() => img.style.opacity = '1');
  });
  if (img.complete) img.style.opacity = '1';
});

/* ---------- STAGGER HERO REVEAL ON LOAD ---------- */
window.addEventListener('load', () => {
  const heroEls = document.querySelectorAll('.hero .reveal-up');
  heroEls.forEach((el, i) => {
    setTimeout(() => el.classList.add('visible'), 300 + i * 150);
  });
});

/* ---------- HOTSPOT ARIA (keyboard accessible) ---------- */
document.querySelectorAll('.hotspot').forEach(hs => {
  hs.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      hs.querySelector('.hotspot-tooltip').style.opacity = '1';
      hs.querySelector('.hotspot-tooltip').style.pointerEvents = 'all';
    }
  });
});

/* ---------- PRELOADER ---------- */
(function() {
  const style = document.createElement('style');
  style.textContent = `
    #preloader {
      position: fixed; inset: 0; z-index: 9999;
      background: #F7F3EE;
      display: flex; align-items: center; justify-content: center;
      transition: opacity 0.6s ease, visibility 0.6s ease;
    }
    #preloader.hidden { opacity: 0; visibility: hidden; pointer-events: none; }
    .preloader-logo {
      font-family: 'Manrope', sans-serif;
      font-size: 28px; font-weight: 800;
      letter-spacing: 0.18em;
      color: #0A0A0A;
      animation: preloaderPulse 1.2s ease-in-out infinite;
    }
    @keyframes preloaderPulse {
      0%, 100% { opacity: 0.3; }
      50% { opacity: 1; }
    }
  `;
  document.head.appendChild(style);

  const loader = document.createElement('div');
  loader.id = 'preloader';
  loader.innerHTML = '<div class="preloader-logo">AURÈLE</div>';
  document.body.prepend(loader);

  window.addEventListener('load', () => {
    setTimeout(() => loader.classList.add('hidden'), 600);
    setTimeout(() => loader.remove(), 1300);
  });
})();

console.log('%cAURÈLE — Premium Fashion 2026', 'font-size:20px;font-weight:800;color:#0A0A0A;background:#F7F3EE;padding:8px 16px;border-radius:4px;');
