package routes

import (
	"be/controllers"

	"github.com/gin-gonic/gin"
)

func InitRoutes(router *gin.Engine) {
    routes := []struct {
        path    string
        handler gin.HandlerFunc
    }{
		{"/hill-climbing/", controllers.HillClimbing},
		{"/simulated-annealing/", controllers.SimulatedAnnealing},
		{"/genetic-algorithm/", controllers.GeneticAlgorithm},
    }

    for _, route := range routes {
        router.GET(route.path, route.handler)
    }
}
