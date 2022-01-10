const { getPaperData, foldPaper } = require("./shared");

let { dotPositions, foldInstructions } = getPaperData();

for (const fold of foldInstructions) {
    dotPositions = foldPaper(dotPositions, fold);
}

let dotMap = [];
for (const pos of dotPositions) {
    if (dotMap[pos.y] == undefined) {
        dotMap[pos.y] = [];
    }
    dotMap[pos.y][pos.x] = "#";
}

console.log("Solution to 13.2:");

for (let i = 0; i < dotMap.length; i++) {
    let row = "";
    for (let j = 0; j < dotMap[i].length; j++) {
        row += dotMap[i][j] == undefined ? ' ' : dotMap[i][j];
    }
    console.log(row);
}

