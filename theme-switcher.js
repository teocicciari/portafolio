// Crear un archivo theme-switcher.js y añadir este código

document.addEventListener('DOMContentLoaded', function() {
    // Obtener todos los botones de tema
    const themeButtons = document.querySelectorAll('.theme-btn');
    
    // Comprobar si hay un tema guardado en localStorage
    const savedTheme = localStorage.getItem('selectedTheme');
    if (savedTheme) {
        document.body.className = savedTheme;
        
        // Actualizar el botón activo
        themeButtons.forEach(button => {
            if (button.dataset.theme === savedTheme.replace('theme-', '')) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
    }
    
    // Añadir evento de clic a cada botón
    themeButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Eliminar la clase 'active' de todos los botones
            themeButtons.forEach(btn => btn.classList.remove('active'));
            
            // Añadir la clase 'active' al botón clicado
            this.classList.add('active');
            
            // Obtener el tema seleccionado
            const selectedTheme = this.dataset.theme;
            
            // Eliminar todas las clases de tema del body
            document.body.classList.remove('theme-default', 'theme-ocean', 'theme-sunset', 'theme-forest');
            
            // Si no es el tema por defecto, añadir la clase correspondiente
            if (selectedTheme !== 'default') {
                document.body.classList.add('theme-' + selectedTheme);
                localStorage.setItem('selectedTheme', 'theme-' + selectedTheme);
            } else {
                // Si es el tema por defecto, solo guardar en localStorage
                localStorage.setItem('selectedTheme', '');
            }
        });
    });
});