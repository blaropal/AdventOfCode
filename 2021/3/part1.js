const { processInput } = require("./input");

const generateBinaryString = (processedInput) => {
    var result = "";
    for (const prop in processedInput.bitCount) {
        if (processedInput.bitCount[prop] < processedInput.numLines / 2) {
            result += "0";
        } else {
            result += "1";
        }
    }
    return result;
}

const calculate = (processedInput) => {
    const gammaBinary = generateBinaryString(processedInput);
    const epsilonBinary = gammaBinary.split("").map(char => char == "0" ? "1" : "0").join("");
    const gamma = parseInt(gammaBinary, 2);
    const epsilon = parseInt(epsilonBinary, 2);
    console.log("Solution to 3.1", gamma * epsilon);
};

processInput(calculate);
