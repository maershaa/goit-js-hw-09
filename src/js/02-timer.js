import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const timer = document.querySelector('.timer');
// console.log(timer);
const fields = document.querySelectorAll('.field');
// console.log('fields', fields);

const values = document.querySelectorAll('.value');
// console.log('values', values);

const labels = document.querySelectorAll('.label');
// console.log('labels', labels);

const startButton = document.querySelector('[data-start]');
// console.log('startButton', startButton);

const datepicker = flatpickr('#datetime-picker');
// console.log('flatpickr', flatpickr);

onChange();

const date = new Date();
// конечная дата
let selectedDates;
console.log('selectedDates', selectedDates);

// текущая дата
const currentDate = date.getTime();
console.log(convertMs(currentDate));

function onChange() {
  startButton.isActive = false;
}
function onClose(selectedDates) {
  selectedDates.forEach(selectedDate => {
    if (selectedDate.getTime() < Date.now()) {
      window.alert('Please choose a date in the future');
    } else {
      startButton.isActive = true;
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
console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

startButton.addEventListener('click', onClick);

function onClick() {
  const id = setInterval(() => {
    result -= 1;
    timer.textContent = result;
    if (!result) {
      clearInterval(id);
    }
  }, 1000);
}

function addLeadingZero(value) {
  padStart();
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
