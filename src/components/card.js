import { putLike, removeLike } from "./api";

export function createCard(information, onDelete, onOpen, onLike) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const likeButton = cardElement.querySelector(".card__like-button");
  const cardImage = cardElement.querySelector(".card__image");
  cardImage.alt = information.name;
  cardImage.src = information.link;
  cardElement.querySelector(".card__title").textContent = information.name;
  cardElement.querySelector(".card__likes-number").textContent =
    information.likes.length;
  const deleteButton = cardElement.querySelector(".card__delete-button");
  cardImage.addEventListener("click", onOpen);
  if (information.hasLiked) {
    !likeButton.classList.toggle("card__like-button_is-active");
  }
  likeButton.addEventListener("click", (evt) => {
    onLike(evt);
  });
  if (!information.canDelete) {
    deleteButton.remove();
  } else {
    deleteButton.addEventListener("click", onDelete);
  }
  likeButton.addEventListener("click", (evt) => {
    onLike(evt);
  });
  return cardElement;
}
function updateLikes(information, cardElement) {
  cardElement.querySelector(".card__likes-number").textContent =
    information.likes.length;
}

export function onLike(information, cardElement) {
  const likeButton = cardElement.querySelector(".card__like-button");
  if (!likeButton.classList.contains("card__like-button_is-active")) {
    putLike(information._id)
      .then((information) => {
        likeButton.classList.add("card__like-button_is-active");
        return updateLikes(information, cardElement);
      })
      .catch((err) => console.log(err));
  } else {
    removeLike(information._id)
      .then((result) => {
        likeButton.classList.remove("card__like-button_is-active");
        return updateLikes(result, cardElement);
      })
      .catch((err) => console.log(err));
  }
}
