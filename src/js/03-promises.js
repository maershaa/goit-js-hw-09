import * as Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.6.min.css';

// Этот код представляет собой создание и обработку нескольких промисов в соответствии с параметрами, введенными пользователем в форме.Как только все промисы завершатся(успешно или с ошибкой), результаты будут выведены в консоль.
// 1. Находим форму в HTML документе по классу "form".
const form = document.querySelector('.form');

// 2. Добавляем обработчик события "submit" для формы.
form.addEventListener('submit', function (e) {
  // 3. Отменяем стандартное поведение браузера, чтобы страница не перезагружалась при отправке формы.
  e.preventDefault();

  // 4. Получаем значения из полей ввода для первой задержки, шага и количества промисов.
  // используем функцию parseInt(), чтобы преобразовать строку, содержащую значение из поля ввода, в целое число (integer)
  const firstDelay = parseInt(
    document.querySelector('input[name="delay"]').value
  );
  const step = parseInt(document.querySelector('input[name="step"]').value);
  const amount = parseInt(document.querySelector('input[name="amount"]').value);

  // 5. Создаем промисы в цикле в соответствии с введенными параметрами.
  for (let i = 1; i <= amount; i++) {
    // 6. Вычисляем номер создаваемого промиса (позицию) и задержку для этого промиса.
    const position = i;

    // В данном участке кода firstDelay представляет собой первоначальную задержку (задержку для первого промиса),
    // а step представляет собой шаг увеличения задержки для каждого последующего промиса.
    // В этой формуле i представляет номер текущего промиса. Но так как мы начинаем с первого промиса (номер 1), чтобы получить правильную задержку для него, нам нужно вычесть 1. Таким образом, вычитая 1 из i, мы корректируем индексацию, чтобы первый промис имел правильную задержку, а последующие промисы имели правильные интервалы задержек с шагом step.
    const delay = firstDelay + (i - 1) * step;

    // 7. Вызываем функцию createPromise, передавая ей позицию и задержку.
    createPromise(position, delay)
      // 8. Если промис выполняется успешно, выполнится этот блок кода.
      .then(({ position, delay }) => {
        Notiflix.Notify.info(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      // 9. Если промис отклоняется, выполнится этот блок кода.
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
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
