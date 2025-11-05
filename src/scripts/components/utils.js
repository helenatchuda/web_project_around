// scripts/utils.js

/**
 * Abre o popup (adiciona classe de aberto).
 * Se for tipo “edit”, também preenche inputs com dados existentes.
 * @param {string} type — “edit” ou “new-card”
 * @param {object} options — objetos extras, ex: elementos de perfil
 */
export function openPopup(type, { nameInput, descriptionInput, nameEl, descriptionEl } = {}) {
  const popupEl = document.querySelector(`.popup[data-type="${type}"]`);
  if (!popupEl) return;

  if (type === "edit" && nameEl && descriptionEl && nameInput && descriptionInput) {
    nameInput.value = nameEl.textContent;
    descriptionInput.value = descriptionEl.textContent;
  } else if (type === "new-card") {
    const form = popupEl.querySelector("form");
    form.reset();
    // limpar erros visuais, se quiser
    const errorSpans = popupEl.querySelectorAll(".form__error");
    errorSpans.forEach(span => span.textContent = "");
    const inputs = popupEl.querySelectorAll(".form__input");
    inputs.forEach(input => input.classList.remove("form__input_type_error"));
  }

  popupEl.classList.add("popup__opened");
}

/** Fecha o popup (remove classe) */
export function closePopup(popupEl) {
  popupEl.classList.remove("popup__opened");
}

 export const initialCards = [

];