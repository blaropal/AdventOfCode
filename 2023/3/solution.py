input = open('input.txt', 'r').readlines()

def is_symbol(str):
    symbols = {'#', '$', '%', '&', '*', '+', '-', '/', '=', '@'}
    return str in symbols

symbol_positions = {}

for i, line in enumerate(input):
    for k, char in enumerate(line):
        if is_symbol(char):
            symbol_positions[(i, k)] = { "symbol": char, "numbers": [] }

check_positions = [
    (-1, -1), (-1, 0), (-1, 1),
    (0, -1), (0, 1),
    (1, -1), (1, 0), (1, 1)
]

def check_for_adjacent_symbols(char_index: int, line_index: int):
    for i, k in check_positions:
        if (line_index + i, char_index + k) in symbol_positions:
            return True

def get_adjacent_gears(char_index: int, line_index: int):
    gear_pos = []
    for i, k in check_positions:
        if (line_index + i, char_index + k) in symbol_positions and symbol_positions[(line_index + i, char_index + k)]["symbol"] == "*":
            gear_pos.append((line_index + i, char_index + k))

    return gear_pos

def part_1():    
    output = 0
    current_num = ""
    for i, line in enumerate(input):
        if len(current_num) > 0 and add_number:
            output += int(current_num)
            current_num = ""
        add_number = False
        for k, char in enumerate(line):
            if is_symbol(char) or char == ".":
                if add_number:
                    output += int(current_num)
                current_num = ""
                add_number = False
            if char.isnumeric():
                current_num += char
                if (check_for_adjacent_symbols(k, i)):
                   add_number = True

    return output

def part_2():
    output = 0
    current_num = ""
    gear_positions = set()
    for i, line in enumerate(input):
        if len(current_num) > 0:
            for gi, gk in gear_positions:
                symbol_positions[(gi, gk)]["numbers"].append(int(current_num))
            gear_positions.clear()
            current_num = ""
        for k, char in enumerate(line):
            if is_symbol(char) or char == ".":
                for gi, gk in gear_positions:
                    symbol_positions[(gi, gk)]["numbers"].append(int(current_num))
                gear_positions.clear()
                current_num = ""
            if char.isnumeric():
                adjacent_gear_positions = get_adjacent_gears(k, i)
                for agi, agk in adjacent_gear_positions:
                    gear_positions.add((agi, agk))
                current_num += char

    for i, k in symbol_positions:
        if len(symbol_positions[(i, k)]["numbers"]) == 2:
            output += symbol_positions[(i, k)]["numbers"][0] * symbol_positions[(i, k)]["numbers"][1]

    return output


print("Solution 1: " + str(part_1()))
print("Solution 2: " + str(part_2()))