package store

import (
	"database/sql"
	"log"

	"github.com/igor570/unlok/internal/utils"
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
	SignUp(user *User) error
	Login(u *User) error

	GetUserById(id int) (*User, error)
	GetUserByUsername(username string) (*User, error)
	UpdateUser(user *User) error
	DeleteUser(id int) error
}

func (s *UserPgStore) SignUp(u *User) error {
	hashedPassword, err := utils.HashPassword(u.Password)

	if err != nil {
		return err
	}

	query := `INSERT into users (username, password, profile_photo) VALUES ($1, $2, $3)`

	_, err = s.db.Exec(
		query,
		u.Username,
		hashedPassword,
		u.ProfilePhoto,
	)

	if err != nil {
		return err
	}
	return nil
}

func (s *UserPgStore) Login(u *User) error {
	var hashedPassword string

	// Get the hashed password from the DB for the given username
	query := `SELECT password FROM users WHERE username = $1`

	err := s.db.QueryRow(query, u.Username).Scan(&hashedPassword)

	if err != nil {
		return err // user not found or DB error
	}

	// Compare the hashed password from DB with the plaintext password from the request
	err = utils.ComparePasswords(hashedPassword, u.Password)

	if err != nil {
		return err // password does not match
	}

	return nil // login successful
}

func (s *UserPgStore) GetUserById(id int) (*User, error) {
	// TODO: Implement database logic
	return nil, nil
}

func (s *UserPgStore) GetUserByUsername(username string) (*User, error) {
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
