const fs = require("fs");

const getFishMap = () => {
    const fishMap = { "-1": 0, 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0 };
    const input = fs.readFileSync("./input.txt", "utf8").split(",");
    input.forEach(value => fishMap[value] += 1);
    return fishMap;
}

const simulateDay = (fishMap) => {
    const keys = Object.keys(fishMap).sort();
    for (let i = 0; i < keys.length - 1; i ++) {
        fishMap[i-1] = fishMap[i];
    }
    fishMap[8] = fishMap[-1];
    fishMap[6] += fishMap[-1];
    fishMap[-1] = 0;
}

const countFish = (fishMap) => {
    const keys = Object.keys(fishMap);
    let count = 0;
    for (const key of keys) {
        count += fishMap[key];
    }
    return count;
}

module.exports = { getFishMap, simulateDay, countFish };