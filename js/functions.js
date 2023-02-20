const checkStringLength = (string, desiredLength) => string.length <= desiredLength;

const checkForPalindrome = (string) => {
  const newString = string.replaceAll(' ','').toLowerCase();
  return newString === newString.split('').reverse().join('');
};

const extractNumbers = (string) => {
  const newString = String(string);
  const result = newString.split('').filter((element) => !isNaN(parseInt(element, 10))).join('');
  return result ? Number(result) : NaN;
};

const additionOfString = (string, desiredLength, addedString) => {
  if (string.length < desiredLength) {
    while (string.length < desiredLength) {
      addedString = addedString.slice(0, desiredLength - string.length);
      string = `${addedString}${string}`;
    }
  }
  return string;
};


//Тесты
/* eslint-disable no-console */
console.log('Функция для проверки длины строки');
console.log(checkStringLength('проверяемая строка', 20)); // Результат: true - строка проходит по длине
console.log(checkStringLength('проверяемая строка', 18)); // Результат: true - строка проходит по длине
console.log(checkStringLength('проверяемая строка', 10)); // Результат: false — строка не проходит

console.log('Функция для проверки, является ли строка палиндромом');
console.log(checkForPalindrome('топот')); // Результат: true - строка является палиндромом
console.log(checkForPalindrome('ДовОд')); // Результат: true - несмотря на разный регистр, тоже палиндром
console.log(checkForPalindrome('Кекс')); // Результат: false - это не палиндром
console.log(checkForPalindrome('Лёша на полке клопа нашёл ')); // Результат: true - это палиндром

console.log('Функция, которая принимает строку, извлекает содержащиеся в ней цифры от 0 до 9 и возвращает их в виде целого положительного числа');
console.log(extractNumbers('2023 год')); // Результат: число 2023
console.log(extractNumbers('ECMAScript 2022')); // Результат: число 2022
console.log(extractNumbers('1 кефир, 0.5 батона')); // Результат: число 105
console.log(extractNumbers('а я томат')); // Результат: NaN
console.log(extractNumbers(2023)); // Результат: число 2023
console.log(extractNumbers(-1)); // Результат: число 1
console.log(extractNumbers(1.5)); // Результат: число 15

console.log('Функция, которая принимает три параметра..........');
console.log(additionOfString('1', 2, '0')); // Результат: строка '01'
console.log(additionOfString('1', 4, '0')); // Результат: строка '0001'
console.log(additionOfString('q', 4, 'werty')); // Результат: строка 'werq'
console.log(additionOfString('q', 4, 'we')); // Результат: строка 'wweq'
console.log(additionOfString('qwerty', 4, '0')); // Результат: строка 'qwerty'
