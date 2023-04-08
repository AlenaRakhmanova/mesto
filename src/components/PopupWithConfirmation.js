import { Popup } from "./Popup.js";

export class PopupWithConfirmation extends Popup {
  constructor(popupSelector, callbackDeleteCard) {
    super(popupSelector);
    this._buttonConfirmation = this._popup.querySelector(".popup__button-confirmation");
    this._callbackDeleteCard = callbackDeleteCard;
  }

  setRemovingCard(card) {
    this._card = card;
  }

  setEventListeners() {
    super.setEventListeners();
    this._buttonConfirmation.addEventListener("click", () => {
      this._callbackDeleteCard(this._card);
    });
  }
}
