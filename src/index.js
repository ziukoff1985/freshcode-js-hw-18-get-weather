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
    radio.addEventListener('change', () => {
        toggleDisabledFields();
        setWeatherDisplayState();
    });
});

// Switches active input based on radio selection.
function toggleDisabledFields() {
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
        setWeatherDisplayState(`${error.message}, try again`);
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const city = cityNameRadio.checked
        ? cityNameInput.value.trim()
        : cityIdInput.value.trim();
    getWeatherData(city);
});

// Renders temperature, humidity, and wind speed on the UI
function renderWeatherData(data) {
    const {
        main: { temp, humidity },
        wind: { speed },
    } = data;
    const [tempElement, windElement, humidityElement] = weatherData;
    tempElement.textContent = `${temp} °C`;
    windElement.textContent = `${speed} m/s`;
    humidityElement.textContent = `${humidity} %`;
}

// Sets error message on UI or clears it to default state
function setWeatherDisplayState(message) {
    weatherData.forEach((el) => {
        const content = message ? message : '- - -';
        el.textContent = content;
        el.classList.toggle('error', !!message);
    });
}

// Sets initial state for radio buttons, inputs and weather data
function setInitialState() {
    cityNameRadio.checked = true;
    cityIdRadio.checked = false;
    toggleDisabledFields();
    setWeatherDisplayState();
}

cancelBtn.addEventListener('click', setInitialState);
