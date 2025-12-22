const editProfileBtn = document.querySelector(".profile__edit-btn");
const editProfileModal = document.querySelector("#edit-profile-modal");
const newpostProfileModal = document.querySelector("#new-post-modal");
const editProfileCloseBtn = editProfileModal.querySelector(".modal__close-btn");
const editProfileForm = editProfileModal.querySelector(".modal__form")
const editProfileNameInput = editProfileModal.querySelector("#profile-name-input");
const editDescriptonInput = editProfileModal.querySelector("#profile-description-input");

const newpostProfileForm = newpostProfileModal.querySelector(".modal__title");
const newpostProfileImageLink = newpostProfileModal.querySelector("#card-image-input");
const newpostProfileCapton = newpostProfileModal.querySelector("#profile-description-input");

const newPostBtn = document.querySelector(".profile__add-btn");
const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseBtn = newPostModal.querySelector(".modal__close-btn");

const profileNameEl = document.querySelector(".profile__name");
const profileDescriptionEl = document.querySelector(".profile__description");



editProfileBtn.addEventListener("click", function () {
  editProfileNameInput.value = profileNameEl.textContent;
  editProfileModal.classList.add("modal_is-opened");
} );

editProfileCloseBtn.addEventListener("click", function() {
  editProfileModal.classList.remove("modal_is-opened");
} );

newPostBtn.addEventListener("click", function () {
  newPostModal.classList.add("modal_is-opened");
} );

newPostCloseBtn.addEventListener("click", function() {
  newPostModal.classList.remove("modal_is-opened");
} );

function handlerEditProfileSubmit(evt){
  evt.preventDefault();
  profileNameEl.textContent = editProfileNameInput.value;
  profileDescriptionEl.textContent = editDescriptonInput.value;
  editProfileModal.classList.remove("modal_is-opened");
}

editProfileForm.addEventListener("submit", handlerEditProfileSubmit);


function handleNewpostSubmit(evt) {
  evt.preventDefault();

const newpostProfileImageLink = newpostProfileImageLink.value;
const newpostProfileCapton = newpostProfileCapton.value;

console.log(newpostProfileImageLink);
console.log(newpostProfileCapton);


newPostModal.classList.add("modal_is-opened");


newpostProfileFormt.addEventListener("submit", handleNewpostSubmit);}
