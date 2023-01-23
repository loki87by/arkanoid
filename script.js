import {
  WIDTH,
  HEIGHT,
  BODY,
  CANVAS,
  CTX,
  DATA,
  SCORE,
  ARTICLE,
  LIFES,
  POPUP,
  BUTTON,
  BASIC_TIME,
  LEVEL1,
  COLORS,
  GET_SIZE,
  COLLIDES,
} from "./consts.js";

CANVAS.setAttribute("height", HEIGHT);
CANVAS.setAttribute("width", HEIGHT / 1.25);
if (HEIGHT < WIDTH) {
  DATA.setAttribute(
    "style",
    `width: ${(WIDTH - HEIGHT / 1.25) / 2}px; left: ${
      WIDTH - (WIDTH - HEIGHT / 1.25) / 2
    }px`
  );
} else {
  BODY.setAttribute("style", "align-items: flex-start");
  DATA.setAttribute("style", `left: 0; top: ${GET_SIZE(454)}px; width: 100%;`);
  ARTICLE.setAttribute("style", "flex-direction: row");
  Array.from(document.querySelectorAll("h2")).forEach((subtitle) =>
    subtitle.setAttribute("style", "margin: 0")
  );
}

const requestAnimationFrame =
  window.requestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.msRequestAnimationFrame;

let level = 1;
let lifes = 5;
let score = 0;
let timeCoefficient, gameOver, win, isDropped, timestamp;
const brickGap = GET_SIZE(2);
const brickWidth = GET_SIZE(25);
const brickHeight = GET_SIZE(12);
const wallSize = (HEIGHT / 1.25 - (14 * brickWidth + 13 * brickGap)) / 2;
const paddle = {
  basicX: CANVAS.width / 2 - brickWidth / 2,
  basicY: GET_SIZE(440),
  x: CANVAS.width / 2 - brickWidth / 2,
  y: GET_SIZE(440),
  width: brickWidth,
  height: brickHeight,
  dx: 0,
};

const ball = {
  basicX: CANVAS.width / 2,
  basicY: GET_SIZE(433) + GET_SIZE(5) / 2,
  x: CANVAS.width / 2,
  y: GET_SIZE(433) + GET_SIZE(5) / 2,
  diameter: GET_SIZE(5),
  height: GET_SIZE(5),
  width: GET_SIZE(5),
  radius: GET_SIZE(5) / 2,
  speed: 2,
  dx: 0,
  dy: 0,
};

const bricks = [];

function keydownHandler(e) {
  if (e.code === "ArrowLeft") {
    paddle.dx = -3;

    if (!isDropped) {
      ball.dx = -3;

      if (paddle.x <= wallSize) {
        ball.dx = 0;
      }
    }
  } else if (e.code === "ArrowRight") {
    paddle.dx = 3;

    if (!isDropped) {
      ball.dx = 3;

      if (paddle.x + brickWidth >= CANVAS.width - wallSize) {
        ball.dx = 0;
      }
    }
  }

  if (ball.dx === 0 && ball.dy === 0 && e.code === "Space") {
    ball.dx = ball.speed;
    ball.dy = -ball.speed;
    isDropped = true;
  }
}

function keyupHandler(e) {
  if (e.code === "ArrowLeft" || e.code === "ArrowRight") {
    paddle.dx = 0;

    if (!isDropped) {
      ball.dx = 0;
    }
  }
}

function setLives() {
  Array.from(LIFES.children)
    .slice(1)
    .forEach((img) => img.remove());
  for (let i = 0; i < lifes; i++) {
    const svg = LIFES.children[0].content.querySelector("img").cloneNode(true);
    LIFES.appendChild(svg);
  }
}

function reset() {
  timeCoefficient = BASIC_TIME - level * 5000;
  gameOver = false;
  win = false;
  isDropped = false;
  timestamp = Date.now();
  ball.speed = level / 5 + 1.8;
  for (let i = 0; i < bricks.length; i++) {
    bricks.pop();
  }

  for (let row = 0; row < LEVEL1.length; row++) {
    for (let col = 0; col < LEVEL1[row].length; col++) {
      const colorCode = LEVEL1[row][col];
      bricks.push({
        x: wallSize + (brickWidth + brickGap) * col,
        y: wallSize + (brickHeight + brickGap) * row,
        color: COLORS[colorCode],
        width: brickWidth,
        height: brickHeight,
      });
    }
  }
}

