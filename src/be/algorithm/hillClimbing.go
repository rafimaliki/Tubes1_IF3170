package algorithm

import (
	"be/class/MagicCube"
	"fmt"
	"math/rand"
	"time"
)

// func AddToPair(cube *MagicCube.MagicCube, pair map[[2]int]int, i,j int) {
// 	pair[[2]int{i,j}] =
// }

func SteepestAscentHillClimbing(cube *MagicCube.MagicCube) (Response, error) {
	start := time.Now()
	pairs := make(map[[2]int]int)
	indexChange := [][][]int{}
	for {
		currentObjectiveValue := cube.ObjectiveFunction()
		maxObjectiveValue := currentObjectiveValue
		res := 0
		for i := 0; i < 125; i++ {
			for j := i + 1; j < 125; j++ {
				cube.SwapValues(MagicCube.IntToThreeDee(i), MagicCube.IntToThreeDee(j))
				res = cube.ObjectiveFunction()
				cube.SwapValues(MagicCube.IntToThreeDee(i), MagicCube.IntToThreeDee(j))
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

		swapOne := MagicCube.IntToThreeDee(randomPair[0])
		swapTwo := MagicCube.IntToThreeDee(randomPair[1])

		indexChange = append(indexChange, [][]int{swapOne[:], swapTwo[:]})
		cube.SwapValues(swapOne, swapTwo)
	}
	fmt.Println("Objective Function: ", cube.ObjectiveFunction())
	elapsed := time.Since(start)
	fmt.Println("time: ", elapsed)
	Result := Response{
		Buffer:      cube.Buffer,
		IndexChange: indexChange,
	}
	return Result, nil
}

func SidewaysMoveHillClimbing(cube *MagicCube.MagicCube) (Response, error) {
	start := time.Now()
	pairs := make(map[[2]int]int)
	countOcc := 0
	indexChange := [][][]int{}
	for {
		currentObjectiveValue := cube.ObjectiveFunction()
		maxObjectiveValue := currentObjectiveValue
		res := 0
		for i := 0; i < 125; i++ {
			for j := i + 1; j < 125; j++ {
				cube.SwapValues(MagicCube.IntToThreeDee(i), MagicCube.IntToThreeDee(j))
				res = cube.ObjectiveFunction()
				cube.SwapValues(MagicCube.IntToThreeDee(i), MagicCube.IntToThreeDee(j))
				pairs[[2]int{i, j}] = res
				if res > maxObjectiveValue {
					maxObjectiveValue = res
					countOcc = 0
				}
			}
		}
		fmt.Println(maxObjectiveValue)
		countOcc++
		if currentObjectiveValue > maxObjectiveValue || countOcc > 100 {
			break
		}

		var maxPairs [][2]int

		for pair, value := range pairs {
			if value == maxObjectiveValue {
				maxPairs = append(maxPairs, pair)
			}
		}

		if len(maxPairs) > 0 {
			randomIndex := rand.Intn(len(maxPairs))
			randomPair := maxPairs[randomIndex]

			swapOne := MagicCube.IntToThreeDee(randomPair[0])
			swapTwo := MagicCube.IntToThreeDee(randomPair[1])
			indexChange = append(indexChange, [][]int{swapOne[:], swapTwo[:]})
			cube.SwapValues(swapOne, swapTwo)
		}
	}
	fmt.Println("Objective Function: ", cube.ObjectiveFunction())
	elapsed := time.Since(start)
	fmt.Println("time: ", elapsed)
	Result := Response{
		Buffer:      cube.Buffer,
		IndexChange: indexChange,
	}
	return Result, nil
}

func RandomRestartHillClimbing(cube *MagicCube.MagicCube) (Response, error) {
	start := time.Now()
	maxObjectiveValue := cube.ObjectiveFunction()
	originalCube := cube.Copy()
	pairs := make(map[[2]int]int)
	indexChange := [][][]int{}
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
					res = tempCube.ObjectiveFunction()
					tempCube.SwapValues(MagicCube.IntToThreeDee(i), MagicCube.IntToThreeDee(j))
					if res > maxObjectiveValue {
						pairs[[2]int{i, j}] = res
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
			swapOne := MagicCube.IntToThreeDee(randomPair[0])
			swapTwo := MagicCube.IntToThreeDee(randomPair[1])

			indexChange = append(indexChange, [][]int{swapOne[:], swapTwo[:]})
			cube.SwapValues(swapOne, swapTwo)
		}
		iter++
		if iter == 10 || maxObjectiveValue == 0 {
			break
		}
		cube = originalCube.Copy()
		elapsed := time.Since(start)
		fmt.Println("time: ", elapsed)
	}
	fmt.Println("Objective Function: ", cube.ObjectiveFunction())
	elapsed := time.Since(start)
	fmt.Println("time: ", elapsed)
	Result := Response{
		Buffer:      cube.Buffer,
		IndexChange: indexChange,
	}
	return Result, nil
}

func StochasticHillClimbing(cube *MagicCube.MagicCube) (Response, error) {
	start := time.Now()
	cur := cube.ObjectiveFunction()
	iter := 100000
	indexChange := [][][]int{}
	for i := 0; i < iter; i++ {
		num1 := rand.Intn(125)
		var num2 int
		for {
			num2 = rand.Intn(125)
			if num1 != num2 {
				break
			}
		}
		swapOne := MagicCube.IntToThreeDee(num1)
		swapTwo := MagicCube.IntToThreeDee(num2)
		cube.SwapValues(swapOne, swapTwo)
		res := cube.ObjectiveFunction()

		if res > cur {
			fmt.Println(res)
			cur = res
			indexChange = append(indexChange, [][]int{swapOne[:], swapTwo[:]})
		} else {
			cube.SwapValues(swapOne, swapTwo)
		}

		if i%1000 == 0 {
			fmt.Println(i, "th iteration")
		}

	}
	fmt.Println("Objective Function: ", cube.ObjectiveFunction())
	elapsed := time.Since(start)
	fmt.Println("time: ", elapsed)
	Result := Response{
		Buffer:      cube.Buffer,
		IndexChange: indexChange,
	}
	return Result, nil
}
