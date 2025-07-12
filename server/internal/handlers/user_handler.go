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

type UserHandler struct {
	userStore store.UserStore
	logger    *log.Logger
}

func NewUserHandler(userStore store.UserStore, logger *log.Logger) *UserHandler {
	return &UserHandler{
		userStore: userStore,
		logger:    logger,
	}
}

/*
 * CRUD Operations
 */

func (uh *UserHandler) SignUp(w http.ResponseWriter, r *http.Request) {
	var user store.User

	err := json.NewDecoder(r.Body).Decode(&user)

	if err != nil {
		uh.logger.Printf("ERROR: Error decoding request JSON %v", err)
		utils.WriteJSON(w, http.StatusInternalServerError, utils.Envelope{"Error": "Unable to decode JSON from Request"})
		return
	}

	if user.Username == "" || user.Password == "" {
		uh.logger.Printf("Error parsing JSON fields %v", err)
		utils.WriteJSON(w, http.StatusBadRequest, utils.Envelope{"Error": "Username, Password cannot be empty"})
		return
	}

	err = uh.userStore.SignUp(&user)

	if err != nil {
		uh.logger.Printf("ERROR: SignUp %v", err)
		utils.WriteJSON(w, http.StatusBadRequest, utils.Envelope{"Error": "Could not create user"})
		return
	}

	utils.WriteJSON(w, http.StatusCreated, utils.Envelope{"Success": "Created user"})
}

func (uh *UserHandler) Login(w http.ResponseWriter, r *http.Request) {
	var user store.User

	err := json.NewDecoder(r.Body).Decode(&user)

	if err != nil {
		uh.logger.Printf("ERROR: Error decoding request JSON %v", err)
		utils.WriteJSON(w, http.StatusInternalServerError, utils.Envelope{"Error": "Unable to decode JSON from Request"})
		return
	}

	if user.Username == "" || user.Password == "" {
		uh.logger.Printf("Error parsing JSON fields %v", err)
		utils.WriteJSON(w, http.StatusBadRequest, utils.Envelope{"Error": "Username & Password cannot be empty"})
		return
	}

	err = uh.userStore.Login(&user)

	if err != nil {
		uh.logger.Printf("ERROR: Login %v", err)
		utils.WriteJSON(w, http.StatusBadRequest, utils.Envelope{"Error": "Could not login user"})
		return
	}

	utils.WriteJSON(w, http.StatusCreated, utils.Envelope{"Success": "Logged in user"})
}
