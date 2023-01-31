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

export const LEVELS = [
  [
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
    ["Y", "Y", "Y", "Y", "Y", "Y", "Y", "Y", "Y", "Y", "Y", "Y", "Y", "Y"],
    ["Y", "Y", "Y", "Y", "Y", "Y", "Y", "Y", "Y", "Y", "Y", "Y", "Y", "Y"],
    ["G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G"],
    ["G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G"],
  ],
  [
    [],
    [],
    [],
    ["R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R"],
    ["R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R"],
    ["R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R"],
    [],
    ["O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O"],
    ["O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O"],
    [],
    ["Y", "Y", "Y", "Y", "Y", "Y", "Y", "Y", "Y", "Y", "Y", "Y", "Y", "Y"],
    [],
    ["G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G"],
    ["G", "B", "G", "B", "G", "B", "G", "B", "G", "B", "G", "B", "G", "B"],
  ],
  [
    ["", "R", "", "R", "", "R", "", "R", "", "R", "", "R", "", "R"],
    ["O", "", "O", "", "O", "", "O", "", "O", "", "O", "", "O", ""],
    ["", "Y", "", "Y", "", "Y", "", "Y", "", "Y", "", "Y", "", "Y"],
    ["G", "", "G", "", "G", "", "G", "", "G", "", "G", "", "G", ""],
    ["", "C", "", "C", "", "C", "", "C", "", "C", "", "C", "", "C"],
    ["B", "", "B", "", "B", "", "B", "", "B", "", "B", "", "B", ""],
    ["", "P", "", "P", "", "P", "", "P", "", "P", "", "P", "", "P"],
    ["V", "", "V", "", "V", "", "V", "", "V", "", "V", "", "V", ""],
    ["", "P", "", "P", "", "P", "", "P", "", "P", "", "P", "", "P"],
    ["B", "", "B", "", "B", "", "B", "", "B", "", "B", "", "B", ""],
    ["", "C", "", "C", "", "C", "", "C", "", "C", "", "C", "", "C"],
    ["G", "", "G", "", "G", "", "G", "", "G", "", "G", "", "G", ""],
    ["", "Y", "", "Y", "", "Y", "", "Y", "", "Y", "", "Y", "", "Y"],
    ["O", "", "O", "", "O", "", "O", "", "O", "", "O", "", "O", ""],
    ["", "R", "", "R", "", "R", "", "R", "", "R", "", "R", "", "R"],
  ],
];

export const COLORS = {
  R: "red",
  O: "orange",
  Y: "yellow",
  G: "green",
  C: "cyan",
  B: "blue",
  P: "pink",
  V: "violet",
};

export const NEW_RANDOM_LEWEL = (num) => {
  const colors = Object.keys(COLORS);
  colors.push("");
  const lastLen = LEVELS[LEVELS.length - 1].length;
  let limit = lastLen;
  const res = []

  if ((lastLen + num / 2) % num === 0) {
    limit++;
  }

  for (let r = 0; r < limit; r++) {
    const half = [];
    for (let i = 0; i < 7; i++) {
      half.push(colors[Math.floor(Math.random() * colors.length)]);
    }
    const mirror = half.slice().reverse();
    let row

    if((num * num - r) % 2 === 0) {
      row = [...mirror, ...half]
    } else {
      row = [...half, ...mirror]
    }
    res.push(row)
  }
  console.log(res)
  LEVELS.push(res)
};

