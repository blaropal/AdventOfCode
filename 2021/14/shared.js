const fs = require("fs");

const getData = () => {
    const inputLines = fs.readFileSync("./input.txt", "utf8").split(/\r?\n/);

    const rules = {};
    inputLines.slice(2).forEach(item => {
        const parts = item.split("->");
        rules[parts[0].trim()] = parts[1].trim();
    });

    const values = inputLines[0].split("");
    const pairs = new Map();

    for (let i = 0; i < values.length - 1; i++) {
        const currentValue = pairs.get(values[i] + values[i+1]);
        pairs.set(values[i] + values[i+1], currentValue != undefined ? currentValue + 1 : 1);
    }

    return {
        pairs,
        rules,
        value: inputLines[0]
    };
}

const step = (pairs, rules) => {
    const newPairs = new Map();
    for (const [key, value] of pairs) {
        const appendedKey = key[0] + rules[key];
        const prependedKey = rules[key] + key[1];
        newPairs.set(appendedKey, newPairs.get(appendedKey) == undefined ? value : newPairs.get(appendedKey) + value);
        newPairs.set(prependedKey, newPairs.get(prependedKey) == undefined ? value : newPairs.get(prependedKey) + value);
    }
    return newPairs;
}

const calculateMinMaxCountDifference = (pairs, value) => {
    const map = new Map();

    for (const [key, value] of pairs) {
        map.set(key[0], map.get(key[0]) == undefined ? value : map.get(key[0]) + value);
        map.set(key[1], map.get(key[1]) == undefined ? value : map.get(key[1]) + value);
    }

    map.set(value[0], map.get(value[0]) + 1);
    map.set(value[value.length - 1], map.get(value[value.length - 1]) + 1);

    let high = 0;
    let low = 0;
    for (const [key, value] of map) {
        if (high === 0) {
            high = value;
        } else {
            high = value > high ? value : high;
        }

        if (low === 0) {
            low = value;
        } else {
            low = value < low ? value : low;
        }
    }

    return (high - low) / 2;
}

module.exports = { getData, step, calculateMinMaxCountDifference };