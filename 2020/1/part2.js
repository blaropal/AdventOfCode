const { getInputArray } = require("./input");

const numbers = getInputArray();
let incrementCount = 0;

for (let i = 3; i < numbers.length; i++) {
    const firstSet = numbers[i-1] + numbers[i-2] + numbers[i-3];
    const secondSet = numbers[i] + numbers[i-1] + numbers[i-2];

    if (firstSet < secondSet) { incrementCount++ }
}

console.log("Solution to 1.2", incrementCount);

