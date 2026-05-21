
function castGuests(guests){
    if (guests > 1){
        return (guests + ' personas');
    } else {
        return ('una persona');
    }
}

function sendWhatsApp() {
    // Get form values
    var name = document.getElementById('name').value;
    var checkin = document.getElementById('checkin').value;
    var checkout = document.getElementById('checkout').value;
    var guests = document.getElementById('guests').value;
    var guestsQ = castGuests(guests);

    // Format WhatsApp message
    var message = `Hola! Me gustaría consultar disponibilidad en Hostel Samsara. Mi nombre es ${name} y estoy buscando para ${guestsQ} desde ${checkin} hasta ${checkout}. Gracias!`;

    // Encode message for WhatsApp URL
    var encodedMessage = encodeURIComponent(message);

    // WhatsApp API URL (replace with the hostel's WhatsApp number)
    var whatsappURL = `https://wa.me/5492944820534?text=${encodedMessage}`;

    // Open WhatsApp with the pre-filled message
    window.open(whatsappURL, '_blank');
}

document.addEventListener("DOMContentLoaded", function() {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

    window.addEventListener("scroll", function() {
        let current = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - sectionHeight / 3) {
                current = section.getAttribute("id");
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href").includes(current)) {
                link.classList.add("active");
            }
        });
    });
});

function updateGuestValue() {
    document.getElementById("guests-value").innerText = document.getElementById("guests").value;
}

// JavaScript for carousel functionality
function moveSlide(carouselId, direction) {
    const carousel = document.getElementById(carouselId);
    const items = carousel.querySelectorAll('.carousel-item');
    let activeIndex = 0;
    
    // Find the current active slide
    items.forEach((item, index) => {
        if (item.classList.contains('active')) {
        activeIndex = index;
        item.classList.remove('active');
        }
    });
    
    // Calculate new index
    let newIndex = activeIndex + direction;
    if (newIndex < 0) newIndex = items.length - 1;
    if (newIndex >= items.length) newIndex = 0;
    
    // Activate new slide
    items[newIndex].classList.add('active');
}

    
// Slider functionality
let currentSlides = {
    'testimonials-style1': 0,
    'testimonials-style2': 0,
    'testimonials-style3': 0
};

function showSlide(n, sectionId) {
    const section = document.getElementById(sectionId);
    const slides = section.querySelectorAll('.testimonial-slide');
    const dots = section.querySelectorAll('.dot');
    
    // Reset all slides and dots
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Set current slide index
    currentSlides[sectionId] = n;
    
    // Show current slide and activate dot
    slides[n].classList.add('active');
    dots[n].classList.add('active');
}

function changeSlide(direction, sectionId) {
    const section = document.getElementById(sectionId);
    const slidesLength = section.querySelectorAll('.testimonial-slide').length;
    
    let newIndex = currentSlides[sectionId] + direction;
    
    // Loop back to start/end if needed
    if (newIndex >= slidesLength) newIndex = 0;
    if (newIndex < 0) newIndex = slidesLength - 1;
    
    showSlide(newIndex, sectionId);
}

// Auto slide functionality (optional)
const autoSlideInterval = 10000; // 6 seconds

// Uncomment to enable auto-sliding

setInterval(() => {
    changeSlide(1, 'testimonials-style1');
    changeSlide(1, 'testimonials-style2');
    changeSlide(1, 'testimonials-style3');
}, autoSlideInterval);


// Accordion functionality

var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");

    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null; // Collapse the panel
      panel.style.padding = "0 18px"; // Reset padding
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px"; // Expand the panel
      panel.style.padding = "18px"; // Add padding
    }
  });
}

