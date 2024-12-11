package main

import (
	utils "2024"
	"fmt"
)

/*
	Character values:
	- X: 88
	- M: 77
	- A: 65
	- S: 83
*/

type Point struct {
	X, Y int
}

// Check X position in map for occurrences of the word XMAS
func checkXPosition(point Point, charMap map[Point]rune) int {
	wordCount := 0

	// Right
	if (charMap[Point{X: point.X + 1, Y: point.Y}] == 77 && charMap[Point{X: point.X + 2, Y: point.Y}] == 65 && charMap[Point{X: point.X + 3, Y: point.Y}] == 83) {
		wordCount += 1
	}

	// Left
	if (charMap[Point{X: point.X - 1, Y: point.Y}] == 77 && charMap[Point{X: point.X - 2, Y: point.Y}] == 65 && charMap[Point{X: point.X - 3, Y: point.Y}] == 83) {
		wordCount += 1
	}
	
	// Up
	if (charMap[Point{X: point.X, Y: point.Y - 1}] == 77 && charMap[Point{X: point.X, Y: point.Y - 2}] == 65 && charMap[Point{X: point.X, Y: point.Y - 3}] == 83) {
		wordCount += 1
	}
	
	// Down
	if (charMap[Point{X: point.X, Y: point.Y + 1}] == 77 && charMap[Point{X: point.X, Y: point.Y + 2}] == 65 && charMap[Point{X: point.X, Y: point.Y + 3}] == 83) {
		wordCount += 1
	}

	// Diagonal down right
	if (charMap[Point{X: point.X + 1, Y: point.Y + 1}] == 77 && charMap[Point{X: point.X + 2, Y: point.Y + 2}] == 65 && charMap[Point{X: point.X + 3, Y: point.Y + 3}] == 83) {
		wordCount += 1
	}

	// Diagonal up right
	if (charMap[Point{X: point.X + 1, Y: point.Y - 1}] == 77 && charMap[Point{X: point.X + 2, Y: point.Y - 2}] == 65 && charMap[Point{X: point.X + 3, Y: point.Y - 3}] == 83) {
		wordCount += 1
	}
	
	// Diagonal up left
	if (charMap[Point{X: point.X - 1, Y: point.Y - 1}] == 77 && charMap[Point{X: point.X - 2, Y: point.Y - 2}] == 65 && charMap[Point{X: point.X - 3, Y: point.Y - 3}] == 83) {
		wordCount += 1
	}

	// Diagonal down left
	if (charMap[Point{X: point.X - 1, Y: point.Y + 1}] == 77 && charMap[Point{X: point.X - 2, Y: point.Y + 2}] == 65 && charMap[Point{X: point.X - 3, Y: point.Y + 3}] == 83) {
		wordCount += 1
	}
	
	return wordCount
}

func checkAPosition(point Point, charMap map[Point]rune) int {
	wordCount := 0

	// M.S
	// .A.
	// M.S
	if (charMap[Point{X: point.X - 1, Y: point.Y - 1}] == 77 && charMap[Point{X: point.X + 1, Y: point.Y + 1}] == 83 && charMap[Point{X: point.X - 1, Y: point.Y + 1}] == 77  && charMap[Point{X: point.X + 1, Y: point.Y - 1}] == 83) {
		wordCount += 1
	}

	// M.M
	// .A.
	// S.S
	if (charMap[Point{X: point.X - 1, Y: point.Y - 1}] == 77 && charMap[Point{X: point.X + 1, Y: point.Y + 1}] == 83 && charMap[Point{X: point.X - 1, Y: point.Y + 1}] == 83  && charMap[Point{X: point.X + 1, Y: point.Y - 1}] == 77) {
		wordCount += 1
	}

	// S.M
	// .A.
	// S.M
	if (charMap[Point{X: point.X - 1, Y: point.Y - 1}] == 83 && charMap[Point{X: point.X + 1, Y: point.Y + 1}] == 77 && charMap[Point{X: point.X - 1, Y: point.Y + 1}] == 83  && charMap[Point{X: point.X + 1, Y: point.Y - 1}] == 77) {
		wordCount += 1
	}

	// S.S
	// .A.
	// M.M
	if (charMap[Point{X: point.X - 1, Y: point.Y - 1}] == 83 && charMap[Point{X: point.X + 1, Y: point.Y + 1}] == 77 && charMap[Point{X: point.X - 1, Y: point.Y + 1}] == 77  && charMap[Point{X: point.X + 1, Y: point.Y - 1}] == 83) {
		wordCount += 1
	}

	return wordCount
}

func main() {
	lines := utils.ReadLines("./input.txt")

	charMap := make(map[Point]rune)

	for y, line := range lines {
		for x, char := range line {
			point := Point{X: x, Y: y}
			charMap[point] = char
		}
	}

	wordCountPart1 := 0
	wordCountPart2 := 0

	for k := range charMap {
		char := string(charMap[k])
		if (char == "X") {
			wordCountPart1 += checkXPosition(k, charMap)
		}
		if (char == "A") {
			wordCountPart2 += checkAPosition(k, charMap)
		}
	}

	fmt.Printf("Part 1: %d\n", wordCountPart1)
	fmt.Printf("Part 2: %d\n", wordCountPart2)
}