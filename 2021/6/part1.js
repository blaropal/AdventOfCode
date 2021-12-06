const { getFishMap, simulateDay, countFish } = require("./shared");
const DAY_COUNT = 80;

let fishMap = getFishMap();

for (let i = 0; i < DAY_COUNT; i++) {
    simulateDay(fishMap);
}

console.log("Solution to 6.1", countFish(fishMap));