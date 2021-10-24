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
    gameBoard: [],
    checkMatchChanges: false
};

function main() {

    createBoard();
    drawBoard();

    console.log(gameState.gameBoard);

    checkMatches();
}

main();

function createBoard() {

    gameState.gameBoard = [];

    for (let i = 0; i < BOARD_SIZE; i++) {
        const row = [];

        for (let j = 0; j < BOARD_SIZE; j++) {
            const randomColour = COLOURS[Math.floor(Math.random() * COLOURS.length)];
            row.push(randomColour);
        }

        gameState.gameBoard.push(row);
    }
}

function drawBoard() {

    gameState.gameBoard.forEach((row, i) => {
        row.forEach((value, j) => {
            const div = document.createElement('div');
            div.setAttribute('draggable', true);
            div.setAttribute('data-id', `square:${i},${j}`);
            div.classList.add('square');
            div.style.background = value;
            div.innerText = value;
            gameBoardElement.appendChild(div);
        });
    });
}

function checkMatches(minMatchCount = 3) {

    console.log('checking rows');

    const rowMatches = getRowMatches();

    console.log(rowMatches);
}

function getRowMatches(minMatchCount = 3) {

    const rowMatches = [];

    rowLoop: for (let r = 0; r < gameState.gameBoard.length; r++) {
        const row = gameState.gameBoard[r];

        let matchEnd = 0;

        colLoop: for (let c = 0; c < row.length; c++) {
            // check if current column was already checked by previous matching
            // skip until last column matched if found
            // this will avoid matching smaller numbers matches if higher number match was found
            if (c < matchEnd) {
                continue;
            }

            const matchStart = c;
            let matchCount = 1;

            // iterate through 
            matchCountLoop: while (row[matchStart] == row[matchStart + matchCount]) {
                matchCount++;
            }

            // subtract 1 to get index of match end
            matchEnd = matchStart + matchCount - 1;

            if (matchCount >= minMatchCount) {
                const matchDetails = {
                    row: r,
                    colStart: matchStart,
                    colEnd: matchEnd,
                    matchCount
                };
                rowMatches.push(matchDetails);
            }

            const currentColour = row[c];
            const nextEle = row[c+1];
            const nextNextEle = row[c+2];

            if (currentColour == nextEle && currentColour == nextNextEle) {
                const ele = gameBoardElement.querySelector(`[data-id='square:${r},${c}']`);
                ele.innerText = 'match';
                const ele1 = gameBoardElement.querySelector(`[data-id='square:${r},${c+1}']`);
                ele1.innerText = 'match1';
                const ele2 = gameBoardElement.querySelector(`[data-id='square:${r},${c+2}']`);
                ele2.innerText = 'match2';
            }
        }
    }

    return rowMatches;
}