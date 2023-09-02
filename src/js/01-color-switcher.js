// ===== Создаем интерактивное веб-приложение, которое изменяет цвет
//                  фона при нажатии на кнопки.           ===================== //

// В этой части кода вы получаете ссылки на кнопки "Start" и "Stop" с помощью метода document.querySelector, используя атрибут [data-start] и [data-stop] для выбора элементов по атрибутам data. Также вы получаете ссылку на document.body, чтобы позже изменять цвет его фона.
const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');
const body = document.body;

// Создание переменной для хранения интервала:
let timerId = null;

//Функция генерации случайного цвета:
// В этой функции вы создаете случайный шестнадцатеричный цвет, который будет использоваться как цвет фона для элемента body.
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

// Вы добавляете обработчики событий для кнопок "Start" и "Stop". Когда эти кнопки будут нажаты, будут вызываться соответствующие функции.
startButton.addEventListener('click', onStartButtonClick);
stopButton.addEventListener('click', onStopButtonClick);

// Эта функция запускается при клике на кнопку "Start". Если интервал еще не запущен (!timerId), кнопка "Start" блокируется, и запускается интервал, который меняет цвет фона каждую секунду.
function onStartButtonClick() {
  if (!timerId) {
    startButton.disabled = true;
  }
  timerId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

// Эта функция вызывается при клике на кнопку "Stop". Она останавливает интервал (если он был запущен), сбрасывает значение timerId и разблокирует кнопку "Start".
function onStopButtonClick() {
  clearInterval(timerId);
  timerId = null;
  startButton.disabled = false;
}

// cтили
// Задание размера кнопкам
startButton.style.width = '150px';
startButton.style.height = '50px';

stopButton.style.width = '150px';
stopButton.style.height = '50px';

// задание размера тексту кнопок
stopButton.style.fontSize = '24px';
startButton.style.fontSize = '24px';

// Расположение кнопок по центру экрана
startButton.style.position = 'absolute';
startButton.style.top = '50%';
startButton.style.left = '40%';
startButton.style.transform = 'translate(-50%, -50%)';

stopButton.style.position = 'absolute';
stopButton.style.top = '50%';
stopButton.style.right = '40%';
stopButton.style.transform = 'translate(-50%, -50%)';
