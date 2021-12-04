const { getInputLines, getBitCount } = require("./shared");

const getBitLineByType = (lines, index, type) => {
    if (lines.length == 1) {
        return lines[0];
    }

    const bitCount = getBitCount(lines);

    if (bitCount[index] >= lines.length / 2) {
        lines = lines.filter(line => line[index] == (type == "MAJORITY" ? "1" : "0"));
    } else {
        lines = lines.filter(line => line[index] == (type == "MAJORITY" ? "0" : "1"));
    }

    return getBitLineByType(lines, index + 1, type);
}

const lines = getInputLines();

const oxygenGeneratorRating = parseInt(getBitLineByType(lines, 0, "MAJORITY"), 2);
const co2ScrubberRating = parseInt(getBitLineByType(lines, 0, "MINORITY"), 2);

console.log("Solution to 3.2", oxygenGeneratorRating * co2ScrubberRating);
