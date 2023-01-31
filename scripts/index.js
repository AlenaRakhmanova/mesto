const profile = document.querySelector(".profile");
const buttonEdit = profile.querySelector(".profile__button-edit");
const popup = document.querySelector(".popup");
const popupEdit = document.querySelector(".popup_edit");
const popupAdd = document.querySelector(".popup_add");
const popupButtonClose = document.querySelectorAll(".popup__button-close");
const profileFullName = profile.querySelector(".profile__full-name");
const profileInf = profile.querySelector(".profile__information");
const buttonAdd = profile.querySelector(".profile__button-add");
const popupFieldName = popup.querySelector(".popup__field_value_name");
const popupFieldInfo = popup.querySelector(".popup__field_value_info");
const formEdit = popup.querySelector(".popup__form_func_edit");
let buttonLike;
const template = document.querySelector("#places").content.querySelector(".elements__place");
const elements = document.querySelector(".elements");
const formAdd = document.querySelector(".popup__form_func_add");
const popupFieldPlace = document.querySelector(".popup__field_value_place");
const popupFieldPhoto = document.querySelector(".popup__field_value_photo");
const buttonDelete = document.querySelector(".elements__button-delete");
const popupImage = document.querySelector(".popup_image");
let elementsImage;
const initialCards = [
  {
    name: "Гора Эльбрус",
    link: "./images/place/elbrus.jpg",
  },
  {
    name: "Алтай",
    link: "./images/place/altay.jpg",
  },
  {
    name: "Камчатский край",
    link: "./images/place/kamchtka.jpg",
  },
  {
    name: "Карелия",
    link: "./images/place/kareliya.jpg",
  },
  {
    name: "Карачаево-Черкесская Республика",
    link: "./images/place/karachaevo.jpg",
  },
  {
    name: "Байкал",
    link: "./images/place/baikal.jpg",
  },
];

/*Функция открытия модального окна*/
function showPopup(modal) {
  modal.classList.add("popup_opened");
}

/*Функция закрытия модального окна*/
function closePopup() {
  popupButtonClose.forEach((button) => {
    button.addEventListener("click", toClose);
  });
}

function toClose(evt) {
  let button = evt.target;
  let modal = button.closest(".popup");
  modal.classList.remove("popup_opened");
}

/*------------------------------------*/

function handleEditProfile() {
  popupFieldName.value = profileFullName.textContent;
  popupFieldInfo.value = profileInf.textContent;
  showPopup(popupEdit);
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileFullName.textContent = popupFieldName.value;
  profileInf.textContent = popupFieldInfo.value;
  popupEdit.classList.remove("popup_opened");
  // closePopup(popup);
}

function toLike(evt) {
  let button = evt.target;
  if (button.classList.contains("elements__button-like_active")) {
    button.classList.remove("elements__button-like_active");
  } else {
    button.classList.add("elements__button-like_active");
  }
}

// function handleLikes() {
//   buttonLike.forEach(function (button) {
//     button.addEventListener("click", toLike);
//   });
// }

/*Функция создания карточки*/
function createCard(item) {
  const card = template.cloneNode(true);
  card.querySelector(".elements__image").src = item.link;
  card.querySelector(".elements__image").alt = item.name;
  card.querySelector(".elements__title").textContent = item.name;
  card.querySelector(".elements__button-delete").addEventListener("click", () => {
    card.remove();
  });
  card.querySelector(".elements__button-like").addEventListener("click", toLike);
  card.querySelector(".elements__image").addEventListener("click", toOpenImage);
  return card;
}

function renderCards(items) {
  const cards = items.map((item) => {
    return createCard(item);
  });
  elements.prepend(...cards);
  // buttonLike = document.querySelectorAll(".elements__button-like");
  // elementsImage = document.querySelectorAll(".elements__image");
}

function handleAddition() {
  showPopup(popupAdd);
}

/*Добавить новую карточку*/
function handleFormAddSubmit(evt) {
  evt.preventDefault();
  const place = popupFieldPlace.value;
  const photo = popupFieldPhoto.value;
  const card = createCard({ name: place, link: photo });
  elements.prepend(card);
  popupAdd.classList.remove("popup_opened");
}

// function openedImage() {
//   image = elementsImage.forEach((image) => {
//     image.addEventListener('click', toOpenImage);
//   })
//   // showPopup(popupImage);
// }

function toOpenImage(evt) {
  let image = evt.target;
  showImagePopup(image);
}

function showImagePopup(image) {
  // popupImage.classList.add("popup_opened");
  showPopup(popupImage);
  console.log(image);
  const popupContImg = popupImage.querySelector(".popup__conteiner_image");
  console.log(popupContImg);
  popupContImg.src = image.src;
  popupContImg.alt = image.alt;
  popupImage.querySelector(".popup__title").textContent = image.alt;
}

renderCards(initialCards);

buttonEdit.addEventListener("click", handleEditProfile);

buttonAdd.addEventListener("click", handleAddition);

formEdit.addEventListener("submit", handleFormSubmit);

formAdd.addEventListener("submit", handleFormAddSubmit);
console.log(elementsImage);

// elementsImage.addEventListener("click", openedImage);

// handleLikes();

closePopup();
