import { createElementWithClass } from './helpers.js';

let isValidEmail = false;

export const getIsValidEmail = () => isValidEmail;

export function setupEmailValidation(emailSelector) {
    const emailInput = document.querySelector(emailSelector);
    if (!emailInput) return;

    const inputGroupEmail = emailInput.closest('.input-group');

    const emailRegex = /^\w+\.?-?\w+@[a-z]{3,8}\.[a-z]{2,5}$/i;

    const errorMessage = createElementWithClass(
        'div',
        'error-message',
        inputGroupEmail
    );
    errorMessage.textContent = 'INVALID EMAIL FORMAT';

    function validateEmail(event) {
        const email = event.target.value;
        const isValid = emailRegex.test(email);

        isValidEmail = isValid;

        if (!isValid) {
            errorMessage.classList.add('visible');
            emailInput.classList.add('invalid');
        } else {
            errorMessage.classList.remove('visible');
            emailInput.classList.remove('invalid');
        }
    }
    emailInput.addEventListener('input', validateEmail);
}
