
document.addEventListener('DOMContentLoaded', function () {

    // ── Easter egg: tablero de ajedrez en el footer ──────────────────────────
    const chessDetail = document.querySelector('.chess-detail');
    if (chessDetail) {
        const createChessBoard = () => {
            const existingBoard = document.querySelector('.chess-board');
            if (existingBoard) existingBoard.remove();

            const chessBoard = document.createElement('div');
            chessBoard.className = 'chess-board';

            const detailRect = chessDetail.getBoundingClientRect();
            chessBoard.style.bottom = (window.innerHeight - detailRect.top) - 41 + 'px';
            chessBoard.style.right = (window.innerWidth - detailRect.right) - 13 + 'px';

            for (let i = 0; i < 9; i++) {
                const cell = document.createElement('div');
                if (i === 1) {
                    cell.className = 'chess-cell dark destination';
                    cell.setAttribute('data-destination', 'true');
                } else if (i === 9) {
                    cell.className = 'chess-cell light selected';
                    cell.textContent = '♞';
                } else if (i === 0 || i === 3 || i === 4 || i === 6 || i === 7) {
                    cell.className = 'chess-cell empty-cell';
                } else {
                    const isLight = (Math.floor(i / 3) + (i % 3)) % 2 === 0;
                    cell.className = `chess-cell ${isLight ? 'light' : 'dark'}`;
                }
                chessBoard.appendChild(cell);
            }

            document.body.appendChild(chessBoard);
            setTimeout(() => chessBoard.classList.add('active'), 10);

            const destinationCell = chessBoard.querySelector('[data-destination="true"]');
            if (destinationCell) {
                destinationCell.addEventListener('click', createFullscreenTransition);
            }

            return chessBoard;
        };

        const createFullscreenTransition = () => {
            const transitionContainer = document.createElement('div');
            transitionContainer.className = 'fullscreen-transition';

            const cellSize = 50;
            const columns = Math.ceil(window.innerWidth / cellSize);
            const rows = Math.ceil(window.innerHeight / cellSize);

            transitionContainer.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
            transitionContainer.style.gridTemplateRows = `repeat(${rows}, 1fr)`;

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

            const centerCell = Math.floor(totalCells / 2);
            const distances = cells.map((_, index) => {
                const cellRow = Math.floor(index / columns);
                const cellCol = index % columns;
                const centerRow = Math.floor(centerCell / columns);
                const centerCol = centerCell % columns;
                return Math.abs(cellRow - centerRow) + Math.abs(cellCol - centerCol);
            });

            const sortedIndices = [...Array(totalCells).keys()].sort((a, b) => distances[a] - distances[b]);

            let delay = 0;
            const delayIncrement = 5;

            sortedIndices.forEach(index => {
                setTimeout(() => {
                    cells[index].style.opacity = '1';
                    cells[index].style.transform = 'scale(1)';
                }, delay);
                delay += delayIncrement;
            });

            setTimeout(() => {
                // Activar la vista ajedrez usando el mecanismo existente del theme-switcher
                document.querySelector('.theme-btn[data-theme="forest"]').click();

                setTimeout(() => {
                    transitionContainer.remove();

                    const chessBoard = document.querySelector('.chess-board');
                    if (chessBoard) {
                        chessBoard.classList.remove('active');
                        setTimeout(() => chessBoard.remove(), 300);
                    }

                    chessDetail.style.color = 'var(--text-primary)';
                    chessDetail.style.opacity = '0.2';
                    chessDetail.style.transform = 'scale(1)';
                }, 500);
            }, delay + 500);
        };

        chessDetail.addEventListener('click', function (event) {
            event.stopPropagation();

            const existingBoard = document.querySelector('.chess-board');
            if (existingBoard && existingBoard.classList.contains('active')) {
                chessDetail.style.color = 'var(--text-primary)';
                chessDetail.style.opacity = '0.2';
                chessDetail.style.transform = 'scale(1)';
                existingBoard.classList.remove('active');
                setTimeout(() => existingBoard.remove(), 300);
            } else {
                const newBoard = createChessBoard();

                chessDetail.style.color = 'var(--primary-dark)';
                chessDetail.style.opacity = '1';
                chessDetail.style.transition = 'all 0.3s ease';
                chessDetail.style.transform = 'scale(1.2)';

                const handleOutsideClick = function (e) {
                    if (!newBoard.contains(e.target) && e.target !== chessDetail) {
                        newBoard.classList.remove('active');
                        chessDetail.style.color = 'var(--text-primary)';
                        chessDetail.style.opacity = '0.2';
                        chessDetail.style.transform = 'scale(1)';
                        setTimeout(() => newBoard.remove(), 300);
                        document.removeEventListener('click', handleOutsideClick);
                    }
                };

                setTimeout(() => {
                    document.addEventListener('click', handleOutsideClick);
                }, 10);
            }
        });
    }

    // ── Animaciones fade-in con IntersectionObserver ─────────────────────────
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.25 });

    document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));

    // ── FAQ accordion ─────────────────────────────────────────────────────────
    document.querySelectorAll('.faq-item').forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            document.querySelectorAll('.faq-item').forEach(other => {
                if (other !== item) other.classList.remove('active');
            });
            item.classList.toggle('active');
        });
    });

    // ── Animación escalonada de tarjetas de precios ───────────────────────────
    const pricingObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 200);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.pricing-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        pricingObserver.observe(card);

        card.addEventListener('mouseenter', () => {
            card.querySelector('.pricing-btn').style.transform = 'translateY(-3px)';
        });
        card.addEventListener('mouseleave', () => {
            card.querySelector('.pricing-btn').style.transform = 'translateY(0)';
        });
    });

    // ── Typewriter ────────────────────────────────────────────────────────────
    const typewriterElement = document.getElementById('typewriter');
    if (typewriterElement) {
        typewriterElement.textContent = 'Diseño Web Profesional';
        typewriterElement.classList.add('typing');
    }

    // ── Filtros de proyectos ──────────────────────────────────────────────────
    updateFilterCounts();
    filterProjects('destacados');

    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            filterProjects(this.getAttribute('data-filter'));
        });
    });

    // ── Año dinámico en footer ────────────────────────────────────────────────
    const footerYear = document.getElementById('footer-year');
    if (footerYear) footerYear.textContent = new Date().getFullYear();

    // ── Puzzle de ajedrez ─────────────────────────────────────────────────────
    initPuzzle();

    // ── Event delegation para tarjetas de proyectos ───────────────────────────
    const projectsGrid = document.querySelector('.projects-grid');
    if (projectsGrid) {
        const openCard = (card) => {
            const url = card.dataset.url;
            if (url) window.open(url, '_blank');
        };

        projectsGrid.addEventListener('click', (e) => {
            const card = e.target.closest('.project-card');
            if (!card || e.target.closest('.featured-star')) return;
            openCard(card);
        });

        projectsGrid.addEventListener('keydown', (e) => {
            if (e.key !== 'Enter' && e.key !== ' ') return;
            const card = e.target.closest('.project-card');
            if (!card) return;
            e.preventDefault();
            openCard(card);
        });
    }
});

