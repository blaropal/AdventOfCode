package main

import (
	"bufio"
	"fmt"
	"os"
)

func checkAllUnique(values string) bool {
	set := make(map[rune]struct{})

	for _, r := range values {
		if _, has := set[r]; has {
			return false
		} else {
			set[r] = struct{}{}
		}
	}
	return true
}

func main() {
	readFile, err := os.Open("./input.txt")
	defer readFile.Close()

	if err != nil {
		fmt.Println(err)
	}
	fileScanner := bufio.NewScanner(readFile)

	fileScanner.Split(bufio.ScanLines)
	fileScanner.Scan()
	input := fileScanner.Text()

	checked := 0
	for i := 0; i < len(input)-3; i++ {
		if checkAllUnique(input[i : i+4]) {
			checked = i + 3
			break
		}
	}

	fmt.Printf("Solution to 6.1: %d\n", checked+1)

	for i := 0; i < len(input)-3; i++ {
		if checkAllUnique(input[i : i+14]) {
			checked = i + 13
			break
		}
	}

	fmt.Printf("Solution to 6.2: %d\n", checked+1)
}
