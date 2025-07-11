package store

import (
	"database/sql"
	"log"
)

type Message struct {
	Id         string `json:"id"`
	UserId     string `json:"userId"`
	Identifier string `json:"identifier"`
	Subject    string `json:"subject"`
	Message    string `json:"message"`
}

type MessagePgStore struct {
	db     *sql.DB
	logger *log.Logger
}

func NewMessageStore(db *sql.DB, logger *log.Logger) *MessagePgStore {
	return &MessagePgStore{
		db:     db,
		logger: logger,
	}
}

type MessageStore interface {
	GetMessage(messageId string) ([]*Message, error)
	CreateMessage(message *Message) (*Message, error)
	UpdateMessage(message *Message) error
	DeleteMessage(userId, messageId string) error

	// For history fetching
	GetAllMessage(userId string) (*Message, error)
}

// CRUD

func (s *MessagePgStore) GetMessage(messageId string) ([]*Message, error) {
	// TODO: Implement database logic
	return nil, nil
}

func (s *MessagePgStore) GetAllMessage(userId string) (*Message, error) {
	// TODO: Implement database logic
	return nil, nil
}

func (s *MessagePgStore) CreateMessage(message *Message) (*Message, error) {
	// TODO: Implement database logic
	return nil, nil
}

func (s *MessagePgStore) UpdateMessage(message *Message) error {
	// TODO: Implement database logic
	return nil
}

func (s *MessagePgStore) DeleteMessage(userId, messageId string) error {
	// TODO: Implement database logic
	return nil
}
