const { getAllLines, getIntersectingPointCount } = require("./shared");

const lines = getAllLines();

console.log("Solution to 5.2", getIntersectingPointCount(lines));