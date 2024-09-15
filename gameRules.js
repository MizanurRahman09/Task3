const Table = require('cli-table3');
class GameRules {
    constructor(moves) {
        this.moves = moves;
    }
    determineWinner(playerMove, computerMove) {
        const moveCount = this.moves.length;
        const playerIndex = this.moves.indexOf(playerMove);
        const computerIndex = this.moves.indexOf(computerMove);
        const half = Math.floor(moveCount / 2);
        if (playerIndex === computerIndex) {
            return "It's a draw!";
        }
        if ((playerIndex < computerIndex && computerIndex <= playerIndex + half) ||
            (playerIndex > computerIndex && computerIndex + moveCount <= playerIndex + half)) {
            return "Computer wins!";
        } else {
            return "Player wins!";
        }
    }
    generateHelpTable() {
        const table = new Table({
            head: ['', ...this.moves],
            colWidths: new Array(this.moves.length + 1).fill(10)
        });
        for (let i = 0; i < this.moves.length; i++) {
            const row = [this.moves[i]];
            for (let j = 0; j < this.moves.length; j++) {
                row.push(this._getResult(i, j));
            }
            table.push(row);
        }
        return table.toString();
    }
    _getResult(playerIndex, computerIndex) {
        const moveCount = this.moves.length;
        const half = Math.floor(moveCount / 2);
        if (playerIndex === computerIndex) {
            return 'Draw';
        } else if ((playerIndex < computerIndex && computerIndex <= playerIndex + half) ||
                   (playerIndex > computerIndex && computerIndex + moveCount <= playerIndex + half)) {
            return 'Win';
        } else {
            return 'Lose';
        }
    }
}
module.exports = GameRules;
