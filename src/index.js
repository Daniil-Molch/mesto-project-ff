// index.js
import {
  initEditProfileModal,
  initNewCardModal,
  initPopupOpeners,
} from "./modal.js";
import "./index.css"; // добавьте импорт главного файла стилей
import { initCard } from "./card.js";

initEditProfileModal();
initPopupOpeners();
initCard();
initNewCardModal();
