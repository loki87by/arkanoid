const height = window.innerHeight;
const WIDTH = window.innerWidth;
export const HEIGHT = Math.floor(height / 50) * 50;
export const POINT = HEIGHT / 500;
const BODY = document.querySelector("body");
export const CANVAS = document.getElementById("game");
export const CTX = CANVAS.getContext("2d");
const INFO = document.getElementById("info");
const DATA = document.getElementById("data");
export const SCORE = document.getElementById("score");
export const SPEED = document.getElementById("speed");
export const LEVEL = document.getElementById("level");
export const HISCORE = document.getElementById("hiscore");
const ARTICLE = document.querySelector("article");
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
    ["", "", "", "", "", "", "S", "S", "", "", "", "", "", ""],
    ["", "", "", "", "", "G", "R", "R", "G", "", "", "", "", ""],
    ["", "", "", "", "B", "R", "O", "O", "R", "B", "", "", "", ""],
    ["", "", "", "S", "R", "O", "Y", "Y", "O", "R", "S", "", "", ""],
    ["", "", "B", "R", "O", "Y", "C", "C", "Y", "O", "R", "B", "", ""],
    ["", "G", "R", "O", "Y", "C", "P", "P", "C", "Y", "O", "R", "G", ""],
    ["S", "R", "O", "Y", "C", "P", "M", "M", "P", "C", "Y", "O", "R", "S"],
    ["", "G", "R", "O", "Y", "C", "P", "P", "C", "Y", "O", "R", "G", ""],
    ["", "", "B", "R", "O", "Y", "C", "C", "Y", "O", "R", "B", "", ""],
    ["", "", "", "S", "R", "O", "Y", "Y", "O", "R", "S", "", "", ""],
    ["", "", "", "", "G", "R", "O", "O", "R", "G", "", "", "", ""],
    ["", "", "", "", "", "B", "R", "R", "B", "", "", "", "", ""],
    ["", "", "", "", "", "", "S", "S", "", "", "", "", "", ""],
    [],
    [],
  ],
];

export const COLORS = {
  O: "orange",
  C: "cyan",
  Y: "yellow",
  G: "green",
  S: "silver",
  P: "pink",
  B: "blue",
  R: "red",
  M: "magenta",
};

const SUPER_COLORS = [
  "silver",
  "cyan",
  "green",
  "blue",
  "magenta",
  "pink",
  "red",
  "orange",
  "yellow",
];

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

export const NEW_RANDOM_LEWEL = (num) => {
  const colors = Object.keys(COLORS);
  colors.sort();
  const len = colors.length;
  for (let i = len - 2; i >= 0; i--) {
    const shortArray = colors.slice(0, i);
    shortArray.forEach((item) => {
      colors.push("");
      colors.push(item);
    });
  }
  colors.sort();
  const lastLen = LEVELS[LEVELS.length - 1].length;
  let limit = lastLen;
  const res = [];

  if ((lastLen + num / 2) % num === 0) {
    limit++;
  }

  for (let r = 0; r < limit; r++) {
    const half = [];
    for (let i = 0; i < 7; i++) {
      half.push(colors[Math.floor(Math.random() * colors.length)]);
    }
    const mirror = half.slice().reverse();
    let row;

    if ((num * num - r) % 2 === 0) {
      row = [...mirror, ...half];
    } else {
      row = [...half, ...mirror];
    }
    res.push(row);
  }
  LEVELS.push(res);
};

export const GET_SIZE = (num) => {
  return Math.floor(num * POINT);
};

