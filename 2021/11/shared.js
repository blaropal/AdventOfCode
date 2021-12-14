const fs = require("fs");

const FLASH_STATUSES = {
    BUILDING: 0,
    PENDING: 1,
    FLASHED: 2
};

const getOctopuses = () => {
    return fs
        .readFileSync("./input.txt", "utf8")
        .split(/\r?\n/)
        .map(line => line
            .split("")
            .map(value => { 
                return { value: parseInt(value), flashStatus: FLASH_STATUSES.BUILDING}
            })
        );
}

const increaseValue = (octopus) => {
    if (octopus.value == 9) {
        octopus.flashStatus = octopus.flashStatus != FLASH_STATUSES.FLASHED ? FLASH_STATUSES.PENDING : octopus.flashStatus;
    } else {
        octopus.value += 1;
    }
}

const flash = (map, row, col) => {
    if (map[row][col].flashStatus == FLASH_STATUSES.FLASHED) {
        return;
    }
    map[row][col].flashStatus = FLASH_STATUSES.FLASHED;
    let spaceAbove = false;
    let spaceBelow = false;
    if (row > 0) {
        increaseValue(map[row - 1][col]);
        spaceAbove = true;
    }
    if (row < map.length - 1) {
        increaseValue(map[row + 1][col]);
        spaceBelow = true;
    }
    if (col > 0) {
        increaseValue(map[row][col - 1]);
        if (spaceAbove) {
            increaseValue(map[row - 1][col - 1]);
        }
        if (spaceBelow) {
            increaseValue(map[row + 1][col - 1]);
        }
    }
    if (col < map[row].length - 1) {
        increaseValue(map[row][col + 1]);
        if (spaceAbove) {
            increaseValue(map[row - 1][col + 1]);
        }
        if (spaceBelow) {
            increaseValue(map[row + 1][col + 1]);
        }
    }
}

const findAllPending = (map) => {
    const pending = [];
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            if (map[i][j].flashStatus == FLASH_STATUSES.PENDING) {
                pending.push({ row: i, col: j });
            }
        }
    }
    return pending;
}

const advance = (map) => {
    // Increase all values by 1, capped at 9
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            increaseValue(map[i][j]);
        }
    }

    // Flash octopuses
    let pendingFlashes = [];

    do {
        pendingFlashes = findAllPending(map);
        for (const pending of pendingFlashes) {
            flash(map, pending.row, pending.col);
        }
    } while (pendingFlashes.length > 0);

    // Reset
    const flashedOctopuses = map.flat().filter(octopus => octopus.flashStatus == FLASH_STATUSES.FLASHED);
    for (const octopus of flashedOctopuses) {
        octopus.value = 0;
        octopus.flashStatus = FLASH_STATUSES.BUILDING;
    }

    return flashedOctopuses.length;
}

module.exports = { getOctopuses, advance };