let currentIndex = 0;
let animationStart = Date.now();
let animationInterval = null;
let animationDuraton = 1000;

function initSlider(sliderId) {
    const sliderContainer = document.getElementById(sliderId);

    if (sliderId && sliderContainer) {
        const items = document.querySelectorAll('.slider__item');
        if (items.length > 1) {
            sliderContainer.appendChild(initControls(items.length))
        }

        showNext(true, currentIndex)
    }
}

function calcNewIndex(forward = true) {
    const items = document.querySelectorAll('.slider__items .slider__item');

    console.log(items.length);
    let index;
    if (forward)
        index = currentIndex === items.length - 1 ? 0 : currentIndex + 1
    else
        index = currentIndex === 0 ? items.length - 1 : currentIndex - 1

    console.log('newindex ', index);
    return index;
}

function initControls(itemsCount) {
    const controls = document.createElement("div")
    controls.classList.add("slider__controls");
    const left = document.createElement("div")
    left.classList.add("slider__control-left");
    left.innerHTML = '<';
    const right = document.createElement("div")
    right.classList.add("slider__control-right");
    right.innerHTML = '>';
    const pages = document.createElement("div")
    pages.classList.add("slider__control-pages");

    left.addEventListener('click', () => {
        if (!animationInterval)
            showNext(false)
    })
    right.addEventListener('click', () => {
        if (!animationInterval)
            showNext()
    })

    const items = document.querySelectorAll('.slider__items .slider__item');
    for (let i = 0; i < items.length; i++) {
        const pageMark = document.createElement("div");
        pageMark.classList.add("slider__control-pages-mark");
        pageMark.addEventListener('click', () => {
            if (!animationInterval && i !== currentIndex){
                showNext(i > currentIndex, i)
            }
        })
        pages.appendChild(pageMark);
    }

    controls.appendChild(left);
    controls.appendChild(right);
    controls.appendChild(pages);

    return controls;
}

function showNext(forward = true, index = null) {
    const items = document.querySelectorAll('.slider__items .slider__item');
    const current = document.querySelector('.slider__view .slider__item');

    if (!index && index !== 0) index = calcNewIndex(forward);

    const next = items[index];
    const view = document.querySelector('.slider__view');

    if (!current) {
        view.appendChild(next.cloneNode(true));
    }
    else {
        if (forward)
            view.appendChild(next.cloneNode(true));
        else {
            view.style.right = view.offsetWidth + 'px';
            view.insertBefore(next.cloneNode(true), current);
        }

        animationStart = Date.now();

        animationInterval = setInterval(function () {
            let timePassed = Date.now() - animationStart;

            if (timePassed >= animationDuraton) {
                clearInterval(animationInterval);
                animationInterval = null;
                current.remove();
                view.style.right = 0;
                view.style.right = 'none';
                return;
            }

            animate(timePassed, forward);
        }, 20);
    }

    currentIndex = index;

    refreshPageMarks();
}

function refreshPageMarks() {
    const pageMarks = document.querySelectorAll('.slider__control-pages-mark');
    pageMarks.forEach((mark, i) => {
        if (i === currentIndex)
            mark.classList.add('slider__control-pages-mark--active');
        else
            mark.classList.remove('slider__control-pages-mark--active');
    })
}

function animate(timePassed, isForward) {
    const view = document.querySelector('.slider__view');

    const percentage = timePassed / animationDuraton * 100;
    if (isForward)
        view.style.right = view.offsetWidth * percentage / 100 + 'px';
    else
        view.style.right = (view.offsetWidth - view.offsetWidth * percentage / 100) + 'px';
}


initSlider('slider')