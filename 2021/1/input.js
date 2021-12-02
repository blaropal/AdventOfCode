const fs = require("fs");

const getInputArray = () => {
    let numbers = [];
    fs.readFileSync("./input.txt", "utf8")
      .split(/\r?\n/)
      .map(line => parseInt(line))
      .forEach(number => numbers.push(number));
    return numbers;
}

module.exports = { getInputArray };