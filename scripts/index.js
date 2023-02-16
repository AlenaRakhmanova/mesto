const profile = document.querySelector(".profile");
const buttonEdit = profile.querySelector(".profile__button-edit");
const popupEdit = document.querySelector(".popup_edit");
const popupAdd = document.querySelector(".popup_add");
const closeButtons = document.querySelectorAll(".popup__button-close");
const profileFullName = profile.querySelector(".profile__full-name");
const profileInf = profile.querySelector(".profile__information");
const buttonAdd = profile.querySelector(".profile__button-add");
const popupFieldName = document.querySelector(".popup__field_value_name");
const popupFieldInfo = document.querySelector(".popup__field_value_info");
const formEdit = document.forms["form-edit"];
const template = document.querySelector("#places").content.querySelector(".elements__place");
const elementsContainer = document.querySelector(".elements");
const formAdd = document.forms["form-add"];
const popupFieldPlace = document.querySelector(".popup__field_value_place");
const popupFieldPhoto = document.querySelector(".popup__field_value_photo");
const buttonDelete = document.querySelector(".elements__button-delete");
const popupImage = document.querySelector(".popup_image");
const popupContImg = popupImage.querySelector(".popup__image");
const popupTitle = popupImage.querySelector(".popup__title");
const popups = document.querySelectorAll(".popup");
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
  showPopup(popupEdit);
}

/*Сохранение новых данных*/
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileFullName.textContent = popupFieldName.value;
  profileInf.textContent = popupFieldInfo.value;
  closePopup(popupEdit);
}

/*Поставить лайк*/
function toggleLike(evt) {
  const button = evt.target;
  button.classList.toggle("elements__button-like_active");
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
  card.querySelector(".elements__button-like").addEventListener("click", toggleLike);
  cardImg.addEventListener("click", () => OpenImage(item));

  return card;
}

function renderCards(items) {
  const cards = items.map(createCard);
  elementsContainer.prepend(...cards);
}

/*Открытие окна добавления карточки*/
function openCardPopup() {
  showPopup(popupAdd);
}

/*Добавить новую карточку*/
function handleFormAddSubmit(evt) {
  evt.preventDefault();
  const form = evt.target;
  const place = popupFieldPlace.value;
  const photo = popupFieldPhoto.value;
  const card = createCard({ name: place, link: photo });
  elementsContainer.prepend(card);
  closePopup(popupAdd);
  form.reset();
}

/*Открыть картинку*/
function OpenImage(image) {
  showPopup(popupImage);
  popupContImg.src = image.link;
  popupContImg.alt = image.name;
  popupTitle.textContent = image.name;
}

renderCards(initialCards);

buttonEdit.addEventListener("click", handleEditProfile);

buttonAdd.addEventListener("click", openCardPopup);

formEdit.addEventListener("submit", handleProfileFormSubmit);

formAdd.addEventListener("submit", handleFormAddSubmit);

enableValidation(configForm);
