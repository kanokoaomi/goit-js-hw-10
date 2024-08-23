import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const btn = document.querySelector('button[data-start]');

const input = document.querySelector('input#datetime-picker');
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  dateFormat: 'd.m.Y',
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (userSelectedDate < this.defaultDate) {
      alert('Please choose a date in the future');
      btn.classList.add('disabled-button');
    }
  },
  //   onChange() {},
};
let userSelectedDate = options.onClose;

flatpickr('#datetime-picker', options);

function selectDate(userSelectedDate) {
  if (userSelectedDate < options.defaultDate) {
    alert('Please choose a date in the future');
    btn.classList.add('disabled-button');
  }
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

const timerStartListener = () => {
  console.log('hello');
  selectDate();
};

btn.addEventListener('click', timerStartListener);

const addLeadingZero = value => {};

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
