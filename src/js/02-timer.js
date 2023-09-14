// Импорт библиотек и стилей
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import * as Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.6.min.css';

// Для стилизации элементов таймера
const timer = document.querySelector('.timer');
const fields = document.querySelectorAll('.field');
const values = document.querySelectorAll('.value');
const labels = document.querySelectorAll('.label');

// Кнопка старта
const startButton = document.querySelector('[data-start]');

// Кнопка сброса если можем внести изменения в html
const resetButton = document.querySelector('[data-reset]');

// Кнопка сброса если нельзя внести изменения в html
// const resetButton = document.createElement('button');
// resetButton.type = 'button';
// resetButton.textContent = 'Reset';
// resetButton.dataset.reset = ''; // Добавьте атрибут data-reset
// document.body.insertAdjacentElement('beforeend', resetButton);

// Получение элементов с классом "value" и атрибутами data
const daysElement = document.querySelector('.value[data-days]');
const hoursElement = document.querySelector('.value[data-hours]');
const minutesElement = document.querySelector('.value[data-minutes]');
const secondsElement = document.querySelector('.value[data-seconds]');

const input = document.querySelector('#datetime-picker');

let setIntervalId;

// Инициализация flatpickr
flatpickr(input);

// Начальное отключение кнопки
startButton.disabled = true;

// Создание объекта даты
const date = new Date();

// Функция обработки изменений
// Эта функция вызывается при изменении данных в инпуте. Однако в текущей реализации она не выполняет никакой конкретной логики и может использоваться для дополнительных действий при изменении данных пользователем.
function onChange() {
  // Здесь можно добавить логику при изменении данных в инпуте
}

// Вызов функции onChange
onChange();

// Функция для обработки закрытия календаря
// Эта функция вызывается, когда пользователь закрывает календарь (например, после выбора даты и времени).
// Она принимает аргумент selectedDates, который представляет собой массив выбранных пользователем дат и времени.
// В функции происходит проверка выбранных дат. Если выбранная дата ранее текущего момента времени, выводится предупреждение, и кнопка "Start" отключается. В противном случае кнопка "Start" остается активной.
function onClose(selectedDates) {
  selectedDates.forEach(selectedDate => {
    if (selectedDate.getTime() < Date.now()) {
      // Вывод предупреждения с использованием Notiflix
      Notiflix.Notify.warning('Please choose a date in the future');
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
    }
  });
}

// Инициализация flatpickr с обработчиком onClose
flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose,
});

// Функция для конвертации миллисекунд в дни, часы, минуты и секунды
// Эта функция используется для конвертации временного интервала в миллисекундах в дни, часы, минуты и секунды.
// Она принимает аргумент ms, который представляет разницу между конечной и текущей датой в миллисекундах.
// Функция вычисляет количество дней, часов, минут и секунд в этом интервале и возвращает объект с этими значениями.
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// Обработчик события для кнопки "Start"
startButton.addEventListener('click', onClick);

// Эта функция вызывается при клике на кнопку "Start".
// Внутри функции устанавливается интервал, который каждую секунду обновляет отображение оставшегося времени до выбранной даты.
// Также функция проверяет, если выбранная дата некорректна (например, не выбрана вовсе), то интервал останавливается, и кнопка "Start" отключается.
function onClick() {
  setIntervalId = setInterval(() => {
    const selectedDate = new Date(input.value);

    // Проверка корректности выбранной даты
    if (isNaN(selectedDate.getTime())) {
      clearInterval(setIntervalId);
      startButton.disabled = true;
      return;
    }

    const currentTime = selectedDate - Date.now();
    const final = convertMs(currentTime);

    daysElement.textContent = addLeadingZero(final.days);
    hoursElement.textContent = addLeadingZero(final.hours);
    minutesElement.textContent = addLeadingZero(final.minutes);
    secondsElement.textContent = addLeadingZero(final.seconds);

    if (
      daysElement.textContent <= 0 &&
      hoursElement.textContent <= 0 &&
      minutesElement.textContent <= 0 &&
      secondsElement.textContent <= 0
    ) {
      clearInterval(setIntervalId);
    }

    // Проверка, если выбранная дата некорректна или оставшееся время отрицательно
    if (!selectedDate || currentTime <= 0) {
      clearInterval(setIntervalId);
      startButton.disabled = true;
    }
  }, 1000);

  startButton.disabled = true; // Отключение кнопки "Start"
  input.readOnly = true; // Запрет редактирования поля
  input.value.disabled = true;
  input.disabled = true; // Запретить редактирование поля ввода
}

// Функция для добавления ведущего нуля
// Эта функция используется для форматирования числовых значений, добавляя ведущий ноль, если число меньше 10.
// Она принимает аргумент value, который представляет число для форматирования, и возвращает строку с добавленным ведущим нулем, если это необходимо.
function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

resetButton.addEventListener('click', resetTimer);

// Функция для сброса данных таймера и доступности поля ввода
function resetTimer() {
  clearInterval(setIntervalId); // Остановить таймер, если он активен
  input.value = ''; // Сбросить значение поля ввода
  daysElement.textContent = '00';
  hoursElement.textContent = '00';
  minutesElement.textContent = '00';
  secondsElement.textContent = '00';
  startButton.disabled = true; // Отключить кнопку "Start"
  input.disabled = false; // Сделать поле ввода доступным для выбора новой даты
}

// СТИЛИЗАЦИЯ
// Применение стилей к элементу .timer
timer.style.display = 'flex';
timer.style.columnGap = '24px';

// Применение стилей к каждому элементу .field
fields.forEach(field => {
  field.style.display = 'flex';
  field.style.flexDirection = 'column';
  field.style.flexWrap = 'wrap';
  field.style.padding = '10px';
  field.style.margin = '8px';
});

// Применение стилей к элементам .value
values.forEach(value => {
  value.style.fontWeight = '500';
  value.style.fontSize = '40px';
});

// Применение стилей к элементам .label
labels.forEach(label => {
  label.style.textTransform = 'uppercase';
  label.style.fontSize = '24px';
});
