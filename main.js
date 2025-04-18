
document.addEventListener('DOMContentLoaded', function() {
    const chessDetail = document.querySelector('.chess-detail');
    
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