export const SCREEN_SIZE = () => {
  CANVAS.setAttribute("height", HEIGHT);
  CANVAS.setAttribute("width", HEIGHT / 1.25);

  if (HEIGHT < WIDTH) {
    DATA.setAttribute(
      "style",
      `width: ${(WIDTH - HEIGHT / 1.25) / 2}px; left: ${
        WIDTH - (WIDTH - HEIGHT / 1.25) / 2
      }px`
    );
    INFO.setAttribute(
      "style",
      `width: ${(WIDTH - HEIGHT / 1.25) / 2}px; height: ${HEIGHT}px`
    );
    INFO.classList.remove("hidden");
  } else {
    BODY.setAttribute("style", "align-items: flex-start");
    DATA.setAttribute(
      "style",
      `left: 0; top: ${GET_SIZE(454)}px; width: 100%;`
    );
    ARTICLE.setAttribute("style", "flex-direction: row");
    Array.from(document.querySelectorAll("h2")).forEach((subtitle) =>
      subtitle.setAttribute("style", "margin: 0")
    );
    INFO.classList.add("hidden");
  }
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

export const METAMORPHOSIS = (brick) => {
  brick.superColorCounter = brick.superColorCounter + 1;
  brick.color = SUPER_COLORS[brick.superColorCounter];
};

const findAim = (array, coords) => {
  const index = array.findIndex((brick) => {
    if (brick.x === coords.x && brick.y === coords.y) {
      return brick;
    }
  });

  if (index >= 0) {
    if (array[index].super && array[index].superColorCounter < 8) {
      METAMORPHOSIS(array[index]);
    } else {
      array.splice(index, 1);
    }
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
  CTX.beginPath();
  CTX.arc(x, y - 0.3 * w, w, 0, 2 * Math.PI);
  CTX.fill();
  CTX.closePath();
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
  const colorIndex =
    Object.values(COLORS).findIndex((col) => col === color) + 1;
  const symbolColor =
    Object.values(COLORS)[Object.values(COLORS).length - colorIndex];
  CTX.fillStyle = symbolColor;
  CTX.font = `bold ${w * 1.3}px monospace`;
  CTX.fillText(name[0].toUpperCase(), x - w / 2.5, y + 0.2 * w);
};

export const GET_BOMB = (startX, startY, w, h, g, i) => {
  const x = startX + w / 2;
  const y = startY + h / 2;
  const gradient = CTX.createRadialGradient(x, y, w / 8, x, y, w * 2);
  gradient.addColorStop(0, "red");
  gradient.addColorStop(i / 20, "orange");
  gradient.addColorStop(i / 10, "yellow");
  gradient.addColorStop(1, "white");
  CTX.fillStyle = gradient;
  CTX.beginPath();
  CTX.moveTo(x - 0.75 * (w + g), y - 1 * h);
  CTX.lineTo(x, y - 2.5 * h);
  CTX.lineTo(x + 0.75 * w, y - 1 * (h + g));
  CTX.lineTo(x + 1.25 * w, y - 1.5 * h);
  CTX.lineTo(x + 1 * w, y - 0.5 * (h + g));
  CTX.lineTo(x + 1.5 * w, y - 0.75 * (h + g));
  CTX.lineTo(x + 1.25 * (w + g), y - 0.25 * h);
  CTX.lineTo(x + 2.5 * w, y + 0.25 * h);
  CTX.lineTo(x + 1.25 * (w + g), y + 0.75 * h);
  CTX.lineTo(x + 1.5 * w, y + 1.25 * (h + g));
  CTX.lineTo(x + 1 * w, y + 1 * (h + g));
  CTX.lineTo(x + 1.25 * w, y + 2 * h);
  CTX.lineTo(x + 0.75 * w, y + 1.5 * (h + g));
  CTX.lineTo(x, y + 3 * h);
  CTX.lineTo(x - 0.75 * w, y + 1.75 * h);
  CTX.lineTo(x - 1.25 * w, y + 2 * h);
  CTX.lineTo(x - 1 * (w + g), y + 1 * (h + g));
  CTX.lineTo(x - 1.5 * (w + g), y + 1.25 * (h + g));
  CTX.lineTo(x - 1.25 * (w + g), y + 0.75 * h);
  CTX.lineTo(x - 2.5 * (w + g), y + 0.25 * h);
  CTX.lineTo(x - 1.25 * (w + g), y - 0.25 * h);
  CTX.lineTo(x - 1.5 * (w + g), y - 0.75 * (h + g));
  CTX.lineTo(x - 1 * (w + g), y - 0.5 * (h + g));
  CTX.lineTo(x - 1.25 * (w + g), y - 1.5 * h);
  CTX.closePath();
  CTX.fill();
};

export const FLASH_WAVE = (x, y, w, h) => {
  const arr = [];
  for (let i = 0; i < 7; i++) {
    const rad =
      (Math.PI * Math.floor(Math.random() * 2)) / Math.ceil(Math.random() * 8);
    const item = [x, y, h + Math.random() * (w - h), rad, rad * 2];
    arr.push(item);
  }
  return arr;
};
