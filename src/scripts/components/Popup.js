// scripts/Popup.js
export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popup.classList.add("popup__opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popup.classList.remove("popup__opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    // fechar clicando no overlay ou no botão de fechar
    this._popup.addEventListener("click", (evt) => {
      // se clicar no próprio overlay (fora do conteúdo) ou em um botão de fechar
      if (
        evt.target === this._popup ||
        evt.target.closest(".popup__close")
      ) {
        this.close();
      }
    });
  }
}
