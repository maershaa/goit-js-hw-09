// 1. Находим форму в HTML документе по классу "form".
const form = document.querySelector('.form');

// 2. Добавляем обработчик события "submit" для формы.
form.addEventListener('submit', function (e) {
  // 3. Отменяем стандартное поведение браузера, чтобы страница не перезагружалась при отправке формы.
  e.preventDefault();

  // 4. Получаем значения из полей ввода для первой задержки, шага и количества промисов.
  const firstDelay = parseInt(
    document.querySelector('input[name="delay"]').value
  );
  const step = parseInt(document.querySelector('input[name="step"]').value);
  const amount = parseInt(document.querySelector('input[name="amount"]').value);

  // 5. Создаем промисы в цикле в соответствии с введенными параметрами.
  for (let i = 1; i <= amount; i++) {
    // 6. Вычисляем номер создаваемого промиса (позицию) и задержку для этого промиса.
    const position = i;
    const delay = firstDelay + (i - 1) * step;

    // 7. Вызываем функцию createPromise, передавая ей позицию и задержку.
    createPromise(position, delay)
      // 8. Если промис выполняется успешно, выполнится этот блок кода.
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      // 9. Если промис отклоняется, выполнится этот блок кода.
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
});

// 10. Функция createPromise(position, delay) создает промис, который выполняется или отклоняется через заданное время.
function createPromise(position, delay) {
  // 11. Генерируем случайное число, чтобы определить, должен ли промис быть выполнен или отклонен.
  const shouldResolve = Math.random() > 0.3;

  // 12. Возвращаем новый промис, который разрешается или отклоняется через указанное время.
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // 13. Если shouldResolve равен true, промис разрешается с объектом, содержащим позицию и задержку.
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        // 14. Если shouldResolve равен false, промис отклоняется с объектом, содержащим позицию и задержку.
        reject({ position, delay });
      }
    }, delay);
  });
}
