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
		// {"/steepest-ascent-hill-climbing/", controllers.SteepestAscentHillClimbing},
		// {"/sideways-move-hill-climbing/", controllers.SidewaysMoveHillClimbing},
		// {"/random-restart-hill-climbing/", controllers.RandomRestartHillClimbing},
		// {"/stochastic-hill-climbing/", controllers.StochasticHillClimbing},
		{"/simulated-annealing/", controllers.SimulatedAnnealing},
		{"/genetic-algorithm/", controllers.GeneticAlgorithm},
	}

	for _, route := range routes {
		router.GET(route.path, route.handler)
	}
}
