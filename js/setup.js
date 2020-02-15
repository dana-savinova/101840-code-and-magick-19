'use strict';

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var WIZARD_NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];

var WIZARD_SURNAMES = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];

var COAT_COLORS = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];

var WIZARD_EYES = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
];

var FIREBALL_COLORS = [
  '#ee4830',
  '#30a8ee',
  '#5ce6c0',
  '#e848d5',
  '#e6e848'
];

var WIZARD_NUMBERS = 4;

var setupPopUp = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setupPopUp.querySelector('.setup-close');
var setupIcon = document.querySelector('.setup-open-icon');
var userName = document.querySelector('.setup-user-name');
// изменение параметров волшебника
var wizardSetup = document.querySelector('.setup-wizard');
var wizardCoat = wizardSetup.querySelector('.wizard-coat');
var wizardEyes = wizardSetup.querySelector('.wizard-eyes');
var wizardFireball = document.querySelector('.setup-fireball-wrap');
var wizardCoatInput = document.querySelector('[name="coat-color"]');
var wizardEyesInput = document.querySelector('[name="eyes-color"]');
var wizardFireballInput = document.querySelector('[name="fireball-color"]');

// устанавливает табиндекс для взаимодействия
var addAttribute = function (tagName, attribute, value) {
  tagName.setAttribute(attribute, value);
};

addAttribute(setupIcon, 'tabindex', 0); // для иконки
addAttribute(setupClose, 'tabindex', 0); // для кнопки закрытия окна

// функции для открытия и закрытия попапа
var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE && userName !== document.activeElement) {
    closePopup();
  }
};

var openPopup = function () {
  setupPopUp.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  setupPopUp.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

// показывает блок с настройками
setupOpen.addEventListener('click', function () {
  openPopup();
});

// показывает блок по нажатию на enter
setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

// закрывает блок по клику
setupClose.addEventListener('click', function () {
  closePopup();
});

// закрывает блок по нажатию на интер, когда в фокусе кнопка закрытия
setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

// функция для генерации случайного элемента массива
var randomElement = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

// генерирует массив со случайными волшебниками
var createWizards = function (number, name, surname, coat, eyes) {
  var wizards = [];
  for (var i = 0; i < number; i++) {
    wizards[i] = {
      name: randomElement(name) + ' ' + randomElement(surname),
      coatColor: randomElement(coat),
      eyesColor: randomElement(eyes)
    };
  }

  return wizards;
};

// работаем с блоком похожих волшебников
document.querySelector('.setup-similar').classList.remove('hidden');

var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

// генерируем элемент с волшебником
var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

// вставляем волшебников на свои места
var renderSimilarWizards = function (wizards) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }

  similarListElement.appendChild(fragment);
};

renderSimilarWizards(createWizards(WIZARD_NUMBERS, WIZARD_NAMES, WIZARD_SURNAMES, COAT_COLORS, WIZARD_EYES));

// валидация формы
addAttribute(userName, 'minlength', 2);
addAttribute(userName, 'maxlength', 25);

// добавляет ссылку для обработчика формы
var wizardForm = document.querySelector('.setup-wizard-form');
addAttribute(wizardForm, 'action', 'https://js.dump.academy/code-and-magick');

// функция для смены цвета через заливку
var setElementFill = function (element, color, input) {
  element.style.fill = color;
  input.value = color;
};

//  функция для смены цвета через цвет фона
var setElementBackground = function (element, color, input) {
  element.style.backgroundColor = color;
  input.value = color;
};

// функции для событий смены цвета
var onWizardCoatClick = function () {
  setElementFill(wizardCoat, randomElement(COAT_COLORS), wizardCoatInput);
};

var onWizardEyesClick = function () {
  setElementFill(wizardEyes, randomElement(WIZARD_EYES), wizardEyesInput);
};

var onWizardFireballClick = function () {
  setElementBackground(wizardFireball, randomElement(FIREBALL_COLORS), wizardFireballInput);
};

// запуск функций при клике по части мага
wizardCoat.addEventListener('click', onWizardCoatClick);
wizardEyes.addEventListener('click', onWizardEyesClick);
wizardFireball.addEventListener('click', onWizardFireballClick);
