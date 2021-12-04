const { getInputLines, getBitCount } = require("./shared");

const generateBinaryString = (bitCount, numLines) => {
    var result = "";
    for (const prop in bitCount) {
        if (bitCount[prop] < numLines / 2) {
            result += "0";
        } else {
            result += "1";
        }
    }
    return result;
}

const flipAllBits = (binary) => {
    return binary.split("").map(char => char == "0" ? "1" : "0").join("");
}

const calculate = (bitCount, numLines) => {
    const gammaBinary = generateBinaryString(bitCount, numLines);
    const epsilonBinary = flipAllBits(gammaBinary);
    const gamma = parseInt(gammaBinary, 2);
    const epsilon = parseInt(epsilonBinary, 2);
    console.log("Solution to 3.1", gamma * epsilon);
};

const lines = getInputLines();
const bitCount = getBitCount(lines);

calculate(bitCount, lines.length);
