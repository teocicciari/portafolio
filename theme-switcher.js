// Crear un archivo theme-switcher.js y añadir este código

document.addEventListener('DOMContentLoaded', function() {
    // Obtener todos los botones de tema
    const themeButtons = document.querySelectorAll('.theme-btn');

    // Detectar la página actual y asignar el tema correspondiente
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    let pageTheme;

    // Asignar tema según la página
    if (currentPage.includes('feriantes.html')) {
        pageTheme = 'ocean';
    } else if (currentPage.includes('ajedrez.html')) {
        pageTheme = 'forest';
    } else {
        pageTheme = 'default';
    }

    // Aplicar el tema de la página automáticamente
    document.body.classList.remove('theme-default', 'theme-ocean', 'theme-sunset', 'theme-forest');
    if (pageTheme !== 'default') {
        document.body.classList.add('theme-' + pageTheme);
    }

    // Actualizar el botón activo según el tema de la página
    themeButtons.forEach(button => {
        if (button.dataset.theme === pageTheme) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });

    // Añadir evento de clic a cada botón (ahora navega a la página correspondiente)
    themeButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // El botón ya tiene un href, por lo que navegará automáticamente
            // No es necesario prevenir el comportamiento por defecto
        });
    });
});