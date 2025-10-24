import { inputConfigData, radioConfigData } from './configData.js';
import { createElementWithClass } from './helpers.js';

export const container = createElementWithClass(
    'div',
    'container',
    document.body
);
export const form = createElementWithClass('form', null, container);

export function createFormElements() {
    const h1 = createElementWithClass('h1', null, form);
    h1.textContent = 'CREATE AN ACCOUNT';

    const formParagraph = createElementWithClass('p', null, form);
    formParagraph.textContent =
        'We always keep your name and email address private';

    const inputWrapDiv = createElementWithClass('div', 'inputs-wrapper', form);

    inputConfigData.forEach((inputAtrData) => {
        const inputGroupDiv = createElementWithClass(
            'div',
            'input-group',
            inputWrapDiv
        );

        const input = createElementWithClass(
            'input',
            null,
            inputGroupDiv,
            inputAtrData
        );
    });

    radioConfigData.forEach(({ id, label, paragraphText }) => {
        const radioWrapDiv = createElementWithClass(
            'div',
            'radio-wrapper',
            form
        );

        const radioInput = createElementWithClass('input', null, radioWrapDiv);
        radioInput.setAttribute('type', 'radio');
        radioInput.setAttribute('name', 'join-as');
        radioInput.setAttribute('id', id);

        const radioContentDiv = createElementWithClass(
            'div',
            'radio-content',
            radioWrapDiv
        );

        const radioContentLabel = createElementWithClass(
            'label',
            null,
            radioContentDiv
        );
        radioContentLabel.setAttribute('for', id);
        radioContentLabel.textContent = label;

        const radioContentParagraph = createElementWithClass(
            'p',
            'radio-text',
            radioContentDiv
        );
        radioContentParagraph.textContent = paragraphText;
    });

    const checkboxWrapDiv = createElementWithClass(
        'div',
        'checkbox-wrapper',
        form
    );
    const checkboxInput = createElementWithClass(
        'input',
        null,
        checkboxWrapDiv
    );
    checkboxInput.setAttribute('type', 'checkbox');
    checkboxInput.setAttribute('name', 'terms');
    checkboxInput.setAttribute('id', 'terms');

    const checkboxInputLabel = createElementWithClass(
        'label',
        null,
        checkboxWrapDiv
    );
    checkboxInputLabel.setAttribute('for', 'terms');
    checkboxInputLabel.textContent =
        'Allow Squadhelp to send marketing/promotional offers from time to time';

    const btnWrapDiv = createElementWithClass('div', 'btn-wrapper', form);

    const submitButton = createElementWithClass('button', null, btnWrapDiv);
    submitButton.setAttribute('type', 'submit');
    submitButton.textContent = 'Submit';

    const cancelButton = createElementWithClass('button', null, btnWrapDiv);
    cancelButton.setAttribute('type', 'reset');
    cancelButton.textContent = 'Cancel';
}
