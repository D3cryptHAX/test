var container = document.getElementById('container');
var slider = document.getElementById('slider');
var slides = document.getElementsByClassName('slide').length;
var buttons = document.getElementsByClassName('btn');
var dotsContainer = document.getElementById('dots-container'); 

var currentPosition = 0;
var currentMargin = 0;
var slidesPerPage = 0;
var slidesCount = slides - slidesPerPage;
var containerWidth = container.offsetWidth;
var prevKeyActive = false;
var nextKeyActive = true;

window.addEventListener("resize", checkWidth);

function checkWidth() {
    containerWidth = container.offsetWidth;
    setParams(containerWidth);
}

function setParams(w) {
    if (w < 551) {
        slidesPerPage = 1;
    } else if (w < 901) {
        slidesPerPage = 1;
    } else if (w < 1101) {
        slidesPerPage = 1;
    } else {
        slidesPerPage = 2;
    }

    slidesCount = slides - slidesPerPage;

    if (currentPosition > slidesCount) {
        currentPosition = slidesCount;
    }

    if (w >= 1101) {
        currentMargin = -currentPosition * (60 / slidesPerPage);
    } else if (w >= 601) { 
        currentMargin = -currentPosition * (190 / slidesPerPage);
    } else {
        currentMargin = -currentPosition * (201.5 / slidesPerPage);
    }

    slider.style.marginLeft = currentMargin + 'vw';

    if (currentPosition > 0) {
        buttons[0].classList.remove('inactive');
    } else {
        buttons[0].classList.add('inactive');
    }

    if (currentPosition < slidesCount) {
        buttons[1].classList.remove('inactive');
    } else {
        buttons[1].classList.add('inactive');
    }

    updateDots(); 
}

setParams();

function slideRight() {
    if (currentPosition !== 0) {
        if (containerWidth >= 1101) {
            currentMargin += 60 / slidesPerPage;
        } else if (containerWidth >= 601) {
            currentMargin += 190 / slidesPerPage;
        } else {
            currentMargin += 201.5 / slidesPerPage;
        }

        slider.style.marginLeft = currentMargin + 'vw';
        currentPosition--;
    }

    if (currentPosition === 0) {
        buttons[0].classList.add('inactive');
    }

    buttons[1].classList.remove('inactive');
    updateDots(); 
}

function slideLeft() {
    var slidesCount = slides - slidesPerPage + 1;

    if (currentPosition !== slidesCount) {
        if (containerWidth >= 1101) {
            currentMargin -= 60 / slidesPerPage;
        } else if (containerWidth >= 601) {
            currentMargin -= 190 / slidesPerPage;
        } else {
            currentMargin -= 201.5 / slidesPerPage;
        }

        slider.style.marginLeft = currentMargin + 'vw';
        currentPosition++;
    }

    if (currentPosition === slidesCount) {
        buttons[1].classList.add('inactive');
    }

    buttons[0].classList.remove('inactive');
    updateDots(); 
}

function updateDots() {
    dotsContainer.innerHTML = '';

    for (var i = 0; i < slides; i++) {
        var dot = document.createElement('div');
        dot.classList.add('dot');
        dotsContainer.appendChild(dot);
    }

    dotsContainer.children[currentPosition].classList.add('active');
}

var touchStartX;

container.addEventListener('touchstart', function (event) {
    touchStartX = event.touches[0].clientX;
});

container.addEventListener('touchend', function (event) {
    var touchEndX = event.changedTouches[0].clientX;
    var deltaX = touchEndX - touchStartX;

    if (deltaX > 50) {
        slideRight();
    } else if (deltaX < -50) {
        slideLeft();
    }
});
