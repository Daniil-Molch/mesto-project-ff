const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-19",
  headers: {
    authorization: "8bac6b11-5d54-47be-8560-8628f8548794",
    "Content-Type": "application/json",
  },
};
// GET GET https://nomoreparties.co/v1/cohortId/cards
export async function fetchCards() {
  const url = `${config.baseUrl}/cards`;
  const response = await fetch(url, { headers: config.headers });
  const data = await response.json();
  console.log(data);
  return data;
}

export async function fetchUser() {
  const url = `${config.baseUrl}/users/me`;
  const response = await fetch(url, { headers: config.headers });
  const data = await response.json();
  console.log(data);
  return data;
}
export async function putLike(cardId) {
  const url = `${config.baseUrl}/cards/likes/${cardId}`;
  const response = await fetch(url, { headers: config.headers, method: "PUT" });
  const data = await response.json();
  return data;
}
const cardsRequest = `${config.baseUrl}/cards`;
export const removeLike = async (cardId) => {
  const cardLikeRequest = `${cardsRequest}/likes`;
  const res = await fetch(`${cardLikeRequest}/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  });
  const data = await res.json();
  return data;
};

const handleResponse = (response) => {
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(`Ошибка: ${response.status}`);
};
const userRequest = `${config.baseUrl}/users/me`;
export const updateUserData = async (name, about) => {
  const response = await fetch(userRequest, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  });
  return handleResponse(response);
};

export const updateAvatar = async (avatarLink) => {
  const response = await fetch(`${userRequest}/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarLink,
    }),
  });
  return handleResponse(response);
};

export const createCard = async (name, link) => {
  const response = await fetch(cardsRequest, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  });
  return handleResponse(response);
};

export const deleteCard = async (cardId) => {
  const response = await fetch(`${cardsRequest}/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  });
  return handleResponse(response);
};
