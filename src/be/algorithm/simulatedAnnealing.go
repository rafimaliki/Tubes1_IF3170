package algorithm

import (
	"be/class/MagicCube"
	"fmt"
)

func SimulatedAnnealing(cube *MagicCube.MagicCube) ([][][]int, error) {
	
    fmt.Println("\033[32mSimulated Annealing Algorithm\033[0m")

    // 3D Matrix nya di cube.Buffer

    cube.Shuffle()
	
    return cube.Buffer, nil 
}
