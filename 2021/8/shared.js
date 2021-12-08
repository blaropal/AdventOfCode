const fs = require("fs");

const determinePatterns = (uniqueSignals) => {
    const one = uniqueSignals.splice(uniqueSignals.indexOf(uniqueSignals.find(signal => signal.length == 2)), 1)[0];
    const four = uniqueSignals.splice(uniqueSignals.indexOf(uniqueSignals.find(signal => signal.length == 4)), 1)[0];
    const seven = uniqueSignals.splice(uniqueSignals.indexOf(uniqueSignals.find(signal => signal.length == 3)), 1)[0];
    const eight = uniqueSignals.splice(uniqueSignals.indexOf(uniqueSignals.find(signal => signal.length == 7)), 1)[0];
    const nine = uniqueSignals.splice(uniqueSignals.indexOf(uniqueSignals.find(signal => one.concat(four).concat(seven).split("").every(value => signal.includes(value)))), 1)[0];
    const zero = uniqueSignals.splice(uniqueSignals.indexOf(uniqueSignals.find(signal => signal.length == 6 && one.concat(seven).split("").every(value => signal.includes(value)))), 1)[0];
    const three = uniqueSignals.splice(uniqueSignals.indexOf(uniqueSignals.find(signal => signal.length == 5 && one.split("").every(value => signal.includes(value)))), 1)[0];
    const six = uniqueSignals.splice(uniqueSignals.indexOf(uniqueSignals.find(signal => signal.length == 6)), 1)[0];
    const two = uniqueSignals.splice(uniqueSignals.indexOf(uniqueSignals.find(signal => signal.includes(one.split("").find(value => !six.includes(value))))), 1)[0];
    const five = uniqueSignals.splice(0, 1)[0];
    return {
        0: zero,
        1: one,
        2: two,
        3: three,
        4: four,
        5: five,
        6: six,
        7: seven,
        8: eight,
        9: nine
    }
}

const getSignalPatterns = () => {
    let renderInputs = [];
    const inputLines = fs.readFileSync("./input.txt", "utf8").split(/\r?\n/);
    for (const line of inputLines) {
        const parts = line.split("|");
        const uniqueSignals = parts[0].trim().split(" ");
        const digitMap = determinePatterns(uniqueSignals);
        renderInputs.push({
            digitMap: digitMap,
            digitSignals: parts[1].trim().split(" ")
        });
    }
    return renderInputs;
}

const checkIfStringsContainSameCharacters = (string1, string2) => {
    const sortCharacters = (value) => value.split('').sort().join("");
    const first = sortCharacters(string1);
    const second = sortCharacters(string2);
    return first == second;
}

module.exports = { getSignalPatterns, checkIfStringsContainSameCharacters };