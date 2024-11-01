package algorithm

import (
	"be/class/MagicCube"
	"fmt"
	"math"
)

type Response struct {
	Buffer      [][][]int
	IndexChange [][][]int
}

func SimulatedAnnealing(cube *MagicCube.MagicCube) (Response, error) {

	fmt.Println("\033[32mSimulated Annealing Algorithm\033[0m")

	bestCube := cube.Copy()
	temperature := 100.0
	// sameOrWorseScore := 0
	indexChange := [][][]int{}

	for {

		if temperature <= 0 {
			// print objective function
			// fmt.Println("Same or worse score: ", sameOrWorseScore)
			// fmt.Println("Objective Function: ", bestCube.ObjectiveFunction())
			fmt.Println("\033[32mDone!\033[0m")
			break
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
			bestCube = newCube
			// return newCube.Buffer, nil
			break
		}

		// if bestCube.ObjectiveFunction() == 0 {
		// 	fmt.Println("Objective Function: ", bestCube.ObjectiveFunction())
		// 	fmt.Println("\033[32mDone!\033[0m")
		// 	return bestCube.Buffer, nil
		// }

		deltaE := newCube.ObjectiveFunction() - bestCube.ObjectiveFunction()
		// if deltaE >= 0 {
		// 	sameOrWorseScore++
		// }
		// fmt.Println("Delta E: ", deltaE)

		if deltaE < 0 {
			bestCube = newCube
			indexChange = append(indexChange, [][]int{swapSourceIdx[:], swapTargetIdx[:]})
		} else {
			probability := math.Exp(-float64(deltaE) / temperature)
			// fmt.Println("Probability: ", probability)
			// randomNum := rand.Float64()
			// fmt.Println("Random Number: ", randomNum)
			goDown := probability > 0.5

			if goDown {
				// print go down and objective function
				indexChange = append(indexChange, [][]int{swapSourceIdx[:], swapTargetIdx[:]})
				fmt.Println("Go Down")
				fmt.Println("Objective Function: ", bestCube.ObjectiveFunction())
				bestCube = newCube
			}
		}

		temperature -= 0.01
	}

	Result := Response{
		Buffer:      bestCube.Buffer,
		IndexChange: indexChange,
	}

	return Result, nil
}
