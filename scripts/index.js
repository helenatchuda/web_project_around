// Seletores principais
const cardTemplate = document.querySelector("#card-template").content;
const elementContainer = document.querySelector(".cards");
const profileInfo = document.querySelector(".profile__container");

const nameElement = profileInfo.querySelector(".profile__name");
const descriptionElement = profileInfo.querySelector(".profile__description");

const imagePopup = document.querySelector("#image-popup");
const popupImage = imagePopup.querySelector(".popup__image");
const titleImage = imagePopup.querySelector(".popup__image-title");

const editButton = document.querySelector(".profile__edit-button");

const formElements = document.querySelectorAll(".popup__form");
const editForm = document.querySelector(".popup__form-edit-name");
const nameInput = editForm.querySelector("#name");
const descriptionInput = editForm.querySelector("#description");
const saveButton = editForm.querySelector(".popup__save-button");

const popupCloseButtons = document.querySelectorAll(".popup__close");

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
// Renderiza cartões iniciais
initialCards.forEach(card => renderCard(card, elementContainer));

// Configura validação e comportamento do botão "Salvar"
[nameInput, descriptionInput].forEach(input => {
  input.addEventListener("input", () => {
    checkInputValidity(input);
    toggleButtonState();
  });
});

editButton.addEventListener("click", () => {
  checkInputValidity(nameInput);
  checkInputValidity(descriptionInput);
  toggleButtonState();
});

// Alterna estado do botão conforme validade dos campos
function toggleButtonState() {
  const isFormValid = nameInput.validity.valid && descriptionInput.validity.valid;
  saveButton.disabled = !isFormValid;
  if (isFormValid) {
    saveButton.classList.remove("popup__save-button_disabled");
  } else {
    saveButton.classList.add("popup__save-button_disabled");
  }
}

// Configura popups (abrir e fechar)
profileInfo.addEventListener("click", event => {
  if (event.target.closest(".profile__add-button")) {
    openPopup("new-card");
  }
  if (event.target.closest(".profile__edit-button")) {
    openPopup("edit");
  }
});

function openPopup(type) {
  const popupElement = document.querySelector(`.popup[data-type="${type}"]`);
  if (type === "edit") {
    nameInput.value = nameElement.textContent;
    descriptionInput.value = descriptionElement.textContent;
  } else {
    popupElement.querySelector("form").reset();
  }
  popupElement.classList.add("popup__opened");
}

document.querySelectorAll(".popup").forEach(popup => {
  popup.addEventListener("click", event => {
    if (event.target === popup) {
      closePopup(popup);
    }
  });
});

popupCloseButtons.forEach(btn => {
  btn.addEventListener("click", () => closePopup(btn.closest(".popup")));
});

function closePopup(popup) {
  popup.classList.remove("popup__opened");
}

// Manipulação da ação de "submit"
function submitForm(event) {
  event.preventDefault();
  const form = event.target;
  const popupElement = form.closest(".popup");

  if (popupElement.dataset.type === "edit") {
    nameElement.textContent = nameInput.value;
    descriptionElement.textContent = descriptionInput.value;
  } else if (popupElement.dataset.type === "new-card") {
    const title = popupElement.querySelector("#titulo").value;
    const link = popupElement.querySelector("#url-link").value;
    renderCard({ name: title, link }, elementContainer);
  }

  closePopup(popupElement);
}

formElements.forEach(form => form.addEventListener("submit", submitForm));

// Funções auxiliares (renderiza cartão, validação visual)
function renderCard(data, wrap) {
  wrap.prepend(addCard(data));
}

function addCard(card) {
  const cardEl = cardTemplate.cloneNode(true);
  const img = cardEl.querySelector(".card__image");
  const titleEl = cardEl.querySelector(".card__title");
  const deleteBtn = cardEl.querySelector(".card__delete-button");
  const heartIcon = cardEl.querySelector(".card__heart");

  img.src = card.link;
  img.alt = card.name;
  titleEl.textContent = card.name;

  heartIcon.addEventListener("click", () => heartIcon.classList.toggle("card__heart--active"));
  deleteBtn.addEventListener("click", event => event.target.closest(".card").remove());

  return cardEl;
}

imagePopup.addEventListener("click", event => {
  if (!event.target.closest(".popup__container-image")) {
    closePopup(imagePopup);
  }
});

elementContainer.addEventListener("click", event => {
  // Curtir
  if (event.target.classList.contains("card__heart")) {
    event.target.classList.toggle("card__heart--active");
  }
  // Abrir imagem
  const imgEl = event.target.closest(".card__image");
  if (imgEl) {
    const card = imgEl.closest(".card");
    popupImage.src = imgEl.src;
    popupImage.alt = imgEl.alt;
    titleImage.textContent = card.querySelector(".card__title").textContent;
    imagePopup.classList.add("popup__opened");
  }
});

// Validação visual
function showInputError(inputElement, errorMessage) {
  const errorEl = document.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add("form__input_type_error");
  errorEl.textContent = errorMessage;
  errorEl.classList.add("form__error_visible");
}

function hideInputError(inputElement) {
  const errorEl = document.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove("form__input_type_error");
  errorEl.textContent = "";
  errorEl.classList.remove("form__error_visible");
}

function checkInputValidity(inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(inputElement, inputElement.validationMessage);
  } else {
    hideInputError(inputElement);
  }
}


