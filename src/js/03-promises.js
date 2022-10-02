import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('.form'),
  delayField: document.querySelector('input[name="delay"]'),
  stepField: document.querySelector('input[name="step"]'),
  amountField: document.querySelector('input[name="amount"]'),
  submitBtn: document.querySelector('button[type="submit"]'),
};

refs.form.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();

  let { delay, step, amount } = getFormData();

  for (let position = 1; position <= amount; position += 1) {
    createPromise(position, delay)
      .then(result => Notify.success(result))
      .catch(error => Notify.failure(error));
    delay += step;
  }
}

function getFormData() {
  return {
    delay: Number(refs.delayField.value),
    step: Number(refs.stepField.value),
    amount: Number(refs.amountField.value),
  };
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise ${position} in ${delay}ms`);
      }
    }, delay);
  });
}
