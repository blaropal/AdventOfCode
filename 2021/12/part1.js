const { generateNodes, generatePaths, CAVE_SIZE } = require("./shared");

const stopPathCondition = (path, nodes) => {
    let nodeCount = {};
    for (const node of path) {
        if (nodes[node].size == CAVE_SIZE.SMALL) {
            nodeCount[node] = nodeCount[node] == undefined ? 1 : nodeCount[node] + 1;
        }
    }
    let counts = Object.values(nodeCount);

    if (counts.some(item => item > 1)) {
        return true;
    }
    return false;
}

const nodes = generateNodes();
const paths = generatePaths(nodes, stopPathCondition);

console.log("Solution to 12.1", paths.length);