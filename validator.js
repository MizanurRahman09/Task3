class Validator {
    static validateMoves(moves) {
        if (moves.length % 2 === 0 || moves.length < 3) {
            return "Error: The number of moves must be an odd number and at least 3.";
        }
        if (new Set(moves).size !== moves.length) {
            return "Error: All moves must be unique.";
        }
        return null;
    }
}
module.exports = Validator;
