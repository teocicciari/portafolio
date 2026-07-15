// Hostería El Hoyo — interacciones del boceto

document.addEventListener('DOMContentLoaded', function () {

  /* ===== Fecha dinámica del footer ===== */
  var hoy = new Date();
  document.getElementById('anio').textContent = hoy.getFullYear();
  document.getElementById('fecha-actual').textContent = hoy.toLocaleDateString('es-AR', {
    day: 'numeric', month: 'long', year: 'numeric'
  });

  /* ===== Menú móvil ===== */
  var burger = document.getElementById('burger');
  var menu = document.getElementById('menu');

  burger.addEventListener('click', function () {
    var abierto = menu.classList.toggle('abierto');
    burger.setAttribute('aria-expanded', abierto ? 'true' : 'false');
    burger.setAttribute('aria-label', abierto ? 'Cerrar menú' : 'Abrir menú');
  });

  menu.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') {
      menu.classList.remove('abierto');
      burger.setAttribute('aria-expanded', 'false');
    }
  });

  /* ===== Formulario de reserva ===== */
  var form = document.getElementById('form-reserva');
  var errorBox = document.getElementById('form-error');
  var okBox = document.getElementById('form-ok');
  var inCheckin = document.getElementById('checkin');
  var inCheckout = document.getElementById('checkout');

  // No permitir fechas pasadas
  var hoyISO = hoy.toISOString().split('T')[0];
  inCheckin.min = hoyISO;
  inCheckout.min = hoyISO;

  inCheckin.addEventListener('change', function () {
    if (inCheckin.value) {
      var d = new Date(inCheckin.value + 'T00:00:00');
      d.setDate(d.getDate() + 1);
      inCheckout.min = d.toISOString().split('T')[0];
      if (inCheckout.value && inCheckout.value <= inCheckin.value) {
        inCheckout.value = '';
      }
    }
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    errorBox.hidden = true;
    okBox.hidden = true;

    var nombre = document.getElementById('nombre').value.trim();
    var personas = document.getElementById('personas').value;
    var checkin = inCheckin.value;
    var checkout = inCheckout.value;

    var faltantes = [];
    if (!nombre) faltantes.push('tu nombre');
    if (!personas) faltantes.push('la cantidad de personas');
    if (!checkin) faltantes.push('la fecha de check in');
    if (!checkout) faltantes.push('la fecha de check out');

    if (faltantes.length) {
      errorBox.textContent = 'Para enviar la consulta completá ' + faltantes.join(', ') + '.';
      errorBox.hidden = false;
      return;
    }

    if (checkout <= checkin) {
      errorBox.textContent = 'La fecha de check out tiene que ser posterior a la de check in.';
      errorBox.hidden = false;
      return;
    }

    var opciones = { day: 'numeric', month: 'long' };
    var desde = new Date(checkin + 'T00:00:00').toLocaleDateString('es-AR', opciones);
    var hasta = new Date(checkout + 'T00:00:00').toLocaleDateString('es-AR', opciones);
    var etiquetaPersonas = personas === '1' ? '1 persona' : personas + (personas === '6' ? ' o más personas' : ' personas');

    okBox.textContent = '¡Gracias, ' + nombre + '! Registramos tu consulta para ' +
      etiquetaPersonas + ', del ' + desde + ' al ' + hasta +
      '. La hostería se va a contactar con vos para confirmar disponibilidad.';
    okBox.hidden = false;
    form.reset();
    inCheckin.min = hoyISO;
    inCheckout.min = hoyISO;
  });

  /* ===== Aparición suave de secciones ===== */
  var reducirMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var bloques = document.querySelectorAll('.seccion .contenedor, .distancias__inner, .autor__inner');

  if (!reducirMovimiento && 'IntersectionObserver' in window) {
    var observador = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (entrada) {
        if (entrada.isIntersecting) {
          entrada.target.classList.add('visible');
          observador.unobserve(entrada.target);
        }
      });
    }, { threshold: 0.12 });

    bloques.forEach(function (bloque) {
      bloque.classList.add('aparece');
      observador.observe(bloque);
    });
  }
});