function addLife() {
  if (lifes < 5) {
    lifes++;
    setLives();
  }
}

function restart() {
  level = 1;
  reset();
  lifes = 5;
  setLives();
  score = 0;
  SCORE.textContent = `Счёт: ${score}`;
  BUTTON.removeEventListener("click", restart);
  POPUP.classList.remove("popup_opened");
  loop();
}

function newGame() {
  level++;
  reset();
  addLife();
  BUTTON.removeEventListener("click", newGame);
  POPUP.classList.remove("popup_opened");
}

function endGame() {
  POPUP.classList.add("popup_opened");
  timeCoefficient = timestamp;

  if (gameOver) {
    POPUP.children[0].textContent = "Game over!";
    BUTTON.textContent = "Попробовать еще раз";
    BUTTON.addEventListener("click", restart);
  }
  if (win) {
    POPUP.children[0].textContent = "You win!";
    BUTTON.textContent = "Следующий уровень";
    BUTTON.addEventListener("click", newGame);
  }
}

function toStartPosition() {
  ball.x = ball.basicX;
  ball.y = ball.basicY;
  paddle.x = paddle.basicX;
  paddle.y = paddle.basicY;
  ball.dx = 0;
  ball.dy = 0;
  paddle.dx = 0;
  isDropped = false;
}

function loop() {
  if (!gameOver) {
    requestAnimationFrame(loop);
  } else {
    endGame();
  }

  CTX.clearRect(0, 0, CANVAS.width, CANVAS.height);
  paddle.x += paddle.dx;

  const time = Date.now();
  if (time >= timestamp + timeCoefficient) {
    timestamp = time;
    bricks.forEach((brick) => {
      brick.y += brick.height + brickGap;
    });

    if (
      bricks
        .slice(bricks.length - 14)
        .reverse()
        .find((brick) => brick.y >= GET_SIZE(440) - brickGap - brickHeight)
    ) {
      gameOver = true;
    }
  }

  if (paddle.x < wallSize) {
    paddle.x = wallSize;
  } else if (paddle.x + brickWidth > CANVAS.width - wallSize) {
    paddle.x = CANVAS.width - wallSize - brickWidth;
  }
  ball.x += ball.dx;
  ball.y += ball.dy;

  if (ball.x < wallSize) {
    ball.x = wallSize;
    ball.dx *= -1;
  } else if (ball.x + ball.diameter > CANVAS.width - wallSize) {
    ball.x = CANVAS.width - wallSize - ball.diameter;
    ball.dx *= -1;
  }

  if (ball.y < wallSize) {
    ball.y = wallSize;
    ball.dy *= -1;
  }

  if (ball.y > CANVAS.height) {
    toStartPosition();
    lifes--;
    setLives();

    if (lifes === 0) {
      gameOver = true;
    }
  }

  if (COLLIDES(ball, paddle)) {
    ball.dy *= -1;
    ball.y = paddle.y - ball.height;
  }

  for (let i = 0; i < bricks.length; i++) {
    const brick = bricks[i];

    if (COLLIDES(ball, brick)) {
      bricks.splice(i, 1);
      score++;
      SCORE.textContent = `Счёт: ${score}`;

      if (score % 100 === 0) {
        addLife();
      }

      if (bricks.length === 0) {
        win = true;
        endGame();
        toStartPosition();
      }

      if (
        ball.y + ball.height - ball.speed <= brick.y ||
        ball.y >= brick.y + brick.height - ball.speed
      ) {
        ball.dy *= -1;
      } else {
        ball.dx *= -1;
      }
      break;
    }
  }

  CTX.fillStyle = "lightgrey";
  CTX.fillRect(0, 0, CANVAS.width, wallSize);
  CTX.fillRect(0, 0, wallSize, CANVAS.height);
  CTX.fillRect(CANVAS.width - wallSize, 0, wallSize, CANVAS.height);
  CTX.beginPath();
  CTX.arc(ball.x, ball.y, ball.diameter, 0, 2 * Math.PI);
  CTX.fill();

  bricks.forEach(function (brick) {
    CTX.fillStyle = brick.color;
    CTX.fillRect(brick.x, brick.y, brick.width, brick.height);
  });

  CTX.fillStyle = "cyan";
  CTX.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
}

document.addEventListener("keydown", keydownHandler);
document.addEventListener("keyup", keyupHandler);
reset();
setLives();
requestAnimationFrame(loop);
