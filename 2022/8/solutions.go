package main

import (
	"bufio"
	"fmt"
	"os"
)

func calculateScenicScore(row int, col int, trees [][]int) int {
	height := trees[row][col]

	score := 1
	distance := 0

	// Top
	for i := row - 1; i >= 0; i-- {
		distance++
		if trees[i][col] >= height {
			break
		}
	}

	score *= distance
	distance = 0

	// Bottom
	for i := row + 1; i < len(trees); i++ {
		distance++
		if trees[i][col] >= height {
			break
		}
	}

	score *= distance
	distance = 0

	// Left
	for i := col - 1; i >= 0; i-- {
		distance++
		if trees[row][i] >= height {
			break
		}
	}

	score *= distance
	distance = 0

	// Right
	for i := col + 1; i < len(trees[row]); i++ {
		distance++
		if trees[row][i] >= height {
			break
		}
	}

	score *= distance
	return score
}

func checkIsVisible(row int, col int, trees [][]int) bool {
	if row == 0 || col == 0 || row == len(trees)-1 || col == len(trees[row])-1 {
		return true
	}
	height := trees[row][col]

	// Top
	for i := 0; i <= row; i++ {
		if i == row {
			return true
		}
		if trees[i][col] >= height {
			break
		}
	}

	// Bottom
	for i := row + 1; i < len(trees); i++ {
		if trees[i][col] >= height {
			break
		}

		if i == len(trees)-1 {
			return true
		}
	}

	// Left
	for i := 0; i <= col; i++ {
		if i == col {
			return true
		}
		if trees[row][i] >= height {
			break
		}
	}

	// Right
	for i := col + 1; i < len(trees[row]); i++ {
		if trees[row][i] >= height {
			break
		}
		if i == len(trees[row])-1 {
			return true
		}
	}

	return false
}

func main() {
	readFile, err := os.Open("./input.txt")
	defer readFile.Close()

	if err != nil {
		fmt.Println(err)
	}
	fileScanner := bufio.NewScanner(readFile)
	fileScanner.Split(bufio.ScanLines)

	trees := [][]int{}
	for fileScanner.Scan() {
		line := fileScanner.Text()
		row := []int{}
		for _, r := range line {
			row = append(row, int(r-'0'))
			//fmt.Print(int(r - '0'))
		}
		//fmt.Print("\n")
		trees = append(trees, row)
	}
	//fmt.Print("\n")

	visibleCount := 0
	maxScenicScore := 0
	for i := 0; i < len(trees); i++ {
		for j := 0; j < len(trees[i]); j++ {
			if checkIsVisible(i, j, trees) {
				visibleCount++
			}

			if i > 0 && i < len(trees) && j > 0 && j < len(trees[i]) {
				scenicScore := calculateScenicScore(i, j, trees)
				if scenicScore > maxScenicScore {
					maxScenicScore = scenicScore
				}
			}
		}
	}

	fmt.Printf("Solution to 8.1: %d\n", visibleCount)
	fmt.Printf("Solution to 8.2: %d\n", maxScenicScore)
}
