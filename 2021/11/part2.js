const { getOctopuses, advance } = require("./shared");

let octopuses = getOctopuses();
const octopusCount = octopuses.flat().length;

let flashes = 0;
let counter = 0;
while (flashes != octopusCount) {
    flashes = advance(octopuses);
    counter++;
}
console.log("Solution to 11.2", counter);