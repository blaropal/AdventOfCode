const { getData, step, calculateMinMaxCountDifference } = require("./shared");

let { pairs, rules, value } = getData();

for (let i = 0; i < 40; i++) {
    pairs = step(pairs, rules);
}

console.log("Solution to 14.2", calculateMinMaxCountDifference(pairs, value));