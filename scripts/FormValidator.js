// scripts/FormValidator.js

export class FormValidator {
  constructor(config, formElement) {
    this._formElement = formElement;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;

    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
    this._submitButton = this._formElement.querySelector(
      this._submitButtonSelector
    );
  }

  enableValidation() {
    this._setEventListeners();
  }

  _setEventListeners() {
    // definir estado inicial do botão
    this._toggleButtonState();

    this._inputList.forEach((inputEl) => {
      inputEl.addEventListener("input", () => {
        this._checkInputValidity(inputEl);
        this._toggleButtonState();
      });
    });
  }

  _checkInputValidity(inputEl) {
    const errorEl = this._formElement.querySelector(`#${inputEl.id}-error`);
    if (!inputEl.validity.valid) {
      inputEl.classList.add(this._inputErrorClass);
      errorEl.textContent = inputEl.validationMessage;
      errorEl.classList.add(this._errorClass);
    } else {
      inputEl.classList.remove(this._inputErrorClass);
      errorEl.textContent = "";
      errorEl.classList.remove(this._errorClass);
    }
  }

  _toggleButtonState() {
    const isValid = this._inputList.every((inputEl) => inputEl.validity.valid);
    if (isValid) {
      this._submitButton.disabled = false;
      this._submitButton.classList.remove(this._inactiveButtonClass);
    } else {
      this._submitButton.disabled = true;
      this._submitButton.classList.add(this._inactiveButtonClass);
    }
  }
}
