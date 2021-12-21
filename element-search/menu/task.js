'use strict';

function clearActive(element) {
    Array.from(element.closest('.menu_main').querySelectorAll('.menu_active')).forEach(element => {
        element.classList.remove('menu_active');
    }); 
}
function clickMenu() {
    if (this.nextElementSibling.contains('menu_sub')) {
        let menuActive = this.nextElementSibling.contains('menu_active');
        clearActive(this);
        if (!menuActive) {
            this.nextElementSibling.classList.add('menu_active'); //
        }
    }
    return false; 
}
Array.from(document.querySelectorAll('.menu__link')).forEach(element => {
    element.onclick = clickMenu; 
});
