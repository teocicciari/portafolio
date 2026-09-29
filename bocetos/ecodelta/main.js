// Fecha dinámica en el footer
const now = new Date();
document.getElementById('year').textContent = now.getFullYear();
document.getElementById('today').textContent = now.toLocaleDateString('es-AR', {
  day: 'numeric', month: 'long', year: 'numeric'
});

// Nav: sólida al scrollear, menú mobile
const nav = document.querySelector('.nav');
const toggle = document.querySelector('.nav__toggle');

const onScroll = () => nav.classList.toggle('is-solid', window.scrollY > 40);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('is-open');
  toggle.setAttribute('aria-expanded', open);
});
document.querySelectorAll('.nav__menu a').forEach(a =>
  a.addEventListener('click', () => {
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  })
);

// Formulario de reserva
const form = document.getElementById('form-reserva');
const msg = document.getElementById('form-msg');
const checkin = document.getElementById('checkin');
const checkout = document.getElementById('checkout');

const iso = d => d.toISOString().slice(0, 10);
checkin.min = iso(now);
checkout.min = iso(now);
checkin.addEventListener('change', () => {
  if (!checkin.value) return;
  const next = new Date(checkin.value + 'T12:00');
  next.setDate(next.getDate() + 1);
  checkout.min = iso(next);
  if (checkout.value && checkout.value <= checkin.value) checkout.value = '';
});

form.addEventListener('submit', e => {
  e.preventDefault();
  msg.className = 'form__msg field--full';

  let valid = true;
  form.querySelectorAll('[required]').forEach(el => {
    const bad = !el.value.trim();
    el.closest('.field').classList.toggle('is-invalid', bad);
    if (bad) valid = false;
  });

  if (!valid) {
    msg.textContent = 'Completá los campos marcados para enviar la consulta.';
    msg.classList.add('is-error');
    return;
  }
  if (checkout.value <= checkin.value) {
    checkout.closest('.field').classList.add('is-invalid');
    msg.textContent = 'La fecha de check out tiene que ser posterior al check in.';
    msg.classList.add('is-error');
    return;
  }

  const nombre = form.nombre.value.trim().split(' ')[0];
  msg.textContent = `¡Gracias, ${nombre}! Recibimos tu consulta y te respondemos con la disponibilidad.`;
  msg.classList.add('is-ok');
  form.reset();
});
