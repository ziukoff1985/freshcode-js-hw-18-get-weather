import { form } from './createForm.js';
import { getIsValidEmail } from './validateEmail.js';

class Person {
    constructor(...args) {
        args.forEach(({ name, value }) => {
            this[name] = value.trim();
        });
    }
}

export function setupSubmitForm() {
    function onSubmitForm(event) {
        event.preventDefault();

        if (!getIsValidEmail()) return;

        const formInputs = [...document.querySelectorAll('input')].filter(
            ({ name, value, type }) =>
                name && value.trim() && type !== 'checkbox' && type !== 'radio'
        );

        const person = new Person(...formInputs);

        if (!person.lastName) {
            console.log(
                'Cannot save: Last Name is required and cannot be empty'
            );
            return;
        }

        const personJson = JSON.stringify(
            person,
            (key, value) =>
                key === 'password' || key === 'passwordConfirmation'
                    ? undefined
                    : value,
            2
        );
        localStorage.setItem(person.lastName, personJson);
        form.reset();
    }
    form.addEventListener('submit', onSubmitForm);
}
