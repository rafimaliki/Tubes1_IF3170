package algorithm

import (
	"be/class/MagicCube"
	"fmt"
	"math"
)

func SimulatedAnnealing(cube *MagicCube.MagicCube) ([][][]int, error) {

	fmt.Println("\033[32mSimulated Annealing Algorithm\033[0m")

	// 3D Matrix nya di cube.Buffer
	// cube.Shuffle()

	bestCube := cube.Copy()
	temperature := 100.0
	sameOrWorseScore := 0

	for {

		if temperature <= 0 {
			// print objective function
			// fmt.Println("Same or worse score: ", sameOrWorseScore)
			// fmt.Println("Objective Function: ", bestCube.ObjectiveFunction())
			fmt.Println("\033[32mDone!\033[0m")
			return bestCube.Buffer, nil
		}

		swapSourceIdx := bestCube.GetRandomIdx()
		swapTargetIdx := bestCube.GetRandomIdx()

		for {
			if swapSourceIdx != swapTargetIdx {
				break
			}
			swapTargetIdx = bestCube.GetRandomIdx()
		}

		newCube := bestCube.Copy()
		newCube.SwapValues(swapSourceIdx, swapTargetIdx)

		if newCube.ObjectiveFunction() == 0 {
			// fmt.Println("Objective Function: ", bestCube.ObjectiveFunction())
			fmt.Println("\033[32mDone!\033[0m")
			return newCube.Buffer, nil
		}

		if bestCube.ObjectiveFunction() == 0 {
			fmt.Println("Objective Function: ", bestCube.ObjectiveFunction())
			fmt.Println("\033[32mDone!\033[0m")
			return bestCube.Buffer, nil
		}

		deltaE := newCube.ObjectiveFunction() - bestCube.ObjectiveFunction()
		if deltaE >= 0 {
			sameOrWorseScore++
		}
		fmt.Println("Delta E: ", deltaE)

		if deltaE < 0 {
			bestCube = newCube
		} else {
			probability := math.Exp(-float64(deltaE) / temperature)
			// fmt.Println("Probability: ", probability)
			// randomNum := rand.Float64()
			// fmt.Println("Random Number: ", randomNum)
			goDown := probability > 0.5

			if goDown {
				// print go down and objective function
				fmt.Println("Go Down")
				fmt.Println("Objective Function: ", bestCube.ObjectiveFunction())
				bestCube = newCube
			}
		}

		temperature -= 0.01
	}
}
