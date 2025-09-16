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
const tituloInput = document.querySelector(".form__input-titulo");
const urlLinkInput = document.querySelector(".form__input-link");

// --- Novas variáveis de erro / botão novo cartão ---
const tituloError = document.querySelector("#titulo-error");
const urlLinkError = document.querySelector("#url-link-error");
const newCardSaveButton = document.querySelector("#new-card-popup .popup__save-button");

// Continua o resto...

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
[nameInput, descriptionInput, tituloInput, urlLinkInput].forEach(input => {
  input.addEventListener("input", () => {
    checkInputValidity(input);
    toggleButtonState();
    toggleNewCardButtonState(); // Também verifica botão de novo cartão
  });
});

editButton.addEventListener("click", () => {
  validateTitulo();
  validateUrlLink();
  toggleButtonState();
  toggleNewCardButtonState();
});

// Alterna estado do botão conforme validade dos campos de perfil
function toggleButtonState() {
  const isFormValid = nameInput.validity.valid && descriptionInput.validity.valid;
  saveButton.disabled = !isFormValid;
  if (isFormValid) {
    saveButton.classList.remove("popup__save-button_disabled");
  } else {
    saveButton.classList.add("popup__save-button_disabled");
  }
}

// Alterna estado do botão do novo cartão
function toggleNewCardButtonState() {
  const isValid = tituloInput.validity.valid && urlLinkInput.validity.valid;
  newCardSaveButton.disabled = !isValid;
  if (isValid) {
    newCardSaveButton.classList.remove("popup__save-button_disabled");
  } else {
    newCardSaveButton.classList.add("popup__save-button_disabled");
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
    // limpar erros também
    if (type === "new-card") {
      tituloError.textContent = "";
      urlLinkError.textContent = "";
      tituloInput.classList.remove("form__input_type_error");
      urlLinkInput.classList.remove("form__input_type_error");
      toggleNewCardButtonState(); // para definir estado inicial do botão criar
    }
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
document.addEventListener("keydown", function(event) {
  if (event.key === "Escape" || event.key === "Esc" || event.keyCode === 27) {
    const openPopup = document.querySelector(".popup.popup__opened");
    if (openPopup) {
      closePopup(openPopup);
    }
  }
});

// Manipulação da ação de "submit"
function submitForm(event) {
  event.preventDefault();
  const form = event.target;
  const popupElement = form.closest(".popup");

  if (popupElement.dataset.type === "edit") {
    nameElement.textContent = nameInput.value;
    descriptionElement.textContent = descriptionInput.value;
  } else if (popupElement.dataset.type === "new-card") {
    // validação adicional aqui: se campo(s) inválido(s), mostra erro e não continuar
    let novoCartValido = true;

    // limpar mensagens de erro anteriores
    tituloError.textContent = "";
    urlLinkError.textContent = "";
    tituloInput.classList.remove("form__input_type_error");
    urlLinkInput.classList.remove("form__input_type_error");

    if (!tituloInput.validity.valid) {
      novoCartValido = false;
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
      novoCartValido = false;
      if (urlLinkInput.validity.valueMissing) {
        urlLinkError.textContent = "Por favor, insira um link de imagem.";
      } else {
        urlLinkError.textContent = "Link inválido.";
      }
      urlLinkInput.classList.add("form__input_type_error");
    }

    if (novoCartValido) {
      const title = tituloInput.value;
      const link = urlLinkInput.value;
      renderCard({ name: title, link }, elementContainer);
      closePopup(popupElement);
      form.reset();
    }
  }
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

// Mantêm tuas funções de validação existentes
function validateTitulo() {
  if (!tituloInput.validity.valid) {
    if (tituloInput.validity.valueMissing) {
      showInputError(tituloInput, tituloError, "Por favor, insira um título.");
    } else if (tituloInput.validity.tooLong) {
      showInputError(tituloInput, tituloError, `O título deve ter no máximo ${tituloInput.maxLength} caracteres.`);
    } else {
      showInputError(tituloInput, tituloError, "Título inválido.");
    }
  } else {
    hideInputError(tituloInput, tituloError);
  }
}

function validateUrlLink() {
  if (!urlLinkInput.validity.valid) {
    if (urlLinkInput.validity.valueMissing) {
      showInputError(urlLinkInput, urlLinkError, "Por favor, insira um link de imagem.");
    } else {
      showInputError(urlLinkInput, urlLinkError, "Link inválido.");
    }
  } else {
    hideInputError(urlLinkInput, urlLinkError);
  }
}

function showInputError(inputElement, errorElement, errorMessage) {
  inputElement.classList.add("form__input_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("form__error_visible");
}

function hideInputError(inputElement, errorElement) {
  inputElement.classList.remove("form__input_type_error");
  errorElement.textContent = "";
  errorElement.classList.remove("form__error_visible");
}

function checkInputValidity(inputElement) {
  // se quiseres, podes condicionar: apenas mostrar erro depois de interagir
  if (!inputElement.validity.valid) {
    // decidir qual span de erro mostrar
    if (inputElement === tituloInput) {
      showInputError(tituloInput, tituloError, inputElement.validationMessage);
    } else if (inputElement === urlLinkInput) {
      showInputError(urlLinkInput, urlLinkError, inputElement.validationMessage);
    } else {
      // campos de perfil
      showInputError(inputElement, document.querySelector(`#${inputElement.id}-error`), inputElement.validationMessage);
    }
  } else {
    if (inputElement === tituloInput) {
      hideInputError(tituloInput, tituloError);
    } else if (inputElement === urlLinkInput) {
      hideInputError(urlLinkInput, urlLinkError);
    } else {
      hideInputError(inputElement, document.querySelector(`#${inputElement.id}-error`));
    }
  }
}

