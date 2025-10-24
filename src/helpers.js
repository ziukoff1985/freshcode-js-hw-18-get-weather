/**
 * Creates an element.
 * Adds a class (or classes) and attributes (if provided).
 * Attaches created element to the parent element.
 * @param {string} tag - The name of the tag ('div', 'input', 'button', etc.).
 * @param {string | string[]} className - The class or an array of classes.
 * @param {HTMLElement} parent - The parent element to attach the element to.
 * @param {Object} attributes - An object of attributes to set on the element (null by default).
 * @returns {HTMLElement} The created element.
 */
export function createElementWithClass(
    tag,
    className,
    parent,
    attributes = null
) {
    const element = document.createElement(tag);
    if (className) {
        if (Array.isArray(className)) {
            element.classList.add(...className);
        } else {
            element.classList.add(className);
        }
    }
    if (parent) {
        parent.append(element);
    }
    if (attributes) {
        Object.entries(attributes).forEach(([key, value]) => {
            element.setAttribute(key, value);
        });
    }

    return element;
}
