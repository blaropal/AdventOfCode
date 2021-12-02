const { getInputArray } = require("./input");

const instructions = getInputArray();

let depth = 0;
let distance = 0;
let aim = 0;

for (const instruction of instructions) {
    switch (instruction.direction) {
        case "forward":
            distance += instruction.distance;
            depth += instruction.distance * aim;
            break;
        case "up":
            aim -= instruction.distance;
            break;
        case "down":
            aim += instruction.distance;
            break;
        }
}

const result = depth * distance;

console.log("Solution to 2.1", result);
