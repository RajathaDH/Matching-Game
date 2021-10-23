const gameBoardElement = document.querySelector('#gameBoard');

const BOARD_SIZE = 10;
const COLOURS = [
    'red',
    'blue',
    'yellow',
    'green',
    'purple',
    'pink'
];

const gameState = {
    gameBoard: []
};

function main() {
    createBoard();

    console.log(gameState.gameBoard);
}

main();

function createBoard() {
    gameState.gameBoard = [];

    for (let i = 0; i < BOARD_SIZE; i++) {
        const row = [];

        for (let j = 0; j < BOARD_SIZE; j++) {
            row.push(`${i},${j}`);
        }

        gameState.gameBoard.push(row);
    }

    gameState.gameBoard.forEach((row, i) => {
        row.forEach((value, j) => {
            const div = document.createElement('div');
            div.setAttribute('draggable', true);
            div.classList.add('square');
            div.style.background = COLOURS[Math.floor(Math.random() * COLOURS.length)];
            div.innerText = value;
            gameBoardElement.appendChild(div);
        });
    });
}