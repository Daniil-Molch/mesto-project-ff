// Работу модальных окон — в файл modal.js. Оттуда экспортируйте функции openModal и closeModal, принимающие в качестве аргумента DOM-элемент модального окна, с которым нужно произвести действие.


export function openModal(modal) {
  modal.classList.add("popup_is-opened");
}
export function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
}
export function handleOverlay(_modal) {
  /**
   * @type {HTMLElement}
   */
  const modal = _modal;
  modal.addEventListener("click", (event) => {
    if (event.target === modal) closeModal(modal);
  });
}
export function handleEsc(modal){
  window.addEventListener("keydown",(evt)=>{
    if(evt.key==="Escape")
      closeModal(modal);
  });
}
