package algorithm

import (
	"be/class/MagicCube"
	"fmt"
    "math/rand"
    "time"
)

func GeneticAlgorithm(cube *MagicCube.MagicCube, startpopulation int, iteration int) (MagicCube.Response, error) {
    
    response := MagicCube.Response{}
    idx := 0
    start := time.Now()
    population := [](MagicCube.MagicCube){}    
    for i := 0; i < 10000; i++ {
        cube.Shuffle()
        newcube := MagicCube.MagicCube{}
        
        // Deep copy cube.Buffer to newcube.Buffer
        newcube.Buffer = make([][][]int, len(cube.Buffer))
        for j := range cube.Buffer {
            newcube.Buffer[j] = make([][]int, len(cube.Buffer[j]))
            for k := range cube.Buffer[j] {
                newcube.Buffer[j][k] = make([]int, len(cube.Buffer[j][k]))
                copy(newcube.Buffer[j][k], cube.Buffer[j][k])
            }
        }
        
        score := cube.ObjectiveFunction()
        newcube.SetScore(score)
        population = append(population, newcube)
    }
    
    
    for i := 0; i < 1; i++ {
        newpopulation := [](MagicCube.MagicCube){}
        listfitness := []float64{}
        listprobability := []float64{}
        totalfitness := float64(0)

        for j := 0; j < len(population); j++ {
            listfitness = append(listfitness, 1.0/float64(population[j].Score))
            totalfitness += 1.0/float64(population[j].Score)

        }
        for j := 0; j < len(listfitness); j++ {
            if j == 0 {
                listprobability = append(listprobability, 100.0 * (listfitness[j]/totalfitness))
            } else {
                listprobability = append(listprobability, listprobability[j-1]+ 100.0 * (listfitness[j]/totalfitness))
            }
        }
        for k:=0; k<len(population); k++ {
            selector := float64(rand.Intn(100))
            selector1 := float64(rand.Intn(100))

            use1 := MagicCube.MagicCube{}
            for j:=0; j < len(listprobability); j++ {
                if selector < listprobability[j] {
                    cube.Buffer = population[j].Buffer
                    use1.Buffer = cube.Buffer
                    break
                }
            }

            use2 := MagicCube.MagicCube{}            
            for j:=0; j < len(listprobability); j++ {
                if selector1 < listprobability[j] {
                    use2.Buffer = population[j].Buffer
                    break
                }
            }
            
            crossover(cube, use1, use2, &newpopulation)
        }
        population = newpopulation

        totalscore := 0
        score := -1000000
        for i:=0; i< len(population); i++ {
            if score < population[i].Score {
                score = population[i].Score
                idx = i
            }
            totalscore += population[i].Score
        }       
        response.ObjectiveFunctions = append(response.ObjectiveFunctions, score)
        response.ObjectiveFunctionsMean = append(response.ObjectiveFunctionsMean, totalscore/len(population))

        if score == 0 {
            break
        }
    }

    
    elapsed := time.Since(start)
    response.ExecutionTimeInMS = int(elapsed.Milliseconds())

    fmt.Println("\033[32mGenetic Algorithm\033[0m")

    response.Buffer = population[idx].Buffer
    // fmt.Println("Buffer: ", response.Buffer[0][1])
    // fmt.Println("Execution Time: ", response.ExecutionTimeInMS, "ms")
	
    return response, nil 
}

func crossover(cube *MagicCube.MagicCube, e MagicCube.MagicCube, f MagicCube.MagicCube, newpopulation *[]MagicCube.MagicCube) {
    var tracknumw [126]int
    var tracknumx [126]int

    w := make([][][]int, 5)
    for i := range w {
        w[i] = make([][]int, 5)
        for j := range w[i] {
            w[i][j] = make([]int, 5)
        }
    }

    x := make([][][]int, 5)
    for i := range x {
        x[i] = make([][]int, 5)
        for j := range x[i] {
            x[i][j] = make([]int, 5)
        }
    }

    cp := rand.Intn(125)
    tracknumidx := 0

    // Crossover logic
    for j := 0; j < 5; j++ {
        for k := 0; k < 5; k++ {
            for l := 0; l < 5; l++ {
                if tracknumidx < cp {
                    w[j][k][l] = e.Buffer[j][k][l]
                    tracknumw[e.Buffer[j][k][l]]++
                    x[j][k][l] = f.Buffer[j][k][l]
                    tracknumx[f.Buffer[j][k][l]]++
                    tracknumidx++
                } else {
                    w[j][k][l] = f.Buffer[j][k][l]
                    tracknumw[f.Buffer[j][k][l]]++
                    x[j][k][l] = e.Buffer[j][k][l]
                    tracknumx[e.Buffer[j][k][l]]++
                }
            }
        }
    }

    // Ensure unique values in w and x
    for j := 0; j < 5; j++ {
        for k := 0; k < 5; k++ {
            for l := 0; l < 5; l++ {
                if tracknumw[w[j][k][l]] > 1 {
                    for m := 0; m < len(tracknumw); m++ {
                        if tracknumw[m] == 0 {
                            w[j][k][l] = m
                            tracknumw[m]++
                            break // Break after assignment to avoid multiple changes
                        }
                    }
                }
                if tracknumx[x[j][k][l]] > 1 {
                    for m := 0; m < len(tracknumx); m++ {
                        if tracknumx[m] == 0 {
                            x[j][k][l] = m
                            tracknumx[m]++
                            break // Break after assignment to avoid multiple changes
                        }
                    }
                }
            }
        }
    }

    // Swap specific elements in w and x for mutation
    temp := w[2][2][2]
    w[2][2][2] = w[4][4][4]
    w[4][4][4] = temp

    temp = x[2][2][2]
    x[2][2][2] = x[4][4][4]
    x[4][4][4] = temp

    // First new cube with buffer w
    newcube := MagicCube.MagicCube{}
    newcube.Buffer = w
    cube.Buffer = w
    score := cube.ObjectiveFunction()
    newcube.SetScore(score)
    *newpopulation = append(*newpopulation, newcube)

    // Second new cube with buffer x
    newcube2 := MagicCube.MagicCube{}
    newcube2.Buffer = x
    cube.Buffer = x
    score = cube.ObjectiveFunction()
    newcube2.SetScore(score)
    *newpopulation = append(*newpopulation, newcube2)
}
