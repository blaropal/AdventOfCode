const { getData, step, calculateMinMaxCountDifference } = require("./shared");

let { pairs, rules, value } = getData();

for (let i = 0; i < 10; i++) {
    pairs = step(pairs, rules);
}

console.log("Solution to 14.1", calculateMinMaxCountDifference(pairs, value));