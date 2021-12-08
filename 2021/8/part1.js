const { getSignalPatterns, checkIfStringsContainSameCharacters } = require("./shared");

const signals = getSignalPatterns();
let count = 0;

for (const signal of signals) {
    for (const digit of signal.digitSignals) {
        if (
            checkIfStringsContainSameCharacters(digit, signal.digitMap[1]) || 
            checkIfStringsContainSameCharacters(digit, signal.digitMap[4]) || 
            checkIfStringsContainSameCharacters(digit, signal.digitMap[7]) ||
            checkIfStringsContainSameCharacters(digit, signal.digitMap[8])
            ) {
                count ++;
            }
    }
}

console.log("Solution to 8.1", count);