// ===================================
// NAVIGATION FUNCTIONALITY
// ===================================

// Navbar scroll effect
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');

    // Animate hamburger icon
    const spans = menuToggle.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translateY(10px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translateY(-10px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');

        const spans = menuToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// ===================================
// SMOOTH SCROLLING
// ===================================

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');

        if (href.startsWith('#')) {
            e.preventDefault();
            const targetId = href.substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                const navHeight = navbar.offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ===================================
// ACTIVE NAVIGATION LINK
// ===================================

const sections = document.querySelectorAll('section[id]');

function updateActiveLink() {
    const scrollPosition = window.scrollY + navbar.offsetHeight + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveLink);

// ===================================
// SCROLL ANIMATIONS
// ===================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Elements to animate on scroll
const animateElements = document.querySelectorAll(
    '.feature-card, .content-grid, .gallery-item, .testimonial-card, .section-header'
);

animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ===================================
// GALLERY LIGHTBOX (Simple version)
// ===================================

const galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        // Create overlay
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.95);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            animation: fadeIn 0.3s ease;
        `;

        // Clone the image
        const imageClone = item.querySelector('.image-placeholder').cloneNode(true);
        imageClone.style.cssText = `
            max-width: 90%;
            max-height: 90vh;
            border-radius: 10px;
            animation: zoomIn 0.3s ease;
        `;

        overlay.appendChild(imageClone);
        document.body.appendChild(overlay);
        document.body.style.overflow = 'hidden';

        // Close on click
        overlay.addEventListener('click', () => {
            document.body.removeChild(overlay);
            document.body.style.overflow = 'auto';
        });

        // Close on Escape key
        const handleEscape = (e) => {
            if (e.key === 'Escape' && document.body.contains(overlay)) {
                document.body.removeChild(overlay);
                document.body.style.overflow = 'auto';
                document.removeEventListener('keydown', handleEscape);
            }
        };
        document.addEventListener('keydown', handleEscape);
    });
});

// ===================================
// CONTACT FORM HANDLING
// ===================================

const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);

    // Create success message
    const successMessage = document.createElement('div');
    successMessage.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #4a7c2b;
        color: white;
        padding: 30px 50px;
        border-radius: 15px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        text-align: center;
        animation: fadeIn 0.3s ease;
    `;

    successMessage.innerHTML = `
        <h3 style="margin-bottom: 10px; font-size: 1.5rem;">¡Mensaje Enviado!</h3>
        <p>Gracias por contactarnos. Te responderemos pronto.</p>
    `;

    document.body.appendChild(successMessage);

    // Remove message after 3 seconds
    setTimeout(() => {
        successMessage.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(successMessage);
        }, 300);
    }, 3000);

    // Reset form
    contactForm.reset();

    // In a real application, you would send this data to a server
    console.log('Form data:', data);
});

// ===================================
// FORM VALIDATION
// ===================================

const formInputs = contactForm.querySelectorAll('input, select, textarea');

formInputs.forEach(input => {
    input.addEventListener('blur', () => {
        if (input.hasAttribute('required') && !input.value.trim()) {
            input.style.borderColor = '#dc3545';
        } else if (input.type === 'email' && input.value && !isValidEmail(input.value)) {
            input.style.borderColor = '#dc3545';
        } else {
            input.style.borderColor = '#4a7c2b';
        }
    });

    input.addEventListener('focus', () => {
        input.style.borderColor = '#2d5016';
    });
});

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ===================================
// PARALLAX EFFECT (Hero Section)
// ===================================

const hero = document.querySelector('.hero');

window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    if (scrollPosition < window.innerHeight) {
        hero.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
    }
});

// ===================================
// COUNTER ANIMATION
// ===================================

function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// ===================================
// LAZY LOAD IMAGES (if real images are added)
// ===================================

const imagePlaceholders = document.querySelectorAll('.image-placeholder');

const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            // When you add real images, replace data-src with src
            if (img.dataset.src) {
                img.style.backgroundImage = `url(${img.dataset.src})`;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        }
    });
}, { rootMargin: '50px' });

imagePlaceholders.forEach(img => imageObserver.observe(img));

// ===================================
// ADD CSS ANIMATIONS TO HEAD
// ===================================

const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }

    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }

    @keyframes zoomIn {
        from {
            opacity: 0;
            transform: scale(0.8);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }

    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// ===================================
// INITIALIZE ON LOAD
// ===================================

window.addEventListener('load', () => {
    // Add loaded class to body
    document.body.classList.add('loaded');

    // Update active link on page load
    updateActiveLink();

    console.log('Coco Website Loaded Successfully! 🎉');
});

// ===================================
// PERFORMANCE OPTIMIZATION
// ===================================

// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll-heavy operations
const debouncedUpdateActiveLink = debounce(updateActiveLink, 100);
window.removeEventListener('scroll', updateActiveLink);
window.addEventListener('scroll', debouncedUpdateActiveLink);

// ===================================
// ACCESSIBILITY ENHANCEMENTS
// ===================================

// Keyboard navigation for gallery
galleryItems.forEach((item, index) => {
    item.setAttribute('tabindex', '0');
    item.setAttribute('role', 'button');
    item.setAttribute('aria-label', `Ver imagen de galería ${index + 1}`);

    item.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            item.click();
        }
    });
});

// Add focus visible styles
const focusableElements = document.querySelectorAll('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])');

focusableElements.forEach(element => {
    element.addEventListener('focus', () => {
        element.style.outline = '2px solid #d4af37';
        element.style.outlineOffset = '2px';
    });

    element.addEventListener('blur', () => {
        element.style.outline = 'none';
    });
});

// ===================================
// PRINT OPTIMIZATION
// ===================================

window.addEventListener('beforeprint', () => {
    // Expand all sections for printing
    document.body.classList.add('printing');
});

window.addEventListener('afterprint', () => {
    document.body.classList.remove('printing');
});
