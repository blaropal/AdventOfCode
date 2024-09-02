input = open('input.txt', 'r').readlines()

def part_1():
    output = 0
    for line in input:
        winning_number_count = count_winning_numbers(line)
        if winning_number_count == 1:
            output += 1
        elif winning_number_count > 1:
            output += 1 * (2 ** (winning_number_count - 1))
    
    return output

def part_2():
    lines = []
    for line in input:
        lines.append(count_winning_numbers(line))

    output = 0
    for i, _ in enumerate(lines):
        output += process_line(i, lines)
    
    return output

def count_winning_numbers(line: str):
    card_parts = line.split(":")[1].split("|")
    winning_numbers = card_parts[0].split()
    card_numbers = card_parts[1].split()
    winning_number_count = 0
    for num in winning_numbers:
        if num in card_numbers:
            winning_number_count += 1
    return winning_number_count

def process_line(line_index: int, lines):
    winning_number_count = lines[line_index]

    if (winning_number_count == 0):
        return 1

    output = 1
    for i in range(winning_number_count):
        output += process_line(line_index + i + 1, lines)
    return output

print("Solution 1: " + str(part_1()))
print("Solution 2: " + str(part_2()))
