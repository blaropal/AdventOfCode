package main

import (
	"bufio"
	"fmt"
	"os"
	"sort"
	"strconv"
)

func main() {

	elfCalories := []int{}
	currentElf := 0

	readFile, err := os.Open("./input.txt")
	defer readFile.Close()

	if err != nil {
		fmt.Println(err)
	}
	fileScanner := bufio.NewScanner(readFile)

	fileScanner.Split(bufio.ScanLines)

	for fileScanner.Scan() {
		line := fileScanner.Text()
		if len(line) == 0 {
			elfCalories = append(elfCalories, currentElf)
			currentElf = 0
		} else {
			value, _ := strconv.Atoi(line)
			currentElf = currentElf + value
		}
	}

	sort.Ints(elfCalories)

	fmt.Printf("Solution to 1.1: %d\n", elfCalories[len(elfCalories)-1])

	topThree := 0
	for i, calories := range elfCalories[len(elfCalories)-3:] {
		fmt.Printf("%d - %d\n", i, calories)
		topThree = topThree + calories
	}

	fmt.Printf("Solution to 1.2: %d\n", topThree)
}
