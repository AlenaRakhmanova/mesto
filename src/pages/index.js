import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { initialCards } from "../components/cards.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { Section } from "../components/Section.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import "../pages/index.css";

const profile = document.querySelector(".profile");
const buttonEdit = profile.querySelector(".profile__button-edit");
const buttonAdd = profile.querySelector(".profile__button-add");
const popupFieldName = document.querySelector(".popup__field_value_name");
const popupFieldInfo = document.querySelector(".popup__field_value_info");
const formEdit = document.forms["form-edit"];
const formAdd = document.forms["form-add"];
const configForm = {
  formSelector: ".popup__form",
  inputSelector: ".popup__field",
  submitButtonSelector: ".popup__button-save",
  inactiveButtonClass: "popup__button-save_inactive",
  inputErrorClass: "popup__field_invalid",
  errorClass: "popup__field-error_active",
};

/*Открытие окна редактирования*/
function handleEditProfile() {
  const userData = userInfo.getUserInfo();
  popupFieldName.value = userData.name;
  popupFieldInfo.value = userData.info;
  formValidEdit.resetValidation();
  popupEdit.open();
}

/*Сохранение новых данных*/
function handleProfileFormSubmit(evt, dataInputValues) {
  evt.preventDefault();
  const userData = { name: dataInputValues.name, info: dataInputValues.info };
  userInfo.setUserInfo(userData);
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

const itemCard = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardElement = createCard(item);
      return cardElement;
    },
  },
  ".elements"
);
itemCard.renderItems();

/*Открытие окна добавления карточки*/
function openCardPopup() {
  popupAdd.open();
}

/*Добавить новую карточку*/
function handleFormAddSubmit(evt, dataInputValues) {
  evt.preventDefault();
  const cards = { name: dataInputValues.place, link: dataInputValues.photo };
  const newCard = createCard(cards);
  itemCard.addItem(newCard);
  popupAdd.close();
  formValidAdd.resetValidation();
}

/*Открыть картинку*/
const openImage = new PopupWithImage(".popup_image");
openImage.setEventListeners();

const popupEdit = new PopupWithForm(".popup_edit", handleProfileFormSubmit);
popupEdit.setEventListeners();

const popupAdd = new PopupWithForm(".popup_add", handleFormAddSubmit);
popupAdd.setEventListeners();

const formValidAdd = new FormValidator(configForm, formAdd);
formValidAdd.enableValidation();

const formValidEdit = new FormValidator(configForm, formEdit);
formValidEdit.enableValidation();

const userInfo = new UserInfo(".profile__full-name", ".profile__information");

buttonEdit.addEventListener("click", handleEditProfile);

buttonAdd.addEventListener("click", openCardPopup);
