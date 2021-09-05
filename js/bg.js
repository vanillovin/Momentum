const body = document.querySelector('body');

const IMG_NUMBER = 10;

function paintImage(imgNumber) {
  const image = new Image();
  image.src = `./images/${imgNumber + 1}.jpg`;
  image.classList.add('bgImage')
  body.appendChild(image);
}
function genRandom() {
  // ceiling(천장-올림) round(반올림) floor(바닥-내림)
  const number = Math.floor(Math.random() * IMG_NUMBER);
  return number;
}

function init() {
  const randomNumber = genRandom();
  paintImage(randomNumber);
}

init();