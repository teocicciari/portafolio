// ========================================
// PARAÍSO PATAGÓNICO v2.0 - JAVASCRIPT
// ========================================

'use strict';

// ===== CONFIGURACIÓN GLOBAL =====
const CONFIG = {
    heroSlideInterval: 5000,
    testimonialInterval: 6000,
    scrollOffset: 90,
    scrollThreshold: 300,
    numeroWhatsApp: '5492966707154'
};

// ===== UTILIDADES =====
const Utils = {
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
};

// ===== MENÚ DE NAVEGACIÓN =====
class NavigationMenu {
    constructor() {
        this.menuToggle = document.querySelector('.menu-toggle');
        this.navMenu = document.querySelector('.nav-menu');
        this.header = document.querySelector('.header');
        this.init();
    }

    init() {
        if (!this.menuToggle || !this.navMenu) return;

        this.menuToggle.addEventListener('click', () => this.toggleMenu());

        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => this.closeMenu());
        });

        window.addEventListener('scroll', Utils.throttle(() => this.handleScroll(), 100));
    }

    toggleMenu() {
        this.navMenu.classList.toggle('active');
    }

    closeMenu() {
        this.navMenu.classList.remove('active');
    }

    handleScroll() {
        if (window.scrollY > 50) {
            this.header.classList.add('scrolled');
        } else {
            this.header.classList.remove('scrolled');
        }
    }
}

// ===== HERO SLIDER =====
class HeroSlider {
    constructor() {
        this.slides = document.querySelectorAll('.hero-slide');
        this.indicators = document.querySelectorAll('.indicator');
        this.currentSlide = 0;
        this.autoPlayInterval = null;
        this.init();
    }

    init() {
        if (this.slides.length === 0) return;

        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToSlide(index));
        });

        this.startAutoPlay();
    }

    goToSlide(index) {
        this.slides[this.currentSlide].classList.remove('active');
        this.indicators[this.currentSlide]?.classList.remove('active');

        this.currentSlide = index;

        this.slides[this.currentSlide].classList.add('active');
        this.indicators[this.currentSlide]?.classList.add('active');
    }

    next() {
        const nextSlide = (this.currentSlide + 1) % this.slides.length;
        this.goToSlide(nextSlide);
    }

    prev() {
        const prevSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.goToSlide(prevSlide);
    }

    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => this.next(), CONFIG.heroSlideInterval);
    }

    stopAutoPlay() {
        clearInterval(this.autoPlayInterval);
    }
}

// ===== LIGHTBOX PARA GALERÍAS =====
class Lightbox {
    constructor() {
        this.lightbox = document.getElementById('lightbox');
        this.lightboxImage = document.getElementById('lightboxImage');
        this.lightboxClose = document.querySelector('.lightbox-close');
        this.lightboxPrev = document.querySelector('.lightbox-prev');
        this.lightboxNext = document.querySelector('.lightbox-next');
        this.currentIndex = 0;
        this.images = [];
        this.init();
    }

