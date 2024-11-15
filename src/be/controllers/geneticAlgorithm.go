package controllers

import (
	"be/algorithm"
	"be/class/MagicCube"
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

func GeneticAlgorithm(c *gin.Context) {
    
    cubeStr := c.Query("cube")
	startpopulation, _ := strconv.Atoi(c.Query("startPopulation"))
	iteration, _ := strconv.Atoi(c.Query("maxIteration"))


	magicCube := MagicCube.New()
	err := json.Unmarshal([]byte(cubeStr), &magicCube.Buffer)
    
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid cube format"})
		return
	}

	result, err := algorithm.GeneticAlgorithm(magicCube, startpopulation, iteration)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"result": result,
	})
}
