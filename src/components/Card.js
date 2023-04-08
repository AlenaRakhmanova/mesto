export class Card {
  constructor(
    data,
    templateSelector,
    callbackShowPopup,
    callbackAddLike,
    callbackDeleteLike,
    callbackShowPopupConfirmation,
    userId
  ) {
    this._templateSelector = templateSelector;
    this._name = data.name;
    this._link = data.link;
    this._alt = data.name;
    this._like = data.likes;
    this._callbackShowPopup = callbackShowPopup;
    this._callbackAddLike = callbackAddLike;
    this._callbackDeleteLike = callbackDeleteLike;
    this._callbackShowPopupConfirmation = callbackShowPopupConfirmation;
    this._id = data._id; /* id карточки*/
    this._ownerId = data.owner._id; /* id владельца карточки*/
    this._userId = userId; /* мой id */
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
    this._element.querySelector(".elements__number-like").textContent = this._like.length;
    this._checkOwnerLike();
    this._checkOwnerCard();

    return this._element;
  }

  _setEventListeners() {
    this._likeButton = this._element.querySelector(".elements__button-like");
    this._buttonDelete = this._element.querySelector(".elements__button-delete");
    this._cardImage.addEventListener("click", () => {
      this._callbackShowPopup(this._name, this._link);
    });
    this._buttonDelete.addEventListener("click", () => {
      this._callbackShowPopupConfirmation(this);
    });
    this._likeButton.addEventListener("click", () => {
      if (this._likeButton.classList.contains("elements__button-like_active")) {
        this._callbackDeleteLike(this);
      } else {
        this._callbackAddLike(this);
      }
    });
  }

  handleLikeClick(data) {
    this._like = data.likes;
    this._likeButton.classList.toggle("elements__button-like_active");
    this._element.querySelector(".elements__number-like").textContent = this._like.length;
  }

  handleRemoveClick() {
    this._element.remove();
    this._element = null;
  }

  getCardId() {
    return this._id;
  }

  _checkOwnerLike() {
    if (this._like.some((user) => this._userId === user._id)) {
      this._likeButton.classList.add("elements__button-like_active");
    }
  }

  _checkOwnerCard() {
    if (this._ownerId === this._userId) {
      this._buttonDelete.classList.add("elements__button-delete_active");
    }
  }
}
