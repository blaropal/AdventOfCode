package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

type SectionMap map[int]struct{}

func (m SectionMap) contains(otherMap SectionMap) bool {
	for key := range m {
		if _, has := otherMap[key]; !has {
			return false
		}
	}
	return true
}

func (m SectionMap) overlaps(otherMap SectionMap) bool {
	for key := range m {
		if _, has := otherMap[key]; has {
			return true
		}
	}
	return false
}

func getSectionMaps(line string) []SectionMap {
	lists := strings.Split(line, ",")

	maps := []SectionMap{}

	for _, l := range lists {
		m := make(SectionMap)
		values := strings.Split(l, "-")

		low, _ := strconv.Atoi(values[0])
		high, _ := strconv.Atoi(values[1])
		for i := low; i <= high; i++ {
			m[i] = struct{}{}
		}

		maps = append(maps, m)
	}
	return maps
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

	containedCount := 0
	overlapCount := 0
	for _, line := range lines {
		maps := getSectionMaps(line)
		if maps[0].contains(maps[1]) || maps[1].contains(maps[0]) {
			containedCount++
		}

		if maps[0].overlaps(maps[1]) {
			overlapCount++
		}
	}

	fmt.Printf("Solution to 3.1: %d\n", containedCount)
	fmt.Printf("Solution to 3.2: %d\n", overlapCount)
}
