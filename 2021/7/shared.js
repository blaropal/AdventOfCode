const fs = require("fs");

const getPositions = () => {
    return fs.readFileSync("./input.txt", "utf8").split(",").map(part => parseInt(part));
};

module.exports = { getPositions };