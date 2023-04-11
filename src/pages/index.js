import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { Section } from "../components/Section.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import "../pages/index.css";
import { Api } from "../components/Api.js";
import { PopupWithConfirmation } from "../components/PopupWithConfirmation.js";

const profile = document.querySelector(".profile");
const buttonEdit = profile.querySelector(".profile__button-edit");
const buttonAdd = profile.querySelector(".profile__button-add");
const containerAvatar = profile.querySelector(".profile__container-avatar");
const popupFieldName = document.querySelector(".popup__field_value_name");
const popupFieldInfo = document.querySelector(".popup__field_value_info");
const formEdit = document.forms["form-edit"];
const formAdd = document.forms["form-add"];
const formUpdateAvatar = document.forms["form-update"];
const configForm = {
  formSelector: ".popup__form",
  inputSelector: ".popup__field",
  submitButtonSelector: ".popup__button-save",
  inactiveButtonClass: "popup__button-save_inactive",
  inputErrorClass: "popup__field_invalid",
  errorClass: "popup__field-error_active",
};

const dataApi = {
  url: "https://mesto.nomoreparties.co/v1/cohort-63",
  headers: {
    authorization: "3a824396-4a26-49de-be67-e18c68326ddb",
    "Content-Type": "application/json",
  },
};

const api = new Api(dataApi);

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
  popupEdit.renderLoading(true);
  const userData = { name: dataInputValues.name, about: dataInputValues.info };
  api
    .setInfoUser(userData)
    .then((data) => {
      userInfo.setUserInfo(data);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupEdit.renderLoading(false);
      popupEdit.close();
    });
}

/*Создать новую карточку*/
function createCard(cardData) {
  const card = new Card(
    cardData,
    "#places",
    (name, link) => {
      openImage.open(name, link);
    },
    callbackAddLike,
    callbackDeleteLike,
    showPopupConfirmation,
    userInfo.getUserId()
  );
  const cardElement = card.generateCard();
  return cardElement;
}

/*Открытие окна добавления карточки*/
function openCardPopup() {
  formValidAdd.resetValidation();
  popupAdd.open();
}

/*Добавить новую карточку*/
function handleFormAddSubmit(evt, dataInputValues) {
  evt.preventDefault();
  popupAdd.renderLoading(true);
  const cards = { name: dataInputValues.place, link: dataInputValues.photo };
  api
    .addNewCard(cards)
    .then((cardData) => {
      console.log(cardData);
      const newCard = createCard(cardData);
      itemCard.addItem(newCard);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupAdd.renderLoading(false);
      popupAdd.close();
    });
  // formValidAdd.resetValidation();
}

/*Открытие попапа обновления аватара*/
function openPopupUpdateAvatar() {
  formValidUpdateAvatar.resetValidation();
  popupUpdateAvatar.open();
}

/*Обновить аватар*/
function updateAvatar(evt, dataInputValues) {
  evt.preventDefault();
  popupUpdateAvatar.renderLoading(true);
  const avatar = { avatar: dataInputValues.picture };
  api
    .updateAvatar(avatar)
    .then((data) => {
      userInfo.setAvatarLink(data.avatar);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupUpdateAvatar.renderLoading(false);
      popupUpdateAvatar.close();
    });
  // formValidUpdateAvatar.resetValidation();
}

function callbackAddLike(card) {
  const cardId = card.getCardId();
  api
    .addLike(cardId)
    .then((data) => {
      card.handleLikeClick(data);
    })
    .catch((err) => {
      console.log(err);
    });
}

function callbackDeleteLike(card) {
  const cardId = card.getCardId();
  api
    .deleteLike(cardId)
    .then((data) => {
      card.handleLikeClick(data);
    })
    .catch((err) => {
      console.log(err);
    });
}

const itemCard = new Section(
  {
    items: [],
    renderer: (item) => {
      const cardElement = createCard(item);
      return cardElement;
    },
  },
  ".elements"
);

function showPopupConfirmation(card) {
  popupConfirmation.setRemovingCard(card);
  popupConfirmation.open();
}

function callbackConfirmationDeleteCard(card) {
  const cardId = card.getCardId();
  api
    .deleteCard(cardId)
    .then(() => {
      card.handleRemoveClick();
    })
    .catch((err) => {
      console.log(err);
    });
  popupConfirmation.close();
}

const popupConfirmation = new PopupWithConfirmation(
  ".popup_confirmation",
  callbackConfirmationDeleteCard
);
popupConfirmation.setEventListeners();

const openImage = new PopupWithImage(".popup_image");
openImage.setEventListeners();

const popupEdit = new PopupWithForm(".popup_edit", handleProfileFormSubmit);
popupEdit.setEventListeners();

const popupAdd = new PopupWithForm(".popup_add", handleFormAddSubmit);
popupAdd.setEventListeners();

const popupUpdateAvatar = new PopupWithForm(".popup_update-avatar", updateAvatar);
popupUpdateAvatar.setEventListeners();

const formValidAdd = new FormValidator(configForm, formAdd);
formValidAdd.enableValidation();

const formValidEdit = new FormValidator(configForm, formEdit);
formValidEdit.enableValidation();

const formValidUpdateAvatar = new FormValidator(configForm, formUpdateAvatar);
formValidUpdateAvatar.enableValidation();

const userInfo = new UserInfo(".profile__full-name", ".profile__information", ".profile__avatar");

buttonEdit.addEventListener("click", handleEditProfile);

buttonAdd.addEventListener("click", openCardPopup);

containerAvatar.addEventListener("click", openPopupUpdateAvatar);

Promise.all([api.getInfoUser(), api.getAllCards()])
  .then(([userData, cardData]) => {
    userInfo.setUserInfo(userData);
    userInfo.setUserId(userData);
    itemCard.renderItems(cardData);
  })
  .catch((err) => {
    console.log(err);
  });
