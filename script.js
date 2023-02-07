import {
  HEIGHT,
  POINT,
  CANVAS,
  CTX,
  SCORE,
  SPEED,
  LEVEL,
  HISCORE,
  SCREEN_SIZE,
  POPUP,
  BUTTON,
  BASIC_TIME,
  LEVELS,
  COLORS,
  BONUSES,
  GET_SIZE,
  COLLIDES,
  SET_LIVES,
  SHOW_POPUP,
  METAMORPHOSIS,
  DETONATE,
  GET_PRIZE,
  GET_BOMB,
  FLASH_WAVE,
  NEW_RANDOM_LEWEL,
} from "./consts.js";

SCREEN_SIZE();

const requestAnimationFrame =
  window.requestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.msRequestAnimationFrame;
window.msRequestAnimationFrame;

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
  speed: 2 * POINT,
  dx: 0,
  dy: 0,
};

const bricks = [];

let level = 1;
let lifes = 5;
let score = 0;
let splashCounter = 0;
let splashes = null;
let prizeName = "";
let hiscore = 0;
let timeCoefficient,
  gameOver,
  win,
  isDropped,
  timestamp,
  berserk,
  autopilot,
  grab,
  doubleScore,
  bomb,
  detonateCenter,
  prizeColor;

if (localStorage.getItem("hiscore")) {
  hiscore = localStorage.getItem("hiscore");
}

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

function setInfo() {
  SCORE.textContent = `Счёт: ${score}`;
  SPEED.textContent = `Скорость шара: ${ball.speed}`;
  LEVEL.textContent = `Уровень: ${level}`;
  HISCORE.textContent = `Рекорд: ${hiscore}`;
  }

function setInfo() {
  SCORE.textContent = `Счёт: ${score}`;
  SPEED.textContent = `Скорость шара: ${Math.round(ball.speed * 10)}`;
  LEVEL.textContent = `Уровень: ${level}`;
  HISCORE.textContent = `Рекорд: ${hiscore}`;
}

function reset() {
  timeCoefficient = BASIC_TIME - level * 5000;
  gameOver = false;
  win = false;
  isDropped = false;
  berserk = false;
  timestamp = Date.now();
  ball.speed = (level / 5 + 1.8) * POINT;
  const bricksLength = bricks.length;
  for (let i = 0; i < bricksLength; i++) {
    bricks.pop();
  }
  prizeColor = "";
  prizeName = "";
  setInfo();

  for (let row = 0; row < LEVELS[level - 1].length; row++) {
    for (let col = 0; col < LEVELS[level - 1][row].length; col++) {
      const colorCode = LEVELS[level - 1][row][col];
      if (colorCode !== "") {
        bricks.push({
          x: wallSize + (brickWidth + brickGap) * col,
          y: wallSize + (brickHeight + brickGap) * row,
          color: COLORS[colorCode],
          width: brickWidth,
          height: brickHeight,
          super: colorCode === "S" ? true : false,
          superColorCounter: 0,
        });
      }
    }
  }
}

function addLife() {
  if (lifes < 5) {
    lifes++;
    SET_LIVES(lifes);
  }
}

function restart() {
  CTX.clearRect(0, 0, CANVAS.width, CANVAS.height);
  level = 1;
  score = 0;
  reset();
  lifes = 5;
  SET_LIVES(lifes);
  BUTTON.removeEventListener("click", restart);
  POPUP.classList.remove("popup_opened");
  loop();
}

function newGame() {
  CTX.clearRect(0, 0, CANVAS.width, CANVAS.height);
  level++;

  if (level >= 3) {
    NEW_RANDOM_LEWEL(level + 1);
  }
  reset();
  addLife();
  BUTTON.removeEventListener("click", newGame);
  POPUP.classList.remove("popup_opened");
}

