package algorithm

import (
	"be/class/MagicCube"
	"fmt"
)

func HillClimbing(cube *MagicCube.MagicCube) ([][][]int, error) {

    fmt.Println("\033[32mHill Climbing Algorithm\033[0m")

    // 3D Matrix nya di cube.Buffer

    cube.Shuffle()
	
    return cube.Buffer, nil 
}
