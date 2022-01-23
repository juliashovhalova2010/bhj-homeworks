'use strict';

const tooltips = Array.from(document.querySelectorAll(".has-tooltip"));

tooltips.forEach(element => {
    element.insertAdjacentHTML('afterEnd', `<div class = 'tooltip' style = ''> ${element.getAttribute('title')} </div>`);

    element.addEventListener('click', (e) => {
        e.preventDefault();
        let tooltip = element.nextSibling;
        let positionTooltip = element.getBoundingClientRect();
        tooltip.style.left = positionTooltip.left + 'px';
        tooltip.style.top = positionTooltip.bottom + 'px';
        tooltip.classList.toggle('tooltip_active');
    });
});