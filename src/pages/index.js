import "./index.css";

import { enableValidation } from "../scripts/validation.js";
import Api from "../utils/Api.js";
import { resetValidation, disableButton } from "../scripts/validation.js";

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "b4790c03-e64a-40f8-ac65-a3a6babc0279",
    "Content-Type": "application/json",
  },
});

api
  .getAppInfo()
  .then(([Cards, UserInfo]) => {
    // Populate user info
    profileNameEl.textContent = UserInfo.name;
    profileDescriptionEl.textContent = UserInfo.about;
    profileAvatarEl.src = UserInfo.avatar;
    profileAvatarEl.alt = UserInfo.name;

    // Populate cards
    Cards.forEach((item) => {
      const cardEl = getCardElement(item);
      cardsList.append(cardEl);
    });
  })
  .catch((err) => {
    console.log(`Error fetching app info: ${err}`);
  });

export const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-btn",
  inactiveButtonClass: "modal__submit-btn_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const editProfileBtn = document.querySelector(".profile__edit-btn");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseBtn = editProfileModal.querySelector(".modal__close-btn");
const editProfileForm = editProfileModal.querySelector(".modal__form");
const avatarModalBtn = document.querySelector(".profile__avatar-btn");
const editProfileNameInput = editProfileModal.querySelector(
  "#profile-name-input",
);
const editDescriptionInput = editProfileModal.querySelector(
  "#profile-description-input",
);

const newPostModal = document.querySelector("#new-post-modal");
const newPostProfileForm = newPostModal.querySelector(".modal__form");
const newPostSubmitBtn = newPostModal.querySelector(".modal__submit-btn");
const newPostProfileImageLink = newPostModal.querySelector("#card-image-input");
const newPostProfileCaption = newPostModal.querySelector(
  "#profile-caption-input",
);
const newPostBtn = document.querySelector(".profile__add-btn");
const newPostCloseBtn = newPostModal.querySelector(".modal__close-btn");

const avatarModal = document.querySelector("#avatar-modal");
const avatarForm = avatarModal.querySelector(".modal__form");
const avatarSubmitBtn = avatarModal.querySelector(".modal__submit-btn");
const avatarCloseBtn = avatarModal.querySelector(".modal__close-btn");
const avatarLinkInput = avatarModal.querySelector("#profile-avatar-input");

const modals = document.querySelectorAll(".modal");

const deleteModal = document.querySelector("#delete-modal");
const deleteForm = deleteModal.querySelector(".modal__form");

const profileNameEl = document.querySelector(".profile__name");
const profileDescriptionEl = document.querySelector(".profile__description");
const profileAvatarEl = document.querySelector(".profile__avatar");

const previewModal = document.querySelector("#preview__type_modal");
const previewImageEl = previewModal.querySelector(".modal__image");
const previewCaption = previewModal.querySelector(".modal__caption");

let selectedCard, selectedCardId;

const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");
const cardsList = document.querySelector(".cards__list");

function handlelike(evt, _id) {
  const likeButton = evt.target;
  const isLiked = likeButton.classList.contains("card__like-btn_active");

  api
    .changeLikeStatus({ _id, isLiked: !isLiked })
    .then((data) => {
      likeButton.classList.toggle("card__like-btn_active", data.isLiked);
    })
    .catch((err) => {
      console.error(`Error updating like status: ${err}`);
    });
}

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);

  const cardTitleEl = cardElement.querySelector(".card__title");
  const cardImageEl = cardElement.querySelector(".card__image");

  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;
  cardTitleEl.textContent = data.name;

  const cardLikeBtnEl = cardElement.querySelector(".card__like-btn");
  if (data.isLiked) {
    cardLikeBtnEl.classList.add("card__like-btn_active");
  }

  cardLikeBtnEl.addEventListener("click", (evt) => handlelike(evt, data._id));

  const cardDeleteBtnEl = cardElement.querySelector(".card__delete-btn");
  cardDeleteBtnEl.addEventListener("click", () => {
    handleDeleteCard(cardElement, data);
  });

  cardImageEl.addEventListener("click", () => {
    previewImageEl.src = data.link;
    previewImageEl.alt = data.name;
    previewCaption.textContent = data.name;
    openModal(previewModal);
  });

  return cardElement;
}

avatarModalBtn.addEventListener("click", () => {
  openModal(avatarModal);
});

deleteForm.addEventListener("submit", handleDeleteCardSubmit);

const modalCancelBtn = deleteModal.querySelector(".modal__cancel-btn");
modalCancelBtn.addEventListener("click", () => {
  closeModal(deleteModal);
});

