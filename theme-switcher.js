document.addEventListener('DOMContentLoaded', function() {
    const themeButtons = document.querySelectorAll('.theme-btn');

    // Vista inicial: #chess abre ajedrez, cualquier otro hash cae en diseño
    // (sin pisar el hash, para que el navegador scrollee a anclas como #projects)
    const initialView = window.location.hash === '#chess' ? 'chess' : 'design';
    activateView(initialView);

    // Botones del switcher (design / chess)
    themeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const view = this.dataset.theme === 'forest' ? 'chess' : 'design';
            const currentView = document.querySelector('.view.active')?.id;
            if (currentView === 'view-' + view) return;
            window.scrollTo({ top: 0 });
            history.replaceState(null, '', '#' + view);
            activateView(view);
        });
    });

    // Clic en logo/foto vuelve al inicio del portfolio de diseño
    const goHome = document.getElementById('go-home');
    if (goHome) {
        goHome.addEventListener('click', function() {
            window.scrollTo({ top: 0 });
            history.replaceState(null, '', '#design');
            activateView('design');
        });
        goHome.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') this.click();
        });
    }

    function activateView(view) {
        const isChess = view === 'chess';
        const theme = isChess ? 'forest' : 'default';

        // Aplicar tema al body
        document.body.classList.remove('theme-default', 'theme-forest');
        if (theme !== 'default') {
            document.body.classList.add('theme-' + theme);
        }

        // Alternar vistas
        document.querySelectorAll('.view').forEach(v => {
            v.classList.toggle('active', v.id === 'view-' + view);
        });

        // Alternar nav-links
        document.querySelectorAll('.nav-links[data-view]').forEach(nl => {
            nl.classList.toggle('active', nl.dataset.view === view);
        });

        // Alternar footer links
        document.querySelectorAll('.footer-links[data-view]').forEach(fl => {
            fl.classList.toggle('active', fl.dataset.view === view);
        });

        // Botón de contacto: WhatsApp en ajedrez, ancla en diseño
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

        // Actualizar título de la página
        if (window.i18n) {
            window.i18n.apply();
        } else {
            document.title = isChess
                ? 'Clases de Ajedrez | Teo Cicciari'
                : 'Teo Cicciari | Diseñador Web';
        }
    }
});
