const HMACGenerator = require('./hmacGenerator');
const GameRules = require('./gameRules');
class Game {
    constructor(moves) {
        this.moves = moves;
        this.rules = new GameRules(moves);
    }
    start() {
        const key = HMACGenerator.generateKey();
        const computerMove = this._getRandomMove();
        const hmac = HMACGenerator.calculateHMAC(key, computerMove);
        console.log(`HMAC: ${hmac}`);
        this._displayAvailableMoves();
        process.stdin.resume();
        process.stdin.setEncoding('utf8');
        process.stdin.on('data', (input) => this._handleInput(input, key, computerMove));
    }
    _getRandomMove() {
        const computerMoveIndex = Math.floor(Math.random() * this.moves.length);
        return this.moves[computerMoveIndex];
    }
    _displayAvailableMoves() {
        console.log('Available moves:');
        this.moves.forEach((move, index) => {
            console.log(`${index + 1} - ${move}`);
        });
        console.log('0 - exit');
        console.log('? - help');
    }
    _handleInput(input, key, computerMove) {
        input = input.trim();
        if (input === '0') {
            console.log('Game exited.');
            process.exit();
        } else if (input === '?') {
            console.log(this.rules.generateHelpTable());
        } else {
            const playerMoveIndex = parseInt(input, 10) - 1;
            if (playerMoveIndex >= 0 && playerMoveIndex < this.moves.length) {
                const playerMove = this.moves[playerMoveIndex];
                console.log(`Your move: ${playerMove}`);
                console.log(`Computer move: ${computerMove}`);
                console.log(this.rules.determineWinner(playerMove, computerMove));
                console.log(`HMAC key: ${key}`);
                process.exit();
            } else {
                console.log('Invalid move. Please try again.');
            }
        }
    }
}
module.exports = Game;
