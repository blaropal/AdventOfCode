const fs = require("fs");

const getPaperData = () => {
    const inputLines = fs.readFileSync("./input.txt", "utf8").split(/\r?\n/);

    const seperatingIndex = inputLines.findIndex(item => item == "");

    return {
        dotPositions: inputLines.slice(0, seperatingIndex).map(item => {
            const parts = item.split(",");
            return { x: parseInt(parts[0]), y: parseInt(parts[1]) };
        }),
        foldInstructions: inputLines.slice(seperatingIndex + 1).map(item => {
            const parts = item.split(" ")[2].split("=");
            return { axis: parts[0], index: parseInt(parts[1]) };
        })
    };
}

const foldPaper = (dotPositions, fold) => {
    // Remove all dots on the fold line
    dotPositions = dotPositions.filter(pos => pos[fold.axis] != fold.index)
    // Mirror all points across the fold line
    dotPositions = dotPositions.map(pos => {
        if (pos[fold.axis] > fold.index) {
            pos[fold.axis] = pos[fold.axis] - ((pos[fold.axis] - fold.index) * 2);
        }
        return pos;    
    })
    // Remove duplicates
    dotPositions = dotPositions.filter((pos, index, self) => self.findIndex(otherPos => (otherPos.x === pos.x && otherPos.y === pos.y)) === index);
    return dotPositions;
}

module.exports = { getPaperData, foldPaper };