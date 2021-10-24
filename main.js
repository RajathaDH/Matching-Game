import MatchingGame from './MatchingGame.js';
import PIECES from './Pieces.js';

const gameBoardElement = document.querySelector('#gameBoard');

const BOARD_SIZE = 10;
const MIN_MATCH_COUNT = 3;

const gameState = {
    matchingGame: null,
    checkMatchChanges: false
};

function main() {

    const matchingGame = new MatchingGame(BOARD_SIZE, PIECES, MIN_MATCH_COUNT);
    gameState.matchingGame = matchingGame;

    matchingGame.createBoard();

    drawBoard();

    checkMatches();
}

main();

function drawBoard() {

    gameState.matchingGame.gameBoard.forEach((row, i) => {
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

function checkMatches() {

    const { rowMatches, colMatches } = gameState.matchingGame.checkMatches();

    console.log(rowMatches);
    console.log(colMatches);

    gameState.matchingGame.clearMatches({ rowMatches });

    clearMatches({ rowMatches });
}

function clearMatches({ rowMatches }) {
    
    rowMatches.forEach(match => {
        for (let i = 0; i < match.matchCount; i++) {
            const element = document.querySelector(`[data-id='square:${match.row},${match.colStart + i}']`);
            element.innerText = 'match';
        }
    });
}