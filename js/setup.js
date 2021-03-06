'use strict';

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

var WIZARD_NUMBERS = 4;

var profileButton = document.querySelector('.setup-open');
var setupPopUp = document.querySelector('.setup');
var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

// показывает блок с настройками
profileButton.addEventListener('click', function () {
  if (setupPopUp.classList.contains('hidden')) {
    setupPopUp.classList.remove('hidden');
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
