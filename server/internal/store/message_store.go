package store

import (
	"database/sql"
	"log"
)

type Message struct {
	Id         string  `json:"id"`
	UserId     *string `json:"user_id,omitempty"`
	Identifier string  `json:"identifier"`
	Subject    string  `json:"subject"`
	Message    string  `json:"message"`
}

// What we'll send back, since it doesn't hold a userId & indentifier
// This is when a anonymous user downloads a message
type AnonMessageResponse struct {
	Id      string `json:"id"`
	Subject string `json:"subject"`
	Message string `json:"message"`
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
	GetMessage(messageId string) (*Message, error)
	CreateMessage(message *Message) (*Message, error)
	UpdateMessage(message *Message) error
	DeleteMessage(userId, messageId string) error

	// For history fetching
	GetAllMessage(userId string) ([]*Message, error)
}

// CRUD

func (s *MessagePgStore) GetMessage(messageId string) (*Message, error) {
	var message Message

	query := `SELECT id, userid, identifier, subject, message FROM messages WHERE id = $1`

	err := s.db.QueryRow(query, messageId).Scan(&message.Id, &message.UserId, &message.Identifier, &message.Subject, &message.Message)

	if err != nil {
		log.Printf("DB error: %v", err)
		if err == sql.ErrNoRows {
			return nil, nil
		}
		return nil, err
	}

	return &message, nil
}

func (s *MessagePgStore) GetAllMessage(userId string) ([]*Message, error) {
	// TODO: Implement database logic

	return nil, nil
}

func (s *MessagePgStore) CreateMessage(message *Message) (*Message, error) {
	var id string

	query := `INSERT INTO messages (id, userId, identifier, subject, message) VALUES ($1, $2, $3, $4, $5) RETURNING id`

	err := s.db.QueryRow(
		query,
		message.Id,
		message.UserId,
		message.Identifier,
		message.Subject,
		message.Message,
	).Scan(&id)

	if err != nil {
		return nil, err
	}

	message.Id = id
	return message, nil
}

func (s *MessagePgStore) UpdateMessage(message *Message) error {
	// TODO: Implement database logic
	return nil
}

func (s *MessagePgStore) DeleteMessage(userId, messageId string) error {
	// TODO: Implement database logic
	return nil
}
