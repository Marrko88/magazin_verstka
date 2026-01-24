"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// interface CardOptions {
//     title: string;
//     image: string;
//     imageAlt?: string;
//     favorite?: boolean;
// }
//
// function create_card({ title, image, imageAlt = '', favorite = false }: CardOptions): HTMLElement {
//     const card = document.createElement('div');
//     card.className = 'card';
//
//     const head = document.createElement('div');
//     head.className = 'card__head';
//
//     const titleDiv = document.createElement('div');
//     titleDiv.className = 'card__title';
//     titleDiv.textContent = title;
//
//     const favBtn = document.createElement('button');
//     favBtn.className = 'card__favorites';
//     if (favorite) favBtn.classList.add('is-favorite');
//     favBtn.addEventListener('click', () => favBtn.classList.toggle('is-favorite'));
//
//     const media = document.createElement('div');
//     media.className = 'card__media';
//
//     const img = document.createElement('img');
//     img.className = 'card__img';
//     img.src = image;
//     img.alt = imageAlt || title;
//
//     head.appendChild(titleDiv);
//     head.appendChild(favBtn);
//     media.appendChild(img);
//     card.appendChild(head);
//     card.appendChild(media);
//
//     return card;
// }
//
// function renderWardrobe(selector = '.wardrobe', items: CardOptions[]) {
//     const root = document.querySelector<HTMLElement>(selector);
//     if (!root) return;
//
//     root.innerHTML = '';
//     items.forEach(item => root.appendChild(create_card(item)));
// }
//
// const products: CardOptions[] = [
//     { title: 'T-Shirt',     image: 'img/T-Shirt.png' },
//     { title: 'Shorts',      image: 'img/Shorts.png' },
//     { title: 'Cap',         image: 'img/Cap.png' },
//     { title: 'Sneakers',    image: 'img/Sneakers.png' },
//     { title: 'Sunglasses',  image: 'img/Sunglasses.png' },
//     { title: 'Vintage Cap', image: 'img/photo-cap.png' },
// ];
//
// renderWardrobe('.wardrobe', products);
let currentUnit = 'C';
function weather_temperature() {
    return __awaiter(this, void 0, void 0, function* () {
        const api_key = '49dc7e548a6b08d66125b7fcdef72fd3';
        const lat = 60.059832348548234;
        const lon = 30.437594026990848;
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${api_key}`;
        const response = yield fetch(url);
        if (!response.ok)
            throw new Error(`HTTP error! status: ${response.status}`);
        return yield response.json();
    });
}
function footerDate() {
    const idBlock = document.getElementById('footer__date');
    if (idBlock) {
        idBlock.textContent = new Date().getFullYear().toString();
    }
}
function initTempSwitch() {
    const switchRoot = document.querySelector('.temp-switch');
    if (!switchRoot) {
        return;
    }
    const tempBtn = switchRoot.querySelectorAll('.temp-btn');
    tempBtn.forEach(btn => btn.addEventListener('click', () => {
        tempBtn.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        currentUnit = btn.dataset.unit;
        console.log('Переключили на:', currentUnit);
        update_block_weather();
    }));
}
function getCurrentUnit() {
    return currentUnit === 'C' ? '°C' : '°F';
}
function fahrenheitToCelsius(f) {
    return (f - 32) * 5 / 9;
}
function day_night() {
    let time = new Date().getHours();
    return time >= 18 || time <= 6 ? 'night' : 'day';
}
function update_block_weather() {
    let weatherBlock = document.getElementById('weather');
    const temperatureBlock = document.getElementById('temperature');
    if (!weatherBlock || !temperatureBlock) {
        console.error('Элементы weather или temperature не найдены');
        return;
    }
    weather_temperature()
        .then(temper => {
        const unit = getCurrentUnit();
        let num = temper.main.temp;
        if (unit === '°C') {
            num = fahrenheitToCelsius(temper.main.temp);
        }
        const dayNightClass = day_night();
        const weatherMain = temper.weather[0].main;
        weatherBlock.className = `weather-banner weather-banner_${dayNightClass}-${weatherMain}`;
        temperatureBlock.innerText = `${Math.floor(num)}${unit === '°C' ? '°C' : '°F'}`;
    })
        .catch(err => console.log(err));
}
const change_profile = document.getElementById('change_profile');
const new_garment = document.getElementById('new_garment');
const change_profile_modal = document.querySelector('.modal');
const close_modal = document.querySelector('.modal__close');
if (change_profile && change_profile_modal && close_modal) {
    const openModal = () => {
        change_profile_modal.hidden = false;
        document.body.style.overflow = 'hidden';
    };
    const closeModal = () => {
        change_profile_modal.hidden = true;
        document.body.style.overflow = '';
    };
    close_modal.addEventListener('click', closeModal);
    change_profile.addEventListener('click', openModal);
}
else if (change_profile_modal && close_modal && new_garment) {
    console.log('Modal__open');
    const openModal = () => {
        change_profile_modal.hidden = false;
        document.body.style.overflow = 'hidden';
    };
    const closeModal = () => {
        change_profile_modal.hidden = true;
        document.body.style.overflow = '';
    };
    close_modal.addEventListener('click', closeModal);
    new_garment.addEventListener('click', openModal);
}
else {
    console.warn('Modal elements not found');
}
initTempSwitch();
update_block_weather();
footerDate();
