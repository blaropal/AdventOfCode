const { getInputArray } = require("./input");

const instructions = getInputArray();

let depth = 0;
let distance = 0;

for (const instruction of instructions) {
    switch (instruction.direction) {
        case "forward":
            distance += instruction.distance;
            break;
        case "up":
            depth -= instruction.distance;
            break;
        case "down":
            depth += instruction.distance;
            break;
    }
}

const result = depth * distance;

console.log("Solution to 2.1", result);
