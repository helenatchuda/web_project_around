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
 console.log("popup-element",popupElement);
 console.log(`.popup[data-type="${type}"]`)
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


    renderCard(cardData,elementContainer);
  }

  closePopup(popupElement);
}

formElements.forEach(form => form.addEventListener("submit", (e) => submitForm(e)));


if (popupCloseButtons) {

  popupCloseButtons.forEach(element=> element.addEventListener("click", () =>
    closePopup(element.closest(".popup"))
  ));
} else {
  console.warn("Elemento '.popup__close' não encontrado.");
}


function renderCard(data, wrap){
  wrap.prepend(addCard(data))
}

initialCards.forEach((card)=>{
  renderCard(card,elementContainer)
})



function addCard(card) {
  const cardElement = cardTemplate.cloneNode(true);

  const img = cardElement.querySelector(".card__image");
  const titleElement = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const heartIcon = cardElement.querySelector(".card__heart");

  img.src = card.link;
  img.alt = card.name;
  titleElement.textContent = card.name;


  heartIcon.addEventListener("click", () => {
    heartIcon.classList.toggle("card__heart--active");
  });


  deleteButton.addEventListener("click", (event) => {
   event.target.closest(".card").remove()
  });

  return cardElement;
}




