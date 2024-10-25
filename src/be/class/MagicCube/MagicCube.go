package MagicCube

import (
	"fmt"
	"math/rand"
)

type MagicCube struct {
    Size   int
    Buffer [][][]int
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
