/**
 * @param {HTMLInputElement[]} inputs
 * @param {HTMLFormElement} form
 */
export function validation(inputs, form) {
  /**
   * @type {HTMLButtonElement}
   */
  const submitButton = form.querySelector("button[type=submit]");
  inputs.forEach((inputEl) => {
    const selector = `.${inputEl.name}-input-error`;
    const inputError = document.querySelector(selector);
    inputEl.addEventListener("input", () => {
      const validity = inputEl.validity;
      console.log(validity);
      let validationMessage = inputEl.validationMessage;
      if (validity.patternMismatch) {
        validationMessage = inputEl.dataset.errorMessage;
      }

      if (validity.valueMissing) {
        validationMessage = inputEl.dataset.errorMessageValueMis;
      }
      inputError.textContent = validationMessage;
      const isFormValid = inputs.every((el) => el.validity.valid);
      submitButton.disabled = !isFormValid;
    });
  });
}

/**
 * @param {HTMLInputElement[]} inputs
 * @param {HTMLFormElement} form
 */
export function clearValidation(inputs, form) {
  /**
   * @type {HTMLButtonElement}
   */
  const submitButton = form.querySelector("button[type=submit]");
  submitButton.disabled = true;
  form.reset();
  inputs.forEach((inputEl) => {
    const selector = `.${inputEl.name}-input-error`;
    const inputError = document.querySelector(selector);
    inputError.textContent = "";
  });
}
