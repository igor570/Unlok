package handlers

import (
	"encoding/json"

	"log"
	"net/http"

	"github.com/igor570/unlok/internal/store"
	"github.com/igor570/unlok/internal/utils"
)

/*
 * Our user handler, these functions will be ran in our routes for anything to do with Users.
 */

type MessageHandler struct {
	messageStore store.MessageStore
	logger       *log.Logger
}

func NewMessageHandler(messageStore store.MessageStore, logger *log.Logger) *MessageHandler {
	return &MessageHandler{
		messageStore: messageStore,
		logger:       logger,
	}
}

/*
 * CRUD Operations
 */

func (mh *MessageHandler) CreateMessage(w http.ResponseWriter, r *http.Request) {
	var message store.Message

	err := json.NewDecoder(r.Body).Decode(&message)

	if err != nil {
		mh.logger.Printf("ERROR: Error decoding request JSON %v", err)
		utils.WriteJSON(w, http.StatusInternalServerError, utils.Envelope{"Error": "Unable to decode JSON from Request"})
		return
	}

	if message.Identifier == "" || message.Message == "" || message.Subject == "" || message.Id == "" {
		mh.logger.Printf("Error parsing JSON fields %v", err)
		utils.WriteJSON(w, http.StatusBadRequest, utils.Envelope{"Error": "Identifer, Message, Subject and Id are required"})
		return
	}

	_, err = mh.messageStore.CreateMessage(&message)

	if err != nil {
		mh.logger.Printf("ERROR: Could not create message %v", err)
		utils.WriteJSON(w, http.StatusBadRequest, utils.Envelope{"Error": "Could not create message"})
		return
	}

	utils.WriteJSON(w, http.StatusCreated, utils.Envelope{"Success": "Created user"})
}
