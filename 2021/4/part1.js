const { initializeBingo, markNumber, checkWin, calculateScore } = require("./shared");

const { numbers, boards } = initializeBingo();

for (const number of numbers) {
    for (const board of boards) {
        markNumber(board, number);
        if (checkWin(board)) {
            console.log("Solution to 4.1", calculateScore(board, number));
            return;
        }
    }
}