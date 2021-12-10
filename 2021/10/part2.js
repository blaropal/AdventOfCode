const { getChunkLines, filterValidLines } = require("./shared");

const SYMBOL_VALUES = {
    ")": 1,
    "]": 2,
    "}": 3,
    ">": 4
};


const lines = getChunkLines();
const validLines = filterValidLines(lines);

let scores = [];
let score = 0;

for (const line of validLines) {
    for (const symbol of line.remaining) {
        score *= 5;
        score += SYMBOL_VALUES[symbol];
    }
    scores.push(score);
    score = 0;
}

scores = scores.sort((a, b) => a - b);

console.log("Solution to 10.2", scores[Math.floor(scores.length / 2)]);