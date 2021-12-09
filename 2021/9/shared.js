const fs = require("fs");

const getHeightMap = () => {
    let heightMap = [];
    const inputLines = fs.readFileSync("./input.txt", "utf8").split(/\r?\n/);
    inputLines.forEach(line => heightMap.push(line.split("").map(part => parseInt(part))));
    return heightMap;
}

module.exports = { getHeightMap };