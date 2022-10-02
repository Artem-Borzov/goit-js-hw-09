import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  input: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};

const currentTime = Date.now();
const ONE_SECOND = 1000;
let selectedTime = null;
let deltaTime = null;
let intervalId = null;

refs.startBtn.addEventListener('click', onStartBtnClick);

flatpickr(refs.input, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() < currentTime) {
      return window.alert('Please choose a date in the future');
    }

    enabledStartBtn();

    selectedTime = selectedDates[0].getTime();
    deltaTime = selectedTime - currentTime;

    updateClockface(deltaTime);
  },
  onChange() {
    clearInterval(intervalId);
  },
});

disabledStartBtn();

function onStartBtnClick(e) {
  disabledStartBtn();

  clearInterval(intervalId);

  intervalId = setInterval(() => {
    if (deltaTime < ONE_SECOND) {
      return;
    }

    deltaTime -= ONE_SECOND;

    updateClockface(deltaTime);
  }, ONE_SECOND);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function updateClockface(deltaTime) {
  const { days, hours, minutes, seconds } = convertMs(deltaTime);
  refs.days.textContent = days;
  refs.hours.textContent = hours;
  refs.minutes.textContent = minutes;
  refs.seconds.textContent = seconds;
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function disabledStartBtn() {
  refs.startBtn.setAttribute('disabled', '');
}

function enabledStartBtn() {
  refs.startBtn.removeAttribute('disabled');
}
