function clickCheckBox(event) {
    if (event.target.closest('.interest').querySelector('.interests')) {
        const checkArr = Array.from(event.target.closest('.interest').querySelectorAll('.interest__check'));
        checkArr.forEach(elem => {
            elem.checked = event.target.checked;
        });
    }
    function isCheckedElement(e) {
        let target = e.target.closest('.interests').closest('.interest').querySelectorAll('.interest__check');
        if (!e.closest('.interest').querySelector('.interests')) {
            const siblings = Array.from(e.closest('.interests').querySelectorAll('.interest__check'));
            const check = siblings.every(e => e.checked);
            check ? target.checked = true : target.checked = false;
        }
    }
    }
    Array.from(document.querySelectorAll('.interest__check')).forEach(element => {
        element.addEventListener('change', clickCheckBox);
    });