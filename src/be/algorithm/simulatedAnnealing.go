package algorithm

import (
	"be/class/MagicCube"
	"fmt"
	"strconv"
)

func SimulatedAnnealing(cube string) (int, error) {
	
    fmt.Println("\033[32mSimulated Annealing Algorithm\033[0m")

    initial_cube, err := strconv.Atoi(cube)

    if err != nil {
        return 0, fmt.Errorf("invalid input: %d is not a valid magic cube", initial_cube)
    }

    magic_cube := MagicCube.New(initial_cube)
    magic_cube.Print()

	result_cube := initial_cube * 4

    return result_cube, nil
}
