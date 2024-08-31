input = open('input.txt', 'r').readlines()

def part_1():
    output = 0
    for line in input:
        first = ""
        last = ""
        line_length = len(line)
        for i in range(line_length):
            if len(first) == 0 and line[0 + i].isnumeric():
                first = line[0 + i]

            if len(last) == 0 and line[line_length - 1 - i].isnumeric():
                last = line[line_length - 1 - i]

            if len(first) > 0 and len(last) > 0:
                output += int(first + last)
                break
    return output

def part_2():
    output = 0
    for line in input:
        first = ""
        last = ""
        line_length = len(line)
        for i in range(line_length):
            if len(first) == 0:
                if line[0 + i].isnumeric():
                    first = line[0 + i]
                else:
                    value = checkForNumberName(line, i)
                    if (value is not None):
                        first = value

            if len(last) == 0:
                if line[line_length - 1 - i].isnumeric():
                    last = line[line_length - 1 - i]
                else:
                    value = checkForNumberName(line, line_length - 1 - i)
                    if (value is not None):
                        last = value

            if len(first) > 0 and len(last) > 0:
                output += int(first + last)
                break
    return output

def checkForNumberName(line: str, start_index: int):
    number_name_map = [
        {"name": "one", "value": 1}, 
        {"name": "two", "value": 2},
        {"name": "three", "value": 3},
        {"name": "four", "value": 4},
        {"name": "five", "value": 5},
        {"name": "six", "value": 6},
        {"name": "seven", "value": 7},
        {"name": "eight", "value": 8},
        {"name": "nine", "value": 9}]
    for mapping in number_name_map:
        if line[start_index:].startswith(mapping["name"]):
            return str(mapping["value"])
    return None

print("Solution 1: " + str(part_1()))
print("Solution 2: " + str(part_2()))
