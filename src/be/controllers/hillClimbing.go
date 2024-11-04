package controllers

import (
	"be/algorithm"
	"be/class/MagicCube"
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

func SteepestAscentHillClimbing(c *gin.Context) {

	cubeStr := c.Query("cube")

	magicCube := MagicCube.New()
	err := json.Unmarshal([]byte(cubeStr), &magicCube.Buffer)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid cube format"})
		return
	}

	result, err := algorithm.SteepestAscentHillClimbing(magicCube)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"result": result,
	})
}

func SidewaysMoveHillClimbing(c *gin.Context) {

	cubeStr := c.Query("cube")
	maxSideways, _ := strconv.Atoi(c.Query("maxSideways"))
	magicCube := MagicCube.New()
	err := json.Unmarshal([]byte(cubeStr), &magicCube.Buffer)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid cube format"})
		return
	}

	result, err := algorithm.SidewaysMoveHillClimbing(magicCube, maxSideways)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"result": result,
	})
}

func RandomRestartHillClimbing(c *gin.Context) {

	cubeStr := c.Query("cube")
	maxRestart, _ := strconv.Atoi(c.Query("maxRestart"))
	magicCube := MagicCube.New()
	err := json.Unmarshal([]byte(cubeStr), &magicCube.Buffer)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid cube format"})
		return
	}

	result, err := algorithm.RandomRestartHillClimbing(magicCube, maxRestart)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"result": result,
	})
}

func StochasticHillClimbing(c *gin.Context) {

	cubeStr := c.Query("cube")

	magicCube := MagicCube.New()
	err := json.Unmarshal([]byte(cubeStr), &magicCube.Buffer)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid cube format"})
		return
	}

	result, err := algorithm.StochasticHillClimbing(magicCube)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"result": result,
	})
}