function endGame() {
  POPUP.classList.add("popup_opened");
  timeCoefficient = timestamp;

  if (gameOver) {
    SHOW_POPUP("Game over!", "Попробовать еще раз", restart);
  }
  if (win) {
    SHOW_POPUP("You win!", "Следующий уровень", newGame);
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

function chekPrize(text) {
  if (text === "wide") {
    const width = paddle.width;

    if (width + brickWidth < brickWidth * 14) {
      paddle.width = width + brickWidth;
    }
  } else if (text === "rise") {
    berserk = true;
  } else if (text === "slowDown") {
    timeCoefficient += 15000;
  } else if (text === "up") {
    bricks.forEach((brick) => {
      brick.y -= brick.height + brickGap;
    });
  } else if (text === "life") {
    if (lifes < 5) {
      addLife();
    }
  } else if (text === "auto") {
    autopilot = true;
    setTimeout(() => {
      autopilot = false;
    }, 20000);
  } else if (text === "grab") {
    grab = true;
    setTimeout(() => {
      grab = false;
    }, timeCoefficient * 0.75);
  } else if (text === "bomb") {
    if (!bomb && !grab) {
      bomb = true;
      const ballSize = ball.diameter * 2;
      ball.width = ballSize;
      ball.height = ballSize;
      ball.diameter = ballSize;
    } else {
      return chekPrize(prizeName);
    }
  } else if (text === "doubleScore") {
    doubleScore = true;
    setTimeout(() => {
      doubleScore = false;
    }, timeCoefficient / 2);
  }
}

function setPrize(startCoords) {
  if (prize.x === null && prize.y === null) {
    prize.x = startCoords.x + brickWidth / 2;
    prize.y = startCoords.y;
    prize.color = startCoords.color;
  }
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

  if (prize.y) {
    prize.y += prize.dy;
  }

  if (autopilot) {
    if (ball.x <= wallSize + paddle.width / 2) {
      paddle.x = wallSize;
    } else if (
      ball.x + ball.width >=
      HEIGHT / 1.25 - wallSize - paddle.width / 2
    ) {
      paddle.x = HEIGHT / 1.25 - wallSize - paddle.width;
    } else {
      paddle.x = ball.x - paddle.width / 2;
    }
  }

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
    SET_LIVES(lifes);

    if (lifes === 0) {
      gameOver = true;
    }
  }

  if (prize.y > CANVAS.height) {
    prize.x = null;
    prize.y = null;
    prizeName = "";
    prizeColor = "";
  }

  if (COLLIDES(ball, paddle)) {
    if (!grab) {
      ball.dy *= -1;
      ball.y = paddle.y - ball.height;
    } else {
      ball.dx = 0;
      ball.dy = 0;
      ball.x = paddle.x + paddle.width / 2;

      if (!bomb) {
        ball.y = ball.basicY;
      } else {
        ball.y = ball.basicY + GET_SIZE(5) - ball.diameter;
      }
      isDropped = false;
    }
  }

  if (ball.y - wallSize <= ball.diameter + brickGap) {
    berserk = false;
  }

  for (let i = 0; i < bricks.length; i++) {
    const brick = bricks[i];

    if (COLLIDES(ball, brick)) {
      if (
        Math.floor(Math.random() * 10) === Math.ceil(Math.random() * 9) &&
        !autopilot &&
        prizeName === ""
      ) {
        prizeColor = brick.color;
        prizeName = BONUSES[Math.floor(Math.random() * BONUSES.length)];
        setPrize(brick);
      }

      if (bomb) {
        resetBall();
        if (splashCounter === 0) {
          detonateCenter = bricks[i];
          splashes = FLASH_WAVE(
            detonateCenter.x + brickWidth / 2,
            detonateCenter.y + brickHeight / 2,
            brickWidth,
            brickHeight
          );
        }
      } else if (brick.super && brick.superColorCounter < 8 && !bomb) {
        METAMORPHOSIS(brick);
      } else {
        bricks.splice(i, 1);
      }

      score++;

      if (score % 100 === 0) {
        addLife();
      }

      if (doubleScore) {
        score++;

        if (score % 100 === 0) {
          addLife();
        }
      }

      if (localStorage.getItem("hiscore") < score) {
        localStorage.setItem("hiscore", score);
        hiscore = score;
      }
      setInfo();

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

  if (COLLIDES(paddle, prize)) {
    prize.x = null;
    prize.y = null;
    prizeColor = "";
    chekPrize(prizeName);
    prizeName = "";
  }

  bricks.forEach(function (brick) {
    CTX.fillStyle = brick.color;
    CTX.fillRect(brick.x, brick.y, brick.width, brick.height);
  });

  CTX.fillStyle = "lightgrey";
  CTX.fillRect(0, 0, CANVAS.width, wallSize);
  CTX.fillRect(0, 0, wallSize, CANVAS.height);
  CTX.fillRect(CANVAS.width - wallSize, 0, wallSize, CANVAS.height);

  CTX.fillStyle = "cyan";
  CTX.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);

  if (prize.y) {
    GET_PRIZE(prize.x, prize.y, prize.width / 2, prizeColor, prizeName);
  }
  CTX.fillStyle = "lightgrey";
  CTX.beginPath();
  CTX.arc(ball.x, ball.y, ball.diameter, 0, 2 * Math.PI);
  CTX.fill();
  CTX.closePath();

  if (splashes) {
    splashCounter++;
    for (let i = 0; i < splashCounter; i++) {
      GET_BOMB(
        detonateCenter.x,
        detonateCenter.y,
        brickWidth,
        brickHeight,
        brickGap,
        i
      );
      CTX.strokeStyle = "black";

      //if (i <= splashCounter) {
      CTX.beginPath();
      eval(`CTX.arc(${splashes[Math.floor(i)].join(", ")})`);
      CTX.closePath();
      //}
      CTX.stroke();
    }

    if (splashCounter >= 7) {
      splashCounter = 0;
      bomb = false;
      splashes = null;
      DETONATE(
        bricks,
        detonateCenter,
        brickHeight + brickGap,
        brickWidth + brickGap
      );
    }
  }

  if (bricks.length === 0) {
    win = true;
    endGame();
    toStartPosition();
  }
}

document.addEventListener("keydown", keydownHandler);
document.addEventListener("keyup", keyupHandler);
reset();
SET_LIVES(lifes);
requestAnimationFrame(loop);
