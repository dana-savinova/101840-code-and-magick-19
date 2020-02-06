'use strict';
var CLOUD = {
  width: 420,
  height: 270,
};

var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_GAP = 10;

var FONT_GAP = 20;
var FONT_SIZE = 16;

var BAR_HEIGHT = 150;
var BAR_COL = 40;
var BAR_GAP = 50;

// рендеринг облака
var renderCloud = function (ctx, x, y, color, border) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD.width, CLOUD.height);
  ctx.strokeStyle = border;
  ctx.strokeRect(x, y, CLOUD.width, CLOUD.height);
};

// рендеринга текста на облаке
var renderText = function (ctx, text, color, gap) {
  ctx.fillStyle = color;
  ctx.font = FONT_SIZE + 'px PT Mono';
  ctx.fillText(
      text,
      CLOUD_X + FONT_GAP,
      CLOUD_Y + FONT_GAP * gap
  );
};

// функция для поиска максимального элемента
var getMaxElement = function (arr) {
  var maxElement = arr[0];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

// гистограмма времён участников
var histogram = function (ctx, users, score) {
  var maxTime = getMaxElement(score);

  for (var i = 0; i < users.length; i++) {
    ctx.fillStyle = '#000';
    var time = Math.round(score[i]);
    ctx.fillText(
        time,
        CLOUD_X + BAR_GAP + (BAR_COL + BAR_GAP) * i,
        CLOUD.height - FONT_SIZE - FONT_GAP * 1.5 - ((BAR_HEIGHT * time) / maxTime)
    );
    ctx.fillText(
        users[i],
        CLOUD_X + BAR_GAP + (BAR_COL + BAR_GAP) * i,
        CLOUD.height - CLOUD_Y
    );

    if (users[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'hsl(234.5, ' + Math.round(Math.random() * 100) + '%, 50%)'; // случайный синий цвет
    }

    ctx.fillRect(
        CLOUD_X + BAR_GAP + (BAR_COL + BAR_GAP) * i,
        CLOUD.height - FONT_SIZE - FONT_GAP - ((BAR_HEIGHT * time) / maxTime),
        BAR_COL,
        (BAR_HEIGHT * time) / maxTime
    );
  }
};

window.renderStatistics = function (ctx, players, times) {
  // облако
  renderCloud(ctx, CLOUD_X + CLOUD_GAP, CLOUD_Y + CLOUD_GAP, 'rgba(0, 0, 0, 0.7)', '#33459c');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff', '#33459c');

  // отрисовка текста на облаке
  renderText(ctx, 'Ура! Вы победили', '#000', 1);
  renderText(ctx, 'Список результатов:', '#000', 2);

  // вывод гистограммы
  histogram(ctx, players, times);
};
