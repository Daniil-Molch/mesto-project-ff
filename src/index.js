// index.js

import { openModal, closeModal, handleOverlay } from "./components/modal.js";
import "./index.css"; // добавьте импорт главного файла стилей
import { createCard, onLike } from "./components/card.js";
import { clearValidation, validation } from "./components/validation.js";
import {
  fetchCards,
  fetchUser,
  removeLike,
  updateUserData,
  updateAvatar,
  deleteCard,
  createCard as createCardAPI,
} from "./components/api.js";

const imgModal = document.querySelector(".popup_type_image");
const placesList = document.querySelector(".places__list");
const caption = imgModal.querySelector(".popup__caption");
const image = imgModal.querySelector(".popup__image");
const newPlaceForm = document.querySelector("form[name=new-place]");
const editProfileForm = document.querySelector("form[name=edit-profile]");
const editPopup = document.querySelector(".popup_type_edit");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileImage = document.querySelector(".profile__image");
const editAvatarPopup = document.querySelector(".popup_type_edit-avatar");
const editAvatarFormElement = document.querySelector("form[name=edit-avatar]");
const deleteCardFormElement = document.querySelector("form[name=delete-card]");
const newCardPopup = document.querySelector(".popup_type_new-card");
const avatarLinkInput = editAvatarFormElement.querySelector(
  ".popup__input_type_url"
);
/**
 * @type {HTMLInputElement}
 */
const nameInput = editProfileForm.querySelector("input[name=name]");
/**
 * @type {HTMLInputElement}
 */
const descriptionInput = editProfileForm.querySelector(
  "input[name=description]"
);
function initImgModal() {
  const closeImageModal = imgModal.querySelector(".popup__close");

  closeImageModal.addEventListener("click", () => closeModal(imgModal));
  handleOverlay(imgModal);
}
initImgModal();
function renderLoading(isLoading, button) {
  if (isLoading) {
    button.textContent = "Сохранение...";
  } else {
    button.textContent = "Сохранить";
  }
}

function initEditModal(evt) {
  const editModal = document.querySelector(".popup_type_edit");
  // nameInput.addEventListener("invalid", (evt) => {
  //   evt.preventDefault();
  // });
  validation([nameInput, descriptionInput], editProfileForm);

  const editButton = document.querySelector(".profile__edit-button");
  // editButton.addEventListener("click", () => openModal(editModal));
  editButton.addEventListener("click", () => {
    openModal(editModal);
    clearValidation([nameInput, descriptionInput], editProfileForm);
    nameInput.value = profileTitle.textContent;
    descriptionInput.value = profileDescription.textContent;
  });
  const closeEditModal = editModal.querySelector(".popup__close");
  closeEditModal.addEventListener("click", () => closeModal(editModal));
  handleOverlay(editModal);
  // editProfileForm.addEventListener("submit", (event) => {
  //   event.preventDefault();
  //   const formData = Object.fromEntries(new FormData(editProfileForm));
  //   const { name, description } = formData;
  //   profileTitle.textContent = name;
  //   profileDescription.textContent = description;
  //   closeModal(editModal);
  // });
}
initEditModal();
function initAddCardModal() {
  const addNewButton = document.querySelector(".profile__add-button");
  const placeNameInput = newPlaceForm.querySelector("input[name=place-name]");
  const linkInput = newPlaceForm.querySelector("input[name=link]");
  const button = newCardPopup.querySelector(".popup__button");
  addNewButton.addEventListener("click", () => {
    clearValidation([placeNameInput, linkInput], newPlaceForm);
    return openModal(newCardPopup);
  });
  validation([placeNameInput, linkInput], newPlaceForm);
  const closeAddModal = newCardPopup.querySelector(".popup__close");
  closeAddModal.addEventListener("click", () => closeModal(newCardPopup));
  handleOverlay(newCardPopup);
  newPlaceForm.addEventListener("submit", (event) => {
    event.preventDefault();
    renderLoading(true, button);
    createCardAPI(placeNameInput.value, linkInput.value)
      .then((information) => {
        information.canDelete=true;
        addCard(information);
        newPlaceForm.reset();
        closeModal(newCardPopup);
      })
      .catch((error) => console.error(error)) //
      .finally(() => renderLoading(false, button));
  });
}
function initAvatarModal() {
  profileImage.addEventListener("click", () => {
    clearValidation([avatarLinkInput], editAvatarFormElement);
    return openModal(editAvatarPopup);
  });
  validation([avatarLinkInput], editAvatarFormElement);
  const closeAddModal = editAvatarPopup.querySelector(".popup__close");
  const button = editAvatarPopup.querySelector(".popup__button");
  closeAddModal.addEventListener("click", () => closeModal(editAvatarPopup));
  handleOverlay(editAvatarPopup);
  editAvatarFormElement.addEventListener("submit", (event) => {
    event.preventDefault();
    renderLoading(true, button);
    updateAvatar(avatarLinkInput.value)
      .then((result) => {
        editAvatarFormElement.reset();
        profileImage.style.backgroundImage = `url(\'${result.avatar}\')`;
        closeModal(editAvatarPopup);
      })
      .catch((err) => console.log(err))
      .finally(() => renderLoading(false, button));
  });
}
initAddCardModal();
initAvatarModal();
function addCard(information) {
  const newCard = createCard(
    information,
    deleteCard,
    () => openFull(information),
    () => onLike(information, newCard)
  );
  placesList.prepend(newCard);
}

function initCard(initialCards) {
  initialCards.forEach((cardInformation) => {
    const newCard = createCard(
      cardInformation,
      () => {
        newCard.remove();
        deleteCard(cardInformation._id);
      },
      () => openFull(cardInformation),
      () => onLike(cardInformation, newCard)
    );
    placesList.append(newCard);
  });
}

function openFull(information) {
  caption.textContent = information.alt;
  image.src = information.link;
  caption.textContent = information.name;
  openModal(imgModal);
}
async function getMainInfo() {
  const cardsPromise = fetchCards();
  const userPromise = fetchUser();
  const [cards, user] = await Promise.all([cardsPromise, userPromise]);
  const parsedCards = cards.map((card) => {
    const likes = card.likes;
    const hasLiked = likes.some((like) => like._id === user._id);
    const canDelete = card.owner._id === user._id;
    return { ...card, hasLiked, canDelete };
  });
  profileTitle.textContent = user.name;
  profileDescription.textContent = user.about;
  profileImage.style.backgroundImage = `url(\'${user.avatar}\')`;
  console.log(user.avatar);
  initCard(parsedCards);
}
getMainInfo();

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  const button = editPopup.querySelector(".popup__button");
  renderLoading(true, button);
  updateUserData(nameInput.value, descriptionInput.value)
    .then((result) => {
      profileTitle.textContent = result.name;
      profileDescription.textContent = result.about;
      renderLoading(false, button);
      closeModal(editPopup);
    })
    .catch((err) => console.log(err));
}

editProfileForm.addEventListener("submit", handleEditFormSubmit);
