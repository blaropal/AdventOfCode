const fs = require("fs");

const getInputArray = () => {
    let instructions = [];
    fs.readFileSync("./input.txt", "utf8")
      .split(/\r?\n/)
      .forEach(line => {
          const parts = line.split(" ");
          instructions.push({
              direction: parts[0],
              distance: parseInt(parts[1])
          })
      });
    return instructions;
}

module.exports = { getInputArray };