export const BONUSES = [
  "auto",
  "bomb",
  "doubleScore",
  "grab",
  "life",
  "rise",
  "slowDown",
  "wide",
  "up",
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

export const GET_PRIZE = (x, y, w, color, name) => {
  CTX.fillStyle = color;
  CTX.arc(x, y - 0.3 * w, w, 0, 2 * Math.PI);
  CTX.fill();
  CTX.fillStyle = "darkmagenta";
  CTX.beginPath();
  CTX.moveTo(x - 1 + w * 0.3, y - 1.43 * w);
  CTX.bezierCurveTo(
    x - 1 + w * 0.3,
    y - 1.4 * w,
    x - 1 + w * 0.27,
    y - 1.4 * w,
    x - 1 + w * 0.27,
    y - 1.33 * w
  );
  CTX.bezierCurveTo(
    x - 1 + w * 0.2,
    y - 1.27 * w,
    x - 1 + w * 0.17,
    y - 1.43 * w,
    x - 1 + w * 0.1,
    y - 1.43 * w
  );
  CTX.bezierCurveTo(
    x - 1 + w * 0.07,
    y - 1.43 * w,
    x - 1 + w * 0.03,
    y - 1.43 * w,
    x - 1 + w * 0.03,
    y - 1.43 * w
  );
  CTX.bezierCurveTo(
    x - 1,
    y - 1.43 * w,
    x - 1,
    y - 1.43 * w,
    x - 1 - w * 0.03,
    y - 1.43 * w
  );
  CTX.bezierCurveTo(
    x - 1 - w * 0.1,
    y - 1.43 * w,
    x - 1 - w * 0.17,
    y - 1.27 * w,
    x - 1 - w * 0.2,
    y - 1.33 * w
  );
  CTX.bezierCurveTo(
    x - 1 - 0.23 * w,
    y - 1.36 * w,
    x - 1 - 0.27 * w,
    y - 1.4 * w,
    x - 1 - 0.27 * w,
    y - 1.43 * w
  );
  CTX.bezierCurveTo(
    x - 1 - 0.27 * w,
    y - 1.46 * w,
    x - 1 - 0.23 * w,
    y - 1.53 * w,
    x - 1 - 0.2 * w,
    y - 1.56 * w
  );
  CTX.bezierCurveTo(
    x - 1 - 0.17 * w,
    y - 1.63 * w,
    x - 1 - 0.07 * w,
    y - 1.66 * w,
    x - 1 + 0.03 * w,
    y - 1.66 * w
  );
  CTX.bezierCurveTo(
    x - 1 + 0.13 * w,
    y - 1.66 * w,
    x - 1 + 0.2 * w,
    y - 1.63 * w,
    x - 1 + 0.27 * w,
    y - 1.56 * w
  );
  CTX.bezierCurveTo(
    x - 1 + 0.3 * w,
    y - 1.53 * w,
    x - 1 + 0.3 * w,
    y - 1.46 * w,
    x - 1 + 0.3 * w,
    y - 1.43 * w
  );
  CTX.closePath();
  CTX.fill();
  CTX.beginPath();
  CTX.moveTo(x - 1 - 0.27 * w, y - 1.56 * w);
  CTX.lineTo(x - 1 - 0.73 * w, y - 1.7 * w);
  CTX.bezierCurveTo(
    x - 1 - 0.73 * w,
    y - 1.7 * w,
    x - 1 - 0.83 * w,
    y - 1.6 * w,
    x - 1 - 0.83 * w,
    y - 1.5 * w
  );
  CTX.lineTo(x - 1 - 0.83 * w, y - 1.33 * w);
  CTX.bezierCurveTo(
    x - 1 - 0.83 * w,
    y - 1.23 * w,
    x - 1 - 0.73 * w,
    y - 1.16 * w,
    x - 1 - 0.67 * w,
    y - 1.2 * w
  );
  CTX.lineTo(x - 1 - 0.3 * w, y - 1.3 * w);
  CTX.lineTo(x - 1 - 0.23 * w, y - 1.33 * w);
  CTX.lineTo(x - 1 - 0.2 * w, y - 1.33 * w);
  CTX.bezierCurveTo(
    x - 1 - 0.23 * w,
    y - 1.36 * w,
    x - 1 - 0.27 * w,
    y - 1.4 * w,
    x - 1 - 0.27 * w,
    y - 1.43 * w
  );
  CTX.bezierCurveTo(
    x - 1 - 0.27 * w,
    y - 1.46 * w,
    x - 1 - 0.23 * w,
    y - 1.53 * w,
    x - 1 - 0.2 * w,
    y - 1.56 * w
  );
  CTX.lineTo(x - 1 - 0.27 * w, y - 1.56 * w);
  CTX.closePath();
  CTX.fill();
  CTX.beginPath();
  CTX.moveTo(x - 1 + 0.37 * w, y - 1.26 * w);
  CTX.lineTo(x - 1 + 0.27 * w, y - 1.33 * w);
  CTX.bezierCurveTo(
    x - 1 + 0.2 * w,
    y - 1.26 * w,
    x - 1 + 0.17 * w,
    y - 1.23 * w,
    x - 1 + 0.1 * w,
    y - 1.23 * w
  );
  CTX.lineTo(x - 1 + 0.1 * w, y - 1.23 * w);
  CTX.bezierCurveTo(
    x - 1 + 0.1 * w,
    y - 1.2 * w,
    x - 1 + 0.1 * w,
    y - 1.2 * w,
    x - 1 + 0.1 * w,
    y - 1.2 * w
  );
  CTX.lineTo(x - 1 + 0.5 * w, y - 0.8 * w);
  CTX.bezierCurveTo(
    x - 1 + 0.53 * w,
    y - 0.76 * w,
    x - 1 + 0.6 * w,
    y - 0.8 * w,
    x - 1 + 0.6 * w,
    y - 0.83 * w
  );
  CTX.bezierCurveTo(
    x - 1 + 0.6 * w,
    y - 0.83 * w,
    x - 1 + 0.6 * w,
    y - 0.86 * w,
    x - 1 + 0.63 * w,
    y - 0.86 * w
  );
  CTX.lineTo(x - 1 + 0.63 * w, y - 0.86 * w);
  CTX.bezierCurveTo(
    x - 1 + 0.7 * w,
    y - 0.86 * w,
    x - 1 + 0.73 * w,
    y - 0.93 * w,
    x - 1 + 0.67 * w,
    y - 0.96 * w
  );
  CTX.lineTo(x - 1 + 0.37 * w, y - 1.26 * w);
  CTX.closePath();
  CTX.fill();
  CTX.beginPath();
  CTX.moveTo(x - 1 + 0.67 * w, y - 1.66 * w);
  CTX.lineTo(x - 1 + 0.3 * w, y - 1.56 * w);
  CTX.bezierCurveTo(
    x - 1 + 0.3 * w,
    y - 1.56 * w,
    x - 1 + 0.3 * w,
    y - 1.56 * w,
    x - 1 + 0.27 * w,
    y - 1.56 * w
  );
  CTX.lineTo(x - 1 + 0.27 * w, y - 1.56 * w);
  CTX.bezierCurveTo(
    x - 1 + 0.3 * w,
    y - 1.53 * w,
    x - 1 + 0.3 * w,
    y - 1.46 * w,
    x - 1 + 0.3 * w,
    y - 1.43 * w
  );
  CTX.bezierCurveTo(
    x - 1 + 0.3 * w,
    y - 1.4 * w,
    x - 1 + 0.27 * w,
    y - 1.36 * w,
    x - 1 + 0.27 * w,
    y - 1.33 * w
  );
  CTX.lineTo(x - 1 + 0.27 * w, y - 1.33 * w);
  CTX.lineTo(x - 1 + 0.37 * w, y - 1.26 * w);
  CTX.lineTo(x - 1 + 0.67 * w, y - 1.2 * w);
  CTX.bezierCurveTo(
    x - 1 + 0.77 * w,
    y - 1.16 * w,
    x - 1 + 0.9 * w,
    y - 1.23 * w,
    x - 1 + 0.9 * w,
    y - 1.33 * w
  );
  CTX.lineTo(x - 1 + 0.9 * w, y - 1.5 * w);
  CTX.bezierCurveTo(
    x - 1 + 0.9 * w,
    y - 1.6 * w,
    x - 1 + 0.8 * w,
    y - 1.7 * w,
    x - 1 + 0.67 * w,
    y - 1.66 * w
  );
  CTX.closePath();
  CTX.fill();
  CTX.beginPath();
  CTX.moveTo(x - 1 - 0.33 * w, y - 1.26 * w);
  CTX.lineTo(x - 1 - 0.63 * w, y - 0.96 * w);
  CTX.bezierCurveTo(
    x - 1 - 0.67 * w,
    y - 0.93 * w,
    x - 1 - 0.63 * w,
    y - 0.86 * w,
    x - 1 - 0.6 * w,
    y - 0.86 * w
  );
  CTX.lineTo(x - 1 - 0.57 * w, y - 0.86 * w);
  CTX.bezierCurveTo(
    x - 1 - 0.53 * w,
    y - 0.86 * w,
    x - 1 - 0.53 * w,
    y - 0.83 * w,
    x - 1 - 0.53 * w,
    y - 0.83 * w
  );
  CTX.bezierCurveTo(
    x - 1 - 0.53 * w,
    y - 0.8 * w,
    x - 1 - 0.47 * w,
    y - 0.76 * w,
    x - 1 - 0.47 * w,
    y - 0.8 * w
  );
  CTX.lineTo(x - 1 - 0.03 * w, y - 1.2 * w);
  CTX.lineTo(x - 1 - 0.03 * w, y - 1.23 * w);
  CTX.bezierCurveTo(
    x - 1 - 0.1 * w,
    y - 1.23 * w,
    x - 1 - 0.17 * w,
    y - 1.26 * w,
    x - 1 - 0.2 * w,
    y - 1.33 * w
  );
  CTX.lineTo(x - 1 - 0.23 * w, y - 1.33 * w);
  CTX.lineTo(x - 1 - 0.3 * w, y - 1.3 * w);
  CTX.lineTo(x - 1 - 0.33 * w, y - 1.26 * w);
  CTX.closePath();
  CTX.fill();
  CTX.fillStyle = "blue";
  CTX.font = `bold ${w * 1.3}px monospace`;
  CTX.fillText(name[0].toUpperCase(), x - w / 2.5, y + 0.2 * w);
};
