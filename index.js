const Validator = require('./validator');
const Game = require('./game');
const args = process.argv.slice(2);
const validationError = Validator.validateMoves(args);
if (validationError) {
    console.log(validationError);
    console.log("Example usage: node index.js Rock Paper Scissors");
} else {
    const game = new Game(args);
    game.start();
}
