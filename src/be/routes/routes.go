package routes

import (
	"be/controllers"

	"github.com/gin-gonic/gin"
)

func InitRoutes(router *gin.Engine) {
    routes := []struct {
        method  string
        path    string
        handler gin.HandlerFunc
    }{
		{"GET", "/hill-climbing/:cube", controllers.HillClimbing},
		{"GET", "/simulated-annealing/:cube", controllers.SimulatedAnnealing},
		{"GET", "/genetic-algorithm/:cube", controllers.GeneticAlgorithm},
    }

    for _, route := range routes {
        switch route.method {
        case "GET":
            router.GET(route.path, route.handler)
        case "POST":
            router.POST(route.path, route.handler)
        }
    }
}
