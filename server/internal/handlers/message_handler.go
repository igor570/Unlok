package handlers

import (
	"encoding/json"
	"strconv"

	"log"
	"net/http"

	"github.com/go-chi/chi/v5"
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

func (mh *MessageHandler) GetMessage(w http.ResponseWriter, r *http.Request) {
	messageId := chi.URLParam(r, "id")

	if messageId == "" {
		utils.WriteJSON(w, http.StatusBadRequest, utils.Envelope{"Error": "Missing message id"})
		return
	}

	foundMessage, err := mh.messageStore.GetMessage(messageId)

	if err != nil {
		mh.logger.Printf("ERROR: Could not fetch message %v", err)
		utils.WriteJSON(w, http.StatusInternalServerError, utils.Envelope{"Error": "Could not fetch message"})
		return
	}

	if foundMessage == nil {
		utils.WriteJSON(w, http.StatusNotFound, utils.Envelope{"Error": "Message not found"})
		return
	}

	// Create a response struct without userId
	resp := store.AnonMessageResponse{
		Id:      foundMessage.Id,
		Subject: foundMessage.Subject,
		Message: foundMessage.Message,
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(resp)
}

func (mh *MessageHandler) GetAllMessages(w http.ResponseWriter, r *http.Request) {
	userId, err := strconv.Atoi(chi.URLParam(r, "userId"))

	if err != nil {
		utils.WriteJSON(w, http.StatusBadRequest, utils.Envelope{"Error": "Invalid user id"})
		return
	}

	if userId == 0 {
		utils.WriteJSON(w, http.StatusBadRequest, utils.Envelope{"Error": "User ID 0 is not valid"})
		return
	}

	foundMessages, err := mh.messageStore.GetAllMessage(userId)

	if err != nil {
		mh.logger.Printf("ERROR: Could not fetch messages %v", err)
		utils.WriteJSON(w, http.StatusInternalServerError, utils.Envelope{"Error": "Could not fetch messages"})
		return
	}

	if len(foundMessages) == 0 {
		utils.WriteJSON(w, http.StatusNotFound, utils.Envelope{"Error": "Cannot find messages for given user"})
		return
	}

	// Create a response struct for messages
	messages := make([]store.Message, len(foundMessages))
	for i, m := range foundMessages {
		if m != nil {
			messages[i] = *m
		}
	}

	resp := store.Messages{
		Messages: messages,
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(resp)
}

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

	createdMessage, err := mh.messageStore.CreateMessage(&message)

	if err != nil {
		mh.logger.Printf("ERROR: Could not create message %v", err)
		utils.WriteJSON(w, http.StatusBadRequest, utils.Envelope{"Error": "Could not create message"})
		return
	}

	// Return the created message (including its id) in the response
	utils.WriteJSON(w, http.StatusCreated, utils.Envelope{"message_id": createdMessage.Id})
}
