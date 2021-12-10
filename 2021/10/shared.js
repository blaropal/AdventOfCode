const fs = require("fs");

const CHUNK_SYMBOLS = [
    { open: "(", close: ")" },
    { open: "[", close: "]" },
    { open: "{", close: "}" },
    { open: "<", close: ">" }
];

const getChunkLines = () => {
    const inputLines = fs.readFileSync("./input.txt", "utf8").split(/\r?\n/);
    return inputLines;
}

const checkIfCorrupted = (symbol, previousOpenSymbol) => {
    for (const symbolSet of CHUNK_SYMBOLS) {
        if (symbol == symbolSet.close) {
            return previousOpenSymbol != symbolSet.open;
        }
    }
    return false;
}

const filterCorruptedLines = (lines) => {
    const corruptedLines = [];
    for (const line of lines) {
        const symbols = line.split("");
        let openChunks = [];
        for (const symbol of symbols) {
            if (CHUNK_SYMBOLS.map(set => set.close).includes(symbol)) {
                if (checkIfCorrupted(symbol, openChunks[openChunks.length - 1])) {
                    corruptedLines.push({ line, corruptSymbol: symbol });
                    break;
                } else {
                    openChunks.pop();
                }
            } else {
                openChunks.push(symbol);
            }
        }
    }
    return corruptedLines;
}

const filterValidLines = (lines) => {
    const validLines = [];
    for (const line of lines) {
        const symbols = line.split("");
        let openChunks = [];
        let isCorrupt = false;
        for (const symbol of symbols) {
            if (CHUNK_SYMBOLS.map(set => set.close).includes(symbol)) {
                if (checkIfCorrupted(symbol, openChunks[openChunks.length - 1])) {
                    isCorrupt = true;
                    break;
                } else {
                    openChunks.pop();
                }
            } else {
                openChunks.push(symbol);
            }
        }
        if (!isCorrupt) {
            validLines.push({ line, remaining: openChunks.reverse().map(symbol => CHUNK_SYMBOLS.find(item => item.open == symbol).close) });
        }
    }
    return validLines;
}

module.exports = { getChunkLines, filterCorruptedLines, filterValidLines };