    init() {
        if (!this.lightbox) return;

        document.querySelectorAll('.view-gallery-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const gallery = e.target.closest('button').dataset.gallery;
                this.openGallery(gallery);
            });
        });

        this.lightboxClose?.addEventListener('click', () => this.close());
        this.lightboxPrev?.addEventListener('click', () => this.prev());
        this.lightboxNext?.addEventListener('click', () => this.next());

        this.lightbox.addEventListener('click', (e) => {
            if (e.target === this.lightbox) this.close();
        });

        document.addEventListener('keydown', (e) => {
            if (!this.lightbox.classList.contains('active')) return;

            if (e.key === 'Escape') this.close();
            if (e.key === 'ArrowLeft') this.prev();
            if (e.key === 'ArrowRight') this.next();
        });
    }

    openGallery(galleryName) {
        this.images = this.getGalleryImages(galleryName);
        this.currentIndex = 0;
        this.show(0);
        this.lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    getGalleryImages(galleryName) {
        const imageMap = {
            'aparts': Array.from({length: 6}, (_, i) => `img/aparts/${i + 1}.webp`),
            'casafue': Array.from({length: 6}, (_, i) => `img/casafue/${i + 1}.webp`),
            'lago': Array.from({length: 5}, (_, i) => `img/lago/${i + 1}.webp`)
        };
        return imageMap[galleryName] || [];
    }

    show(index) {
        this.currentIndex = index;
        this.lightboxImage.src = this.images[index];
        document.getElementById('lightboxCurrent').textContent = index + 1;
        document.getElementById('lightboxTotal').textContent = this.images.length;
    }

    close() {
        this.lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    next() {
        const nextIndex = (this.currentIndex + 1) % this.images.length;
        this.show(nextIndex);
    }

    prev() {
        const prevIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
        this.show(prevIndex);
    }
}

// ===== CAROUSEL DE TESTIMONIOS =====
class TestimonialCarousel {
    constructor() {
        this.testimonials = document.querySelectorAll('.testimonio-card');
        this.prevBtn = document.querySelector('.testimonio-prev');
        this.nextBtn = document.querySelector('.testimonio-next');
        this.currentIndex = 0;
        this.autoPlayInterval = null;
        this.init();
    }

    init() {
        if (this.testimonials.length === 0) return;

        this.prevBtn?.addEventListener('click', () => this.prev());
        this.nextBtn?.addEventListener('click', () => this.next());

        this.startAutoPlay();
    }

    show(index) {
        this.testimonials[this.currentIndex].classList.remove('active');
        this.currentIndex = index;
        this.testimonials[this.currentIndex].classList.add('active');
    }

    next() {
        const nextIndex = (this.currentIndex + 1) % this.testimonials.length;
        this.show(nextIndex);
    }

    prev() {
        const prevIndex = (this.currentIndex - 1 + this.testimonials.length) % this.testimonials.length;
        this.show(prevIndex);
    }

    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => this.next(), CONFIG.testimonialInterval);
    }

    stopAutoPlay() {
        clearInterval(this.autoPlayInterval);
    }
}

// ===== DATEPICKER PERSONALIZADO =====
class CustomDatepicker {
    constructor() {
        this.modal = document.getElementById('datepickerModal');
        this.monthYearDisplay = document.getElementById('monthYear');
        this.calendarDays = document.getElementById('calendarDays');
        this.currentDate = new Date();
        this.selectedDate = null;
        this.minDate = new Date();
        this.maxDate = null;
        this.activeInput = null;

        this.meses = [
            'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
            'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
        ];

        this.init();
    }

    init() {
        if (!this.modal) return;

        document.getElementById('prevMonth')?.addEventListener('click', () => this.changeMonth(-1));
        document.getElementById('nextMonth')?.addEventListener('click', () => this.changeMonth(1));
        document.getElementById('closeDatepicker')?.addEventListener('click', () => this.close());

        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) this.close();
        });

        const checkinInput = document.getElementById('checkin');
        const checkoutInput = document.getElementById('checkout');

        checkinInput?.addEventListener('click', () => {
            this.activeInput = 'checkin';
            this.minDate = new Date();
            this.minDate.setHours(0, 0, 0, 0);
            this.maxDate = null;
            document.getElementById('datepickerTitle').textContent = 'Check In';
            this.open();
        });

        checkoutInput?.addEventListener('click', () => {
            const checkinValue = checkinInput?.dataset.date;
            if (!checkinValue) {
                alert('Por favor, selecciona primero la fecha de Check In');
                return;
            }
            this.activeInput = 'checkout';
            this.minDate = new Date(checkinValue);
            this.minDate.setDate(this.minDate.getDate() + 1);
            this.maxDate = null;
            document.getElementById('datepickerTitle').textContent = 'Check Out';
            this.open();
        });
    }

    open() {
        this.currentDate = new Date(this.minDate);
        this.modal.classList.add('active');
        this.renderCalendar();
        document.body.style.overflow = 'hidden';
    }

    close() {
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    changeMonth(direction) {
        this.currentDate.setMonth(this.currentDate.getMonth() + direction);
        this.renderCalendar();
    }

    renderCalendar() {
        const year = this.currentDate.getFullYear();
        const month = this.currentDate.getMonth();

        this.monthYearDisplay.textContent = `${this.meses[month]} ${year}`;
        this.calendarDays.innerHTML = '';

        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const prevMonthDays = firstDay.getDay();
        const prevMonthLastDay = new Date(year, month, 0).getDate();

        // Días del mes anterior
        for (let i = prevMonthDays - 1; i >= 0; i--) {
            const day = prevMonthLastDay - i;
            this.createDayElement(day, true, false);
        }

        // Días del mes actual
        for (let day = 1; day <= lastDay.getDate(); day++) {
            this.createDayElement(day, false, true);
        }

        // Días del siguiente mes
        const remainingDays = 42 - (prevMonthDays + lastDay.getDate());
        for (let day = 1; day <= remainingDays; day++) {
            this.createDayElement(day, true, false);
        }
    }

    createDayElement(day, isOtherMonth, isCurrentMonth) {
        const dayElement = document.createElement('div');
        dayElement.classList.add('calendar-day');
        dayElement.textContent = day;

        if (isOtherMonth) {
            dayElement.classList.add('other-month');
            this.calendarDays.appendChild(dayElement);
            return;
        }

        const date = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), day);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        date.setHours(0, 0, 0, 0);

        if (date.getTime() === today.getTime()) {
            dayElement.classList.add('today');
        }

        if (date < this.minDate || (this.maxDate && date > this.maxDate)) {
            dayElement.classList.add('disabled');
        } else {
            dayElement.addEventListener('click', () => this.selectDate(date));
        }

        this.calendarDays.appendChild(dayElement);
    }

    selectDate(date) {
        const formatDate = (d) => {
            const day = String(d.getDate()).padStart(2, '0');
            const month = String(d.getMonth() + 1).padStart(2, '0');
            const year = d.getFullYear();
            return `${day}/${month}/${year}`;
        };

        const input = document.getElementById(this.activeInput);
        input.value = formatDate(date);
        input.dataset.date = date.toISOString();

        this.close();
    }
}

