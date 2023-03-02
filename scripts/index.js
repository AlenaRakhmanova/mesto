import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

const profile = document.querySelector(".profile");
const buttonEdit = profile.querySelector(".profile__button-edit");
const popupEdit = document.querySelector(".popup_edit");
const popupAdd = document.querySelector(".popup_add");
const profileFullName = profile.querySelector(".profile__full-name");
const profileInf = profile.querySelector(".profile__information");
const buttonAdd = profile.querySelector(".profile__button-add");
const popupFieldName = document.querySelector(".popup__field_value_name");
const popupFieldInfo = document.querySelector(".popup__field_value_info");
const formEdit = document.forms["form-edit"];
const elementsContainer = document.querySelector(".elements");
const formAdd = document.forms["form-add"];
const popupFieldPlace = document.querySelector(".popup__field_value_place");
const popupFieldPhoto = document.querySelector(".popup__field_value_photo");
const popupImage = document.querySelector(".popup_image");
const popups = document.querySelectorAll(".popup");
const popupContImg = popupImage.querySelector(".popup__image");
const popupTitle = popupImage.querySelector(".popup__title");
const configForm = {
  formSelector: ".popup__form",
  inputSelector: ".popup__field",
  submitButtonSelector: ".popup__button-save",
  inactiveButtonClass: "popup__button-save_inactive",
  inputErrorClass: "popup__field_invalid",
  errorClass: "popup__field-error_active",
};

/*Открытие модального окна*/
function showPopup(modal) {
  modal.classList.add("popup_opened");
  document.addEventListener("keydown", closeByEscape);
}

/*Закрытие модального окна*/
function closePopup(modal) {
  modal.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeByEscape);
}

popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (
      evt.target.classList.contains("popup_opened") ||
      evt.target.classList.contains("popup__button-close")
    ) {
      closePopup(popup);
    }
  });
});

function closeByEscape(e) {
  if (e.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}

/*Открытие окна редактирования*/
function handleEditProfile() {
  popupFieldName.value = profileFullName.textContent;
  popupFieldInfo.value = profileInf.textContent;
  formValidEdit.resetValidation();
  showPopup(popupEdit);
}

/*Сохранение новых данных*/
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileFullName.textContent = popupFieldName.value;
  profileInf.textContent = popupFieldInfo.value;
  closePopup(popupEdit);
}

/*Создать новую карточку*/
function createCard(item) {
  const card = new Card(item, "#places", OpenImage);
  const cardElement = card.generateCard();
  return cardElement;
}

function renderCards(items) {
  items.forEach((item) => {
    const cardElement = createCard(item);
    elementsContainer.prepend(cardElement);
  });
}

/*Открытие окна добавления карточки*/
function openCardPopup() {
  showPopup(popupAdd);
}

/*Добавить новую карточку*/
function handleFormAddSubmit(evt) {
  evt.preventDefault();
  const cards = { name: popupFieldPlace.value, link: popupFieldPhoto.value };
  const cardElement = createCard(cards);
  elementsContainer.prepend(cardElement);
  evt.submitter.classList.add("popup__button-save_inactive");
  evt.submitter.setAttribute("disabled", "true");
  closePopup(popupAdd);
  formValidAdd.formReset();
}

/*Открыть картинку*/
function OpenImage(name, link) {
  popupContImg.src = link;
  popupContImg.alt = name;
  popupTitle.textContent = name;
  showPopup(popupImage);
}

const formValidAdd = new FormValidator(configForm, formAdd);
formValidAdd.enableValidation();

const formValidEdit = new FormValidator(configForm, formEdit);
formValidEdit.enableValidation();

renderCards(initialCards);

buttonEdit.addEventListener("click", handleEditProfile);

buttonAdd.addEventListener("click", openCardPopup);

formEdit.addEventListener("submit", handleProfileFormSubmit);

formAdd.addEventListener("submit", handleFormAddSubmit);
