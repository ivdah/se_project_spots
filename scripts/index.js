const editProfileBtn = document.querySelector(".profile__edit-btn");
const editProfileModal = document.querySelector("#edit-profile-modal");
const newPostProfileModal = document.querySelector("#new-post-modal");
const editProfileCloseBtn = editProfileModal.querySelector(".modal__close-btn");
const editProfileForm = editProfileModal.querySelector(".modal__form");
const editProfileNameInput = editProfileModal.querySelector(
  "#profile-name-input"
);
const editDescriptionInput = editProfileModal.querySelector(
  "#profile-description-input"
);

const newPostProfileForm = newPostProfileModal.querySelector(".modal__form");
const newPostProfileImageLink =
  newPostProfileModal.querySelector("#card-image-input");
const newPostProfileCaption = newPostProfileModal.querySelector(
  "#profile-caption-input"
);

const newPostBtn = document.querySelector(".profile__add-btn");
const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseBtn = newPostModal.querySelector(".modal__close-btn");

const profileNameEl = document.querySelector(".profile__name");
const profileDescriptionEl = document.querySelector(".profile__description");

function openModal(modal) {
  modal.classList.add("modal_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
}

// Open the edit profile modal and set the values for the input fields
editProfileBtn.addEventListener("click", function () {
  editProfileNameInput.value = profileNameEl.textContent;
  editDescriptionInput.value = profileDescriptionEl.textContent;
  // editProfileModal.classList.add("modal_is-opened");
  openModal(editProfileModal);
});

editProfileCloseBtn.addEventListener("click", function () {
  // editProfileModal.classList.remove("modal_is-opened");
  closeModal(editProfileModal);
});

newPostBtn.addEventListener("click", function () {
  // newPostModal.classList.add("modal_is-opened");
  openModal(newPostModal);
});

newPostCloseBtn.addEventListener("click", function () {
  // newPostModal.classList.remove("modal_is-opened");
  closeModal(newPostModal);
});

function handleEditProfileSubmit(evt) {
  evt.preventDefault();
  profileNameEl.textContent = editProfileNameInput.value;
  profileDescriptionEl.textContent = editDescriptionInput.value;
  // editProfileModal.classList.remove("modal_is-opened");
  closeModal(editProfileModal);
}

editProfileForm.addEventListener("submit", handleEditProfileSubmit);

function handleNewPostSubmit(evt) {
  evt.preventDefault();

  // const newPostImageLink = newPostProfileImageLink.value;
  // const newPostCaption = newPostProfileCaption.value;

  console.log(newPostProfileImageLink);
  console.log(newPostProfileCaption);

  // newPostModal.classList.remove("modal_is-opened");
  closeModal(newPostModal);
}

newPostProfileForm.addEventListener("submit", handleNewPostSubmit);
