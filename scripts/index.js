const profileInfo = document.querySelector(`.profile__container`);
const elementContainer = document.querySelector(".cards");

const nameElement = profileInfo.querySelector(".profile__name");
const descriptionElement = profileInfo.querySelector(".profile__description");

const imagePopup = document.querySelector("#image-popup");
const popupImage = imagePopup.querySelector(".popup__image");
const titleImage = imagePopup.querySelector(".popup__image-title");
const iditbutton = document.querySelector(".profile__edit-button");
const formElement = document.querySelector(".popup__form form");
const xclose = document.querySelector(".popup__close");
imagePopup.addEventListener("click", (event) => {
  const clickedOutside = !event.target.closest(".popup__container-image");
  if (clickedOutside) {
    closePopup(imagePopup);
  }
});

elementContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("card__icon")) {
    event.target.classList.toggle("card__icon-active");
  }

  if (event.target.classList.contains("card__trash")) {
    const cardRemove = event.target.closest(".card");
    cardRemove.remove();
  }

  const clickedImage = event.target.closest(".card__image");

  if (clickedImage) {
    const cardElement = clickedImage.closest(".card");
    const title = cardElement.querySelector(".card__title").textContent;

    popupImage.src = clickedImage.src;
    popupImage.alt = clickedImage.alt;
    titleImage.textContent = title;
    imagePopup.classList.add("popup__opened");
  }
});

profileInfo.addEventListener("click", (event) => {
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
    const inputName = popupElement.querySelector("#name");
    const inputDescription = popupElement.querySelector("#description");
    inputName.value = nameElement.textContent;
    inputDescription.value = descriptionElement.textContent;
  } else {
    popupElement.querySelector("form").reset();
  }
  popupElement.classList.add("popup__opened");
}
document.querySelectorAll(".popup").forEach((popupElement) => {
  popupElement.addEventListener("click", (event) => {
    if (event.target === popupElement) {
      closePopup(popupElement);
    }
  });
});

function closePopup(popupElement) {
  popupElement.classList.remove("popup__opened");
}

function submitForm(event) {
  event.preventDefault();

  const form = event.target;
  const popupElement = form.closest(".popup");
  const type = popupElement.dataset.type;

  if (type === "edit") {
    const inputName = popupElement.querySelector("#name");
    const inputDescription = popupElement.querySelector("#description");

    nameElement.textContent = inputName.value;
    descriptionElement.textContent = inputDescription.value;
    popupElement.classList.remove("popup__opened");
  }

  if (type === "new-card") {
    const title = popupElement.querySelector("#titulo").value;
    const link = popupElement.querySelector("#url-link").value;

    const cardData = {
      name: title,
      link: link,
    };

    addCard(cardData);
  }

  closePopup(popupElement);
}
if (formElement) {
  formElement.addEventListener("submit", (e) => submitForm(e));
} else {
  console.error("Formulário não encontrado no DOM!");
}

if (xclose) {
  xclose.addEventListener("click", () =>
    closePopup(document.querySelector(".popup"))
  );
} else {
  console.warn("Elemento '.popup__close' não encontrado.");
}
