package app

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/igor570/unlok/internal/handlers"
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
	Logger         *log.Logger
	UserHandler    *handlers.UserHandler
	MessageHandler *handlers.MessageHandler
	DB             *sql.DB
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
	userStore := store.NewUserStore(pgDB, logger)
	messageStore := store.NewMessageStore(pgDB, logger)

	// ... Create our Handlers
	userHandler := handlers.NewUserHandler(userStore, logger)
	messageHandler := handlers.NewMessageHandler(messageStore, logger)

	app := &Application{
		Logger:         logger,
		UserHandler:    userHandler,
		MessageHandler: messageHandler,
		DB:             pgDB,
	}

	return app, nil
}

func (a *Application) HealthCheck(w http.ResponseWriter, r *http.Request) {
	a.Logger.Println("HEALTHY")
	fmt.Fprintf(w, "Status is available")
}
