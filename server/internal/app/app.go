package app

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/igor570/unlok/internal/store"
	"github.com/joho/godotenv"
)

/*
 * Application is responsible for:
 * - Configuring our app.
 * - Holding a reference to our handlers, so we only need to pass Application around to access them.
 * - Holding a reference to our store.
 */

type Application struct {
	Logger *log.Logger
	DB     *sql.DB
}

/*
 * Constructor to instantiate a new app
 */

func NewApplication() (*Application, error) {
	err := godotenv.Load(".env")
	if err != nil {
		log.Fatalf("Error loading .env file: %s", err)
	}

	logger := log.New(os.Stdout, "", log.Ldate|log.Ltime)

	// Create our DB connection
	pgDB, err := store.Open()

	if err != nil {
		return nil, err
	}

	// ... Create the stores

	// ... Create our Handlers

	app := &Application{
		Logger: logger,
		DB:     pgDB,
	}

	return app, nil
}

func (a *Application) HealthCheck(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Status is available")
}
