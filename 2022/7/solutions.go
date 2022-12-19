package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

const TOTAL_MEMORY = 70000000
const NEEDED_SPACE = 30000000

func generatePathString(path []string) string {
	return strings.Join(path, "/")
}

func main() {
	readFile, err := os.Open("./input.txt")
	defer readFile.Close()

	if err != nil {
		fmt.Println(err)
	}
	fileScanner := bufio.NewScanner(readFile)

	fileScanner.Split(bufio.ScanLines)

	sizes := make(map[string]int)

	path := []string{}

	for fileScanner.Scan() {
		line := fileScanner.Text()

		parts := strings.Split(line, " ")

		first := parts[0]
		second := parts[1]

		// We only care about movement between folders and file size, other input lines are ignored
		if first == "$" && second == "cd" {
			third := parts[2]
			if third == ".." {
				currentPath := generatePathString(path)
				path = path[:len(path)-1]
				sizes[generatePathString(path)] += sizes[currentPath]
			} else {
				path = append(path, third)
			}
		} else if val, err := strconv.Atoi(first); err == nil {
			sizes[generatePathString(path)] += val
		}
	}

	// Solution part 1
	sum100kOrLess := 0
	for _, size := range sizes {
		if size <= 100000 {
			sum100kOrLess += size
		}
	}

	// Solution part 2
	usedMemory := sizes["/"]
	freeMemory := TOTAL_MEMORY - usedMemory
	spaceToFreeUp := NEEDED_SPACE - freeMemory

	smallestFolderSizeToDelete := TOTAL_MEMORY
	for _, size := range sizes {
		if size >= spaceToFreeUp && size < smallestFolderSizeToDelete {
			smallestFolderSizeToDelete = size
		}
	}

	fmt.Printf("Solution to 7.1: %d\n", sum100kOrLess)
	fmt.Printf("Solution to 7.2: %d\n", smallestFolderSizeToDelete)
}
