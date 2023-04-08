import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, callbackSubmitForm) {
    super(popupSelector);
    this._callbackSubmitForm = callbackSubmitForm;
    this._form = this._popup.querySelector(".popup__form");
    this._inputList = this._form.querySelectorAll(".popup__field");
    this._buttonSave = this._popup.querySelector(".popup__button-save");
  }

  _getInputValues() {
    this._formsValues = {};
    this._inputList.forEach((input) => {
      this._formsValues[input.name] = input.value;
    });
    return this._formsValues;
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._textBefore = this._buttonSave.textContent;
      this._buttonSave.textContent = "Сохранение...";
    } else {
      this._buttonSave.textContent = this._textBefore;
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) =>
      this._callbackSubmitForm(evt, this._getInputValues())
    );
  }

  close() {
    super.close();
    this._form.reset();
  }
}