// ── Funciones de filtrado y proyectos (globales para uso en HTML) ─────────────

function filterProjects(filter) {
    document.querySelectorAll('.project-card').forEach(card => {
        const category = card.getAttribute('data-category');
        const isFeatured = card.getAttribute('data-featured') === 'true';

        let hide = false;
        if (filter === 'all') {
            hide = false;
        } else if (filter === 'destacados') {
            hide = !isFeatured;
        } else {
            hide = category !== filter;
        }

        card.classList.toggle('hidden', hide);
    });
}

function updateFilterCounts() {
    const projectCards = document.querySelectorAll('.project-card');

    document.querySelectorAll('.filter-btn').forEach(btn => {
        const filter = btn.getAttribute('data-filter');
        const countSpan = btn.querySelector('.filter-count');
        let count = 0;

        if (filter === 'all') {
            count = projectCards.length;
        } else if (filter === 'destacados') {
            count = document.querySelectorAll('.project-card[data-featured="true"]').length;
        } else {
            count = document.querySelectorAll(`.project-card[data-category="${filter}"]`).length;
        }

        if (countSpan) countSpan.textContent = count;
    });
}

function toggleLike(button) {
    const card = button.closest('.project-card');
    const likeCount = button.querySelector('.like-count');
    const currentLikes = parseInt(card.getAttribute('data-likes')) || 0;
    const isLiked = button.classList.contains('liked');

    if (isLiked) {
        card.setAttribute('data-likes', Math.max(0, currentLikes - 1));
        likeCount.textContent = Math.max(0, currentLikes - 1);
        button.classList.remove('liked');
    } else {
        card.setAttribute('data-likes', currentLikes + 1);
        likeCount.textContent = currentLikes + 1;
        button.classList.add('liked');
    }
}

// ── Puzzle de ajedrez ────────────────────────────────────────────────────────
// Índices: fila 8 = 0-7, fila 7 = 8-15, ..., fila 1 = 56-63 (a=0, h=7)
const PUZZLES = [
    {
        title: 'Mate en 1 — Juegan las blancas',
        // Blancas: Dama c7, Rey e1 | Negras: Rey e8, peones d7 e7 f7
        pieces: { 4:'bK', 10:'wQ', 11:'bp', 12:'bp', 13:'bp', 60:'wK' },
        from: 10, to: 3,       // Dc7–d8#
        solution: 'Dd8#',
        hint: 'La dama se mueve en diagonal hacia la 8ª fila'
    },
    {
        title: 'Mate en 1 — Juegan las blancas',
        // Blancas: Torre a1, Rey c1 | Negras: Rey h8, peones g7 h7
        pieces: { 7:'bK', 14:'bp', 15:'bp', 56:'wR', 58:'wK' },
        from: 56, to: 0,       // Ta1–a8#
        solution: 'Ta8#',
        hint: 'La torre recorre toda la columna a hasta la 8ª fila'
    },
    {
        title: 'Mate en 1 — Juegan las blancas',
        // Blancas: Torre h1, Rey c1 | Negras: Rey h8, Torre g8, peón h7
        pieces: { 7:'bK', 6:'bR', 15:'bp', 63:'wR', 58:'wK' },
        from: 63, to: 15,      // Txh7#
        solution: 'Txh7#',
        hint: 'La torre captura el peón; el rey no tiene escapatoria'
    }
];

