// scripts/PopupWithForm.js
import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector("form");
    this._inputList = Array.from(this._form.querySelectorAll("input"));
  }

  _getInputValues() {
    const formValues = {};
    this._inputList.forEach(input => {
      formValues[input.name || input.id] = input.value;
    });
    return formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const inputValues = this._getInputValues();
      this._handleFormSubmit(inputValues);
      this.close();  // fechar após submissão
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}
