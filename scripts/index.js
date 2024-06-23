
function createCard (information, deleteCard) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector(".places__item").cloneNode(true);
  cardElement.querySelector(".card__image").src = information.link;
  cardElement.querySelector(".card__title").textContent = information.name;
  cardElement.querySelector(".card__delete-button");
  cardElement.addEventListener("click", deleteCard);
  return cardElement;
};

const deleteCard = function (event) {
  event.target.closest(".card").remove();
}

const placesList = document.querySelector(".places__list");
initialCards.forEach((cardInformation) => {
  placesList.append(createCard(cardInformation, deleteCard));
});