// Solo para el estilo de Toggle Switch
document.addEventListener('DOMContentLoaded', function() {
    const toggle = document.getElementById('language-toggle');
    if (toggle) {
        toggle.addEventListener('change', function() {
            const lang = this.checked ? 'en' : 'es';
            changeLanguage(lang);
            
            // Actualizar labels
            const labels = document.querySelectorAll('.language-selector-toggle .lang-label');
            labels.forEach(label => {
                label.classList.remove('active');
            });
            
            if (this.checked) {
                labels[1].classList.add('active'); // EN
            } else {
                labels[0].classList.add('active'); // ES
            }
        });
        
        // Inicializar estado del toggle según el idioma guardado
        const savedLanguage = localStorage.getItem('selectedLanguage') || 'es';
        if (savedLanguage === 'en') {
            toggle.checked = true;
            document.querySelectorAll('.language-selector-toggle .lang-label')[1].classList.add('active');
            document.querySelectorAll('.language-selector-toggle .lang-label')[0].classList.remove('active');
        }
    }
});
document.addEventListener("DOMContentLoaded", function() {
    // Toggle navbar functionality
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navbar = document.querySelector('.navbar');
    
    // Función para controlar la apariencia de la navbar al hacer scroll
    function checkScroll() {
        if (window.scrollY > 10) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    // Escuchar el evento de scroll
    window.addEventListener('scroll', checkScroll);
    
    // Verificar la posición inicial
    checkScroll();
    
    // Add click event to navbar toggler
    navbarToggler.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Toggle the 'collapsed' class on the button
        this.classList.toggle('collapsed');
        
        // Toggle the 'show' class on the navbar-collapse element
        navbarCollapse.classList.toggle('show');
        
        // Update aria-expanded attribute
        const expanded = this.getAttribute('aria-expanded') === 'true' || false;
        this.setAttribute('aria-expanded', !expanded);
    });
    
    // Close the menu when clicking outside or on a menu item
    document.addEventListener('click', function(event) {
        const isNavbarOpen = navbarCollapse.classList.contains('show');
        const clickedOnToggler = navbarToggler.contains(event.target);
        const clickedInMenu = navbarCollapse.contains(event.target);
        
        // If menu is open and click is outside the menu and not on the toggler, close it
        if (isNavbarOpen && !clickedInMenu && !clickedOnToggler) {
            navbarToggler.classList.add('collapsed');
            navbarCollapse.classList.remove('show');
            navbarToggler.setAttribute('aria-expanded', 'false');
        }
    });
    
    // Actualizar la clase activa al hacer scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    function activateMenuByScroll() {
        let scrollPosition = window.scrollY;
        
        // Agregar un pequeño offset para mejorar la detección
        const offset = 100;
        
        // Encontrar la sección actual
        sections.forEach(section => {
            const sectionTop = section.offsetTop - offset;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remover la clase activa de todos los enlaces
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });
                
                // Agregar la clase activa al enlace correspondiente
                const activeLink = document.querySelector(`.navbar-nav .nav-link[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }
    
    // Escuchar evento de scroll para actualizar el menú
    window.addEventListener('scroll', activateMenuByScroll);
    
    // Close menu when clicking on a nav-link (for mobile)
    navLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            // Solo en vista móvil
            if (window.innerWidth < 992 && navbarCollapse.classList.contains('show')) {
                // Pequeña demora antes de cerrar el menú para mejor experiencia
                setTimeout(function() {
                    navbarToggler.classList.add('collapsed');
                    navbarCollapse.classList.remove('show');
                    navbarToggler.setAttribute('aria-expanded', 'false');
                }, 300); // 300ms de demora para que el usuario vea el efecto
            }
            
            // Si el enlace contiene un hash (ancla), agregar desplazamiento suave
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Calcular la posición de desplazamiento considerando la altura de la navbar
                    const navbarHeight = navbar.offsetHeight;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navbarHeight;
                    
                    // Desplazamiento suave
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Agregar el botón de cerrar al formulario
    const bookingForm = document.querySelector('.booking-form');
    if (bookingForm) {
        const closeButton = document.createElement('div');
        closeButton.className = 'close-form-button';
        closeButton.innerHTML = '<i class="fas fa-times"></i>';
        bookingForm.appendChild(closeButton);
    }
    
    const bookingContainer = document.querySelector('.booking-container');
    const showFormButton = document.getElementById('show-form-button');
    const closeFormButton = document.querySelector('.close-form-button');
    
    let lastScrollTop = 0;
    let scrollingDown = false;
    let formVisible = true;
    
    // Función para verificar si estamos en móvil
    function isMobile() {
        return window.innerWidth <= 1100;
    }
    
    // Función para actualizar la visibilidad basada en el scroll (solo para desktop)
    function updateVisibility() {
        // Solo aplicamos este comportamiento en desktop
        if (isMobile()) return;
        
        const st = window.pageYOffset || document.documentElement.scrollTop;
        
        // Detectar dirección del scroll
        scrollingDown = st > lastScrollTop;
        
        // Si el usuario scrollea más de 300px desde el top
        if (st > 300) {
            if (scrollingDown && formVisible) {
                // Ocultar el formulario cuando scrolleamos hacia abajo
                bookingContainer.classList.add('hidden');
                showFormButton.classList.add('visible');
                formVisible = false;
            } else if (!scrollingDown && !formVisible) {
                // Mostrar el formulario cuando scrolleamos hacia arriba
                bookingContainer.classList.remove('hidden');
                showFormButton.classList.remove('visible');
                formVisible = true;
            }
        } else {
            // Si estamos cerca del top, siempre mostrar el formulario
            if (formVisible === false) {
                bookingContainer.classList.remove('hidden');
                showFormButton.classList.remove('visible');
                formVisible = true;
            }
        }
        
        lastScrollTop = st <= 0 ? 0 : st; // Para Mobile o comportamiento negativo
    }
    
    // Manejador para el evento de scroll
    window.addEventListener('scroll', function() {
        updateVisibility();
    }, { passive: true });
    
    // Manejador para el evento de redimensionar la ventana
    window.addEventListener('resize', function() {
        // Si cambiamos entre móvil y desktop, resetear estados
        if (isMobile()) {
            bookingContainer.classList.remove('hidden');
            bookingContainer.style.display = 'none';
            showFormButton.style.display = 'flex';
        } else {
            bookingContainer.style.display = 'flex';
            bookingContainer.classList.remove('mobile-visible');
            updateVisibility();
        }
    });
    
    // Inicialización
    if (isMobile()) {
        bookingContainer.style.display = 'none';
        showFormButton.style.display = 'flex';
    } else {
        updateVisibility();
    }
    
    // Mostrar el formulario cuando se hace clic en el botón (comportamiento específico por dispositivo)
    showFormButton.addEventListener('click', function() {
        if (isMobile()) {
            // En móvil, mostrar el formulario en pantalla completa
            bookingContainer.classList.add('mobile-visible');
            bookingContainer.style.display = 'flex';
        } else {
            // En desktop, comportamiento original
            bookingContainer.classList.remove('hidden');
            showFormButton.classList.remove('visible');
            formVisible = true;
        }
    });
    
    // Cerrar el formulario cuando se hace clic en el botón de cerrar (solo móvil)
    if (closeFormButton) {
        closeFormButton.addEventListener('click', function() {
            bookingContainer.classList.remove('mobile-visible');
            setTimeout(function() {
                bookingContainer.style.display = 'none';
            }, 300);
        });
    }
});