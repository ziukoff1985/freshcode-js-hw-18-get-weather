'use strict';

const API_KEY = '7dadff2236bcd1bfd68b5922550ee28c';
const BASE_URL = `https://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}&units=metric`;

const radios = document.querySelectorAll('.radio');
const inputs = document.querySelectorAll('.input');
const buttons = document.querySelectorAll('.button');
const form = document.querySelector('.form');

const [cityNameRadio, cityIdRadio] = radios;
const [cityNameInput, cityIdInput] = inputs;
const [getWeatherBtn, cancelBtn] = buttons;

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
    const weatherProps = document.querySelectorAll('.prop-value');
    weatherProps.forEach((element) => (element.textContent = '- - -'));
    cityNameRadio.checked ? searchByCityName() : searchByCityId();
    cityIdInput.value = '';
    cityNameInput.value = '';
}

function searchByCityName() {
    cityIdInput.disabled = true;
    cityNameInput.disabled = false;
    cityIdInput.classList.add('disabled');
    cityNameInput.classList.remove('disabled');
    cityNameInput.focus();
}

function searchByCityId() {
    cityNameInput.disabled = true;
    cityIdInput.disabled = false;
    cityNameInput.classList.add('disabled');
    cityIdInput.classList.remove('disabled');
    cityIdInput.focus();
}

async function getWeatherData(city) {
    try {
        const url = cityNameRadio.checked
            ? `${BASE_URL}&q=${city}`
            : `${BASE_URL}&id=${city}`;

        const response = await fetch(url);
        const data = await response.json();

        console.log(data);

        if (data.cod !== 200) throw new Error(data.message);

        renderWeatherData(data);
    } catch (error) {
        console.log(error);
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const city = cityNameRadio.checked
        ? cityNameInput.value
        : cityIdInput.value;
    getWeatherData(city);
});

cancelBtn.addEventListener('click', setInitialState);

function renderWeatherData(data) {
    const {
        main: { temp, humidity },
        wind: { speed },
    } = data;
    const weatherProps = document.querySelectorAll('.prop-value');
    const [tempElement, windElement, humidityElement] = weatherProps;
    tempElement.textContent = `${temp} °C`;
    humidityElement.textContent = `${humidity} %`;
    windElement.textContent = `${speed} m/s`;
}
