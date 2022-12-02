package main

import (
	"bufio"
	"fmt"
	"os"
)

type Shape struct {
	Name           string
	Value          int
	WinsAgainst    string
	AlternateInput string
}

var RESULTS = struct {
	Win  int
	Lose int
	Draw int
}{
	Win:  6,
	Lose: 0,
	Draw: 3,
}

var InputShapeMap = map[string]Shape{
	"X": {
		Name:           "ROCK",
		Value:          1,
		WinsAgainst:    "Z",
		AlternateInput: "A",
	},
	"Y": {
		Name:           "PAPER",
		Value:          2,
		WinsAgainst:    "X",
		AlternateInput: "B",
	},
	"Z": {
		Name:           "SCISSORS",
		Value:          3,
		WinsAgainst:    "Y",
		AlternateInput: "C",
	},
}

func getRegularInput(alternateInput string) string {
	for key, value := range InputShapeMap {
		if value.AlternateInput == alternateInput {
			return key
		}
	}
	return ""
}

func getRoundScore(playerInput string, opponentInput string) int {
	if playerInput == opponentInput {
		return RESULTS.Draw
	}
	if InputShapeMap[playerInput].WinsAgainst == opponentInput {
		return RESULTS.Win
	}
	return RESULTS.Lose
}

func getInputForResult(opponentInput string, desiredResult string) string {
	switch desiredResult {
	// Lose
	case "X":
		return InputShapeMap[opponentInput].WinsAgainst
	// Draw
	case "Y":
		return opponentInput
	// Win
	case "Z":
		for key, value := range InputShapeMap {
			if value.WinsAgainst == opponentInput {
				return key
			}
		}
	}
	return ""
}

func main() {

	readFile, err := os.Open("./input.txt")
	defer readFile.Close()

	if err != nil {
		fmt.Println(err)
	}
	fileScanner := bufio.NewScanner(readFile)

	fileScanner.Split(bufio.ScanLines)

	lines := []string{}
	for fileScanner.Scan() {
		lines = append(lines, fileScanner.Text())
	}

	score := 0

	// Solution 1
	for _, line := range lines {
		playerInput := string(line[2])
		opponentInput := getRegularInput(string(line[0]))

		score = score + InputShapeMap[playerInput].Value

		score = score + getRoundScore(playerInput, opponentInput)
	}

	fmt.Printf("Solution to 2.1: %d\n", score)

	// Solution 2
	score = 0

	for _, line := range lines {
		desiredResult := string(line[2])
		opponentShape := getRegularInput(string(line[0]))

		playerShape := getInputForResult(opponentShape, desiredResult)

		score = score + InputShapeMap[playerShape].Value

		score = score + getRoundScore(playerShape, opponentShape)
	}

	fmt.Printf("Solution to 2.2: %d\n", score)
}
