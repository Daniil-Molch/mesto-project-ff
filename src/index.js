// index.js
import { openModal, closeModal, handleOverlay } from "./components/modal.js";
import "./index.css"; // добавьте импорт главного файла стилей
import { createCard, onLike, deleteCard } from "./components/card.js";
import { initialCards } from "./components/cards.js";

const imgModal = document.querySelector(".popup_type_image");
const placesList = document.querySelector(".places__list");
const newPlaceForm = document.querySelector("form[name=new-place]");
const editProfileForm = document.querySelector("form[name=edit-profile]");
const nameInput = editProfileForm.querySelector("input[name=name]");
const descriptionInput = editProfileForm.querySelector(
  "input[name=description]"
);
function initImgModal() {
  const closeImageModal = imgModal.querySelector(".popup__close");

  closeImageModal.addEventListener("click", () => closeModal(imgModal));
  handleOverlay(imgModal);
}
initImgModal();
function initEditModal(evt) {
  const editModal = document.querySelector(".popup_type_edit");
  const nameEl = document.querySelector(".profile__title");
  const descriptionEl = document.querySelector(".profile__description");

  const editButton = document.querySelector(".profile__edit-button");
  // editButton.addEventListener("click", () => openModal(editModal));
  editButton.addEventListener("click", () => {
    openModal(editModal);
    nameInput.value = nameEl.textContent;
    descriptionInput.value = descriptionEl.textContent;
  });
  const closeEditModal = editModal.querySelector(".popup__close");
  closeEditModal.addEventListener("click", () => closeModal(editModal));
  handleOverlay(editModal);

  editProfileForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = Object.fromEntries(new FormData(editProfileForm));
    const { name, description } = formData;
    nameEl.textContent = name;
    descriptionEl.textContent = description;
    closeModal(editModal);
  });
}
initEditModal();
function initAddCardModal() {
  const addCardModal = document.querySelector(".popup_type_new-card");
  const addNewButton = document.querySelector(".profile__add-button");
  addNewButton.addEventListener("click", () => openModal(addCardModal));

  const closeAddModal = addCardModal.querySelector(".popup__close");
  closeAddModal.addEventListener("click", () => closeModal(addCardModal));
  handleOverlay(addCardModal);
  newPlaceForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = Object.fromEntries(new FormData(newPlaceForm));
    addCard({ name: formData["place-name"], link: formData.link });
    newPlaceForm.reset();
    closeModal(addCardModal);
  });
}
initAddCardModal();
function addCard(information) {
  const newCard = createCard(
    information,
    deleteCard,
    () => onOpen(information),
    onLike
  );
  placesList.prepend(newCard);
}

function initCard() {
  initialCards.forEach((cardInformation) => {
    placesList.append(
      createCard(
        cardInformation,
        deleteCard,
        () => onOpen(cardInformation),
        onLike
      )
    );
  });
}

function onOpen(information) {
  const caption = imgModal.querySelector(".popup__caption");
  const image = imgModal.querySelector(".popup__image");
  caption.textContent = information.alt;
  image.src = information.link;
  caption.textContent = information.name;
  openModal(imgModal);
}

initCard();
