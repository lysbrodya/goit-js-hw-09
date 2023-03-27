import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const picker = document.querySelector('#datetime-picker');
const startButton = document.querySelector('[data-start]');
const daysTimer = document.querySelector('[data-days]');
const hoursTimer = document.querySelector('[data-hours]');
const minutesTimer = document.querySelector('[data-minutes]');
const secondsTimer = document.querySelector('[data-seconds]');

let dateDifference = 0;
let intervalId = null;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      alert('Please choose a date in the future');
    } else {
      startButton.disabled = false;

      startButton.addEventListener('click', () => {
        startButton.disabled = true;
        picker.disabled = true;
        intervalId = setInterval(() => {
          dateDifference = selectedDates[0] - new Date();
          insertDates();
          console.log(dateDifference);
          if (dateDifference < 1000) {
            clearInterval(intervalId);
          }
        }, 1000);
      });
    }
  },
};
picker.flatpickr(options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
function insertDates() {
  const timer = convertMs(dateDifference);

  daysTimer.textContent = timer.days;
  hoursTimer.textContent = timer.hours;
  minutesTimer.textContent = timer.minutes;
  secondsTimer.textContent = timer.seconds;
}
