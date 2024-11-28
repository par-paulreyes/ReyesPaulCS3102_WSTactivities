let slideIndex = 0;

function showSlides() {
    let slides = document.getElementsByClassName("mySlides");
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    slideIndex++;
    if (slideIndex > slides.length) { slideIndex = 1 }    
    slides[slideIndex - 1].style.display = "block";  
    setTimeout(showSlides, 3000); 
}

showSlides();

window.addEventListener('load', function() {
    document.querySelector('.container').style.opacity = 1;
    document.getElementById('progress-bar').style.width = '100%';
});

document.querySelector('.mode-toggle').addEventListener('click', function() {
    document.body.classList.toggle('matrix-mode');
    setInterval(draw, 50);
});

const ticTacToe = document.getElementById('tic-tac-toe');
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameStatus = document.getElementById('game-status');

for (let i = 0; i < 9; i++) {
    let cell = document.createElement('div');
    cell.classList.add('cell');
    cell.addEventListener('click', () => handleCellClick(i));
    ticTacToe.appendChild(cell);
}

function handleCellClick(index) {
    if (gameBoard[index] !== '' || gameStatus.textContent !== "Player X's turn" && gameStatus.textContent !== "Player O's turn") return;

    gameBoard[index] = currentPlayer;
    const cells = document.querySelectorAll('.cell');
    cells[index].textContent = currentPlayer;

    if (checkWinner()) {
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    gameStatus.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            gameStatus.textContent = `Player ${gameBoard[a]} wins!`;
            setTimeout(resetGame, 2000);
            return true;
        }
    }

    if (!gameBoard.includes('')) {
        gameStatus.textContent = "It's a draw!";
        setTimeout(resetGame, 5000);
        return true;
    }

    return false;
}

function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => cell.textContent = '');
    gameStatus.textContent = `Player X's turn`;
}

const matrixCanvas = document.getElementById('matrix-canvas');
const ctx = matrixCanvas.getContext('2d');
const cols = Math.floor(window.innerWidth / 20);
const rows = Math.floor(window.innerHeight / 20);
const matrix = [];

matrixCanvas.width = window.innerWidth;
matrixCanvas.height = window.innerHeight;

for (let i = 0; i < cols; i++) {
    matrix[i] = [];
    for (let j = 0; j < rows; j++) {
        matrix[i].push({ y: Math.random() * window.innerHeight, char: String.fromCharCode(65 + Math.random() * 26) });
    }
}

function draw() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);

    ctx.fillStyle = 'rgb(0, 255, 255)';
    ctx.font = '15px monospace';

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            const charObj = matrix[i][j];
            ctx.fillText(charObj.char, i * 20, charObj.y);

            if (charObj.y > window.innerHeight) {
                charObj.y = 0;
                charObj.char = String.fromCharCode(65 + Math.random() * 26);
            } else {
                charObj.y += 20;
            }
        }
    }
}
