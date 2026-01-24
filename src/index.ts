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
let currentUnit: 'C' | 'F' = 'C';
async function weather_temperature(): Promise<any> {
    const api_key = '49dc7e548a6b08d66125b7fcdef72fd3';
    const lat = 60.059832348548234;
    const lon = 30.437594026990848;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${api_key}`;
    const response = await fetch(url);
    if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
}


function footerDate(): void {
    const idBlock = document.getElementById('footer__date');
    if (idBlock) {
        idBlock.textContent = new Date().getFullYear().toString();
    }
}


function initTempSwitch(): void {
    const switchRoot = document.querySelector('.temp-switch');

    if (!switchRoot) {return}

    const tempBtn = switchRoot.querySelectorAll('.temp-btn');
    tempBtn.forEach(btn => btn.addEventListener('click', () => {
        tempBtn.forEach((b)=> b.classList.remove('active'));
        btn.classList.add('active');
        currentUnit = (btn as HTMLButtonElement).dataset.unit as 'C' | 'F';
        console.log('Переключили на:', currentUnit);
        update_block_weather();
    }))

}

function getCurrentUnit(): string {
    return currentUnit === 'C' ? '°C' : '°F';
}

function fahrenheitToCelsius(f: number): number {
    return (f - 32) * 5 / 9;
}

function day_night():string {
    let time = new Date().getHours();
    return time >= 18 || time <= 6 ? 'night' : 'day';
}




function update_block_weather():void{
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
const change_profile_modal = document.querySelector<HTMLElement>('.modal');
const close_modal = document.querySelector<HTMLElement>('.modal__close');



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
} else if(change_profile_modal && close_modal && new_garment){
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
}else{
    console.warn('Modal elements not found');
}



initTempSwitch();
update_block_weather();
footerDate();
