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
//     { title: 'Sneakers',    image: 'img/Sneakers 1.png' },
//     { title: 'Sunglasses',  image: 'img/Sunglasses.png' },
//     { title: 'Vintage Cap', image: 'img/telegram-cloud-photo-size-2-5282725103550971737-y 1.png' },
// ];
//
// renderWardrobe('.wardrobe', products);
function footerDate() {
    var idBlock = document.getElementById('footer__date');
    if (idBlock) {
        idBlock.textContent = new Date().getFullYear().toString();
    }
}
function active_switch() {
    var switchRoot = document.querySelector('.temp-switch');
    if (!switchRoot) {
        return;
    }
    var tempBtn = switchRoot.querySelectorAll('.temp-btn');
    tempBtn.forEach(function (btn) { return btn.addEventListener('click', function () {
        tempBtn.forEach(function (b) { return b.classList.remove('active'); });
        btn.classList.add('active');
    }); });
}
document.addEventListener('DOMContentLoaded', active_switch);
footerDate();
