
import { Card } from "./components/Card.js";
import { FormValidator } from "./components/FormValidator.js";
import { openPopup, closePopup, initialCards } from "./components/utils.js";

import { PopupWithForm } from "./components/PopupWithForm.js";
import { PopupWithImage } from "./components/PopupWithImage.js";
import { Section } from "./components/Section.js";
import { UserInfo } from "./components/UserInfo.js";
import{api} from "./components/api.js";

document.addEventListener("DOMContentLoaded", () => {
  // elementos DOM

  const cardTemplate = "#card-template";  // seletor do <template> em HTML




  const editForm = document.querySelector(".popup__form-edit-name");
  const nameInput = editForm.querySelector("#name");
  const descriptionInput = editForm.querySelector("#description");

  // Instâncias de validação (já você fazia isso)
  const validationConfig = {
    inputSelector: ".form__input",
    submitButtonSelector: ".popup__save-button",
    inactiveButtonClass: "popup__save-button_disabled",
    inputErrorClass: "form__input_type_error",
    errorClass: "form__error_visible"
  };

  const formElements = document.querySelectorAll(".popup__form");
  formElements.forEach(formEl => {
    const validator = new FormValidator(validationConfig, formEl);
    validator.enableValidation();
  });

  // Instância do UserInfo
  const userInfo = new UserInfo({
    nameSelector: ".profile__name",
    descriptionSelector: ".profile__description"
  });

  // Popup para editar perfil
  const popupEditProfile = new PopupWithForm(".popup[data-type='edit']", (inputValues) => {
    userInfo.setUserInfo({
      name: inputValues.name,
      description: inputValues.description
    });
  });
  popupEditProfile.setEventListeners();

  // Popup para adicionar card
  const popupAddCard = new PopupWithForm(".popup[data-type='new-card']", (inputValues) => {

    console.log(inputValues);
    const newCardData = {
      name: inputValues.title,
      link: inputValues["url-link"]
    };
    renderCard(newCardData);
  });
  popupAddCard.setEventListeners();

  // Popup para imagem ampliada
  const popupWithImage = new PopupWithImage(".popup[data-type='open-image']");
  popupWithImage.setEventListeners();

  // Função para criar e inserir um card
  function renderCard(cardData) {
    const card = new Card(
      { name: cardData.name, link: cardData.link },
      cardTemplate,
      (name, link) => {
        // ao clicar na imagem do card
        popupWithImage.open(name, link);
      }
    );
    const cardElement = card.getCardElement();
    section.addItem(cardElement);
  }

  // Seção para os cards iniciais
  const section = new Section(
    {
      items: initialCards,
      renderer: renderCard
    },
    ".cards"
  );
  section.renderItems();

  // Botão de editar perfil
  const editButton = document.querySelector(".profile__edit-button");
  if (editButton) {
    editButton.addEventListener("click", () => {
      // preencher inputs com info atual
      const current = userInfo.getUserInfo();
      nameInput.value = current.name;
      descriptionInput.value = current.description;
      popupEditProfile.open();
    });
  }

  // Botão de adicionar novo card
  const addButton = document.querySelector(".profile__add-button");
  if (addButton) {
    addButton.addEventListener("click", () => {
      popupAddCard.open();
    });
  }
});

const username = document.querySelector(".profile__name")
const about = document.querySelector(".profile__description")
 /* api.getUsers()
      .then((data) => {
        // processa o resultado
        console.log(data)
      })
      .catch((err) => {
        console.log(err); // registra o erro no console
      });

api.getInitialCards()
.then((data) => {
        // processa o resultado
        console.log(data)
      })
      .catch((err) => {
        console.log(err); // registra o erro no console
      })*/
     api.getInicialData()
      .then(([userData,initialCards]) =>{
        console.log(userData)
        console.log(initialCards)

        username.textContent =userData.name
        about.textContent =userData.about
      })
      .catch((error)=> console.log(error))