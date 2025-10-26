'use strict';
import { BASE_URL } from './constants.js';

const inputs = document.querySelectorAll('.input');
const radios = document.querySelectorAll('.radio');
const weatherData = document.querySelectorAll('.prop-value');
const cancelBtn = document.querySelector('button[type="reset"]');
const form = document.querySelector('.form');

const [cityNameRadio, cityIdRadio] = radios;
const [cityNameInput, cityIdInput] = inputs;

radios.forEach((radio) => {
    radio.addEventListener('change', toggleDisabledFields);
});

// Resets weather display and switches active input based on radio selection.
function toggleDisabledFields() {
    weatherData.forEach((el) => {
        el.textContent = '- - -';
        el.classList.remove('error');
    });
    cityNameRadio.checked
        ? toggleInputFields(cityNameInput, cityIdInput)
        : toggleInputFields(cityIdInput, cityNameInput);
}

// Activates one input field and disables/clears the other.
function toggleInputFields(activeField, inactiveField) {
    activeField.disabled = false;
    inactiveField.disabled = true;
    activeField.classList.remove('disabled');
    inactiveField.classList.add('disabled');
    inactiveField.value = '';
    activeField.focus();
}

// Fetches weather data from API
async function getWeatherData(city) {
    try {
        const url = cityNameRadio.checked
            ? `${BASE_URL}&q=${city}`
            : `${BASE_URL}&id=${city}`;
        const response = await fetch(url);
        const data = await response.json();
        if (data.cod !== 200) throw new Error(data.message);
        renderWeatherData(data);
    } catch (error) {
        console.log(error);
        renderError(`${error.message}, try again`);
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const city = cityNameRadio.checked
        ? cityNameInput.value.trim()
        : cityIdInput.value.trim();
    getWeatherData(city);
});

// Sets initial state for radio buttons and inputs
function setInitialState() {
    cityNameRadio.checked = true;
    cityIdRadio.checked = false;
    toggleDisabledFields();
}

cancelBtn.addEventListener('click', setInitialState);

// Renders temperature, humidity, and wind speed on the UI
function renderWeatherData(data) {
    const {
        main: { temp, humidity },
        wind: { speed },
    } = data;
    const [tempElement, windElement, humidityElement] = weatherData;
    tempElement.textContent = `${temp} °C`;
    humidityElement.textContent = `${humidity} %`;
    windElement.textContent = `${speed} m/s`;
}

// Renders an error message across all weather property elements
function renderError(message) {
    weatherData.forEach((el) => {
        el.textContent = message;
        el.classList.add('error');
    });
}
