// script.js

const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset-button');
const aiButton = document.getElementById('ai-button');
const playerTurnDisplay = document.getElementById('player-turn');
let currentPlayer = 'X';
let gameState = Array(9).fill(null);
let againstAI = false;
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);
aiButton.addEventListener('click', toggleAI);

function handleCellClick(event) {
    const cell = event.target;
    const index = cell.dataset.index;

    if (gameState[index] !== null || checkWinner()) {
        return;
    }

    gameState[index] = currentPlayer;
    cell.textContent = currentPlayer;

    if (checkWinner()) {
        alert(`${currentPlayer} wins!`);
    } else if (gameState.every(cell => cell !== null)) {
        alert('Draw!');
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        playerTurnDisplay.textContent = `Player ${currentPlayer}'s Turn`;

        if (againstAI && currentPlayer === 'O') {
            setTimeout(aiMove, 500); // AI makes a move after a delay
        }
    }
}

function checkWinner() {
    return winningConditions.some(condition => {
        const [a, b, c] = condition;
        return gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c];
    });
}

function resetGame() {
    gameState.fill(null);
    cells.forEach(cell => cell.textContent = '');
    currentPlayer = 'X';
    playerTurnDisplay.textContent = `Player ${currentPlayer}'s Turn`;
}

function toggleAI() {
    againstAI = !againstAI;
    aiButton.textContent = againstAI ? 'Play against Player' : 'Play against AI';
    resetGame();
}

function aiMove() {
    const availableCells = gameState
        .map((value, index) => value === null ? index : null)
        .filter(index => index !== null);

    if (availableCells.length === 0) return;

    const randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
    gameState[randomIndex] = 'O';
    cells[randomIndex].textContent = 'O';

    if (checkWinner()) {
        alert('O wins!');
    } else if (gameState.every(cell => cell !== null)) {
        alert('Draw!');
    } else {
        currentPlayer = 'X';
        playerTurnDisplay.textContent = `Player ${currentPlayer}'s Turn`;
    }
}
