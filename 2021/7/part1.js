const { getPositions } = require("./shared");

let positions = getPositions();
positions = positions.sort();

const min = positions[0];
const max = positions[positions.length - 1];

let best = 0;
let lastBest = 0;
for (let i = min; i < max; i++) {
  lastBest = best;
  best = 0;
  for (const position of positions) {
    best += Math.abs(position - i);
  }
  if (best > lastBest && i != min) {
    console.log("Solution to 7.1", lastBest);
    break;
  }
}