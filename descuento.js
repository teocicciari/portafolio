// JavaScript para la cuenta regresiva del descuento
document.addEventListener('DOMContentLoaded', function() {
    // Establecer la fecha de finalización (15 días a partir de hoy)
    const today = new Date();
    const endDate = new Date();
    endDate.setDate(today.getDate() + 15); // 15 días desde hoy
    endDate.setHours(23, 59, 59); // Final del día
    
    // Elementos del timer
    const daysElement = document.getElementById('timer-days');
    const hoursElement = document.getElementById('timer-hours');
    const minutesElement = document.getElementById('timer-minutes');
    const secondsElement = document.getElementById('timer-seconds');
    
    // Función para actualizar el contador
    function updateCountdown() {
        const now = new Date();
        const difference = endDate - now;
        
        if (difference <= 0) {
            // La oferta ha terminado
            daysElement.textContent = '0';
            hoursElement.textContent = '0';
            minutesElement.textContent = '0';
            secondsElement.textContent = '0';
            return;
        }
        
        // Cálculos de tiempo
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        
        // Actualizar elementos del DOM
        daysElement.textContent = days < 10 ? '0' + days : days;
        hoursElement.textContent = hours < 10 ? '0' + hours : hours;
        minutesElement.textContent = minutes < 10 ? '0' + minutes : minutes;
        secondsElement.textContent = seconds < 10 ? '0' + seconds : seconds;
    }
    
    // Actualizar cada segundo
    updateCountdown(); // Ejecutar inmediatamente una vez
    setInterval(updateCountdown, 1000); // Luego actualizar cada segundo
    
    // Scroll suave para el botón CTA
    const ctaButton = document.querySelector('.discount-cta');
    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80, // Ajustar si hay navbar fija
                        behavior: 'smooth'
                    });
                }
            }
        });
    }
    
    // Añadir animación cuando la sección aparece en el viewport
    const observerOptions = {
        threshold: 0.25
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.fade-in').forEach(item => {
        observer.observe(item);
    });
});