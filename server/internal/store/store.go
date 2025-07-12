package store

import (
	"database/sql"
	"fmt"
	"os"

	_ "github.com/jackc/pgx/v4/stdlib"
)

/*
 * Database.go is responsible for connecting to our DB using the pgx package.
 */

func Open() (*sql.DB, error) {

	// Getting and using a value from .env
	sql_string := os.Getenv("DB_URL")

	db, err := sql.Open("pgx", sql_string)

	if err != nil {
		return nil, fmt.Errorf("db: open %w", err)
	}

	// Test the database connection
	if err := db.Ping(); err != nil {
		return nil, fmt.Errorf("db: ping method %w", err)
	}

	fmt.Println("Database connection successful")

	return db, nil
}
