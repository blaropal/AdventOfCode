const { getHeightMap } = require("./shared");

const heightMap = getHeightMap();

let sum = 0;

for (let i = 0; i < heightMap.length; i++) {
    for (let j = 0; j < heightMap[i].length; j++) {
        if (
            (j != heightMap[i].length - 1 && heightMap[i][j] >= heightMap[i][j+1]) ||
            (j != 0 && heightMap[i][j] >= heightMap[i][j-1]) ||
            (i != heightMap.length - 1 && heightMap[i][j] >= heightMap[i+1][j]) ||
            (i != 0 && heightMap[i][j] >= heightMap[i-1][j])
            ) {
            continue;
        }
        sum += 1 + heightMap[i][j];
    }
}

console.log("Solution to 9.1", sum);