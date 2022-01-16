const { getGraph, getInputLines, findShortestDistance } = require("./shared");

let graph = getGraph(getInputLines());

let topLeftKey = [...graph][0][0];
let bottomLeftKey = [...graph][graph.size - 1][0];

console.log("Solution to 15.1", findShortestDistance(graph, topLeftKey, bottomLeftKey));