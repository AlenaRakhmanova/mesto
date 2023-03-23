import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupContImg = this._popup.querySelector(".popup__image");
    this._popupTitle = this._popup.querySelector(".popup__title");
  }

  open(name, link) {
    this._popupContImg.src = link;
    this._popupContImg.alt = name;
    this._popupTitle.textContent = name;
    super.open();
  }
}
