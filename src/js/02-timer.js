import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const timePicker = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');
let timerId = null;
let selectedDate = null;

// ========Finding difference============
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= Date.now()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      startBtn.disabled = true;
    } else {
      Notiflix.Notify.success('You Can press it)');
      startBtn.disabled = false;
      selectedDate = selectedDates[0];
      console.log(selectedDate.getTime());
    }
  },
};

flatpickr(timePicker, options);

startBtn.addEventListener('click', onTimerStart);

function onTimerStart() {
  timerId = setInterval(() => {
    const difference = selectedDate.getTime() - Date.now();
    timePicker.disabled = true;
    startBtn.disabled = true;
    onTimeStop(difference);
    const convertedMs = convertMs(difference);
    onTimeConvert(convertedMs);
  }, 1000);
}

function onTimeStop(difference) {
  if (difference <= 1000) {
    clearInterval(timerId);
    startBtn.disabled = false;
    timePicker.disabled = true;
  }
}

// ===========Converting the time===============

function onTimeConvert({ days, hours, minutes, seconds }) {
  daysEl.textContent = onAddZero(days);
  hoursEl.textContent = onAddZero(hours);
  minutesEl.textContent = onAddZero(minutes);
  secondsEl.textContent = onAddZero(seconds);
}

function onAddZero(value) {
  return value.toString().padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
