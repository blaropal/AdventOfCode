const fs = require("fs");
const readline = require("readline");

const processInput = (callback) => {
    const rl = readline.createInterface({
        input: fs.createReadStream("./input.txt"),
        output: process.stdout,
        terminal: false
    });

    let bitCount = {};
    let numLines = 0;

    rl.on("line", (line) => {
        for (var i = 0; i < line.length; i++) {
            if (bitCount[i] == undefined) {
                bitCount[i] = 0;
            }
            bitCount[i] += parseInt(line[i]);
        }
        numLines++;
    });

    rl.on("close", () => {
        const result =  {
            bitCount,
            numLines
        };

        callback(result);
    });
}

module.exports = { processInput };