package MagicCube

import (
	"fmt"
	"math/rand"
)

type MagicCube struct {
	Size   int
	Score  int
	Buffer [][][]int
}

type Response struct {
	// semua fungsi
	Buffer             [][][]int
	IndexChange        [][][]int
	ObjectiveFunctions []int
	ExecutionTimeInMS  int
	CubeStates         [][][][]int

	//Steepest Ascent, Sideways Move HC, Simulated Annealing
	Iterations int

	// Random Restart HC
	RestartCount        int
	RestartPerIteration []int

	// simulated annealing
	LocalOptimum int
	DeltaE       []int

	// genetic algorithm
	ObjectiveFunctionsMean []int
}

func New(size ...int) *MagicCube {
	var n int
	if len(size) > 0 {
		n = size[0]
	} else {
		n = 5
	}

	buffer := make([][][]int, n)
	for i := range buffer {
		buffer[i] = make([][]int, n)
		for j := range buffer[i] {
			buffer[i][j] = make([]int, n)
		}
	}

	return &MagicCube{
		Size:   n,
		Buffer: buffer,
	}
}

func (mc *MagicCube) Print() {
	for i := 0; i < mc.Size; i++ {
		fmt.Printf("Layer %d:\n", i+1)
		for j := 0; j < mc.Size; j++ {
			fmt.Println(mc.Buffer[i][j])
		}
		fmt.Println()
	}
}

func (mc *MagicCube) Shuffle() {
	values := make([]int, mc.Size*mc.Size*mc.Size)
	for i := 0; i < len(values); i++ {
		values[i] = i + 1
	}

	rand.Shuffle(len(values), func(i, j int) { values[i], values[j] = values[j], values[i] })

	index := 0
	for i := 0; i < mc.Size; i++ {
		for j := 0; j < mc.Size; j++ {
			for k := 0; k < mc.Size; k++ {
				mc.Buffer[i][j][k] = values[index]
				index++
			}
		}
	}
}

func (mc *MagicCube) Copy() *MagicCube {
	newBuffer := make([][][]int, mc.Size)
	for i := range mc.Buffer {
		newBuffer[i] = make([][]int, mc.Size)
		for j := range mc.Buffer[i] {
			newBuffer[i][j] = make([]int, mc.Size)
			copy(newBuffer[i][j], mc.Buffer[i][j])
		}
	}

	return &MagicCube{
		Size:   mc.Size,
		Buffer: newBuffer,
	}
}

func AbsoluteVal(n int) int {
	if n < 0 {
		return -n
	} else {
		return n
	}
}

func IntToThreeDee(n int) [3]int {
	var x int = n / 25
	var y int = (n % 25) / 5
	var z int = n % 5
	res := [3]int{x, y, z}
	return res
}

func (mc *MagicCube) ObjectiveFunction() int {
	dimension := mc.Size
	score := 0
	magicNumber := dimension * (dimension*dimension*dimension + 1) / 2

	for y := 0; y < dimension; y++ {
		for z := 0; z < dimension; z++ {
			rowSum := 0
			for x := 0; x < dimension; x++ {
				rowSum += mc.Buffer[x][y][z]
			}
			score += AbsoluteVal(rowSum - magicNumber)
		}
	}

	for x := 0; x < dimension; x++ {
		for y := 0; y < dimension; y++ {
			columnSum := 0
			for z := 0; z < dimension; z++ {
				columnSum += mc.Buffer[x][y][z]
			}
			score += AbsoluteVal(columnSum - magicNumber)
		}
	}

	for x := 0; x < dimension; x++ {
		for z := 0; z < dimension; z++ {
			pillarSum := 0
			for y := 0; y < dimension; y++ {
				pillarSum += mc.Buffer[x][y][z]
			}
			score += AbsoluteVal(pillarSum - magicNumber)
		}
	}

	for z := 0; z < dimension; z++ {
		diag1XY := 0
		diag2XY := 0

		for i := 0; i < dimension; i++ {
			diag1XY += mc.Buffer[i][i][z]
			diag2XY += mc.Buffer[i][dimension-i-1][z]
		}

		score += AbsoluteVal(diag1XY - magicNumber)
		score += AbsoluteVal(diag2XY - magicNumber)
	}

	for y := 0; y < dimension; y++ {
		diag1XZ := 0
		diag2XZ := 0

		for i := 0; i < dimension; i++ {
			diag1XZ += mc.Buffer[i][y][i]
			diag2XZ += mc.Buffer[i][y][dimension-i-1]
		}

		score += AbsoluteVal(diag1XZ - magicNumber)
		score += AbsoluteVal(diag2XZ - magicNumber)
	}

	for x := 0; x < dimension; x++ {
		diag1YZ := 0
		diag2YZ := 0

		for i := 0; i < dimension; i++ {
			diag1YZ += mc.Buffer[x][i][i]
			diag2YZ += mc.Buffer[x][i][dimension-i-1]
		}

		score += AbsoluteVal(diag1YZ - magicNumber)
		score += AbsoluteVal(diag2YZ - magicNumber)
	}

	mainDiag3D := 0
	antiDiag1_3D := 0
	antiDiag2_3D := 0
	antiDiag3_3D := 0

	for i := 0; i < dimension; i++ {
		mainDiag3D += mc.Buffer[i][i][i]
		antiDiag1_3D += mc.Buffer[i][dimension-i-1][i]
		antiDiag2_3D += mc.Buffer[dimension-i-1][i][i]
		antiDiag3_3D += mc.Buffer[dimension-i-1][dimension-i-1][i]
	}

	score += AbsoluteVal(mainDiag3D - magicNumber)
	score += AbsoluteVal(antiDiag1_3D - magicNumber)
	score += AbsoluteVal(antiDiag2_3D - magicNumber)
	score += AbsoluteVal(antiDiag3_3D - magicNumber)

	return -score
}

func (mc *MagicCube) GetRandomIdx() [3]int {
	x := rand.Intn(mc.Size)
	y := rand.Intn(mc.Size)
	z := rand.Intn(mc.Size)
	return [3]int{x, y, z}
}

func (mc *MagicCube) SwapValues(idx1 [3]int, idx2 [3]int) {
	temp := mc.Buffer[idx1[0]][idx1[1]][idx1[2]]
	mc.Buffer[idx1[0]][idx1[1]][idx1[2]] = mc.Buffer[idx2[0]][idx2[1]][idx2[2]]
	mc.Buffer[idx2[0]][idx2[1]][idx2[2]] = temp
}

func (mc *MagicCube) SetScore(score int) {
	mc.Score = score
}
