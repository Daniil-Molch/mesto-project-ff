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
export const removeLike = async (cardId) => {
  const cardLikeRequest = `${cardsRequest}/likes`;
  const res = await fetch(`${cardLikeRequest}/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  });
  return getResult(res);
};
//  async function test(){
//   const promise=Promise.resolve("Data")
//    promise.then((argument)=>{})
//    promise.catch(()=>{})
//     const argument=await promise;
// }
