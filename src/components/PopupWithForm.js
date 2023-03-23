import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, callbackSubmitForm) {
    super(popupSelector);
    this._callbackSubmitForm = callbackSubmitForm;
    this._form = this._popup.querySelector(".popup__form");
  }

  _getInputValues() {
    this._inputList = this._popup.querySelectorAll(".popup__field");
    this._formsValues = {};
    this._inputList.forEach((input) => {
      this._formsValues[input.name] = input.value;
    });
    return this._formsValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", this._callbackSubmitForm);
  }

  close() {
    super.close();
    // console.log(this._form);
    if (this._popup.classList.contains("popup_edit")) {
      this._form.reset();
    }
  }
}
