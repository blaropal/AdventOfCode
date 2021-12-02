const { getInputArray } = require("./input");

const numbers = getInputArray();
let incrementCount = 0;

for (let i = 1; i < numbers.length; i++) {
    if (numbers[i] > numbers[i-1]) { incrementCount++ };
}

console.log("Solution to 1.1", incrementCount);
