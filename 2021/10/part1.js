const { getChunkLines, filterCorruptedLines } = require("./shared");

const SYMBOL_VALUES = {
    ")": 3,
    "]": 57,
    "}": 1197,
    ">": 25137
};

const chunkLines = getChunkLines();
const corruptLines = filterCorruptedLines(chunkLines);

let sum = 0;

for (const line of corruptLines) {
    sum += SYMBOL_VALUES[line.corruptSymbol];
}

console.log("Solution to 10.1", sum);