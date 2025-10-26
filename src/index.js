'use strict';
import { BASE_URL } from './constants.js';

const inputs = document.querySelectorAll('.input');
const radios = document.querySelectorAll('.radio');
const weatherProps = document.querySelectorAll('.prop-value');
const cancelBtn = document.querySelector('button[type="reset"]');
const form = document.querySelector('.form');

const [cityNameRadio, cityIdRadio] = radios;
const [cityNameInput, cityIdInput] = inputs;

function setInitialState() {
    cityNameRadio.checked = true;
    cityIdRadio.checked = false;
    toggleDisabledFields();
}

setInitialState();

radios.forEach((radio) => {
    radio.addEventListener('change', toggleDisabledFields);
});

function toggleDisabledFields() {
    weatherProps.forEach((element) => {
        element.textContent = '- - -';
        element.classList.remove('error');
    });
    cityNameRadio.checked
        ? toggleInputs(cityNameInput, cityIdInput)
        : toggleInputs(cityIdInput, cityNameInput);
}

function toggleInputs(activeField, inactiveField) {
    activeField.disabled = false;
    inactiveField.disabled = true;
    activeField.classList.remove('disabled');
    inactiveField.classList.add('disabled');
    inactiveField.value = '';
    activeField.focus();
}

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
        renderError(error.message);
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const city = cityNameRadio.checked
        ? cityNameInput.value.trim()
        : cityIdInput.value.trim();
    getWeatherData(city);
});

cancelBtn.addEventListener('click', setInitialState);

function renderWeatherData(data) {
    const {
        main: { temp, humidity },
        wind: { speed },
    } = data;
    const [tempElement, windElement, humidityElement] = weatherProps;
    tempElement.textContent = `${temp} °C`;
    humidityElement.textContent = `${humidity} %`;
    windElement.textContent = `${speed} m/s`;
}

function renderError(message) {
    weatherProps.forEach((element) => {
        element.textContent = message;
        element.classList.add('error');
    });
}
