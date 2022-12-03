package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

func getPriorityValue(r rune) int {
	return strings.IndexRune(letters, r) + 1
}

func getSharedLetter(lines []string) rune {
	maps := []map[rune]bool{}

	for _, line := range lines {
		m := make(map[rune]bool)
		for _, letter := range line {
			m[letter] = true
		}
		maps = append(maps, m)
	}

	for key := range maps[0] {
		found := false
		for _, m := range maps {
			found = m[key]
			if !found {
				break
			}
		}
		if found {
			return key
		}
	}
	return -1
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

	sumLines := 0
	sumGroups := 0

	for i := 0; i < len(lines); i++ {
		line := lines[i]
		firstCompartment := line[:len(line)/2]
		secondCompartment := line[len(line)/2:]

		letter := getSharedLetter([]string{firstCompartment, secondCompartment})
		sumLines += getPriorityValue(letter)

		if i > 0 && (i+1)%3 == 0 {
			letter = getSharedLetter([]string{lines[i-2], lines[i-1], lines[i]})
			sumGroups += getPriorityValue(letter)
		}
	}

	fmt.Printf("Solution to 3.1: %d\n", sumLines)
	fmt.Printf("Solution to 3.2: %d\n", sumGroups)
}
