const content = document.querySelector(".content");
const profile = document.querySelector(".profile");
const buttonEdit = profile.querySelector(".button-edit");
const popup = document.querySelector(".popup");
const popupButtonClose = popup.querySelector(".button-close");
const profileFullName = profile.querySelector(".profile__full-name");
const profileInf = profile.querySelector(".profile__information");
const popupFieldName = popup.querySelector(".popup__field_name");
const popupFieldInfo = popup.querySelector(".popup__field_info");
const popupButtonSave = popup.querySelector(".button-save");
const buttonLike = content.querySelectorAll(".button-like");

function showPopup(modal) {
  modal.classList.add("popup_opened");
}

function closePopup(modal) {
  modal.classList.remove("popup_opened");
}

function handleEditProfile() {
  popupFieldName.value = profileFullName.textContent;
  popupFieldInfo.value = profileInf.textContent;
  showPopup(popup);
}

function handleCloseEdit() {
  closePopup(popup);
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileFullName.textContent = popupFieldName.value;
  profileInf.textContent = popupFieldInfo.value;
  closePopup(popup);
}

function toLike(evt) {
  let button = evt.target;
  if (button.classList.contains("button-like_active")) {
    button.classList.remove("button-like_active");
  } else {
    button.classList.add("button-like_active");
  }
}

function handleLikes() {
  buttonLike.forEach(function (button) {
    button.addEventListener("click", toLike);
  });
}

buttonEdit.addEventListener("click", handleEditProfile);

popupButtonClose.addEventListener("click", handleCloseEdit);

popupButtonSave.addEventListener("click", handleFormSubmit);

handleLikes();
