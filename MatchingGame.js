class MatchingGame {
    constructor(boardSize, pieces, minMatchCount) {
        this.BOARD_SIZE = boardSize;
        this.PIECES = pieces;
        this.MIN_MATCH_COUNT = minMatchCount;
        this.gameBoard = [];
    }

    createBoard() {
        this.gameBoard = [];
    
        for (let i = 0; i < this.BOARD_SIZE; i++) {
            const row = [];
    
            for (let j = 0; j < this.BOARD_SIZE; j++) {
                const randomPiece = this.PIECES[Math.floor(Math.random() * this.PIECES.length)];
                row.push(randomPiece);
            }
    
            this.gameBoard.push(row);
        }

        return this.gameBoard;
    }

    checkMatches() {
        const rowMatches = this.getRowMatches();
        const colMatches = this.getColMatches();
    
        return { rowMatches, colMatches };
    }

    getRowMatches() {
        const rowMatches = [];
    
        rowLoop: for (let r = 0; r < this.BOARD_SIZE; r++) {
            const row = this.gameBoard[r];
    
            let matchEnd = 0;
    
            colLoop: for (let c = 0; c < this.BOARD_SIZE; c++) {
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
    
                if (matchCount >= this.MIN_MATCH_COUNT) {
                    const matchDetails = {
                        row: r,
                        colStart: matchStart,
                        colEnd: matchEnd,
                        matchCount
                    };
                    rowMatches.push(matchDetails);
                }
            }
        }
    
        return rowMatches;
    }

    getColMatches() {
        const colMatches = [];

        return colMatches;
    }

    clearMatches({ rowMatches }) {
        rowMatches.forEach(match => {
            for (let i = 0; i < match.matchCount; i++) {
                this.gameBoard[match.row][match.colStart + i] = '';
            }
        });
    }
}

export default MatchingGame;