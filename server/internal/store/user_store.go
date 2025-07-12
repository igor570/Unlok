package store

import (
	"database/sql"
	"log"
)

type User struct {
	Id           int    `json:"id"`
	Username     string `json:"username"`
	Password     string `json:"password"`
	ProfilePhoto string `json:"profile_photo"`
}

type UserPgStore struct {
	db     *sql.DB
	logger *log.Logger
}

func NewUserStore(db *sql.DB, logger *log.Logger) *UserPgStore {
	return &UserPgStore{
		db:     db,
		logger: logger,
	}
}

type UserStore interface {
	GetUserById(id int) (*User, error)
	GetUserByUsername(username string) (*User, error)
	CreateUser(user User) (*User, error)
	UpdateUser(user *User) error
	DeleteUser(id int) error
}

func (s *UserPgStore) GetUserById(id int) (*User, error) {
	// TODO: Implement database logic
	return nil, nil
}

func (s *UserPgStore) GetUserByUsername(username string) (*User, error) {
	// TODO: Implement database logic
	return nil, nil
}

func (s *UserPgStore) CreateUser(user User) (*User, error) {
	// TODO: Implement database logic
	return nil, nil
}

func (s *UserPgStore) UpdateUser(user *User) error {
	// TODO: Implement database logic
	return nil
}

func (s *UserPgStore) DeleteUser(id int) error {
	// TODO: Implement database logic
	return nil
}
