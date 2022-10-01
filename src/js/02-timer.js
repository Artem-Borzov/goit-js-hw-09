import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
const dateField = document.querySelector('input[type="text"]');
const startBtn = document.querySelector('button[data-start]');
const timerDays = document.querySelector('[data-days]');
const timerHours = document.querySelector('[data-hours]');
const timerMinutes = document.querySelector('[data-minutes]');
const timerSeconds = document.querySelector('[data-seconds]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (options.defaultDate.getTime() < selectedDates[0].getTime()) {
      startBtn.disabled = false;
    } else {
      startBtn.disabled = true;
      window.alert('Please choose a date in the future');
    }
  },
};
startBtn.disabled = true;
const fp = flatpickr(dateField, options);

startBtn.addEventListener('click', startTimer);

function startTimer() {
  let deltaTime = fp.selectedDates[0].getTime() - options.defaultDate.getTime();
  setInterval(() => {
    deltaTime -= 1000;
    const deltaTimeConverted = convertMs(deltaTime);
    const { days, hours, minutes, seconds } = deltaTimeConverted;
    console.log(days);
    timerDays.textContent = days;
    timerHours.textContent = hours;
    timerMinutes.textContent = minutes;
    timerSeconds.textContent = seconds;

    console.log(convertMs(deltaTime));
  }, 1000);
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
