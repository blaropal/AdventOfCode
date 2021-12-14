const { getOctopuses, advance } = require("./shared");
const NUM_STEPS = 100;

let octopuses = getOctopuses();

let flashes = 0;
for (let i = 0; i < NUM_STEPS; i++) {
    flashes += advance(octopuses);
}
console.log("Solution to 11.1", flashes);