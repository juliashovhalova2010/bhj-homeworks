'use strict';
const addCart = Array.from(document.querySelectorAll('.product__add'));
const quantityControl = Array.from(document.querySelectorAll(".product__quantity-control"));
const cart = document.querySelector('.cart__products');

quantityControl.forEach(element => element.addEventListener('click', isChangeQuantity));

addCart.forEach(element => {
    element.addEventListener('click', addProductToCart);
});

cart.addEventListener('click', (e) => {

    if (!e.target.classList.contains('cart__remove')) return;
    const productDel = e.target.closest('.cart__product');
    const productDelId = productDel.dataset.id;
    removeProduct(productDelId);
    productDel.remove();
    isProductstoCart();
});


function isProductstoCart() { 

    const cartContainer = document.querySelector('.cart');
    if (cart.querySelector('.cart__product') === null) {
        cartContainer.classList.add('cart__hidden'); 
    } else {
        cartContainer.classList.remove('cart__hidden'); 
    }
}

function isChangeQuantity(e) { 

    const quantity = e.target.closest(".product__quantity-controls").querySelector(".product__quantity-value");
    if (e.target.classList.contains("product__quantity-control_dec")) {
        quantity.innerText = +quantity.innerText - 1;
        if (+quantity.innerText <= 0) {
            quantity.innerText = 1;
        }
    } else {
        quantity.innerText = +quantity.innerText + 1;
    }
}

function addProductToCart(e) {
    const product = e.target.closest('.product');
    const productId = product.dataset.id;
    const productQuantity = product.querySelector('.product__quantity-value').innerText;
    const productImg = product.querySelector('.product__image').getAttribute('src');
    let searchProduct = Array.from(document.querySelectorAll('.cart__product')).find(item => item.dataset.id === productId);
    if (searchProduct) { 
        let countProductToBasket = searchProduct.querySelector('.cart__product-count');
        countProductToBasket.innerText = Number(countProductToBasket.innerText) + Number(productQuantity);

        const image = e.target.closest('.product').querySelector('img'); 
        const clonImg = image.cloneNode();
        const clonImgLeft = image.getBoundingClientRect().left; 
        const clonImgTop = image.getBoundingClientRect().top; 
        clonImg.style.left = clonImgLeft + 'px'; 
        clonImg.style.top = clonImgTop + 'px';
        clonImg.style.position = 'fixed';
        product.appendChild(clonImg); 

        const flyImgLeft = searchProduct.getBoundingClientRect().left; 
        const flyImgTop = searchProduct.getBoundingClientRect().top; 
        const differenceLeft = (clonImgLeft - flyImgLeft) / 50; 
        const differenceTop = (clonImgTop - flyImgTop) / 50;
        let timerFlyImg = setInterval(() => {
            const box = clonImg.getBoundingClientRect();
            if (box.top <= flyImgTop || box.left >= flyImgLeft) {
                clonImg.remove();
                clearInterval(timerFlyImg);
            }
            clonImg.style.left = box.left - differenceLeft + 'px';
            clonImg.style.top = box.top - differenceTop + 'px';
        }, 10);
        animation(clonImg, 'top', differenceTop);
    } else { 
        cart.insertAdjacentHTML('beforeEnd', `<div class="cart__product" data-id="${productId}">
                    <img class="cart__product-image" src="${productImg}">
                    <div class="cart__product-count">${productQuantity}</div>
                    <span><a href=# class = "cart__remove"></a></span>
                </div>`);
    }
    isProductstoCart();
    addProductToStorage(productId, productImg, productQuantity);
}

function animation(element, property, diff) {
    let coords = element.getBoundingClientRect();
    element.style.left = coords.left + diff + 'px';
    element.style.top = coords.top + diff + 'px';
}


function getStorage() {
    let basketStorage = localStorage.getItem('basket');
    basketStorage = basketStorage ? JSON.parse(basketStorage) : {};
    return basketStorage;
}


function onload() {
    getStorage();
    if (getStorage().length !== 0) {
        document.querySelector('.cart').classList.remove('cart__hidden');
    }
    Object.values(getStorage()).forEach(element => {
        const {
            id,
            img,
            quantity
        } = element;
        cart.insertAdjacentHTML('beforeEnd', `<div class="cart__product" data-id="${id}">
                    <img class="cart__product-image" src="${img}">
                    <div class="cart__product-count">${quantity}</div>
                    <span><a href=# class = "cart__remove"></a></span>
                </div>`);
    });
    isProductstoCart();
}

function addProductToStorage(productId, productImg, productQuantity) {
    let basketStorage = localStorage.getItem('basket');
    basketStorage = basketStorage ? JSON.parse(basketStorage) : {};
    if (basketStorage[productId]) {
        basketStorage[productId].quantity += Number(productQuantity);
    } else {
        basketStorage[productId] = {
            id: productId,
            img: productImg,
            quantity: Number(productQuantity)
        };
    }
    localStorage.setItem('basket', JSON.stringify(basketStorage));
}

function removeProduct(productDelId) { 

    let basketStorage = localStorage.getItem('basket');
    basketStorage = basketStorage ? JSON.parse(basketStorage) : {};
    delete basketStorage[productDelId];
      
      localStorage.setItem('basket', JSON.stringify(basketStorage));
}


document.addEventListener('DOMContentLoaded', onload);