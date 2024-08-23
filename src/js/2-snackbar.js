import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let delay = inputSetTimeListener();

const input = document.querySelector('input[name="delay"]');
const inputSetTimeListener = event => {
  console.log(event.target.value);
};

input.addEventListener('input', inputSetTimeListener);

const fullfield = document.querySelector('input[value="fulfilled"]');
const rejected = document.querySelector('input[value="rejected"]');

const btnSubmit = document.querySelector('button[type="submit"]');
const showNotification = options => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (fullfield) {
        resolve(
          iziToast.show({
            message: `✅ Fulfilled promise in ${delay}ms`,
          })
        );
      }
      if (rejected) {
        reject(
          iziToast.show({
            message: `❌ Rejected promise in ${delay}ms`,
          })
        );
      }
    }, delay);
  });
};

btnSubmit.addEventListener('submit', showNotification());
