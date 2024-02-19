var container2 = document.getElementById('container2');
var slider2 = document.getElementById('slider2');
var dotsContainer2 = document.getElementById('dots-container2');
var slides2 = document.getElementsByClassName('slide2').length;
var buttons2 = document.getElementsByClassName('btn2');

var currentPosition2 = 0;
var currentMargin2 = 0;
var slidesPerPage2 = 0;
var slidesCount2 = slides2 - slidesPerPage2;
var containerWidth2 = container2.offsetWidth;
var distanceToSlide2;

window.addEventListener("resize", checkWidth2);

function checkWidth2() {
  containerWidth2 = container2.offsetWidth;
  setParams2(containerWidth2);
}

function setParams2(w) {
  if (w < 551) {
    slidesPerPage2 = 1;
  } else if (w < 901) {
    slidesPerPage2 = 2;
  } else if (w < 1101) {
    slidesPerPage2 = 3;
  } else {
    slidesPerPage2 = 3;
  }

  slidesCount2 = slides2 - slidesPerPage2;
  if (currentPosition2 > slidesCount2) {
    currentPosition2 -= slidesPerPage2;
  }

  if (w >= 1101) {
    currentMargin2 = -currentPosition2 * (180 / slidesPerPage2);
  } else if (w >= 601) {
    currentMargin2 = -currentPosition2 * (199.5 / slidesPerPage2);
  } else {
    currentMargin2 = -currentPosition2 * (201.5 / slidesPerPage2);
  }

  slider2.style.marginLeft = currentMargin2 + 'vw';

  if (currentPosition2 > 0) {
    buttons2[0].classList.remove('inactive');
  } else {
    buttons2[0].classList.add('inactive');
  }

  if (currentPosition2 < slidesCount2) {
    buttons2[1].classList.remove('inactive');
  } else {
    buttons2[1].classList.add('inactive');
  }

  updateDots2();
}

function slideRight2() {
  if (currentPosition2 !== 0) {
    if (containerWidth2 >= 1101) {
      currentMargin2 += 180 / slidesPerPage2;
    } else if (containerWidth2 >= 601) {
      currentMargin2 += 199.5 / slidesPerPage2;
    } else {
      currentMargin2 += 201.5 / slidesPerPage2;
    }

    slider2.style.marginLeft = currentMargin2 + 'vw';
    currentPosition2--;
  }

  if (currentPosition2 === 0) {
    buttons2[0].classList.add('inactive');
  }

  buttons2[1].classList.remove('inactive');
  updateDots2();
}

function slideLeft2() {
    var slidesCount2 = slides2 - slidesPerPage2 - 7;
  if (currentPosition2 !== slidesCount2) {
    if (containerWidth2 >= 1101) {
      currentMargin2 -= 180 / slidesPerPage2;
    } else if (containerWidth2 >= 601) {
      currentMargin2 -= 199.5 / slidesPerPage2;
    } else {
      currentMargin2 -= 201.5 / slidesPerPage2;
    }

    slider2.style.marginLeft = currentMargin2 + 'vw';
    currentPosition2++;
  }

  if (currentPosition2 === slidesCount2) {
    buttons2[1].classList.add('inactive');
  }

  buttons2[0].classList.remove('inactive');
  updateDots2();
}
function updateDots2() {
    var dots = dotsContainer2.getElementsByClassName('dot2');
    for (var i = 0; i < dots.length; i++) {
      dots[i].classList.remove('active2');
    }
    var dotIndex = Math.floor(currentPosition2 / slidesPerPage2); 
  dots[dotIndex].classList.add('active2');
  }
function createDots2() {
    for (var i = 0; i < slides2 / 2; i++) {
      var dot = document.createElement('div');
      dot.classList.add('dot2');
      dot.setAttribute('onclick', 'goToSlide2(' + (i*2) + ')');
      dotsContainer2.appendChild(dot);
    }
  
    // Установка обработчика событий для дотов
    var dots = dotsContainer2.getElementsByClassName('dot2');
    for (var i = 0; i < dots.length; i++) {
      dots[i].addEventListener('click', function (event) {
        var dotIndex = Array.from(dots).indexOf(event.target);
        goToSlide2(dotIndex);
      });
    }
  }

var customTouchStartX;

container2.addEventListener('touchstart', function (event) {
  customTouchStartX = event.touches[0].clientX;
});

container2.addEventListener('touchend', function (event) {
  var customTouchEndX = event.changedTouches[0].clientX;
  var customDeltaX = customTouchEndX - customTouchStartX;

  if (customDeltaX > 50) {
    slideRight2();
  } else if (customDeltaX < -50) {
    slideLeft2();
  }
});

createDots2();
setParams2();
checkWidth2();