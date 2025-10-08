// scripts/index.js

import { Card } from "./card.js";
import { FormValidator } from "./FormValidator.js";
import { openPopup, closePopup ,initialCards} from "./utils.js";


// Seletor / variáveis do DOM

const cardTemplate = document.querySelector("#card-template");
const elementContainer = document.querySelector(".cards");
const profileInfo = document.querySelector(".profile__container");
const nameElement = profileInfo.querySelector(".profile__name");
const descriptionElement = profileInfo.querySelector(".profile__description");

const imagePopup = document.querySelector("#image-popup");
const popupImage = imagePopup.querySelector(".popup__image");
const titleImage = imagePopup.querySelector(".popup__image-title");

const editButton = document.querySelector(".profile__edit-button");
const popupCloseButtons = document.querySelectorAll(".popup__close");

const formElements = document.querySelectorAll(".popup__form");
const editForm = document.querySelector(".popup__form-edit-name");
const nameInput = editForm.querySelector("#name");
const descriptionInput = editForm.querySelector("#description");
const saveButton = editForm.querySelector(".popup__save-button");

const titleInput = document.querySelector(".form__input-title");
const urlLinkInput = document.querySelector(".form__input-link");
const titleError = document.querySelector("#title-error");
const urlLinkError = document.querySelector("#url-link-error");
const newCardSaveButton = document.querySelector(
  "#new-card-popup .popup__save-button"
);



// Configuração para validação
const validationConfig = {
  inputSelector: ".form__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__error_visible"
};

// Inicializar validação em todos os formulários
formElements.forEach((formEl) => {
  const validator = new FormValidator(validationConfig, formEl);
  validator.enableValidation();
});

// Função auxiliar para renderizar cartão
function renderCard(cardData) {
  const card = new Card(cardData, "#card-template", handleCardClick);
  const cardElement = card.getCardElement();
  elementContainer.prepend(cardElement);
}

// Função para lidar clique em imagem de cartão
function handleCardClick(name, link) {
  popupImage.src = link;
  popupImage.alt = name;
  titleImage.textContent = name;
  openPopup("open-image");
}

// Renderiza os cartões iniciais
initialCards.forEach(cardData => {
  renderCard(cardData);
});

// Event listeners de popups e botões

// Botão "Editar perfil" e "Adicionar cartão"
profileInfo.addEventListener("click", (evt) => {
  if (evt.target.closest(".profile__edit-button")) {
    openPopup("edit", {
      nameInput,
      descriptionInput,
      nameEl: nameElement,
      descriptionEl: descriptionElement
    });
  }
  if (evt.target.closest(".profile__add-button")) {
    openPopup("new-card");
  }
});

// Fecha popup clicando fora da área de conteúdo interna
document.querySelectorAll(".popup").forEach(popupEl => {
  popupEl.addEventListener("click", (evt) => {
    if (evt.target === popupEl) {
      closePopup(popupEl);
    }
  });
});

// Botões de fechar X
popupCloseButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const popupEl = btn.closest(".popup");
    closePopup(popupEl);
  });
});

// Fechar com Escape
document.addEventListener("keydown", (evt) => {
  if (evt.key === "Escape" || evt.key === "Esc") {
    const opened = document.querySelector(".popup.popup__opened");
    if (opened) {
      closePopup(opened);
    }
  }
});


