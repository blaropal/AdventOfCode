const { getAxisAlignedLines, getIntersectingPointCount } = require("./shared");

const lines = getAxisAlignedLines();

console.log("Solution to 5.1", getIntersectingPointCount(lines));