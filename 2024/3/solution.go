package main

import (
	utils "2024"
	"fmt"
	"regexp"
	"strconv"
	"strings"
)

func calculateResult(lines []string, regex string) int {
	result := 0
	enabled := true
	for _, line := range lines {
		r, _ := regexp.Compile(regex)


		for _, match := range r.FindAllString(line, -1) {
			if (match == "do()") {
				enabled = true
				continue
			}

			if (match == "don't()") {
				enabled = false
				continue
			}

			if (enabled) {
				splitIndex := strings.Index(match, ",")
				first, _ := strconv.Atoi(match[4:splitIndex])
				second, _ := strconv.Atoi(match[splitIndex+1:len(match)-1])
	
				result += first * second
			}
		}
	}

	return result
}

func main() {
	lines := utils.ReadLines("./input.txt")

	fmt.Printf("Part 1: %d\n", calculateResult(lines, `mul\([0-9]{1,3},[0-9]{1,3}\)`))
	fmt.Printf("Part 2: %d\n", calculateResult(lines, `mul\([0-9]{1,3},[0-9]{1,3}\)|do\(\)|don't\(\)`))
}