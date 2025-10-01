// scripts/Card.js

export class Card {
  constructor(data, templateSelector, handleImageClick) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleImageClick = handleImageClick;
  }

  getCardElement() {
    const cardFragment = document
      .querySelector(this._templateSelector)
      .content
      .querySelector(".card")
      .cloneNode(true);

    this._element = cardFragment;
    this._cardImage = this._element.querySelector(".card__image");
    this._titleElement = this._element.querySelector(".card__title");
    this._deleteButton = this._element.querySelector(".card__delete-button");
    this._heartIcon = this._element.querySelector(".card__heart");

    this._titleElement.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    this._setEventListeners();

    return this._element;
  }

  _setEventListeners() {
    this._deleteButton.addEventListener("click", () => this._handleDelete());
    this._heartIcon.addEventListener("click", (evt) => this._handleLike(evt));
    this._cardImage.addEventListener("click", () => {
      this._handleImageClick(this._name, this._link);
    });
  }

  _handleDelete() {
    this._element.remove();
    this._element = null;
  }

  _handleLike(evt) {
    evt.target.classList.toggle("card__heart--active");
  }
}
