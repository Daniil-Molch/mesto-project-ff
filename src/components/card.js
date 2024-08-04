import { putLike,removeLike } from "./api";

export function createCard(information, onDelete, onOpen, onLike) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const likeButton = cardElement.querySelector(".card__like-button");
  const cardImage = cardElement.querySelector(".card__image");
  cardImage.alt = information.name;
  cardImage.src = information.link;
  cardElement.querySelector(".card__title").textContent =
    information.name;
  cardElement.querySelector(".card__likes-number").textContent =
    information.likes.length;
  cardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", onDelete);
  cardImage.addEventListener("click", onOpen);
  if (information.hasLiked) {
    likeButton.classList.toggle("card__like-button_is-active");
  } 
  likeButton.addEventListener("click", (evt) => {
    onLike(evt);
    putLike(information._id).then((information) => {
      cardElement.querySelector(".card__likes-number").textContent =
        information.likes.length;
    });
  });
  return cardElement;
}

export const deleteCard = function (event) {
  event.target.closest(".card").remove();
};

export function onLike(evt) {
  evt.currentTarget.classList.toggle("card__like-button_is-active");
}
