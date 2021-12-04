const fs = require("fs");

const createBoard = (boardLines) => {
    const board = [];
    for (const line of boardLines) {
        let numbers = line.split(/(\s+)/).filter(part => part.trim().length > 0).map(number => { return { value: parseInt(number), marked: false }});
        board.push(numbers);
    }
    return board;
}

const initializeBingo = () => {
    const lines = fs.readFileSync("./input.txt", "utf8").split(/\r?\n/);
    let numbers = lines[0].split(",").map(number => parseInt(number));
    let boards = [];

    let boardLines = [];
    for (let i = 2; i < lines.length; i++) {
        if (lines[i] == "") {
            boards.push(createBoard(boardLines));
            boardLines = [];
        }
        else {
            boardLines.push(lines[i]);
        }
    }

    return { numbers, boards };
}

const markNumber = (board, number) => {
    for (const line of board) {
        for (const cell of line) {
            if (cell.value == number) {
                cell.marked = true;
            }
        }
    }
};

const checkWin = (board) => {
    for (let i = 0; i < board.length; i++) {
        if (board[i].every(cell => cell.marked == true)) {
            return true;
        }
        let column = board.map(line => line[i]);
        if (column.every(cell => cell.marked == true)) {
            return true;
        }
    }
    return false;
}

const calculateScore = (board, number) => {
    let sum = 0;
    board.forEach(line => line.forEach(cell => sum = (cell.marked ? sum : sum + cell.value)));
    return sum * number;
}

module.exports = { initializeBingo, markNumber, checkWin, calculateScore };