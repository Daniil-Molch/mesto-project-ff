// Работу модальных окон — в файл modal.js. Оттуда экспортируйте функции openModal и closeModal, принимающие в качестве аргумента DOM-элемент модального окна, с которым нужно произвести действие.

import { addCard } from "./card";
const imagePopup=document.querySelector(".popup_type_image");
const image=imagePopup.querySelector(".popup__image");
function initPopupOpeners() {
  const button = document.querySelector(".profile__add-button");
  button.addEventListener("click", makeOpener(".popup_type_new-card"));
  function makeOpener(querySelector) {
    return () => {
      console.log("click button");
      const modal = document.querySelector(querySelector);
      modal.style.display = "flex";
      modal.style.alignItems = "center";
      modal.style.justifyContent = "center";
    };
  }

  function initCloseHandlers(querySelector) {
    const closeButtons = document.querySelectorAll(querySelector);
    closeButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        if (event.target === event.currentTarget) {
          const modal = event.target.closest(".popup");
          modal.style.display = "none";
        }
      });
    });
  }
  initCloseHandlers(".popup__close");
  initCloseHandlers(".popup");

  const profileEdit = document.querySelector(".profile__edit-button");
  profileEdit.addEventListener("click", makeOpener(".popup_type_edit"));
}
export function initEditProfileModal() {
  const form = document.querySelector("div.popup.popup_type_edit form");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = Object.fromEntries(new FormData(form));
    const { name, description } = formData;
    const nameEl = document.querySelector(".profile__title");
    const descriptionEl = document.querySelector(".profile__description");
    nameEl.textContent = name;
    descriptionEl.textContent = description;
    const modal = event.target.closest(".popup");
    modal.style.display = "none";
  });
}

export function initNewCardModal() {
  const form = document.querySelector("div.popup.popup_type_new-card form");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = Object.fromEntries(new FormData(form));
    console.log(formData);
    addCard({ name: formData["place-name"], link: formData.link });
    const modal = event.target.closest(".popup");
    modal.style.display = "none";
  });
}
export { initPopupOpeners };

export function openCard(event) {
  const openImage = event.target;
  image.src = openImage.src;
  openModal(imagePopup);
}
function openModal(modal) {
  modal.classlist.add("popup_is-opened");
}