const PIECE_UNICODE = {
    wK:'♔', wQ:'♕', wR:'♖', wB:'♗', wN:'♘', wp:'♙',
    bK:'♚', bQ:'♛', bR:'♜', bB:'♝', bN:'♞', bp:'♟'
};

function initPuzzle() {
    const boardEl    = document.getElementById('chess-puzzle-board');
    if (!boardEl) return;

    const counterEl  = document.getElementById('puzzle-counter');
    const titleEl    = document.getElementById('puzzle-title');
    const feedbackEl = document.getElementById('puzzle-feedback');
    const hintBtn    = document.getElementById('puzzle-hint-btn');
    const nextBtn    = document.getElementById('puzzle-next');

    let currentPuzzle = 0;
    let selectedIndex = null;

    function renderBoard() {
        const puzzle = PUZZLES[currentPuzzle];
        boardEl.innerHTML = '';
        selectedIndex = null;
        feedbackEl.textContent = '';
        feedbackEl.className = 'puzzle-feedback';
        hintBtn.disabled = false;
        nextBtn.classList.remove('visible');
        counterEl.textContent = `Puzzle ${currentPuzzle + 1} / ${PUZZLES.length}`;
        titleEl.textContent = puzzle.title;

        for (let i = 0; i < 64; i++) {
            const sq = document.createElement('div');
            const col = i % 8;
            const row = Math.floor(i / 8);
            sq.className = `puzzle-sq ${(row + col) % 2 === 0 ? 'sq-light' : 'sq-dark'}`;
            sq.dataset.index = i;

            const piece = puzzle.pieces[i];
            if (piece) {
                const span = document.createElement('span');
                span.className = `puzzle-piece ${piece[0] === 'w' ? 'pc-white' : 'pc-black'}`;
                span.textContent = PIECE_UNICODE[piece];
                sq.appendChild(span);
            }

            sq.addEventListener('click', () => handleClick(i));
            boardEl.appendChild(sq);
        }
    }

    function getSquare(index) {
        return boardEl.querySelector(`[data-index="${index}"]`);
    }

    function handleClick(index) {
        const puzzle = PUZZLES[currentPuzzle];
        const piece = puzzle.pieces[index];

        if (piece && piece[0] === 'w') {
            boardEl.querySelectorAll('.puzzle-sq').forEach(s => s.classList.remove('sq-selected'));
            getSquare(index).classList.add('sq-selected');
            selectedIndex = index;
            return;
        }

        if (selectedIndex === null) return;

        if (selectedIndex === puzzle.from && index === puzzle.to) {
            boardEl.querySelectorAll('.puzzle-sq').forEach(s => s.classList.remove('sq-selected'));
            getSquare(puzzle.from).classList.add('sq-correct');
            getSquare(puzzle.to).classList.add('sq-correct');
            feedbackEl.textContent = `¡Correcto! ${puzzle.solution} es jaque mate.`;
            feedbackEl.className = 'puzzle-feedback pf-success';
            hintBtn.disabled = true;
            if (currentPuzzle < PUZZLES.length - 1) {
                nextBtn.classList.add('visible');
            } else {
                feedbackEl.textContent += ' ¡Completaste todos los puzzles!';
            }
        } else {
            const sq = getSquare(index);
            sq.classList.add('sq-wrong');
            feedbackEl.textContent = 'Movimiento incorrecto. Intentá de nuevo.';
            feedbackEl.className = 'puzzle-feedback pf-error';
            setTimeout(() => {
                sq.classList.remove('sq-wrong');
                boardEl.querySelectorAll('.puzzle-sq').forEach(s => s.classList.remove('sq-selected'));
                feedbackEl.textContent = '';
                feedbackEl.className = 'puzzle-feedback';
                selectedIndex = null;
            }, 800);
        }
    }

    hintBtn.addEventListener('click', () => {
        const puzzle = PUZZLES[currentPuzzle];
        feedbackEl.textContent = `Pista: ${puzzle.hint}`;
        feedbackEl.className = 'puzzle-feedback pf-hint';
        boardEl.querySelectorAll('.puzzle-sq').forEach(s => s.classList.remove('sq-selected'));
        getSquare(puzzle.from).classList.add('sq-selected');
        selectedIndex = puzzle.from;
    });

    nextBtn.addEventListener('click', () => {
        currentPuzzle++;
        renderBoard();
    });

    renderBoard();
}

function toggleFeatured(button) {
    const card = button.closest('.project-card');
    const isFeatured = card.getAttribute('data-featured') === 'true';

    card.setAttribute('data-featured', !isFeatured);
    button.classList.toggle('active');

    updateFilterCounts();

    const activeFilter = document.querySelector('.filter-btn.active');
    if (activeFilter && activeFilter.getAttribute('data-filter') === 'destacados') {
        filterProjects('destacados');
    }
}
