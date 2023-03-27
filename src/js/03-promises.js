const form = document.querySelector('.form');

form.addEventListener('submit', evt => {
  evt.preventDefault();

  const amount = Number(evt.target.elements.amount.value);
  let firstDelay = Number(evt.target.elements.delay.value);
  const delayStep = Number(evt.target.elements.step.value);
  const timerId = () => {
    for (let i = 1; i <= amount; i++) {
      createPromise(i, firstDelay)
        .then(({ position, delay }) => {
          console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
          console.log(`❌ Rejected promise ${position} in ${delay}ms`);
        });
      firstDelay += delayStep;
    }
  };
  timerId();

  function createPromise(position, delay) {
    const shouldResolve = Math.random() > 0.3;
    return new Promise((resolve, reject) => {
      setTimeout(function name(params) {
        if (shouldResolve) {
          resolve({ position, delay });
        } else {
          reject({ position, delay });
        }
      }, delay);
    });
  }
});
