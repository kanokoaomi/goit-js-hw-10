import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let delay = 0;

const input = document.querySelector('input[name="delay"]');
input.addEventListener('input', event => {
  delay = Number(event.target.value);
  console.log(`Delay set to: ${delay}ms`);
});

const fullfield = document.querySelector('input[value="fulfilled"]');
const rejected = document.querySelector('input[value="rejected"]');

const btnSubmit = document.querySelector('button[type="submit"]');
const showNotification = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (fullfield.checked) {
        resolve(
          iziToast.show({
            message: `✅ Fulfilled promise in ${delay}ms`,
          })
        );
      } else if (rejected.checked) {
        reject(
          iziToast.show({
            message: `❌ Rejected promise in ${delay}ms`,
          })
        );
      }
    }, delay);
  });
};

btnSubmit.addEventListener('click', event => {
  event.preventDefault();
  showNotification()
    .then(value => console.log(value))
    .catch(error => console.log(error));
});
