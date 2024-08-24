import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const btn = document.querySelector('button[data-start]');

const input = document.querySelector('input#datetime-picker');

let userSelectedDate;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  dateFormat: 'd.m.Y',
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    if (userSelectedDate < new Date()) {
      iziToast.show({
        message: 'Please choose a date in the future',
      });
      btn.classList.add('disabled-button');
    } else {
      btn.classList.remove('disabled-button');
    }
  },
};

flatpickr('#datetime-picker', options);

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

let isActive = false;
let intervalId = null;

const timerStartListener = () => {
  if (btn.classList.contains('disabled-button') || isActive) {
    return;
  }
  isActive = true;

  intervalId = setInterval(() => {
    let countedTime = userSelectedDate - new Date();

    input.disabled = true;
    btn.disabled = true;
    btn.classList.add('disabled-button');

    if (countedTime <= 0) {
      clearInterval(intervalId);
      isActive = false;
      btn.classList.remove('disabled-button');
      countedTime = 0;
      btn.disabled = false;
      input.disabled = false;
    }

    const timeValues = convertMs(countedTime);

    const time = [
      (document.querySelector('span[data-days]').textContent = addLeadingZero(
        timeValues.days
      )),
      (document.querySelector('span[data-hours]').textContent = addLeadingZero(
        timeValues.hours
      )),
      (document.querySelector('span[data-minutes]').textContent =
        addLeadingZero(timeValues.minutes)),
      (document.querySelector('span[data-seconds]').textContent =
        addLeadingZero(timeValues.seconds)),
    ];
  }, 1000);
};

btn.addEventListener('click', timerStartListener);

const addLeadingZero = value => {
  return String(value).padStart(2, '0');
};

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
