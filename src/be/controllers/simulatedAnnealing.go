package controllers

import (
	"be/algorithm"
	"be/class/MagicCube"
	"encoding/json"
	"net/http"

	"github.com/gin-gonic/gin"
)

func SimulatedAnnealing(c *gin.Context) {
    
    cubeStr := c.Query("cube")

	magicCube := MagicCube.New()
	err := json.Unmarshal([]byte(cubeStr), &magicCube.Buffer)
    
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid cube format"})
		return
	}

	result, err := algorithm.SimulatedAnnealing(magicCube)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"result": result,
	})
}
