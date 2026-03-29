document.addEventListener('DOMContentLoaded', function() {
    const themeButtons = document.querySelectorAll('.theme-btn');

    // Determinar vista inicial desde el hash de la URL
    const initialView = window.location.hash === '#chess' ? 'chess' : 'design';
    activateView(initialView);

    themeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const view = this.dataset.theme === 'forest' ? 'chess' : 'design';
            const currentView = document.querySelector('.view.active')?.id;
            if (currentView === 'view-' + view) return;
            window.scrollTo({ top: 0 });
            history.replaceState(null, '', view === 'chess' ? '#chess' : location.pathname);
            activateView(view);
        });
    });

    function activateView(view) {
        const isChess = view === 'chess';
        const theme = isChess ? 'forest' : 'default';

        // Aplicar tema al body
        document.body.classList.remove('theme-default', 'theme-ocean', 'theme-forest');
        if (theme !== 'default') {
            document.body.classList.add('theme-' + theme);
        }

        // Alternar vistas
        document.querySelectorAll('.view').forEach(v => {
            v.classList.toggle('active', v.id === (isChess ? 'view-chess' : 'view-design'));
        });

        // Alternar nav-links
        document.querySelectorAll('.nav-links[data-view]').forEach(nl => {
            nl.classList.toggle('active', nl.dataset.view === view);
        });

        // Alternar footer links
        document.querySelectorAll('.footer-links[data-view]').forEach(fl => {
            fl.classList.toggle('active', fl.dataset.view === view);
        });

        // Actualizar href del botón de contacto
        const contactBtn = document.getElementById('main-contact-btn');
        if (contactBtn) {
            contactBtn.href = isChess
                ? 'https://wa.me/5492944812580?text=Hola%20Teo!%20Me%20gustar%C3%ADa%20consultar%20por%20clases%20de%20ajedrez.'
                : '#contact';
        }

        // Actualizar botón activo del theme switcher
        themeButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.theme === theme);
        });

        // Actualizar título de la página (delegado a i18n si está disponible)
        if (window.i18n) {
            window.i18n.apply();
        } else {
            document.title = isChess
                ? 'Clases de Ajedrez | Teo Cicciari'
                : 'Teo Cicciari | Diseñador Web';
        }
    }
});
