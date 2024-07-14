import { initialCards } from "./scripts/cards";
import { openCard } from "./modal";
export function addCard(information) {
  const placesList = document.querySelector(".places__list");
  const newCard = createCard(information, deleteCard);
  placesList.prepend(newCard);
}

function createCard(information, deleteCard, openCard) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  cardElement.querySelector(".card__image").src = information.link;
  cardElement.querySelector(".card__title").textContent = information.name;
  cardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", deleteCard);
  cardImage.addEventListener("click",openCard);
  return cardElement;
}

const deleteCard = function (event) {
  event.target.closest(".card").remove();
};
export function initCard() {
  const placesList = document.querySelector(".places__list");
  initialCards.forEach((cardInformation) => {
    placesList.append(createCard(cardInformation, deleteCard));
  });
}
