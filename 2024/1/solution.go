package main

import (
	utils "2024"
	"fmt"
	"sort"
	"strconv"
	"strings"
)

func sortList(list []int) {
	sort.Slice(list, func(i, j int) bool {
		return list[i] < list[j]
	})
}

func part1(lines []string) int {
	var values1 []int
	var values2 []int

	for _, line := range lines {
		fields := strings.Fields(line)
		first, err := strconv.Atoi(fields[0])
		if err != nil {
			panic(err)
		}
		second, err := strconv.Atoi(fields[1])
		if err != nil {
			panic(err)
		}
		values1 = append(values1, first)
		values2 = append(values2, second)
	}

	sortList(values1)
	sortList(values2)

	result := 0
	for index, _ := range values1 {
		distance := values1[index] - values2[index]
		if distance < 0 {
			distance = -distance
		}
		result += distance
	}

	return result
}

func part2(lines []string) int {
	m := make(map[string]int)

	var values []string

	for _, line := range lines {
		fields := strings.Fields(line)
		
		m[fields[1]] = m[fields[1]] + 1
		values = append(values, fields[0])
	}

	result := 0
	for _, value := range values {
		numberValue, err := strconv.Atoi(value)
		if err != nil {
			panic(err)
		}
		result += numberValue * m[value]
	}

	return result
}

func main() {
	lines := utils.ReadLines("./input.txt")

	fmt.Printf("Part 1: %d\n", part1(lines))
	fmt.Printf("Part 2: %d\n", part2(lines))
}