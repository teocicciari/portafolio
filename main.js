
document.addEventListener('DOMContentLoaded', function() {
    const chessDetail = document.querySelector('.chess-detail');
    if (!chessDetail) return; // Asegurarse de que el elemento existe
    
    // Crear el tablero de ajedrez dinámicamente
    const createChessBoard = () => {
        // Eliminar tablero existente si hay alguno
        const existingBoard = document.querySelector('.chess-board');
        if (existingBoard) {
            existingBoard.remove();
        }
        
        // Crear nuevo tablero
        const chessBoard = document.createElement('div');
        chessBoard.className = 'chess-board';
        
        // Obtener la posición del caballero original
        const detailRect = chessDetail.getBoundingClientRect();
        
        // Posicionar el tablero para que la casilla del caballo esté sobre el símbolo original
        chessBoard.style.bottom = (window.innerHeight - detailRect.top) - 41 + 'px';
        chessBoard.style.right = (window.innerWidth - detailRect.right) - 13 + 'px';
        
        // Crear las celdas del tablero
        for (let i = 0; i < 9; i++) {
            const cell = document.createElement('div');
            
            // Determinar el tipo de celda
            if (i === 1) { // Destino (2 arriba, 1 izquierda)
                cell.className = 'chess-cell dark destination';
                cell.setAttribute('data-destination', 'true');
            } else if (i === 9) { // Posición inicial
                cell.className = 'chess-cell light selected';
                cell.textContent = '♞';
            } else if (i === 0 || i === 3 || i === 4 || i === 6 || i === 7) { // Celdas vacías para el patrón L
                cell.className = 'chess-cell empty-cell';
            } else {
                // Alternar colores para el resto de celdas
                const isLight = (Math.floor(i / 3) + (i % 3)) % 2 === 0;
                cell.className = `chess-cell ${isLight ? 'light' : 'dark'}`;
            }
            
            chessBoard.appendChild(cell);
        }
        
        document.body.appendChild(chessBoard);
        
        // Activar el tablero
        setTimeout(() => {
            chessBoard.classList.add('active');
        }, 10);
        
        // Añadir evento de clic a la casilla de destino
        const destinationCell = chessBoard.querySelector('[data-destination="true"]');
        if (destinationCell) {
            destinationCell.addEventListener('click', createFullscreenTransition);
        }
        
        return chessBoard;
    };
    
    // Crear animación de transición de pantalla completa
    const createFullscreenTransition = () => {
        // Crear el contenedor de la transición
        const transitionContainer = document.createElement('div');
        transitionContainer.className = 'fullscreen-transition';
        
        // Calcular número de celdas basado en el tamaño de la ventana
        const cellSize = 50; // px
        const columns = Math.ceil(window.innerWidth / cellSize);
        const rows = Math.ceil(window.innerHeight / cellSize);
        
        transitionContainer.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
        transitionContainer.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
        
        // Crear celdas para la transición
        const cells = [];
        const totalCells = columns * rows;
        
        for (let i = 0; i < totalCells; i++) {
            const cell = document.createElement('div');
            const isLight = (Math.floor(i / columns) + (i % columns)) % 2 === 0;
            cell.className = `transition-cell ${isLight ? 'light-cell' : 'dark-cell'}`;
            transitionContainer.appendChild(cell);
            cells.push(cell);
        }
        
        document.body.appendChild(transitionContainer);
        
        // Animar las celdas en secuencia
        const centerCell = Math.floor(totalCells / 2);
        const distances = cells.map((_, index) => {
            const cellRow = Math.floor(index / columns);
            const cellCol = index % columns;
            const centerRow = Math.floor(centerCell / columns);
            const centerCol = centerCell % columns;
            
            // Distancia de Manhattan desde el centro
            return Math.abs(cellRow - centerRow) + Math.abs(cellCol - centerCol);
        });
        
        // Ordenar las celdas por distancia
        const sortedIndices = [...Array(totalCells).keys()].sort((a, b) => distances[a] - distances[b]);
        
        // Animar las celdas
        let delay = 0;
        const delayIncrement = 5; // ms
        
        sortedIndices.forEach(index => {
            setTimeout(() => {
                cells[index].style.opacity = '1';
                cells[index].style.transform = 'scale(1)';
            }, delay);
            delay += delayIncrement;
        });
        
        // Abrir nueva ventana después de que termine la animación
        setTimeout(() => {
            window.open('chess.html', '_self');
            
            // Eliminar la transición después de un retardo
            setTimeout(() => {
                transitionContainer.remove();
                
                // Restablecer el estado original
                const chessBoard = document.querySelector('.chess-board');
                if (chessBoard) {
                    chessBoard.classList.remove('active');
                    setTimeout(() => {
                        chessBoard.remove();
                    }, 300);
                }
                
                chessDetail.style.color = 'var(--text-primary)';
                chessDetail.style.opacity = '0.2';
                chessDetail.style.transform = 'scale(1)';
            }, 500);
        }, delay + 500); // Esperar a que termine la animación + un buffer
    };
    
    // Alternar la visibilidad del tablero al hacer clic en el caballo
    chessDetail.addEventListener('click', function(event) {
        event.stopPropagation();
        
        const existingBoard = document.querySelector('.chess-board');
        if (existingBoard && existingBoard.classList.contains('active')) {
            
            chessDetail.style.color = 'var(--text-primary)';
            chessDetail.style.opacity = '0.2';
            chessDetail.style.transform = 'scale(1)';
            existingBoard.classList.remove('active');
            setTimeout(() => {
                existingBoard.remove();
            }, 300);
        } else {
            const newBoard = createChessBoard();
            
            chessDetail.style.color = 'var(--primary-dark)';
            chessDetail.style.opacity = '1';
            chessDetail.style.transition = 'all 0.3s ease';
            chessDetail.style.transform = 'scale(1.2)';

            // Cerrar el tablero al hacer clic fuera de él
            const handleOutsideClick = function(e) {
                if (!newBoard.contains(e.target) && e.target !== chessDetail) {
                    newBoard.classList.remove('active');
                    chessDetail.style.color = 'var(--text-primary)';
                    chessDetail.style.opacity = '0.2';
                    chessDetail.style.transform = 'scale(1)';
                    setTimeout(() => {
                        newBoard.remove();
                    }, 300);
                    document.removeEventListener('click', handleOutsideClick);
                }
            };
            
            setTimeout(() => {
                document.addEventListener('click', handleOutsideClick);
            }, 10);
        }
    });
});

