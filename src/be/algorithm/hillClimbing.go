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

func SteepestAscentHillClimbing(cube *MagicCube.MagicCube) (MagicCube.Response, error) {
	start := time.Now()
	pairs := make(map[[2]int]int)
	indexChange := [][][]int{}
	objectiveFunctions := []int{}
	currentObjectiveValue := cube.ObjectiveFunction()
	objectiveFunctions = append(objectiveFunctions, currentObjectiveValue)
	maxObjectiveValue := currentObjectiveValue
	cubeStates := [][][][]int{}
	cubeStates = append(cubeStates, cube.Buffer)
	iter := 0
	for {
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
		iter++
		indexChange = append(indexChange, [][]int{swapOne[:], swapTwo[:]})
		objectiveFunctions = append(objectiveFunctions, maxObjectiveValue)
		cube.SwapValues(swapOne, swapTwo)
		cubeStates = append(cubeStates, cube.Buffer)
		currentObjectiveValue = maxObjectiveValue
	}
	fmt.Println("Objective Function: ", cube.ObjectiveFunction())
	elapsed := time.Since(start)
	executionTimeInMS := int(elapsed.Milliseconds())
	fmt.Println("time: ", elapsed)
	Result := MagicCube.Response{
		Buffer:             cube.Buffer,
		IndexChange:        indexChange,
		ObjectiveFunctions: objectiveFunctions,
		ExecutionTimeInMS:  executionTimeInMS,
		CubeStates:         cubeStates,
		Iterations:         iter,
	}
	return Result, nil
}

func SidewaysMoveHillClimbing(cube *MagicCube.MagicCube, maxOcc int) (MagicCube.Response, error) {
	start := time.Now()
	pairs := make(map[[2]int]int)
	countOcc := 0
	iter := 0
	indexChange := [][][]int{}
	objectiveFunctions := []int{}
	currentObjectiveValue := cube.ObjectiveFunction()
	objectiveFunctions = append(objectiveFunctions, currentObjectiveValue)
	maxObjectiveValue := currentObjectiveValue
	cubeStates := [][][][]int{}
	cubeStates = append(cubeStates, cube.Buffer)
	for {
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
		if currentObjectiveValue > maxObjectiveValue || countOcc > maxOcc {
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

			objectiveFunctions = append(objectiveFunctions, maxObjectiveValue)
			indexChange = append(indexChange, [][]int{swapOne[:], swapTwo[:]})
			cube.SwapValues(swapOne, swapTwo)
			cubeStates = append(cubeStates, cube.Buffer)
			iter++
		}
	}
	fmt.Println("Objective Function: ", cube.ObjectiveFunction())
	elapsed := time.Since(start)
	executionTimeInMS := int(elapsed.Milliseconds())
	fmt.Println("time: ", elapsed)
	Result := MagicCube.Response{
		Buffer:             cube.Buffer,
		IndexChange:        indexChange,
		ObjectiveFunctions: objectiveFunctions,
		ExecutionTimeInMS:  executionTimeInMS,
		CubeStates:         cubeStates,
		Iterations:         iter,
	}
	return Result, nil
}

func RandomRestartHillClimbing(cube *MagicCube.MagicCube, numOfRestart int) (MagicCube.Response, error) {
	start := time.Now()

	indexChange := [][][]int{}
	objectiveFunctions := []int{}
	currentObjectiveValue := cube.ObjectiveFunction()
	objectiveFunctions = append(objectiveFunctions, currentObjectiveValue)
	maxObjectiveValue := currentObjectiveValue
	cubeStates := [][][][]int{}
	cubeStates = append(cubeStates, cube.Buffer)
	restartCount := 0
	iteration := 0
	restartPerIteration := []int{}

	for {
		for {
			pairs := make(map[[2]int]int)
			currentObjectiveValue = cube.ObjectiveFunction()
			maxObjectiveValue = currentObjectiveValue
			res := 0
			for i := 0; i < 125; i++ {
				for j := i + 1; j < 125; j++ {
					cube.SwapValues(MagicCube.IntToThreeDee(i), MagicCube.IntToThreeDee(j))
					res = cube.ObjectiveFunction()
					cube.SwapValues(MagicCube.IntToThreeDee(i), MagicCube.IntToThreeDee(j))
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
			objectiveFunctions = append(objectiveFunctions, maxObjectiveValue)
			cube.SwapValues(swapOne, swapTwo)
			cubeStates = append(cubeStates, cube.Buffer)
			iteration++
		}
		fmt.Println(restartCount)
		restartPerIteration = append(restartPerIteration, iteration)

		sz := MagicCube.IntToThreeDee(0)
		indexChange = append(indexChange, [][]int{sz[:], sz[:]})
		iteration = 0
		if restartCount >= numOfRestart || maxObjectiveValue == 0 {
			break
		}
		restartCount++
		cube.Shuffle()
	}

	fmt.Println("Objective Function: ", cube.ObjectiveFunction())

	elapsed := time.Since(start)
	executionTimeInMS := int(elapsed.Milliseconds())
	fmt.Println("time: ", elapsed)

	Result := MagicCube.Response{
		Buffer:              cube.Buffer,
		IndexChange:         indexChange,
		ObjectiveFunctions:  objectiveFunctions,
		ExecutionTimeInMS:   executionTimeInMS,
		CubeStates:          cubeStates,
		RestartCount:        restartCount,
		RestartPerIteration: restartPerIteration,
	}
	return Result, nil
}

func StochasticHillClimbing(cube *MagicCube.MagicCube) (MagicCube.Response, error) {
	start := time.Now()
	cur := cube.ObjectiveFunction()
	iter := 100000
	indexChange := [][][]int{}
	objectiveFunctions := []int{}
	currentObjectiveValue := cube.ObjectiveFunction()
	objectiveFunctions = append(objectiveFunctions, currentObjectiveValue)
	cubeStates := [][][][]int{}
	cubeStates = append(cubeStates, cube.Buffer)
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
			objectiveFunctions = append(objectiveFunctions, res)
			indexChange = append(indexChange, [][]int{swapOne[:], swapTwo[:]})
			cubeStates = append(cubeStates, cube.Buffer)
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
	executionTimeInMS := int(elapsed.Milliseconds())
	Result := MagicCube.Response{
		Buffer:             cube.Buffer,
		IndexChange:        indexChange,
		ObjectiveFunctions: objectiveFunctions,
		ExecutionTimeInMS:  executionTimeInMS,
		CubeStates:         cubeStates,
		Iterations:         iter,
	}
	return Result, nil
}
