const fs = require("fs");

const getInputLines = () => {
    const lines = [];
    fs.readFileSync("./input.txt", "utf8")
      .split(/\r?\n/)
      .forEach(line => lines.push(line));

    return lines;
}

const getBitCount = (lines) => {
    let bitCount = {};

    for (const line of lines) {
        for (var i = 0; i < line.length; i++) {
            if (bitCount[i] == undefined) {
                bitCount[i] = 0;
            }
            bitCount[i] += parseInt(line[i]);
        }
    }

    return bitCount;
}

module.exports = { getInputLines, getBitCount };