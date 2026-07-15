// Lugar de Descanso — El Bolsón

// Año dinámico en el footer
document.getElementById('anio').textContent = new Date().getFullYear();

// Menú mobile
const navToggle = document.getElementById('navToggle');
const menu = document.getElementById('menu');

navToggle.addEventListener('click', () => {
    const abierto = menu.classList.toggle('abierto');
    navToggle.setAttribute('aria-expanded', String(abierto));
    navToggle.setAttribute('aria-label', abierto ? 'Cerrar menú' : 'Abrir menú');
});

// Cerrar el menú al elegir una sección
menu.querySelectorAll('a').forEach((enlace) => {
    enlace.addEventListener('click', () => {
        menu.classList.remove('abierto');
        navToggle.setAttribute('aria-expanded', 'false');
    });
});

// Formulario de reserva
const form = document.getElementById('formReserva');
const formError = document.getElementById('formError');
const formOk = document.getElementById('formOk');
const checkin = document.getElementById('checkin');
const checkout = document.getElementById('checkout');

// No permitir fechas pasadas
const hoy = new Date().toISOString().split('T')[0];
checkin.min = hoy;
checkout.min = hoy;

checkin.addEventListener('change', () => {
    if (checkin.value) checkout.min = checkin.value;
});

form.addEventListener('submit', (evento) => {
    evento.preventDefault();
    formError.hidden = true;
    formOk.hidden = true;

    const nombre = form.nombre.value.trim();
    const personas = Number(form.personas.value);

    if (!nombre) {
        mostrarError('Contanos tu nombre para poder responderte.');
        return;
    }
    if (!personas || personas < 1) {
        mostrarError('Indicá cuántas personas viajan.');
        return;
    }
    if (!checkin.value || !checkout.value) {
        mostrarError('Completá las fechas de check-in y check-out.');
        return;
    }
    if (checkout.value <= checkin.value) {
        mostrarError('La fecha de check-out tiene que ser posterior a la de check-in.');
        return;
    }

    // Confirmación local (canal de salida pendiente de definir con el cliente)
    formOk.hidden = false;
    form.reset();
    checkout.min = hoy;
});

function mostrarError(mensaje) {
    formError.textContent = mensaje;
    formError.hidden = false;
}
