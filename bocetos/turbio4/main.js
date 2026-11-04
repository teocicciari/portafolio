/* Turbio IV · boceto */
(function () {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- nav sólida al scrollear ---------- */
  const nav = document.getElementById('nav');
  const onNav = () => nav.classList.toggle('is-solid', window.scrollY > 60);
  onNav();
  window.addEventListener('scroll', onNav, { passive: true });

  /* ---------- reveal ---------- */
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('is-in'));
  }

  /* ---------- recorrido: línea que pasa por cada parada y se dibuja al scrollear ---------- */
  const track = document.getElementById('track');
  const svg = document.getElementById('routeSvg');
  const base = document.getElementById('routeBase');
  const drawn = document.getElementById('routePath');
  const stops = Array.from(track.querySelectorAll('.stop'));
  const pins = stops.map((s) => s.querySelector('.stop__pin'));

  function buildPath() {
    const t = track.getBoundingClientRect();
    svg.setAttribute('viewBox', `0 0 ${t.width} ${t.height}`);
    const pts = pins.map((p) => {
      const r = p.getBoundingClientRect();
      return { x: r.left + r.width / 2 - t.left, y: r.top + r.height / 2 - t.top };
    });
    const bulge = t.width > 700 ? 70 : 16;
    let d = `M ${pts[0].x} 0 L ${pts[0].x} ${pts[0].y}`;
    for (let i = 1; i < pts.length; i++) {
      const a = pts[i - 1], b = pts[i];
      const dy = b.y - a.y;
      const s = i % 2 ? 1 : -1;
      d += ` C ${a.x + s * bulge} ${a.y + dy * 0.45}, ${b.x + s * bulge} ${b.y - dy * 0.45}, ${b.x} ${b.y}`;
    }
    const last = pts[pts.length - 1];
    d += ` L ${last.x} ${t.height}`;
    base.setAttribute('d', d);
    drawn.setAttribute('d', d);
  }

  function updateProgress() {
    const t = track.getBoundingClientRect();
    const mark = window.innerHeight * 0.62;
    const p = Math.min(1, Math.max(0, (mark - t.top) / t.height));
    drawn.style.setProperty('--draw', reduceMotion ? 0 : (1 - p).toFixed(4));
    pins.forEach((pin, i) => {
      const r = pin.getBoundingClientRect();
      stops[i].classList.toggle('is-reached', reduceMotion || r.top + r.height / 2 < mark);
    });
  }

  buildPath();
  updateProgress();
  window.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', () => { buildPath(); updateProgress(); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { buildPath(); updateProgress(); });

  /* ---------- formulario de reserva ---------- */
  const form = document.getElementById('bookingForm');
  const checkin = document.getElementById('checkin');
  const checkout = document.getElementById('checkout');
  const errorEl = document.getElementById('formError');
  const MIN_DAYS = 10;

  const toISO = (d) => d.toISOString().slice(0, 10);
  const addDays = (iso, n) => { const d = new Date(iso + 'T12:00:00'); d.setDate(d.getDate() + n); return toISO(d); };

  checkin.min = toISO(new Date());
  checkin.addEventListener('change', () => {
    if (!checkin.value) return;
    const min = addDays(checkin.value, MIN_DAYS);
    checkout.min = min;
    if (!checkout.value || checkout.value < min) checkout.value = min;
  });

  const fmt = (iso) => iso.split('-').reverse().join('/');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const nombre = (data.get('nombre') || '').trim();
    const personas = data.get('personas');
    const ci = data.get('checkin');
    const co = data.get('checkout');

    let msg = '';
    if (!nombre) msg = 'Escribí tu nombre para que sepamos a quién responder.';
    else if (!personas) msg = 'Elegí la cantidad de personas.';
    else if (!ci || !co) msg = 'Elegí la fecha de check in y la de check out.';
    else if (co < addDays(ci, MIN_DAYS)) msg = `La expedición dura como mínimo ${MIN_DAYS} días: elegí un check out posterior al ${fmt(addDays(ci, MIN_DAYS - 1))}.`;

    errorEl.textContent = msg;
    if (msg) return;

    const subject = `Reserva Turbio IV · ${nombre}`;
    const body =
      `Hola! Quiero reservar lugar en la expedición Turbio IV.\n\n` +
      `Nombre: ${nombre}\n` +
      `Cantidad de personas: ${personas}\n` +
      `Check in: ${fmt(ci)}\n` +
      `Check out: ${fmt(co)}\n`;
    window.location.href =
      `mailto:turbio4oficial@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });

  /* ---------- footer: fecha dinámica ---------- */
  const now = new Date();
  document.getElementById('year').textContent = now.getFullYear();
  document.getElementById('today').textContent = now.toLocaleDateString('es-AR', {
    day: 'numeric', month: 'long', year: 'numeric'
  });
})();
