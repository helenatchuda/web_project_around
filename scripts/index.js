// scripts/index.js

import { Card } from "./card.js";
import { FormValidator } from "./FormValidator.js";
import { openPopup, closePopup } from "./utils.js";

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

const tituloInput = document.querySelector(".form__input-titulo");
const urlLinkInput = document.querySelector(".form__input-link");
const tituloError = document.querySelector("#titulo-error");
const urlLinkError = document.querySelector("#url-link-error");
const newCardSaveButton = document.querySelector(
  "#new-card-popup .popup__save-button"
);

const initialCards = [
  {
    name: "Vale de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg"
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg"
  },
  {
    name: "Montanhas Carecas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg"
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg"
  },
  {
    name: "Parque Nacional ",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg"
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg"
  }
];
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

// Submit dos formulários (edição de perfil ou novo cartão)
formElements.forEach(formEl => {
  formEl.addEventListener("submit", (evt) => {
    evt.preventDefault();
    const popupEl = formEl.closest(".popup");

    if (popupEl.dataset.type === "edit") {
      nameElement.textContent = nameInput.value;
      descriptionElement.textContent = descriptionInput.value;
      closePopup(popupEl);
    } else if (popupEl.dataset.type === "new-card") {
      let valid = true;

      // limpar erros anteriores
      tituloError.textContent = "";
      urlLinkError.textContent = "";
      tituloInput.classList.remove("form__input_type_error");
      urlLinkInput.classList.remove("form__input_type_error");

      if (!tituloInput.validity.valid) {
        valid = false;
        if (tituloInput.validity.valueMissing) {
          tituloError.textContent = "Por favor, insira um título.";
        } else if (tituloInput.validity.tooLong) {
          tituloError.textContent = `O título deve ter no máximo ${tituloInput.maxLength} caracteres.`;
        } else {
          tituloError.textContent = "Título inválido.";
        }
        tituloInput.classList.add("form__input_type_error");
      }

      if (!urlLinkInput.validity.valid) {
        valid = false;
        if (urlLinkInput.validity.valueMissing) {
          urlLinkError.textContent = "Por favor, insira um link de imagem.";
        } else {
          urlLinkError.textContent = "Link inválido.";
        }
        urlLinkInput.classList.add("form__input_type_error");
      }

      if (valid) {
        renderCard({
          name: tituloInput.value,
          link: urlLinkInput.value
        });
        closePopup(popupEl);
        formEl.reset();
      }
    }
  });
});