// ===== FORMULARIO DE RESERVAS =====
class ReservationForm {
    constructor() {
        this.form = document.getElementById('reservaForm');
        this.init();
    }

    init() {
        if (!this.form) return;

        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });
    }

    handleSubmit() {
        const nombre = document.getElementById('nombre').value.trim();
        const checkin = document.getElementById('checkin').value;
        const checkout = document.getElementById('checkout').value;
        const personas = document.getElementById('personas').value;

        if (!checkin || !checkout) {
            alert('Por favor, selecciona las fechas de Check In y Check Out.');
            return;
        }

        const mensaje = `Hola! Quisiera hacer una reserva con los siguientes datos:

Nombre completo: ${nombre}
Check In: ${checkin}
Check Out: ${checkout}
Cantidad de personas: ${personas}

Espero su confirmación. Gracias!`;

        const urlWhatsApp = `https://wa.me/${CONFIG.numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
        window.open(urlWhatsApp, '_blank');

        this.form.reset();
        document.getElementById('checkin').dataset.date = '';
        document.getElementById('checkout').dataset.date = '';
    }
}

// ===== SCROLL TO TOP =====
class ScrollToTop {
    constructor() {
        this.button = document.getElementById('scrollToTop');
        this.init();
    }

    init() {
        if (!this.button) return;

        window.addEventListener('scroll', Utils.throttle(() => this.handleScroll(), 200));
        this.button.addEventListener('click', () => this.scrollToTop());
    }

    handleScroll() {
        if (window.scrollY > CONFIG.scrollThreshold) {
            this.button.classList.add('visible');
        } else {
            this.button.classList.remove('visible');
        }
    }

    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}

// ===== SMOOTH SCROLL =====
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = anchor.getAttribute('href');
                if (targetId === '#') return;

                const target = document.querySelector(targetId);
                if (target) {
                    const offsetTop = target.offsetTop - CONFIG.scrollOffset;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// ===== ANIMACIONES DE SCROLL =====
class ScrollAnimations {
    constructor() {
        this.options = {
            threshold: 0.05,
            rootMargin: '0px 0px 100px 0px'
        };
        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, this.options);

        document.querySelectorAll('section').forEach(section => {
            section.classList.add('fade-in-section');
            observer.observe(section);
        });
    }
}

// ===== LAZY LOADING DE IMÁGENES =====
class LazyLoading {
    constructor() {
        this.init();
    }

    init() {
        if ('loading' in HTMLImageElement.prototype) {
            // El navegador soporta lazy loading nativo
            const images = document.querySelectorAll('img[loading="lazy"]');
            images.forEach(img => {
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                }
            });
        } else {
            // Fallback para navegadores antiguos
            this.loadImages();
        }
    }

    loadImages() {
        const images = document.querySelectorAll('img[loading="lazy"]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                    }
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }
}

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar todos los componentes
    new NavigationMenu();
    new HeroSlider();
    new Lightbox();
    new TestimonialCarousel();
    new CustomDatepicker();
    new ReservationForm();
    new ScrollToTop();
    new SmoothScroll();
    new ScrollAnimations();
    new LazyLoading();

    console.log('Paraíso Patagónico v2.0 - Cargado exitosamente');
});

// Prevenir comportamientos inesperados
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});