// Animación de entrada para los elementos con la clase 'fade-in'
document.addEventListener('DOMContentLoaded', function() {
    // Función para activar animaciones cuando los elementos son visibles
    function checkVisibility() {
        const elements = document.querySelectorAll('.fade-in');
        const windowHeight = window.innerHeight;
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            if (elementPosition < windowHeight - 100) {
                element.classList.add('active');
            }
        });
    }
    
    // Verificar visibilidad al cargar y al hacer scroll
    window.addEventListener('scroll', checkVisibility);
    checkVisibility(); // Verificar también al cargar la página
    
    // Para asegurar que los elementos que ya están en vista se animen
    setTimeout(checkVisibility, 100);
});

// JavaScript para la funcionalidad del FAQ
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Cerrar otros items que estén abiertos
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle el item actual
            item.classList.toggle('active');
        });
    });
    
    // Añadir el efecto fade-in para los elementos
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


document.addEventListener('DOMContentLoaded', function() {
    // Crear el elemento del mensaje
    const f11Hint = document.createElement('div');
    f11Hint.className = 'f11-hint';
    f11Hint.innerHTML = `
        <div class="f11-hint-content">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="f11-icon">
                <polyline points="15 3 21 3 21 9"></polyline>
                <polyline points="9 21 3 21 3 15"></polyline>
                <line x1="21" y1="3" x2="14" y2="10"></line>
                <line x1="3" y1="21" x2="10" y2="14"></line>
            </svg>
            <span>Presiona F11 para quitar distracciones</span>
        </div>
    `;
    
    // Insertar después del theme-switcher
    const themeSwitcher = document.querySelector('.theme-switcher');
    if (themeSwitcher) {
        themeSwitcher.insertAdjacentElement('afterend', f11Hint);
        
        // Auto-eliminar el elemento después de la animación para limpiar el DOM
        setTimeout(() => {
            f11Hint.remove();
        }, 6500); // 6s de visibilidad + 0.5s de animación
    }
});


document.addEventListener('DOMContentLoaded', function() {
// Seleccionar elementos
const profileName = document.querySelector('.profile-name');
const profileImg = document.querySelector('.profile-img');
const modal = document.getElementById('aboutModal');
const closeBtn = document.querySelector('.close-modal');
const modalContactBtn = document.querySelector('.modal-contact-btn');

// Abrir modal al hacer clic en el nombre
profileName.addEventListener('click', function() {
    modal.classList.add('show');
    document.body.style.overflow = 'hidden'; // Prevenir scroll
});

// Abrir modal al hacer clic en la imagen de perfil
profileImg.addEventListener('click', function() {
    modal.classList.add('show');
    document.body.style.overflow = 'hidden'; // Prevenir scroll
});

// Cerrar modal con el botón X
closeBtn.addEventListener('click', function() {
    closeModal();
});

// Cerrar modal haciendo clic fuera del contenido
window.addEventListener('click', function(event) {
    if (event.target === modal) {
    closeModal();
    }
});

// Cerrar modal con la tecla ESC
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && modal.classList.contains('show')) {
    closeModal();
    }
});

// Función para cerrar el modal
function closeModal() {
    modal.classList.remove('show');
    setTimeout(() => {
    document.body.style.overflow = ''; // Restaurar scroll
    }, 300);
}

// Si se hace clic en "Trabajemos juntos" dentro del modal
modalContactBtn.addEventListener('click', function() {
    closeModal();
    // Dar tiempo para que se cierre el modal antes de desplazarse
    setTimeout(() => {
    document.querySelector('#contact').scrollIntoView();
    }, 400);
});

// Funcionalidad para el botón "Más sobre mí"
const moreAboutBtn = document.getElementById('moreAboutBtn');
const personalInterests = document.getElementById('personalInterests');

moreAboutBtn.addEventListener('click', function() {
    this.classList.toggle('active');
    personalInterests.classList.toggle('show');
    
    // Cambiar el texto del botón según el estado
    const btnText = this.querySelector('span');
    if (personalInterests.classList.contains('show')) {
    btnText.textContent = 'Mostrar menos';
    } else {
    btnText.textContent = 'Más sobre mí';
    }
});
});

// Animación de entrada para las tarjetas
const observerOptionsb = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 200);
        }
    });
}, observerOptionsb);

// Aplicar animación a las tarjetas
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.pricing-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});

// Efecto hover mejorado
document.querySelectorAll('.pricing-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.querySelector('.pricing-btn').style.transform = 'translateY(-3px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.querySelector('.pricing-btn').style.transform = 'translateY(0)';
    });
});

function openProject(url) {
    window.open(url, '_blank');
}