modals.forEach((modal) => {
  modal.addEventListener("mousedown", (evt) => {
    if (
      evt.target.classList.contains("modal") ||
      evt.target.classList.contains("modal__close-btn")
    ) {
      closeModal(modal);
    }
  });
});

function handleEscape(evt) {
  if (evt.key === "Escape") {
    const openModal = document.querySelector(".modal_is-opened");
    closeModal(openModal);
  }
}

editProfileBtn.addEventListener("click", function () {
  editProfileNameInput.value = profileNameEl.textContent;
  editDescriptionInput.value = profileDescriptionEl.textContent;
  resetValidation(
    editProfileForm,
    [editProfileNameInput, editDescriptionInput],
    settings,
  );
  openModal(editProfileModal);
});

newPostBtn.addEventListener("click", function () {
  openModal(newPostModal);
});

const closeButtons = document.querySelectorAll(".modal__close-btn");
closeButtons.forEach((button) => {
  const modal = button.closest(".modal");

  button.addEventListener("click", () => closeModal(modal));
});
function handleOverlayClick(evt) {
  // only close if the click is on the overlay itself, not inside the modal content
  if (evt.target === evt.currentTarget) {
    closeModal(evt.currentTarget);
  }
}

function openModal(modal) {
  modal.classList.add("modal_is-opened");
  document.addEventListener("keydown", handleEscape);
  modal.addEventListener("mousedown", handleOverlayClick);
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
  document.removeEventListener("keydown", handleEscape);
  modal.removeEventListener("mousedown", handleOverlayClick);
}
function handleEditProfileSubmit(evt) {
  evt.preventDefault();

  const submitBtn = evt.submitter;
  submitBtn.textContent = "Saving...";

  api
    .editUserInfo({
      name: editProfileNameInput.value,
      about: editDescriptionInput.value,
    })
    .then((updatedUserInfo) => {
      profileNameEl.textContent = updatedUserInfo.name;
      profileDescriptionEl.textContent = updatedUserInfo.about;
      closeModal(editProfileModal);
    })
    .catch((err) => {
      console.log(`Error updating user info: ${err}`);
    })
    .finally(() => {
      submitBtn.textContent = "Save";
    });
}

editProfileForm.addEventListener("submit", handleEditProfileSubmit);

function handleAvatarFormSubmit(evt) {
  evt.preventDefault();

  const submitBtn = evt.submitter;
  submitBtn.textContent = "Saving...";

  api
    .editUserAvatar({
      avatar: avatarLinkInput.value,
    })
    .then((updatedUserInfo) => {
      profileAvatarEl.src = updatedUserInfo.avatar;
      profileAvatarEl.alt = updatedUserInfo.name;
      closeModal(avatarModal);
    })
    .catch((err) => {
      console.log(`Error updating avatar: ${err}`);
    })
    .finally(() => {
      submitBtn.textContent = "Save";
    });
}

avatarForm.addEventListener("submit", handleAvatarFormSubmit);

function handleDeleteCardSubmit(evt) {
  evt.preventDefault();

  const submitBtn = evt.submitter;
  submitBtn.textContent = "Deleting...";

  api
    .deleteCard({ _id: selectedCardId })
    .then(() => {
      selectedCard.remove();
      closeModal(deleteModal);
    })
    .catch((err) => {
      console.log(`Error deleting card: ${err}`);
    })
    .finally(() => {
      submitBtn.textContent = "Delete";
    });
}

function handleDeleteCard(cardElement, data) {
  selectedCard = cardElement;
  selectedCardId = data._id;
  openModal(deleteModal);
}

function handleNewPostSubmit(evt) {
  evt.preventDefault();

  const submitBtn = evt.submitter;
  submitBtn.textContent = "Saving...";

  api
    .addCard({
      link: newPostProfileImageLink.value,
      name: newPostProfileCaption.value,
    })
    .then((newCard) => {
      const cardElement = getCardElement(newCard);
      cardsList.prepend(cardElement);

      evt.target.reset();
      resetValidation(
        newPostProfileForm,
        [newPostProfileImageLink, newPostProfileCaption],
        settings,
      );
      disableButton(newPostSubmitBtn, settings);
      closeModal(newPostModal);
    })
    .catch((err) => {
      console.log(`Error adding card: ${err}`);
    })
    .finally(() => {
      submitBtn.textContent = "Save";
    });
}

newPostProfileForm.addEventListener("submit", handleNewPostSubmit);

enableValidation(settings);
