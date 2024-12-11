package main

import (
	utils "2024"
	"fmt"
	"strconv"
	"strings"
)

func removeIndex(s []string, index int) []string {
    ret := make([]string, 0)
    ret = append(ret, s[:index]...)
    return append(ret, s[index+1:]...)
}

func checkSafeLines(lines []string, allowedBadLevels int) int {
	safeCount := 0
	
	for _, line := range lines {
		fields := strings.Fields(line);

		if (checkSafeLine(fields, allowedBadLevels)) {
			safeCount += 1
		}
	}

	return safeCount
}

func checkSafeLine(fields []string, allowedBadLevels int) bool {
	first, _ := strconv.Atoi(fields[0])
	last, _ := strconv.Atoi(fields[len(fields) - 1])

	direction := ""
	if first > last {
		direction = "desc"
	} else {
		direction = "asc"
	}

	previousValue := 0
	nextValue := 0

	for index, field := range fields {
		badLevel := false
		nextValue, _ = strconv.Atoi(field);

		if (previousValue > 0) {
			difference := nextValue - previousValue

			if (difference > 3 || difference < -3 || difference == 0) {
				badLevel = true
			}

			if ((direction == "asc" && previousValue > nextValue) || (direction == "desc" && previousValue < nextValue)) {
				badLevel = true
			}
		}

		if (badLevel) { 
			if (allowedBadLevels > 0) {
				return checkSafeLine(removeIndex(fields, index-1), allowedBadLevels - 1) || checkSafeLine(removeIndex(fields, index), allowedBadLevels - 1)
			} else {
				return false
			}
		} else {
			previousValue = nextValue
		}
	}
	return true
}

func main() {
	lines := utils.ReadLines("./input.txt")

	fmt.Printf("Part 1: %d\n", checkSafeLines(lines, 0))
	fmt.Printf("Part 2: %d\n", checkSafeLines(lines, 1))
}