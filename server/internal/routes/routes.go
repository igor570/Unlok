package routes

import (
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
	"github.com/igor570/unlok/internal/app"
)

/*
 * The routes package is responsible for storing all our logic for routes, middleware, grouping and so on.
 */

/*
 * The setupRoutes function gives us back a mux.
 * our mux handles computing all our URL paths, and handler functions.
 */

func SetupRoutes(app *app.Application) *chi.Mux {
	r := chi.NewRouter()

	r.Use(middleware.Logger)

	r.Use(cors.Handler(cors.Options{
		// AllowedOrigins:   []string{"https://foo.com"}, // Use this to allow specific origin hosts
		AllowedOrigins: []string{"*"},
		// AllowOriginFunc:  func(r *http.Request, origin string) bool { return true },
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
		ExposedHeaders:   []string{"Link"},
		AllowCredentials: false,
		MaxAge:           300, // Maximum value not ignored by any of major browsers
	}))

	//Auth
	r.Post("/auth/create", app.UserHandler.SignUp)
	r.Post("/auth/login", app.UserHandler.Login)

	//Messages
	r.Get("/all-messages/{userId}", app.MessageHandler.GetAllMessages)
	r.Get("/message/{id}", app.MessageHandler.GetMessage)
	r.Post("/message", app.MessageHandler.CreateMessage)

	r.Get("/health", app.HealthCheck)

	return r
}
