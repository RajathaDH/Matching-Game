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
        const rowMatches = [];
        const colMatches = [];
    
        rowLoop: for (let r = 0; r < this.BOARD_SIZE; r++) {
            const row = this.gameBoard[r];
    
            let colMatchEnd = 0;
            let rowMatchEnd = 0;
    
            colLoop: for (let c = 0; c < this.BOARD_SIZE - 1; c++) {
                // check if current column was already checked by previous matching
                // skip until last column matched if found
                // this will avoid matching smaller numbers matches if higher number match was found
                if (!(c < colMatchEnd)) {
                    const colMatchStart = c;
                    let colMatchCount = 1;
        
                    // iterate through each column in row until no match is found
                    matchCountLoop: while (row[colMatchStart] == row[colMatchStart + colMatchCount]) {
                        colMatchCount++;
                    }
        
                    // subtract 1 to get index of match end
                    colMatchEnd = colMatchStart + colMatchCount - 1;
        
                    if (colMatchCount >= this.MIN_MATCH_COUNT) {
                        const matchDetails = {
                            row: r,
                            colStart: colMatchStart,
                            colEnd: colMatchEnd,
                            colMatchCount
                        };
                        rowMatches.push(matchDetails);
                    }
                }
    
                // check if current column was already checked by previous matching
                // skip until last column matched if found
                // this will avoid matching smaller numbers matches if higher number match was found
                if (!(c < rowMatchEnd)) {
                    const rowMatchStart = c;
                    let rowMatchCount = 1;
        
                    // iterate through each row in column until no match is found
                    maatchCountLoop: while ((rowMatchStart + rowMatchCount) < this.BOARD_SIZE && this.gameBoard[rowMatchStart][r] == this.gameBoard[rowMatchStart + rowMatchCount][r]) {
                        rowMatchCount++;
                    }
        
                    // subtract 1 to get index of match end
                    rowMatchEnd = rowMatchStart + rowMatchCount - 1;
        
                    if (rowMatchCount >= this.MIN_MATCH_COUNT) {
                        const matchDetails = {
                            col: r,
                            rowStart: rowMatchStart,
                            rowEnd: rowMatchEnd,
                            rowMatchCount
                        };
                        colMatches.push(matchDetails);
                    }
                }
            }
        }
    
        return { rowMatches, colMatches };
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