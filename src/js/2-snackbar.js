import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let delay = 0;

const input = document.querySelector('input[name="delay"]');
input.addEventListener('input', event => {
  delay = Number(event.target.value);
});

const fullfield = document.querySelector('input[value="fulfilled"]');
const rejected = document.querySelector('input[value="rejected"]');

const form = document.querySelector('.form');
const showNotification = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (fullfield.checked) {
        resolve(delay);
      } else if (rejected.checked) {
        reject(delay);
      }
    }, delay);
  });
};

form.addEventListener('submit', event => {
  event.preventDefault();
  showNotification()
    .then(delay => {
      iziToast.show({
        message: `✅ Fulfilled promise in ${delay}ms`,
      });
    })
    .catch(delay => {
      iziToast.show({
        message: `❌ Rejected promise in ${delay}ms`,
      });
    });
});
