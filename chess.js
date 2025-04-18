
document.addEventListener('DOMContentLoaded', function() {
    const chessBackground = document.getElementById('chessBackground');
    const nav = document.querySelector('nav');
    const content = document.querySelector('.content');
    
    // Crear el patrón de ajedrez en el fondo
    createChessPattern();
    
    // Función para crear el patrón de ajedrez
    function createChessPattern() {
        // Limpiar contenido existente
        chessBackground.innerHTML = '';
        
        // Calcular el número de celdas basado en el tamaño de la ventana
        const cellSize = 50; // px
        const columns = Math.ceil(window.innerWidth / cellSize);
        const rows = Math.ceil(window.innerHeight / cellSize);
        
        // Configurar el grid
        chessBackground.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
        chessBackground.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
        
        // Crear celdas
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < columns; col++) {
                const cell = document.createElement('div');
                // Alternar colores para crear patrón de ajedrez
                const isLight = (row + col) % 2 === 0;
                cell.className = `chess-cell ${isLight ? 'light' : 'dark'}`;
                chessBackground.appendChild(cell);
            }
        }
    }
    
    // Actualizar el patrón cuando se redimensiona la ventana
    window.addEventListener('resize', createChessPattern);
    
    // Secuencia de animación:
    // 1. Primero el fondo de ajedrez
    // 2. Luego la navegación
    // 3. Finalmente el contenido central
    
    // Animación del fondo
    setTimeout(() => {
        const cells = document.querySelectorAll('.chess-cell');
        let lastCellIndex = 0;
        
        cells.forEach((cell, index) => {
            setTimeout(() => {
                cell.style.opacity = '1';
                // Guardamos el índice de la última celda para saber cuándo termina esta animación
                lastCellIndex = Math.max(lastCellIndex, index);
                
                // Si es la última celda, comenzamos la animación del nav
                if (index === cells.length - 1) {
                    // Pequeño retraso antes de mostrar el nav
                    setTimeout(() => {
                        // Mostrar el nav
                        nav.classList.add('animate-in');
                        
                        // Pequeño retraso antes de mostrar el contenido
                        setTimeout(() => {
                            // Mostrar el contenido
                            content.classList.add('animate-in');
                        }, 400); // Retraso entre nav y contenido
                    }, 200); // Retraso después del fondo
                }
            }, index * 2); // Pequeño retraso para crear efecto secuencial en el fondo
        });
    }, 100);
});