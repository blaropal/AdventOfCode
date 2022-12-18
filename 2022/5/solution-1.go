package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
	"unicode"
)

type RuneSlice []rune

func (r *RuneSlice) prepend(val rune) {
	*r = append(*r, 0)
	copy((*r)[1:], *r)
	(*r)[0] = val
}

func (r *RuneSlice) pop() rune {
	ret := (*r)[0]
	*r = (*r)[1:]
	return ret
}

func main() {
	readFile, err := os.Open("./input.txt")
	defer readFile.Close()

	if err != nil {
		fmt.Println(err)
	}
	fileScanner := bufio.NewScanner(readFile)

	fileScanner.Split(bufio.ScanLines)

	slices := map[int]RuneSlice{}

	// Populate stacks
	for fileScanner.Scan() {
		line := fileScanner.Text()

		if len(line) == 0 {
			break
		}

		// Run through all columns and check for values
		for i := 0; i*4 < len(line); i++ {
			r := rune(line[(i*4)+1])
			if unicode.IsLetter(r) {
				slices[i] = append(slices[i], r)
			}
		}
	}

	// Perform movements
	for fileScanner.Scan() {
		parts := strings.Split(fileScanner.Text(), " ")
		moveCount, _ := strconv.Atoi(parts[1])
		fromCol, _ := strconv.Atoi(parts[3])
		toCol, _ := strconv.Atoi(parts[5])

		fromSlice := slices[fromCol-1]
		toSlice := slices[toCol-1]

		for i := 0; i < moveCount; i++ {
			toSlice.prepend(fromSlice.pop())
			slices[toCol-1] = toSlice
			slices[fromCol-1] = fromSlice
		}
	}

	sol := ""
	for i := 0; i < len(slices); i++ {
		if len(slices[i]) > 0 {
			sol += string(slices[i][0])
		}
	}

	fmt.Printf("Solution to 5.1: %s\n", sol)
}
