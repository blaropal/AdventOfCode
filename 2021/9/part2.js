const { getHeightMap } = require("./shared");

const heightMap = getHeightMap();

let basins = [];

const calculateBasinSize = (i, j, visited) => {
    if (heightMap[i][j] == 9 || visited.includes(`${i}.${j}`)) {
        return 0;
    }
    visited.push(`${i}.${j}`);
    let size = 1;
    if (j != 0 && heightMap[i][j] < heightMap[i][j-1]) {
        size += calculateBasinSize(i, j-1, visited);
    }
    if (j != heightMap[i].length - 1 && heightMap[i][j] < heightMap[i][j+1]) {
        size += calculateBasinSize(i, j+1, visited);
    }
    if (i != 0 && heightMap[i][j] < heightMap[i-1][j]) {
        size += calculateBasinSize(i-1, j, visited);
    }
    if (i != heightMap.length - 1 && heightMap[i][j] < heightMap[i+1][j]) {
        size += calculateBasinSize(i+1, j, visited);
    }
    return size;
}

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
        basins.push(calculateBasinSize(i, j, []));
    }
}

basins.sort((a, b) => b - a);

console.log("Solution to 9.2", basins.slice(0, 3).reduce((a, b) => a * b));