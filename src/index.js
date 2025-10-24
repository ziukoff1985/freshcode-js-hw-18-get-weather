'use strict';

const radio = document.querySelectorAll('.radio');
const input = document.querySelectorAll('.input');

const [cityName, cityId] = input;
const [cityNameRadio, cityIdRadio] = radio;

cityName.focus();
cityId.disabled = true;
cityName.disabled = false;
cityId.classList.add('disabled');
cityName.classList.remove('disabled');

cityNameRadio.addEventListener('change', () => {
    cityId.disabled = true;
    cityName.disabled = false;
    cityId.classList.add('disabled');
    cityName.classList.remove('disabled');
    cityName.focus();
    cityId.value = '';
});

cityIdRadio.addEventListener('change', () => {
    cityName.disabled = true;
    cityId.disabled = false;
    cityName.classList.add('disabled');
    cityId.classList.remove('disabled');
    cityId.focus();
    cityName.value = '';
});
