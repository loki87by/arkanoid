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

export const BONUSES = [
  "longPaddle",
  "berserk",
  "slowDown",
  "backup",
  "addLife",
  "auto",
  "grab",
  "bomb",
  "doubleScore",
];

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
