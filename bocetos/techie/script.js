// ===== SCROLL REVEAL =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ===== ATTRIBUTE BAR ANIMATION on scroll =====
const attrObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.attr-fill').forEach(bar => {
        const target = bar.style.getPropertyValue('--w');
        bar.style.width = target;
      });
      attrObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const attrSection = document.querySelector('.about-card.wide');
if (attrSection) attrObserver.observe(attrSection);

// ===== COUNTER ANIMATION =====
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1800;
  const step = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) { current = target; clearInterval(timer); }
    el.textContent = Math.floor(current);
  }, 16);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.dataset.animated) {
      entry.target.dataset.animated = 'true';
      animateCounter(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-value[data-target]').forEach(c => counterObserver.observe(c));

// ===== MOBILE NAV TOGGLE =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');
if (navToggle && navLinks) {
  let open = false;
  navToggle.addEventListener('click', () => {
    open = !open;
    if (open) {
      Object.assign(navLinks.style, {
        display: 'flex', flexDirection: 'column',
        position: 'absolute', top: '64px', left: '0', right: '0',
        background: 'rgba(6,6,16,0.95)', padding: '1.5rem 2rem',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        backdropFilter: 'blur(20px)', gap: '1.25rem',
      });
    } else {
      navLinks.style.display = 'none';
    }
  });
  // Close on link click
  navLinks.querySelectorAll('.nav-link').forEach(a => {
    a.addEventListener('click', () => { open = false; navLinks.style.display = 'none'; });
  });
}

// ===== ACTIVE NAV LINK =====
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-link');
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchors.forEach(a => a.style.color = '');
      const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
      if (active) active.style.color = 'var(--cyan)';
    }
  });
}, { rootMargin: '-40% 0px -60% 0px' });
sections.forEach(s => sectionObserver.observe(s));

// ===== HERO TITLE GLITCH =====
const accentLine = document.querySelector('.title-line.accent');
if (accentLine) {
  setInterval(() => {
    accentLine.style.letterSpacing = `${1 + (Math.random() - 0.5) * 4}px`;
    accentLine.style.transform = `skewX(${(Math.random() - 0.5) * 3}deg)`;
    setTimeout(() => {
      accentLine.style.letterSpacing = '';
      accentLine.style.transform = '';
    }, 80);
  }, 4000);
}

// ===== CONTACT FORM =====
const form = document.querySelector('.contact-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('.btn-primary span:first-child');
    const orig = btn.textContent;
    btn.textContent = 'TRANSMISIÓN ENVIADA ✓';
    form.reset();
    setTimeout(() => { btn.textContent = orig; }, 3000);
  });
}
