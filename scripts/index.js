const profile = document.querySelector(".profile");
const buttonEdit = profile.querySelector(".profile__button-edit");
const popupEdit = document.querySelector(".popup_edit");
const popupAdd = document.querySelector(".popup_add");
const popupButtonsClose = document.querySelectorAll(".popup__button-close");
const profileFullName = profile.querySelector(".profile__full-name");
const profileInf = profile.querySelector(".profile__information");
const buttonAdd = profile.querySelector(".profile__button-add");
const popupFieldName = document.querySelector(".popup__field_value_name");
const popupFieldInfo = document.querySelector(".popup__field_value_info");
const formEdit = document.querySelector(".popup__form_func_edit");
const template = document.querySelector("#places").content.querySelector(".elements__place");
const elementsContainer = document.querySelector(".elements");
const formAdd = document.querySelector(".popup__form_func_add");
const popupFieldPlace = document.querySelector(".popup__field_value_place");
const popupFieldPhoto = document.querySelector(".popup__field_value_photo");
const buttonDelete = document.querySelector(".elements__button-delete");
const popupImage = document.querySelector(".popup_image");
const popupContImg = popupImage.querySelector(".popup__image");
// const Popup = document.querySelector(".popup_opened");
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
  document.addEventListener("keydown", (e) => closeByButton(e, modal));
}

/*Закрытие модального окна*/
function closePopup(modal) {
  modal.classList.remove("popup_opened");
  document.removeEventListener("keydown", (e) => closeByButton(e, modal));
}

popupButtonsClose.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => closePopup(popup));
});

function closeByButton(e, popup) {
  if (e.keyCode === 27) {
    closePopup(popup);
  }
}

function closeByOverlay(evt) {
  if (evt.target.classList.contains("popup")) {
    closePopup(evt.target);
  }
}

/*Открытие окна редактирования*/
function handleEditProfile() {
  popupFieldName.value = profileFullName.textContent;
  popupFieldInfo.value = profileInf.textContent;
  showPopup(popupEdit);
}

/*Сохранение новых данных*/
function handleFormSubmit(evt) {
  evt.preventDefault();
  profileFullName.textContent = popupFieldName.value;
  profileInf.textContent = popupFieldInfo.value;
  closePopup(popupEdit);
}

/*Поставить лайк*/
function toLike(evt) {
  let button = evt.target;
  if (button.classList.contains("elements__button-like_active")) {
    button.classList.remove("elements__button-like_active");
  } else {
    button.classList.add("elements__button-like_active");
  }
}

/*Функция создания карточки*/
function createCard(item) {
  const card = template.cloneNode(true);
  const cardImg = card.querySelector(".elements__image");
  cardImg.src = item.link;
  cardImg.alt = item.name;
  card.querySelector(".elements__title").textContent = item.name;
  card.querySelector(".elements__button-delete").addEventListener("click", () => {
    card.remove();
  });
  card.querySelector(".elements__button-like").addEventListener("click", toLike);
  cardImg.addEventListener("click", () => toOpenImage(item));

  return card;
}

function renderCards(items) {
  const cards = items.map((item) => {
    return createCard(item);
  });
  elementsContainer.prepend(...cards);
}

/*Открытие окна добавления карточки*/
function handleAddition() {
  showPopup(popupAdd);
}

/*Добавить новую карточку*/
function handleFormAddSubmit(evt) {
  evt.preventDefault();
  const form = evt.target;
  const place = popupFieldPlace.value;
  const photo = popupFieldPhoto.value;
  const buttonElement = form.querySelector(".popup__button-save");
  const card = createCard({ name: place, link: photo });
  elementsContainer.prepend(card);
  buttonElement.classList.add("popup__button-save_inactive");
  buttonElement.setAttribute("disabled", "true");
  closePopup(popupAdd);
  form.reset();
}

/*Открыть картинку*/
function toOpenImage(image) {
  showPopup(popupImage);
  popupContImg.src = image.link;
  popupContImg.alt = image.name;
  popupImage.querySelector(".popup__title").textContent = image.name;
}

renderCards(initialCards);

buttonEdit.addEventListener("click", handleEditProfile);

buttonAdd.addEventListener("click", handleAddition);

formEdit.addEventListener("submit", handleFormSubmit);

formAdd.addEventListener("submit", handleFormAddSubmit);

document.addEventListener("mousedown", closeByOverlay);

enableValidation(configForm);
