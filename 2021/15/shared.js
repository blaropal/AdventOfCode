const fs = require("fs");

const getInputLines = () => {
    return fs.readFileSync("./input.txt", "utf8").split(/\r?\n/).map(line => line.split("").map(value => parseInt(value)));
}

const generateTiledGraphLines = (y, x) => {
    const inputLines = getInputLines();
    let tileLines = [...inputLines];
    for (let i = 1; i < y; i++) {
        let newLines = [...inputLines];
        newLines = newLines.map(line => {
            return line.map(value => value + i <= 9 ? value + i : value + i - 9);
        });
        tileLines = tileLines.concat(newLines);
    }
    tileLines = tileLines.map(line => {
        let newLine = [...line];
        for (let i = 1; i < x; i++) {
            let newValues = [...line];
            newValues = newValues.map(value => value + i <= 9 ? value + i : value + i - 9);
            newLine =  newLine.concat(newValues);
        }
        return newLine;
    });
    return tileLines;
}

const getGraph = (inputLines) => {
    let graph = new Map();

    let counter = 0;
    inputLines.forEach((line, y) => {
        line.forEach((value, x) => {
            let neighbours = [];
            if (y > 0) {
                neighbours.push(counter - line.length);
            }
            if (y < inputLines.length - 1) {
                neighbours.push(counter + line.length);
            }
            if (x > 0) {
                neighbours.push(counter - 1);
            }
            if (x < line.length - 1) {
                neighbours.push(counter + 1);
            }
            graph.set(counter, {
                value,
                distance: Number.POSITIVE_INFINITY,
                neighbours,
                previous: null,
                checked: false
            });
            counter++;
        })
    })

    return graph;
}

const getShortestDistanceNode = (graph, unchecked) => {
    let shortest = Number.POSITIVE_INFINITY;
    let shortestId = null;

    for (const [key, value] of unchecked) {
        const value = graph.get(key).distance;
        if (value < shortest) { 
            shortest = value;
            shortestId = key;
        }
    }
    return [shortestId, graph.get(shortestId)];
}

// Find the shortest distance through the given 'graph' from 'start' to 'end' using Dijsktra's algorithm
const findShortestDistance = (graph, start, end) => {
    let startNode = graph.get(start);
    startNode.distance = 0;
    graph.set(start, startNode);
    let unchecked = new Map();
    unchecked.set(start, true);

    while (unchecked.size > 0) {
        let [ id, currentNode ] = getShortestDistanceNode(graph, unchecked);

        unchecked.delete(id);
        currentNode.checked = true;
        graph.set(id, currentNode);

        for (const neighbourId of currentNode.neighbours) {
            const neighbourNode = graph.get(neighbourId);
            if (!neighbourNode.checked) {
                unchecked.set(neighbourId, true);
            }
            if (currentNode.distance + neighbourNode.value < neighbourNode.distance) {
                neighbourNode.distance = currentNode.distance + neighbourNode.value;
                neighbourNode.previous = id;
                graph.set(neighbourId, neighbourNode);
            }
        }
    }

    return graph.get(end).distance;
}

module.exports = { getGraph, getInputLines, findShortestDistance, generateTiledGraphLines };