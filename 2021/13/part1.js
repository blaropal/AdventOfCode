const { getPaperData, foldPaper } = require("./shared");

let { dotPositions, foldInstructions } = getPaperData();

dotPositions = foldPaper(dotPositions, foldInstructions.shift());

console.log("Solution to 13.1", dotPositions.length);
