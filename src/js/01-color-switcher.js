const startDisco = document.querySelector('button[data-start]');
const stopDisco = document.querySelector('button[data-stop]');
const bodyEl = document.querySelector('body');

startDisco.disabled = false;
stopDisco.disabled = true;

startDisco.addEventListener('click', discoAction);
stopDisco.addEventListener('click', discoStop);

let timerID;
function discoAction() {
  timerID = setInterval(backgroundColorChange, 1000);
  startDisco.disabled = true;
  stopDisco.disabled = false;
  return timerID;
}

function discoStop() {
  startDisco.disabled = false;
  stopDisco.disabled = true;
  clearInterval(timerID);
}

function backgroundColorChange() {
  const backgroundColor = getRandomHexColor();
  bodyEl.style.backgroundColor = backgroundColor;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
