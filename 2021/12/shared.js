const fs = require("fs");

const CAVE_SIZE = {
    SMALL: 0,
    LARGE: 1
};

const generateNodes = () => {
    const inputLines = fs.readFileSync("./input.txt", "utf8").split(/\r?\n/);
    const nodes = {};

    inputLines.forEach(line => {
        caves = line.split("-");
        for (const cave of caves) {
            if (nodes[cave] == null) {
                nodes[cave] = {
                    size: /^[A-Z]*$/.test(cave) ? CAVE_SIZE.LARGE : CAVE_SIZE.SMALL,
                    connections: []
                };
            }
            nodes[cave].connections = nodes[cave].connections.concat(caves.filter(item => item != cave));
        }
    });

    return nodes;
}

const traverse = (nodes, nodeId, path, stopPathCondition) => {
    let paths = [];
    if (nodeId == "end") {
        paths.push(path);
    } else {
        for (const nextNodeId of nodes[nodeId].connections) {
            if (stopPathCondition(path, nodes)) {
                continue;
            }
            paths = paths.concat(traverse(nodes, nextNodeId, path.concat(nextNodeId), stopPathCondition));
        }
    }
    return paths;
}

const generatePaths = (nodes, stopPathCondition) => {
    return traverse(nodes, "start", ["start"], stopPathCondition);
}

module.exports = { generateNodes, generatePaths, CAVE_SIZE };