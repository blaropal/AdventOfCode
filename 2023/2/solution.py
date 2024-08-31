input = open('input.txt', 'r').readlines()

def getGameId(line: str):
    split_index = line.find(":")
    game_identifier = line[0: split_index]
    parts = game_identifier.split(" ")
    return int(parts[1])

def getGameDraws(line: str):
    index = line.find(":") + 1
    draws = line[index:].split(";")
    output = []
    for draw in draws:
        draw_cubes = {
            "green": 0,
            "red": 0,
            "blue": 0
        }

        cube_identifiers = draw.split(",")
        for cube_identifier in cube_identifiers:
            parts = cube_identifier.lstrip().rstrip("\n").split(" ")
            draw_cubes[parts[1]] = int(parts[0])

        output.append(draw_cubes)

    return output

def part_1():
    total_cubes = {
        "red": 12,
        "green": 13,
        "blue": 14
    }
    output = 0
    for line in input:
        draws = getGameDraws(line)
        add_game_id = True
        for draw in draws:
            if draw["green"] > total_cubes["green"] or draw["red"] > total_cubes["red"] or draw["blue"] > total_cubes["blue"]:
                add_game_id = False
                break
        if add_game_id:
            output += getGameId(line)
    
    return output

def part_2():
    output = 0
    for line in input:
        draws = getGameDraws(line)
        min_red_cubes = 0
        min_green_cubes = 0
        min_blue_cubes = 0

        for draw in draws:
            if draw["red"] > min_red_cubes:
                min_red_cubes = draw["red"]
            if draw["green"] > min_green_cubes:
                min_green_cubes = draw["green"]
            if draw["blue"] > min_blue_cubes:
                min_blue_cubes = draw["blue"]
    
        output += min_red_cubes * min_blue_cubes * min_green_cubes
    return output

print("Solution 1: " + str(part_1()))
print("Solution 2: " + str(part_2()))