const { getGraph, findShortestDistance, generateTiledGraphLines } = require("./shared");

let inputLines = generateTiledGraphLines(5, 5);

let graph = getGraph(inputLines);

let topLeftKey = [...graph][0][0];
let bottomLeftKey = [...graph][graph.size - 1][0];

console.log("Solution to 15.2", findShortestDistance(graph, topLeftKey, bottomLeftKey));