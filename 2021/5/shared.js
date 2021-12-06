const fs = require("fs");

const getAllLines = () => {
    const inputLines = fs.readFileSync("./input.txt", "utf8").split(/\r?\n/);
    return inputLines
    .map(line => { 
            const points = line
            .split(" -> ")
            .map(part => { 
                const numbers = part.split(",").map(part => parseInt(part));
                return {
                    x: numbers[0],
                    y: numbers[1]
                };
            })
            return {
                from: points[0],
                to: points[1]
            };
        }
    );
}

const getAxisAlignedLines = () => {
    return getAllLines().filter(line => line.from.x == line.to.x || line.from.y == line.to.y);
}

const getIntersectingPointCount = (lines) => {
    const map = {};
    for (const line of lines) {
        const points = getAllLinePoints(line);
        for (const point of points) {
            const id = `${point.x}.${point.y}`;
            map[id] = map[id] == undefined ? 1 : map[id] + 1;
        }
    }
    return Object.values(map).filter(item => item > 1).length;
}

const getAllLinePoints = (line) => {
    let xValues = [];
    let yValues = [];
    if (line.from.x == line.to.x) {
        yValues = getRangeBetween(line.from.y, line.to.y);
        xValues = Array(yValues.length).fill(line.from.x);
    } else if (line.from.y == line.to.y) {
        xValues = getRangeBetween(line.from.x, line.to.x);
        yValues = Array(xValues.length).fill(line.from.y);
    } else {
        xValues = getRangeBetween(line.from.x, line.to.x);
        yValues = getRangeBetween(line.from.y, line.to.y);
    }
    
    const points = [];
    xValues.forEach((value, index) => points.push({ x: value, y: yValues[index] }));
    return points;
}

const getRangeBetween = (first, second) => {
    if (first < second) {
        return Array(second - first + 1).fill().map((_, index) => first + index);
    }
    return Array(first - second + 1).fill().map((_, index) => first - index);
}

module.exports = { getAllLines, getAxisAlignedLines, getIntersectingPointCount };