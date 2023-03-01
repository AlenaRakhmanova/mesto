export class Card {
  constructor(data, templateSelector, popupElement, callbackShowPopup) {
    this._templateSelector = templateSelector;
    this._name = data.name;
    this._link = data.link;
    this._alt = data.name;
    this._popupElement = popupElement;
    this._callbackShowPopup = callbackShowPopup;
  }

  _getTemplate() {
    const card = document
    .querySelector(this._templateSelector)
    .content
    .querySelector(".elements__place")
    .cloneNode(true);

    return card;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector(".elements__image").src = this._link;
    this._element.querySelector(".elements__image").alt = this._alt;
    this._element.querySelector(".elements__title").textContent = this._name; 

    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector(".elements__image").addEventListener("click", () => {
      this._hendleOpenImagePopup();
    });
    this._element.querySelector(".elements__button-delete").addEventListener("click", () => {
      this._handleRemoveClick();
    });
    this._element.querySelector(".elements__button-like").addEventListener("click", () => {
      this._handleLikeClick();});
  }

  _handleLikeClick() {
    this._element.querySelector('.elements__button-like').classList.toggle('elements__button-like_active');
  }

  _handleRemoveClick() {
    this._element.remove();
  }

  _hendleOpenImagePopup() {
    this._popupElement.querySelector('.popup__image').src = this._link;
    this._popupElement.querySelector('.popup__image').alt = this._alt;
    this._popupElement.querySelector('.popup__title').textContent = this._name;
    this._callbackShowPopup(this._popupElement);
  }

}
