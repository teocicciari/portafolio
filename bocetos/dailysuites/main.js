// Daily Suites Hotel Boutique — interacciones de la landing

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
document.querySelectorAll('.revelar').forEach((el) => {
    const observador = new IntersectionObserver((entradas) => {
        entradas.forEach((entrada) => {
            if (entrada.isIntersecting) {
                entrada.target.classList.add('visible');
                observador.unobserve(entrada.target);
            }
        });
    }, { threshold: 0.12 });
    observador.observe(el);
});

// Formulario de reserva
// Nota: Daily Suites no dejó WhatsApp ni email de contacto en la info recibida
// (solo menciona consultas por Instagram, sin usuario). Por eso este formulario
// no envía la solicitud a ningún lado todavía: valida los datos y muestra una
// confirmación local a modo de mockup. Cuando haya un canal real (WhatsApp o
// email), hay que reemplazar este bloque para que la solicitud salga de verdad.
const form = document.getElementById('formReserva');
const formError = document.getElementById('formError');
const checkin = document.getElementById('checkin');
const checkout = document.getElementById('checkout');

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

    if (!nombre || !personas || !checkin.value || !checkout.value) {
        formError.textContent = 'Completá todos los campos para enviar la solicitud.';
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

    form.innerHTML = `
        <div class="confirmacion">
            <i class="fa-solid fa-plane-circle-check" aria-hidden="true"></i>
            <h3>¡Solicitud registrada!</h3>
            <p>Gracias, ${nombre}. En breve te contactamos para confirmar disponibilidad.</p>
            <div class="ticket-datos">
                <span>PASAJEROS · ${personas}</span>
                <span>CHECK-IN · ${formatear(checkin.value)}</span>
                <span>CHECK-OUT · ${formatear(checkout.value)}</span>
            </div>
        </div>
    `;
});
