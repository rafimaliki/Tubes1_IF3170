package main

import (
	"be/routes"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
    r := gin.Default()
    r.Use(cors.Default())

    routes.InitRoutes(r)

    r.Run(":8080")
}
