package server

import (
	"net/http"
	"time"

	"github.com/igor570/unlok/internal/app"
	"github.com/igor570/unlok/internal/routes"
)

func main() {
	app, err := app.NewApplication()

	if err != nil {
		panic("Could not instantiate app")
	}

	defer app.DB.Close()

	app.Logger.Println("App is running!")

	router := routes.SetupRoutes(app)

	server := &http.Server{
		Addr:         ":8080",
		IdleTimeout:  time.Minute,
		ReadTimeout:  10 * time.Second,
		WriteTimeout: 30 * time.Second,
		Handler:      router,
	}

	err = server.ListenAndServe()

	if err != nil {
		app.Logger.Fatal(err)
	}
}
