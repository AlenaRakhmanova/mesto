import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { initialCards } from "../components/cards.js";
import { Popup } from "../components/Popup.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { Section } from "../components/Section.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import '../pages/index.css';

const profile = document.querySelector(".profile");
const buttonEdit = profile.querySelector(".profile__button-edit");
// const popupEdit = document.querySelector(".popup_edit");
// const popupAdd = document.querySelector(".popup_add");
// const profileFullName = profile.querySelector(".profile__full-name");
// const profileInf = profile.querySelector(".profile__information");
const buttonAdd = profile.querySelector(".profile__button-add");
const popupFieldName = document.querySelector(".popup__field_value_name");
const popupFieldInfo = document.querySelector(".popup__field_value_info");
const formEdit = document.forms["form-edit"];
// const elementsContainer = document.querySelector(".elements");
const formAdd = document.forms["form-add"];
const popupFieldPlace = document.querySelector(".popup__field_value_place");
const popupFieldPhoto = document.querySelector(".popup__field_value_photo");
// const popupImage = document.querySelector(".popup_image");
// const popups = document.querySelectorAll(".popup");
// const popupContImg = popupImage.querySelector(".popup__image");
// const popupTitle = popupImage.querySelector(".popup__title");
const configForm = {
  formSelector: ".popup__form",
  inputSelector: ".popup__field",
  submitButtonSelector: ".popup__button-save",
  inactiveButtonClass: "popup__button-save_inactive",
  inputErrorClass: "popup__field_invalid",
  errorClass: "popup__field-error_active",
};

// /*Открытие модального окна*/
// function showPopup(modal) {
//   modal.classList.add("popup_opened");
//   document.addEventListener("keydown", closeByEscape);
// }

// /*Закрытие модального окна*/
// function closePopup(modal) {
//   modal.classList.remove("popup_opened");
//   document.removeEventListener("keydown", closeByEscape);
// }

// popups.forEach((popup) => {
//   popup.addEventListener("mousedown", (evt) => {
//     if (
//       evt.target.classList.contains("popup_opened") ||
//       evt.target.classList.contains("popup__button-close")
//     ) {
//       closePopup(popup);
//     }
//   });

// });

// function closeByEscape(e) {
//   if (e.key === "Escape") {
//     const openedPopup = document.querySelector(".popup_opened");
//     closePopup(openedPopup);
//   }
// }

/*Открытие окна редактирования*/
function handleEditProfile() {
  const userData = userInfo.getUserInfo();
  popupFieldName.value = userData.name;
  popupFieldInfo.value = userData.info;
  // popupFieldName.value = profileFullName.textContent;
  // popupFieldInfo.value = profileInf.textContent;
  formValidEdit.resetValidation();
  popupEdit.open();
  // showPopup(popupEdit);
}

/*Сохранение новых данных*/
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const userData = { name: popupFieldName.value, info: popupFieldInfo.value };
  userInfo.setUserInfo(userData);
  // profileFullName.textContent = popupFieldName.value;
  // profileInf.textContent = popupFieldInfo.value;
  popupEdit.close();
}

/*Создать новую карточку*/
function createCard(item) {
  const card = new Card(item, "#places", (name, link) => {
    openImage.open(name, link);
  });
  const cardElement = card.generateCard();
  return cardElement;
}

// function renderCards(items) {
//   items.forEach((item) => {
//     const cardElement = createCard(item);
//     // elementsContainer.prepend(cardElement);
//     return cardElement;
//   });
// }

function renderCards(item) {
  const cardElement = createCard(item);
  // elementsContainer.prepend(cardElement);
  return cardElement;
}

const rendererCards = new Section({ items: initialCards, renderer: renderCards }, ".elements");
rendererCards.renderItems();
// rendererCards.addItem(cardElement);

/*Открытие окна добавления карточки*/
function openCardPopup() {
  // showPopup(popupAdd);
  popupAdd.open();
}

/*Добавить новую карточку*/
function handleFormAddSubmit(evt) {
  evt.preventDefault();
  const form = evt.target;
  const cards = [{ name: popupFieldPlace.value, link: popupFieldPhoto.value }];
  const rendererCards = new Section({ items: cards, renderer: renderCards }, ".elements");
  rendererCards.renderItems();
  // const cardElement = createCard(cards);
  // elementsContainer.prepend(cardElement);
  // closePopup(popupAdd);
  popupAdd.close();
  form.reset();
  formValidAdd.resetValidation();
}

/*Открыть картинку*/
// function OpenImage(name, link) {
//   popupContImg.src = link;
//   popupContImg.alt = name;
//   popupTitle.textContent = name;
//   showPopup(popupImage);
// }

/*Открыть картинку*/
const openImage = new PopupWithImage(".popup_image");
openImage.setEventListeners();

const popupEdit = new Popup(".popup_edit");
popupEdit.setEventListeners();

const popupAdd = new Popup(".popup_add");
popupAdd.setEventListeners();

const formValidAdd = new FormValidator(configForm, formAdd);
formValidAdd.enableValidation();

const formValidEdit = new FormValidator(configForm, formEdit);
formValidEdit.enableValidation();

const submitEditForm = new PopupWithForm(".popup_edit", (e) => handleProfileFormSubmit(e));
submitEditForm.setEventListeners();

const submitAddForm = new PopupWithForm(".popup_add", (e) => handleFormAddSubmit(e));
submitAddForm.setEventListeners();

const userInfo = new UserInfo(".profile__full-name", ".profile__information");

// renderCards(initialCards);

buttonEdit.addEventListener("click", handleEditProfile);

buttonAdd.addEventListener("click", openCardPopup);

// formEdit.addEventListener("submit", handleProfileFormSubmit);

// formAdd.addEventListener("submit", handleFormAddSubmit);
