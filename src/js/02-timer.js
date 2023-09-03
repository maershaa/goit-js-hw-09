import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import * as Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.6.min.css';

// для стилизации
const timer = document.querySelector('.timer');
const fields = document.querySelectorAll('.field');
const values = document.querySelectorAll('.value');
const labels = document.querySelectorAll('.label');

// кнопка
const startButton = document.querySelector('[data-start]');

// Получаем элементы с классом "value" и атрибутами data
const daysElement = document.querySelector('.value[data-days]');
const hoursElement = document.querySelector('.value[data-hours]');
const minutesElement = document.querySelector('.value[data-minutes]');
const secondsElement = document.querySelector('.value[data-seconds]');

const input = document.querySelector('#datetime-picker');

flatpickr(input);

startButton.disabled = true;

const date = new Date();

function onChange() {}
onChange();

function onClose(selectedDates) {
  selectedDates.forEach(selectedDate => {
    if (selectedDate.getTime() < Date.now()) {
      Notiflix.Notify.warning('Please choose a date in the future');

      // window.alert('Please choose a date in the future');
    } else {
      startButton.disabled = false;
    }
  });
}

flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  // (callback), который будет выполнен, когда пользователь закроет календарь (например, после выбора даты и времени). Функция принимает аргумент selectedDates, который представляет выбранные пользователем даты и времена.
  onClose,
});

// Для подсчета значений используй готовую функцию convertMs, где ms - разница между конечной и текущей датой в миллисекундах.
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

startButton.addEventListener('click', onClick);

function onClick() {
  const setIntervalId = setInterval(() => {
    const selectedDate = new Date(input.value);
    console.log('selectedDate', selectedDate);

    const currentTime = selectedDate - Date.now();
    console.log(currentTime);

    const final = convertMs(currentTime);
    console.log('final', final);

    daysElement.textContent = addLeadingZero(final.days);
    hoursElement.textContent = addLeadingZero(final.hours);
    minutesElement.textContent = addLeadingZero(final.minutes); //final['minutes'] тоже самое
    secondsElement.textContent = addLeadingZero(final.seconds);

    if (
      daysElement.textContent === '0' &&
      hoursElement.textContent === '0' &&
      minutesElement.textContent === '0' &&
      secondsElement.textContent === '0'
    ) {
      clearInterval(setIntervalId);
    }

    if (!selectedDate) {
      clearInterval(setIntervalId);
    }
  }, 1000);
  startButton.disabled = true;
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
// СТИЛИ
// Применяем стили к элементу .timer
timer.style.display = 'flex';
timer.style.columnGap = '24px';

// Применяем стили к каждому элементу .field
fields.forEach(field => {
  field.style.display = 'flex';
  field.style.flexDirection = 'column';
  field.style.flexWrap = 'wrap';
  field.style.padding = '10px';
  field.style.margin = '8px';
  console.log('field', field);
});

values.forEach(value => {
  // Применяем стили к элементу .value
  value.style.fontWeight = '500';
  value.style.fontSize = '40px';
  console.log('value', value);
});

labels.forEach(label => {
  // Применяем стили к элементу .label
  label.style.textTransform = 'uppercase';
  label.style.fontSize = '24px';
  console.log('label', label);
});
