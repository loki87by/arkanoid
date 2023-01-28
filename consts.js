const height = window.innerHeight;
export const WIDTH = window.innerWidth;
export const HEIGHT = Math.floor(height / 50) * 50;
const point = HEIGHT / 500;
export const BODY = document.querySelector("body");
export const CANVAS = document.querySelector("canvas");
export const CTX = CANVAS.getContext("2d");
export const DATA = document.getElementById("data");
export const SCORE = document.getElementById("score");
export const ARTICLE = document.querySelector("article");
const LIFES = document.getElementById("lifes");
export const POPUP = document.getElementById("popup");
export const BUTTON = document.querySelector("button");

export const BASIC_TIME = 65000;

export const LEVEL1 = [
  [],
  [],
  [],
  [],
  [],
  [],
  ["R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R"],
  ["R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R"],
  ["O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O"],
  ["O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O"],
  ["G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G"],
  ["G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G"],
  ["Y", "Y", "Y", "Y", "Y", "Y", "Y", "Y", "Y", "Y", "Y", "Y", "Y", "Y"],
  ["Y", "Y", "Y", "Y", "Y", "Y", "Y", "Y", "Y", "Y", "Y", "Y", "Y", "Y"],
];

export const COLORS = {
  R: "red",
  O: "orange",
  G: "green",
  Y: "yellow",
};
export const GET_SIZE = (num) => {
  return Math.floor(num * point);
};

export const COLLIDES = (obj1, obj2) => {
  return (
    obj1.x < obj2.x + obj2.width &&
    obj1.x + obj1.width > obj2.x &&
    obj1.y < obj2.y + obj2.height &&
    obj1.y + obj1.height > obj2.y
  );
};

export const SET_LIVES = (lifes) => {
  Array.from(LIFES.children)
    .slice(1)
    .forEach((img) => img.remove());
  for (let i = 0; i < lifes; i++) {
    const svg = LIFES.children[0].content.querySelector("img").cloneNode(true);
    LIFES.appendChild(svg);
  }
};

export const SHOW_POPUP = (title, text, func) => {
  POPUP.children[0].textContent = title;
  BUTTON.textContent = text;
  BUTTON.addEventListener("click", func);
};

const findAim = (array, coords) => {
  const index = array.findIndex((brick) => {
    if (brick.x === coords.x && brick.y === coords.y) {
      return brick;
    }
  });

  if (index >= 0) {
    array.splice(index, 1);
  }
};

export const DETONATE = (array, brick, vertical, horizontal) => {
  const targets = [
    { x: brick.x, y: brick.y },
    // ближние точки
    { x: brick.x - horizontal, y: brick.y },
    { x: brick.x, y: brick.y - vertical },
    { x: brick.x + horizontal, y: brick.y },
    { x: brick.x, y: brick.y + vertical },
    // дальние точки
    { x: brick.x - horizontal * 2, y: brick.y },
    { x: brick.x, y: brick.y - vertical * 2 },
    { x: brick.x + horizontal * 2, y: brick.y },
    { x: brick.x, y: brick.y + vertical * 2 },
    // перекрестия
    { x: brick.x - horizontal, y: brick.y - vertical },
    { x: brick.x - horizontal, y: brick.y + vertical },
    { x: brick.x + horizontal, y: brick.y + vertical },
    { x: brick.x + horizontal, y: brick.y - vertical },
  ];
  targets.forEach((target) => {
    findAim(array, target);
  });
};

