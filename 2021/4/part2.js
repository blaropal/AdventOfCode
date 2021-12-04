const { initializeBingo, markNumber, checkWin, calculateScore } = require("./shared");

const { numbers, boards } = initializeBingo();

let boardsWon = { count: 0 };

for (const number of numbers) {
    boards.forEach((board, index) => {
        markNumber(board, number);
        if (checkWin(board) && !boardsWon[index]) {
            boardsWon.count = boardsWon.count + 1;
            boardsWon[index] = true;
            if (boardsWon.count == boards.length) {
                console.log("Solution to 4.2", calculateScore(board, number));
            }
        }
    })
}