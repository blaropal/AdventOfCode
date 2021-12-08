const { getSignalPatterns, checkIfStringsContainSameCharacters } = require("./shared");

const signals = getSignalPatterns();
let sum = 0;

for (const signal of signals) {
    let numberString = "";
    for (const digit of signal.digitSignals) {
        if (checkIfStringsContainSameCharacters(digit, signal.digitMap[0])) { numberString += "0" }
        if (checkIfStringsContainSameCharacters(digit, signal.digitMap[1])) { numberString += "1" }
        if (checkIfStringsContainSameCharacters(digit, signal.digitMap[2])) { numberString += "2" }
        if (checkIfStringsContainSameCharacters(digit, signal.digitMap[3])) { numberString += "3" }
        if (checkIfStringsContainSameCharacters(digit, signal.digitMap[4])) { numberString += "4" }
        if (checkIfStringsContainSameCharacters(digit, signal.digitMap[5])) { numberString += "5" }
        if (checkIfStringsContainSameCharacters(digit, signal.digitMap[6])) { numberString += "6" }
        if (checkIfStringsContainSameCharacters(digit, signal.digitMap[7])) { numberString += "7" }
        if (checkIfStringsContainSameCharacters(digit, signal.digitMap[8])) { numberString += "8" }
        if (checkIfStringsContainSameCharacters(digit, signal.digitMap[9])) { numberString += "9" }
    }
    sum += parseInt(numberString);
}

console.log("Solution to 8.2", sum);