document.addEventListener('DOMContentLoaded', function() {
    const themeButtons = document.querySelectorAll('.theme-btn');

    // Determinar vista inicial desde el hash de la URL
    const hash = window.location.hash;
    const initialView = hash === '#chess' ? 'chess' : hash === '#design' ? 'design' : 'home';
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

    // Paneles de la vista home
    document.querySelectorAll('[data-goto]').forEach(panel => {
        panel.addEventListener('click', function() {
            const view = this.dataset.goto;
            window.scrollTo({ top: 0 });
            history.replaceState(null, '', '#' + view);
            activateView(view);
        });
        panel.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') this.click();
        });
    });

    // Clic en logo/foto vuelve al home
    const goHome = document.getElementById('go-home');
    if (goHome) {
        goHome.addEventListener('click', function() {
            const currentView = document.querySelector('.view.active')?.id;
            if (currentView === 'view-home') return;
            window.scrollTo({ top: 0 });
            history.replaceState(null, '', location.pathname);
            activateView('home');
        });
        goHome.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') this.click();
        });
    }

    function activateView(view) {
        const isChess = view === 'chess';
        const isHome = view === 'home';
        const theme = isChess ? 'forest' : 'default';

        // Aplicar tema al body
        document.body.classList.remove('theme-default', 'theme-ocean', 'theme-forest');
        if (!isHome && theme !== 'default') {
            document.body.classList.add('theme-' + theme);
        }

        // Alternar vistas
        document.querySelectorAll('.view').forEach(v => {
            v.classList.toggle('active', v.id === 'view-' + view);
        });

        // Alternar nav-links (ocultar en home)
        document.querySelectorAll('.nav-links[data-view]').forEach(nl => {
            nl.classList.toggle('active', !isHome && nl.dataset.view === view);
        });

        // Alternar footer links
        document.querySelectorAll('.footer-links[data-view]').forEach(fl => {
            fl.classList.toggle('active', !isHome && fl.dataset.view === view);
        });

        // Botón de contacto: ocultar en home
        const contactBtn = document.getElementById('main-contact-btn');
        if (contactBtn) {
            contactBtn.style.display = isHome ? 'none' : '';
            contactBtn.href = isChess
                ? 'https://wa.me/5492944812580?text=Hola%20Teo!%20Me%20gustar%C3%ADa%20consultar%20por%20clases%20de%20ajedrez.'
                : '#contact';
        }

        // Header y footer: ocultar en home
        const header = document.querySelector('header');
        const footer = document.querySelector('footer');
        if (header) header.style.display = isHome ? 'none' : '';
        if (footer) footer.style.display = isHome ? 'none' : '';

        // Switcher: ocultar en home, mostrar en design/chess
        const switcher = document.querySelector('.theme-switcher');
        if (switcher) switcher.style.display = isHome ? 'none' : '';

        // Actualizar botón activo del theme switcher
        themeButtons.forEach(btn => {
            btn.classList.toggle('active', !isHome && btn.dataset.theme === theme);
        });

        // Actualizar título de la página
        if (window.i18n) {
            window.i18n.apply();
        } else {
            document.title = isChess
                ? 'Clases de Ajedrez | Teo Cicciari'
                : isHome
                ? 'Teo Cicciari | Diseñador Web & Profesor de Ajedrez'
                : 'Teo Cicciari | Diseñador Web';
        }
    }
});