export const GET_PRIZE = (x, y, w, color) => {
  CTX.fillStyle = color;
  CTX.beginPath();
  CTX.arc(x, y, w, 0, 2 * Math.PI);
  CTX.fill();
  CTX.fillStyle = "violet";
  CTX.beginPath();
  CTX.moveTo(x - w - 1 + w * 1.3, y - w - 1.33 * w + w * 0.9);
  CTX.bezierCurveTo(
    x - w - 1 + w * 0.3,
    y - w - 1.33 * w + w * 0.93,
    x - w - 1 + w * 1.27,
    y - w - 1.33 * w + w * 0.97,
    x - w - 1 + w * 1.27,
    y - w - 1.33 * w + w * 1
  );
  CTX.bezierCurveTo(
    x - w - 1 + w * 1.2,
    y - w - 1.33 * w + w * 1.07,
    x - w - 1 + w * 1.17,
    y - w - 1.33 * w + w * 1.1,
    x - w - 1 + w * 1.1,
    y - w - 1.33 * w + w * 1.1
  );
  CTX.bezierCurveTo(
    x - w - 1 + w * 1.07,
    y - w - 1.33 * w + w * 1.1,
    x - w - 1 + w * 1.03,
    y - w - 1.33 * w + w * 1.1,
    x - w - 1 + w * 1.03,
    y - w - 1.33 * w + w * 1.1
  );
  CTX.bezierCurveTo(
    x - w - 1 + w * 1,
    y - w - 1.33 * w + w * 1.1,
    x - w - 1 + w * 1,
    y - w - 1.33 * w + w * 1.1,
    x - w - 1 + w * 0.97,
    y - w - 1.33 * w + w * 1.1
  );
  CTX.bezierCurveTo(
    x - w - 1 + w * 0.9,
    y - w - 1.33 * w + w * 1.1,
    x - w - 1 + w * 0.83,
    y - w - 1.33 * w + w * 1.07,
    x - w - 1 + w * 0.8,
    y - w - 1.33 * w + w * 1
  );
  CTX.bezierCurveTo(
    x - w - 1 + w * 0.77,
    y - w - 1.33 * w + w * 0.97,
    x - w - 1 + w * 0.73,
    y - w - 1.33 * w + w * 0.93,
    x - w - 1 + w * 0.73,
    y - w - 1.33 * w + w * 0.9
  );
  CTX.bezierCurveTo(
    x - w - 1 + w * 0.73,
    y - w - 1.33 * w + w * 0.87,
    x - w - 1 + w * 0.77,
    y - w - 1.33 * w + w * 0.8,
    x - w - 1 + w * 0.8,
    y - w - 1.33 * w + w * 0.77
  );
  CTX.bezierCurveTo(
    x - w - 1 + w * 0.83,
    y - w - 1.33 * w + w * 0.7,
    x - w - 1 + w * 0.93,
    y - w - 1.33 * w + w * 0.67,
    x - w - 1 + w * 1.03,
    y - w - 1.33 * w + w * 0.67
  );
  CTX.bezierCurveTo(
    x - w - 1 + w * 1.13,
    y - w - 1.33 * w + w * 0.67,
    x - w - 1 + w * 1.2,
    y - w - 1.33 * w + w * 0.7,
    x - w - 1 + w * 1.27,
    y - w - 1.33 * w + w * 0.77
  );
  CTX.bezierCurveTo(
    x - w - 1 + w * 1.3,
    y - w - 1.33 * w + w * 0.8,
    x - w - 1 + w * 1.3,
    y - w - 1.33 * w + w * 0.87,
    x - w - 1 + w * 1.3,
    y - w - 1.33 * w + w * 0.9
  );
  CTX.moveTo(x - w - 1 + w * 0.73, y - w - 1.33 * w + w * 0.77);
  CTX.lineTo(x - w - 1 + w * 0.37, y - w - 1.33 * w + w * 0.67);
  CTX.bezierCurveTo(
    x - w - 1 + w * 0.27,
    y - w - 1.33 * w + w * 0.63,
    x - w - 1 + w * 0.17,
    y - w - 1.33 * w + w * 0.73,
    x - w - 1 + w * 0.17,
    y - w - 1.33 * w + w * 0.83
  );
  CTX.lineTo(x - w - 1 + w * 0.17, x - w - 1 + w * 1);
  CTX.bezierCurveTo(
    x - w - 1 + w * 0.17,
    y - w - 1.33 * w + w * 1.1,
    x - w - 1 + w * 0.27,
    y - w - 1.33 * w + w * 1.17,
    x - w - 1 + w * 0.37,
    y - w - 1.33 * w + w * 1.13
  );
  CTX.lineTo(x - w - 1 + w * 0.7, y - w - 1.33 * w + w * 1.3);
  CTX.lineTo(x - w - 1 + w * 0.77, y - w - 1.33 * w + w * 1);
  CTX.lineTo(x - w - 1 + w * 0.8, y - w - 1.33 * w + w * 1);
  CTX.bezierCurveTo(
    x - w - 1 + w * 0.77,
    y - w - 1.33 * w + w * 0.97,
    x - w - 1 + w * 0.73,
    y - w - 1.33 * w + w * 0.93,
    x - w - 1 + w * 0.73,
    y - w - 1.33 * w + w * 0.9
  );
  CTX.bezierCurveTo(
    x - w - 1 + w * 0.73,
    y - w - 1.33 * w + w * 0.87,
    x - w - 1 + w * 0.77,
    y - w - 1.33 * w + w * 0.8,
    x - w - 1 + w * 0.8,
    y - w - 1.33 * w + w * 0.77
  );
  CTX.lineTo(x - w - 1 + w * 0.73, y - w - 1.33 * w + w * 0.77);
  CTX.moveTo(x - w - 1 + w * 1.37, y - w - 1.33 * w + w * 1.07);
  CTX.lineTo(x - w - 1 + w * 1.27, y - w - 1.33 * w + w * 1);
  CTX.lineTo(x - w - 1 + w * 1.27, y - w - 1.33 * w + w * 1);
  CTX.bezierCurveTo(
    x - w - 1 + w * 1.2,
    y - w - 1.33 * w + w * 1.07,
    x - w - 1 + w * 1.17,
    y - w - 1.33 * w + w * 1.1,
    x - w - 1 + w * 1.1,
    y - w - 1.33 * w + w * 1.1
  );
  CTX.lineTo(x - w - 1 + w * 1.1, y - w - 1.33 * w + w * 1.1);
  CTX.bezierCurveTo(
    x - w - 1 + w * 1.1,
    y - w - 1.33 * w + w * 1.13,
    x - w - 1 + w * 1.1,
    y - w - 1.33 * w + w * 1.13,
    x - w - 1 + w * 1.1,
    y - w - 1.33 * w + w * 1.13
  );
  CTX.lineTo(x - w - 1 + w * 1.5, y - w - 1.33 * w + w * 1.53);
  CTX.bezierCurveTo(
    x - w - 1 + w * 1.53,
    y - w - 1.33 * w + w * 1.57,
    x - w - 1 + w * 1.6,
    y - w - 1.33 * w + w * 1.53,
    x - w - 1 + w * 1.6,
    y - w - 1.33 * w + w * 1.5
  );
  CTX.bezierCurveTo(
    x - w - 1 + w * 1.6,
    y - w - 1.33 * w + w * 1.5,
    x - w - 1 + w * 1.6,
    y - w - 1.33 * w + w * 1.47,
    x - w - 1 + w * 1.63,
    y - w - 1.33 * w + w * 1.47
  );
  CTX.lineTo(x - w - 1 + w * 1.63, y - w - 1.33 * w + w * 1.47);
  CTX.bezierCurveTo(
    x - w - 1 + w * 1.7,
    y - w - 1.33 * w + w * 1.47,
    x - w - 1 + w * 1.73,
    y - w - 1.33 * w + w * 1.4,
    x - w - 1 + w * 1.67,
    y - w - 1.33 * w + w * 1.37
  );
  CTX.lineTo(x - w - 1 + w * 1.37, y - w - 1.33 * w + w * 1.07);
  CTX.moveTo(x - w - 1 + w * 1.67, y - w - 1.33 * w + w * 0.67);
  CTX.lineTo(x - w - 1 + w * 1.3, y - w - 1.33 * w + w * 0.77);
  CTX.bezierCurveTo(
    x - w - 1 + w * 1.3,
    y - w - 1.33 * w + w * 0.77,
    x - w - 1 + w * 1.3,
    y - w - 1.33 * w + w * 0.77,
    x - w - 1 + w * 1.27,
    y - w - 1.33 * w + w * 0.77
  );
  CTX.lineTo(x - w - 1 + w * 1.27, y - w - 1.33 * w + w * 0.77);
  CTX.bezierCurveTo(
    x - w - 1 + w * 1.3,
    y - w - 1.33 * w + w * 0.8,
    x - w - 1 + w * 1.3,
    y - w - 1.33 * w + w * 0.87,
    x - w - 1 + w * 1.3,
    y - w - 1.33 * w + w * 0.9
  );
  CTX.bezierCurveTo(
    x - w - 1 + w * 1.3,
    y - w - 1.33 * w + w * 0.93,
    x - w - 1 + w * 1.27,
    y - w - 1.33 * w + w * 0.97,
    x - w - 1 + w * 1.27,
    y - w - 1.33 * w + w * 1
  );
  CTX.lineTo(x - w - 1 + w * 1.27, y - w - 1.33 * w + w * 1);
  CTX.lineTo(x - w - 1 + w * 1.37, y - w - 1.33 * w + w * 1.07);
  CTX.lineTo(x - w - 1 + w * 1.67, y - w - 1.33 * w + w * 1.13);
  CTX.bezierCurveTo(
    x - w - 1 + w * 1.77,
    y - w - 1.33 * w + w * 1.17,
    x - w - 1 + w * 1.9,
    y - w - 1.33 * w + w * 1.1,
    x - w - 1 + w * 1.9,
    y - w - 1.33 * w + w * 1
  );
  CTX.lineTo(x - w - 1 + w * 1.9, y - w - 1.33 * w + w * 0.83);
  CTX.bezierCurveTo(
    x - w - 1 + w * 1.9,
    y - w - 1.33 * w + w * 0.73,
    x - w - 1 + w * 1.8,
    y - w - 1.33 * w + w * 0.63,
    x - w - 1 + w * 1.67,
    y - w - 1.33 * w + w * 0.67
  );
  CTX.moveTo(x - w - 1 + w * 0.67, y - w - 1.33 * w + w * 1.07);
  CTX.lineTo(x - w - 1 + w * 0.37, y - w - 1.33 * w + w * 1.37);
  CTX.bezierCurveTo(
    x - w - 1 + w * 0.33,
    y - w - 1.33 * w + w * 1.4,
    x - w - 1 + w * 0.37,
    y - w - 1.33 * w + w * 1.47,
    x - w - 1 + w * 0.4,
    y - w - 1.33 * w + w * 1.47
  );
  CTX.lineTo(x - w - 1 + w * 0.43, y - w - 1.33 * w + w * 1.47);
  CTX.bezierCurveTo(
    x - w - 1 + w * 0.47,
    y - w - 1.33 * w + w * 1.47,
    x - w - 1 + w * 0.47,
    y - w - 1.33 * w + w * 1.5,
    x - w - 1 + w * 0.47,
    y - w - 1.33 * w + w * 1.5
  );
  CTX.bezierCurveTo(
    x - w - 1 + w * 0.47,
    y - w - 1.33 * w + w * 1.53,
    x - w - 1 + w * 0.53,
    y - w - 1.33 * w + w * 1.57,
    x - w - 1 + w * 0.53,
    y - w - 1.33 * w + w * 1.53
  );
  CTX.lineTo(x - w - 1 + w * 0.97, y - w - 1.33 * w + w * 1.13);
  CTX.lineTo(x - w - 1 + w * 0.97, y - w - 1.33 * w + w * 1.1);
  CTX.bezierCurveTo(
    x - w - 1 + w * 0.9,
    y - w - 1.33 * w + w * 1.1,
    x - w - 1 + w * 0.83,
    y - w - 1.33 * w + w * 1.07,
    x - w - 1 + w * 0.8,
    y - w - 1.33 * w + w * 1
  );
  CTX.lineTo(x - w - 1 + w * 0.77, y - w - 1.33 * w + w * 1);
  CTX.lineTo(x - w - 1 + w * 0.7, y - w - 1.33 * w + w * 1.03);
  CTX.lineTo(x - w - 1 + w * 0.67, y - w - 1.33 * w + w * 1.07);
  CTX.closePath();
  CTX.stroke();
  CTX.fill();
};
