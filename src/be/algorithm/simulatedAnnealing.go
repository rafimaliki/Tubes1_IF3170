package algorithm

import (
	"be/class/MagicCube"
	"fmt"
	"math"
	"time"
)

func SimulatedAnnealing(cube *MagicCube.MagicCube) (MagicCube.Response, error) {

	fmt.Println("\033[32mSimulated Annealing Algorithm\033[0m")

	bestCube := cube.Copy()
	temperature := 100.0
	indexChange := [][][]int{}
	objectiveFunctions := []int{}
	countLocalOptimum := 0
	deltaEValues := []float64{}
	iterations := 0
	cubeStates := [][][][]int{}

	start := time.Now()
	initialScore := bestCube.ObjectiveFunction()
	objectiveFunctions = append(objectiveFunctions, initialScore)
	cubeStates = append(cubeStates, bestCube.Buffer)

	if initialScore != 0 {
		for {
			iterations++

			if temperature <= 0 {
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
				fmt.Println("\033[32mDone!\033[0m")
				bestCube = newCube
				objectiveFunctions = append(objectiveFunctions, bestCube.ObjectiveFunction())
				cubeStates = append(cubeStates, bestCube.Buffer)
				break
			}

			deltaE := newCube.ObjectiveFunction() - bestCube.ObjectiveFunction()

			if deltaE > 0 {
				deltaEValues = append(deltaEValues, 1.0)
				bestCube = newCube
				indexChange = append(indexChange, [][]int{swapSourceIdx[:], swapTargetIdx[:]})
			} else {
				countLocalOptimum++
				probability := math.Exp(float64(deltaE) / temperature)
				deltaEValues = append(deltaEValues, probability)
				goDown := probability > 0.9

				if goDown {
					indexChange = append(indexChange, [][]int{swapSourceIdx[:], swapTargetIdx[:]})
					// fmt.Println("Go Down")
					// fmt.Println("Objective Function: ", bestCube.ObjectiveFunction())
					bestCube = newCube
				} else {
					indexChange = append(indexChange, [][]int{{0, 0, 0}, {0, 0, 0}})
				}
			}

			objectiveFunctions = append(objectiveFunctions, bestCube.ObjectiveFunction())
			cubeStates = append(cubeStates, bestCube.Buffer)
			temperature -= 0.001
		}
	}

	elapsed := time.Since(start)
	executionTimeInMS := int(elapsed.Milliseconds())

	// fmt.Println("Score: ", bestCube.ObjectiveFunction())

	Result := MagicCube.Response{
		Buffer:             bestCube.Buffer,
		IndexChange:        indexChange,
		ObjectiveFunctions: objectiveFunctions,
		CubeStates:         cubeStates,
		LocalOptimum:       countLocalOptimum,
		Iterations:         iterations,
		DeltaE:             deltaEValues,
		ExecutionTimeInMS:  executionTimeInMS,
	}

	return Result, nil
}
