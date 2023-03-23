export class Card {
  constructor(data, templateSelector, callbackShowPopup) {
    this._templateSelector = templateSelector;
    this._name = data.name;
    this._link = data.link;
    this._alt = data.name;
    this._callbackShowPopup = callbackShowPopup;
  }

  _getTemplate() {
    const card = document
      .querySelector(this._templateSelector)
      .content.querySelector(".elements__place")
      .cloneNode(true);

    return card;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(".elements__image");
    this._setEventListeners();
    this._cardImage.src = this._link;
    this._cardImage.alt = this._alt;
    this._element.querySelector(".elements__title").textContent = this._name;

    return this._element;
  }

  _setEventListeners() {
    this._likeButton = this._element.querySelector(".elements__button-like");
    this._cardImage.addEventListener("click", () => {
      console.log(this);

      this._callbackShowPopup(this._name, this._link);
    });
    this._element.querySelector(".elements__button-delete").addEventListener("click", () => {
      this._handleRemoveClick();
    });
    this._likeButton.addEventListener("click", () => {
      this._handleLikeClick();
    });
  }

  _handleLikeClick() {
    this._likeButton.classList.toggle("elements__button-like_active");
  }

  _handleRemoveClick() {
    this._element.remove();
    this._element = null;
  }
}
