package algorithm

import (
	"be/class/MagicCube"
	"fmt"
	"math/rand"
)

func SteepestAscentHillClimbing(cube *MagicCube.MagicCube) ([][][]int, error) {
	pairs := make(map[[2]int]int)
	for {
		currentObjectiveValue := cube.ObjectiveFunction()
		maxObjectiveValue := currentObjectiveValue
		res := 0
		tempCube := cube.Copy()
		for i := 0; i < 125; i++ {
			for j := i + 1; j < 125; j++ {
				tempCube.SwapValues(MagicCube.IntToThreeDee(i), MagicCube.IntToThreeDee(j))
				res = tempCube.Copy().ObjectiveFunction()
				tempCube.SwapValues(MagicCube.IntToThreeDee(i), MagicCube.IntToThreeDee(j))
				pairs[[2]int{i, j}] = res
				if res > maxObjectiveValue {
					maxObjectiveValue = res
				}
			}
		}
		fmt.Println(maxObjectiveValue)
		if currentObjectiveValue >= maxObjectiveValue {
			break
		}

		var maxPairs [][2]int

		for pair, value := range pairs {
			if value == maxObjectiveValue {
				maxPairs = append(maxPairs, pair)
			}
		}
		randomIndex := rand.Intn(len(maxPairs))
		randomPair := maxPairs[randomIndex]
		cube.SwapValues(MagicCube.IntToThreeDee(randomPair[0]), MagicCube.IntToThreeDee(randomPair[1]))
	}
	fmt.Println("Objective Function: ", cube.ObjectiveFunction())
	return cube.Buffer, nil
}

func SidewaysMoveHillClimbing(cube *MagicCube.MagicCube) ([][][]int, error) {
	pairs := make(map[[2]int]int)
	for {
		currentObjectiveValue := cube.ObjectiveFunction()
		maxObjectiveValue := currentObjectiveValue
		res := 0
		tempCube := cube.Copy()
		for i := 0; i < 125; i++ {
			for j := i + 1; j < 125; j++ {
				tempCube.SwapValues(MagicCube.IntToThreeDee(i), MagicCube.IntToThreeDee(j))
				res = tempCube.Copy().ObjectiveFunction()
				tempCube.SwapValues(MagicCube.IntToThreeDee(i), MagicCube.IntToThreeDee(j))
				pairs[[2]int{i, j}] = res
				if res > maxObjectiveValue {
					maxObjectiveValue = res
				}
			}
		}
		fmt.Println(maxObjectiveValue)
		if currentObjectiveValue > maxObjectiveValue {
			break
		}

		var maxPairs [][2]int

		for pair, value := range pairs {
			if value == maxObjectiveValue {
				maxPairs = append(maxPairs, pair)
			}
		}
		randomIndex := rand.Intn(len(maxPairs))
		randomPair := maxPairs[randomIndex]
		cube.SwapValues(MagicCube.IntToThreeDee(randomPair[0]), MagicCube.IntToThreeDee(randomPair[1]))
	}
	fmt.Println("Objective Function: ", cube.ObjectiveFunction())
	return cube.Buffer, nil
}

func RandomRestartHillClimbing(cube *MagicCube.MagicCube) ([][][]int, error) {
	maxObjectiveValue := cube.ObjectiveFunction()
	originalCube := cube.Copy()
	pairs := make(map[[2]int]int)
	iter := 0
	for {
		for {
			currentObjectiveValue := cube.ObjectiveFunction()
			maxObjectiveValue := currentObjectiveValue
			res := 0
			tempCube := cube.Copy()
			for i := 0; i < 125; i++ {
				for j := i + 1; j < 125; j++ {
					tempCube.SwapValues(MagicCube.IntToThreeDee(i), MagicCube.IntToThreeDee(j))
					res = tempCube.Copy().ObjectiveFunction()
					tempCube.SwapValues(MagicCube.IntToThreeDee(i), MagicCube.IntToThreeDee(j))
					pairs[[2]int{i, j}] = res
					if res > maxObjectiveValue {
						maxObjectiveValue = res
					}
				}
			}
			fmt.Println(maxObjectiveValue)
			if currentObjectiveValue >= maxObjectiveValue {
				break
			}

			var maxPairs [][2]int

			for pair, value := range pairs {
				if value == maxObjectiveValue {
					maxPairs = append(maxPairs, pair)
				}
			}
			randomIndex := rand.Intn(len(maxPairs))
			randomPair := maxPairs[randomIndex]
			cube.SwapValues(MagicCube.IntToThreeDee(randomPair[0]), MagicCube.IntToThreeDee(randomPair[1]))
		}
		if iter == 100 || maxObjectiveValue == 0 {
			break
		}
		cube = originalCube
	}
	return cube.Buffer, nil
}

func StochasticHillClimbing(cube *MagicCube.MagicCube) ([][][]int, error) {
	for i := 0; i < 200000000; i++ {
		tempCube := cube.Copy()
		num1 := rand.Intn(125)
		var num2 int
		for {
			num2 = rand.Intn(125)
			if num1 != num2 {
				break // Exit the loop if num2 is different from num1
			}
		}
		res := tempCube.ObjectiveFunction()
		fmt.Println(res)
		tempCube.SwapValues(MagicCube.IntToThreeDee(num1), MagicCube.IntToThreeDee(num2))
		if res > cube.ObjectiveFunction() {
			cube = tempCube
		}
	}
	return cube.Buffer, nil
}
