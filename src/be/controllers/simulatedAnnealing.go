package controllers

import (
	"be/algorithm"
	"net/http"

	"github.com/gin-gonic/gin"
)

func SimulatedAnnealing(c *gin.Context) {
   	cube := c.Param("cube")
    result, err := algorithm.SimulatedAnnealing(cube)

    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, gin.H{
        "input":  cube,
        "result": result,
    })
}
