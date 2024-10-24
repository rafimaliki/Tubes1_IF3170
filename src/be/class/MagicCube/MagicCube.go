package MagicCube

import "fmt"

type MagicCube struct {
    Size   int
    Matrix [][][]int
}

func New(size ...int) *MagicCube {
    var n int
    if len(size) > 0 {
        n = size[0] 
    } else {
        n = 5   
    }

    matrix := make([][][]int, n)
    for i := range matrix {
        matrix[i] = make([][]int, n)
        for j := range matrix[i] {
            matrix[i][j] = make([]int, n)
        }
    }

    return &MagicCube{
        Size:   n,
        Matrix: matrix,
    }
}

func (mc *MagicCube) Print() {
    for i := 0; i < mc.Size; i++ {
        fmt.Printf("Layer %d:\n", i+1)
        for j := 0; j < mc.Size; j++ {
            fmt.Println(mc.Matrix[i][j])
        }
        fmt.Println() 
    }
}
