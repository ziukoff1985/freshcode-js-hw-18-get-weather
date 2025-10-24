'use strict';

const radios = document.querySelectorAll('.radio');
const inputs = document.querySelectorAll('.input');

const [cityName, cityId] = inputs;
const [cityNameRadio, cityIdRadio] = radios;

inputs.forEach((input) => {
    if (input.name === 'cityName') {
        input.focus();
        input.disabled = false;
        input.classList.remove('disabled');
    } else {
        input.disabled = true;
        input.classList.add('disabled');
    }
});

radios.forEach((radio) => {
    radio.addEventListener('change', toggleDisabledFields);
});

function toggleDisabledFields() {
    console.log('cityName.checked :>> ', cityNameRadio.checked);
    console.log('cityId.checked :>> ', cityIdRadio.checked);
    if (cityNameRadio.checked) {
        cityId.disabled = true;
        cityName.disabled = false;
        cityId.classList.add('disabled');
        cityName.classList.remove('disabled');
        cityName.focus();
        cityId.value = '';
    } else {
        cityName.disabled = true;
        cityId.disabled = false;
        cityName.classList.add('disabled');
        cityId.classList.remove('disabled');
        cityId.focus();
        cityName.value = '';
    }
}

console.dir(cityNameRadio);
console.dir(cityIdRadio);
