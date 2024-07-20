export function createCard(information, onDelete, onOpen, onLike) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  cardImage.alt = information.alt;
  cardImage.src = information.link;
  cardElement.querySelector(".card__title").textContent = information.name;
  cardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", onDelete);
  cardImage.addEventListener("click", onOpen);
  cardElement
    .querySelector(".card__like-button")
    .addEventListener("click", onLike);
  return cardElement;
}

export const deleteCard = function (event) {
  event.target.closest(".card").remove();
};

export function onLike(evt) {
  evt.currentTarget.classList.toggle("card__like-button_is-active");
}
