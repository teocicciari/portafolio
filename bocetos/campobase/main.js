// Campo Base — interacciones de la landing

// Año dinámico del footer
document.getElementById('anio').textContent = new Date().getFullYear();

// Nav: sólido al scrollear, menú móvil
const nav = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

function actualizarNav() {
    nav.classList.toggle('nav-solido', window.scrollY > 40);
}
window.addEventListener('scroll', actualizarNav, { passive: true });
actualizarNav();

navToggle.addEventListener('click', () => {
    const abierto = nav.classList.toggle('nav-abierto');
    nav.classList.toggle('nav-solido', abierto || window.scrollY > 40);
    navToggle.setAttribute('aria-expanded', String(abierto));
    navToggle.setAttribute('aria-label', abierto ? 'Cerrar menú' : 'Abrir menú');
});

navLinks.addEventListener('click', (e) => {
    if (e.target.closest('a')) {
        nav.classList.remove('nav-abierto');
        navToggle.setAttribute('aria-expanded', 'false');
    }
});

// Reveal suave de las secciones
const revelables = document.querySelectorAll('.seccion .contenedor, .cordero-grid, .sustentable blockquote, .reserva .contenedor');
revelables.forEach((el) => el.classList.add('revelar'));

const observador = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
            entrada.target.classList.add('visible');
            observador.unobserve(entrada.target);
        }
    });
}, { threshold: 0.12 });

revelables.forEach((el) => observador.observe(el));

// Formulario de reserva → WhatsApp
const form = document.getElementById('formReserva');
const formError = document.getElementById('formError');
const checkin = document.getElementById('checkin');
const checkout = document.getElementById('checkout');

// no se puede reservar hacia atrás
const hoy = new Date().toISOString().split('T')[0];
checkin.min = hoy;
checkout.min = hoy;

checkin.addEventListener('change', () => {
    if (checkin.value) checkout.min = checkin.value;
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    formError.hidden = true;

    const nombre = document.getElementById('nombre').value.trim();
    const personas = document.getElementById('personas').value;
    const unidad = document.getElementById('unidad').value;

    if (!nombre || !personas || !checkin.value || !checkout.value) {
        formError.textContent = 'Completá todos los campos para enviar la consulta.';
        formError.hidden = false;
        return;
    }

    if (checkout.value <= checkin.value) {
        formError.textContent = 'La fecha de check-out tiene que ser posterior a la de check-in.';
        formError.hidden = false;
        checkout.focus();
        return;
    }

    const formatear = (iso) => {
        const [a, m, d] = iso.split('-');
        return `${d}/${m}/${a}`;
    };

    const mensaje =
        `Hola! Soy ${nombre}. Quiero reservar en Campo Base:\n` +
        `• Alojamiento: ${unidad}\n` +
        `• Personas: ${personas}\n` +
        `• Check-in: ${formatear(checkin.value)}\n` +
        `• Check-out: ${formatear(checkout.value)}\n` +
        `¿Hay disponibilidad?`;

    window.open(`https://wa.me/5492944373742?text=${encodeURIComponent(mensaje)}`, '_blank', 'noopener');
});
