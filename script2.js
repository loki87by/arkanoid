const canvas2 = document.querySelector("canvas");
const ctx = canvas2.getContext("2d");
const height = window.innerHeight;
const WIDTH = window.innerWidth;
const HEIGHT = Math.floor(height / 50) * 50;
const point = HEIGHT / 500;
const GET_SIZE = (num) => {
  return Math.floor(num * point);
};
const brickWidth = GET_SIZE(25);
const brickHeight = GET_SIZE(12);

const requestAnimationFrame =
  window.requestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.msRequestAnimationFrame;

//console.log(brickWidth) 30

function getPrize(x, y, w, color){
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, w, 0, 2 * Math.PI);
//  ctx.arc(1+brickWidth, brickWidth+34, brickWidth, 0, 2 * Math.PI);
  ctx.fill();
  ctx.fillStyle = "orange";
  ctx.beginPath();
  ctx.moveTo(w * 1.3,w * 0.9)
  ctx.bezierCurveTo(w * 1.3,w * 0.93,w * 1.27,w * 0.97,w * 1.27,w * 1)
  ctx.bezierCurveTo(w * 1.2,w * 1.07,w * 1.17,w * 1.1,w * 1.1,w * 1.1)
  ctx.bezierCurveTo(w * 1.07,w * 1.1,w * 1.03,w * 1.1,w * 1.03,w * 1.1)
  ctx.bezierCurveTo(w * 1,w * 1.1,w * 1,w * 1.1,w * 0.97,w * 1.1)
  ctx.bezierCurveTo(w * 0.9,w * 1.1,w * 0.83,w * 1.07,w * 0.8,w * 1)
  ctx.bezierCurveTo(w * 0.77,w * 0.97,w * 0.73,w * 0.93,w * 0.73,w * 0.9)
  ctx.bezierCurveTo(w * 0.73,w * 0.87,w * 0.77,w * 0.8,w * 0.8,w * 0.77)
  ctx.bezierCurveTo(w * 0.83,w * 0.7,w * 0.93,w * 0.67,w * 1.03,w * 0.67)
  ctx.bezierCurveTo(w * 1.13,w * 0.67,w * 1.2,w * 0.7,w * 1.27,w * 0.77)
  ctx.bezierCurveTo(w * 1.3,w * 0.8,w * 1.3,w * 0.87,w * 1.3,w * 0.9)
  ctx.moveTo(w * 0.73,w * 0.77)
  ctx.lineTo(w * 0.37,w * 0.67)
  ctx.bezierCurveTo(w * 0.27,w * 0.63,w * 0.17,w * 0.73,w * 0.17,w * 0.83)
  ctx.lineTo(w * 0.17,w * 1)
  ctx.bezierCurveTo(w * 0.17,w * 1.1,w * 0.27,w * 1.17,w * 0.37,w * 1.13)
  ctx.lineTo(w * 0.7,w * 1.03)
  ctx.lineTo(w * 0.77,w * 1)
  ctx.lineTo(w * 0.8,w * 1)
  ctx.bezierCurveTo(w * 0.77,w * 0.97,w * 0.73,w * 0.93,w * 0.73,w * 0.9)
  ctx.bezierCurveTo(w * 0.73,w * 0.87,w * 0.77,w * 0.8,w * 0.8,w * 0.77)
  ctx.lineTo(w * 0.73,w * 0.77)
  ctx.moveTo(w * 1.37,w * 1.07)
  ctx.lineTo(w * 1.27,w * 1)
  ctx.lineTo(w * 1.27,w * 1)
  ctx.bezierCurveTo(w * 1.2,w * 1.07,w * 1.17,w * 1.1,w * 1.1,w * 1.1)
  ctx.lineTo(w * 1.1,w * 1.1)
  ctx.bezierCurveTo(w * 1.1,w * 1.13,w * 1.1,w * 1.13,w * 1.1,w * 1.13)
  ctx.lineTo(w * 1.5,w * 1.53)
  ctx.bezierCurveTo(w * 1.53,w * 1.57,w * 1.6,w * 1.53,w * 1.6,w * 1.5)
  ctx.bezierCurveTo(w * 1.6,w * 1.5,w * 1.6,w * 1.47,w * 1.63,w * 1.47)
  ctx.lineTo(w * 1.63,w * 1.47)
  ctx.bezierCurveTo(w * 1.7,w * 1.47,w * 1.73,w * 1.4,w * 1.67,w * 1.37)
  ctx.lineTo(w * 1.37,w * 1.07)
  ctx.moveTo(w * 1.67,w * 0.67)
  ctx.lineTo(w * 1.3,w * 0.77)
  ctx.bezierCurveTo(w * 1.3,w * 0.77,w * 1.3,w * 0.77,w * 1.27,w * 0.77)
  ctx.lineTo(w * 1.27,w * 0.77)
  ctx.bezierCurveTo(w * 1.3,w * 0.8,w * 1.3,w * 0.87,w * 1.3,w * 0.9)
  ctx.bezierCurveTo(w * 1.3,w * 0.93,w * 1.27,w * 0.97,w * 1.27,w * 1)
  ctx.lineTo(w * 1.27,w * 1)
  ctx.lineTo(w * 1.37,w * 1.07)
  ctx.lineTo(w * 1.67,w * 1.13)
  ctx.bezierCurveTo(w * 1.77,w * 1.17,w * 1.9,w * 1.1,w * 1.9,w * 1)
  ctx.lineTo(w * 1.9,w * 0.83)
  ctx.bezierCurveTo(w * 1.9,w * 0.73,w * 1.8,w * 0.63,w * 1.67,w * 0.67)
  ctx.moveTo(w * 0.67,w * 1.07)
  ctx.lineTo(w * 0.37,w * 1.37)
  ctx.bezierCurveTo(w * 0.33,w * 1.4,w * 0.37,w * 1.47,w * 0.4,w * 1.47)
  ctx.lineTo(w * 0.43,w * 1.47)
  ctx.bezierCurveTo(w * 0.47,w * 1.47,w * 0.47,w * 1.5,w * 0.47,w * 1.5)
  ctx.bezierCurveTo(w * 0.47,w * 1.53,w * 0.53,w * 1.57,w * 0.53,w * 1.53)
  ctx.lineTo(w * 0.97,w * 1.13)
  ctx.lineTo(w * 0.97,w * 1.1)
  ctx.bezierCurveTo(w * 0.9,w * 1.1,w * 0.83,w * 1.07,w * 0.8,w * 1)
  ctx.lineTo(w * 0.77,w * 1)
  ctx.lineTo(w * 0.7,w * 1.03)
  ctx.lineTo(w * 0.67,w * 1.07)
  ctx.closePath();
  ctx.stroke();
  ctx.fill();
}

/* function geo(arr) {
  console.log(arr);
  const res = arr.map((n) => `w * ${Math.round((n / 3) * 10) / 100}`);
  console.log(res);
  return res;
}

function gops(text) {
  const ar = text.split("\n");
  const res = ar.map((i) => `${i.split(/\(/)[0]}(${geo(i.match(/\d+/gi))})`);
  console.log(res.join("\n"));
} */

/* gops(`ctx.moveTo(39, 27);
ctx.bezierCurveTo(39, 28, 38, 29, 38, 30);
ctx.bezierCurveTo(36, 32, 35, 33, 33, 33);
ctx.bezierCurveTo(32, 33, 31, 33, 31, 33);
ctx.bezierCurveTo(30, 33, 30, 33, 29, 33);
ctx.bezierCurveTo(27, 33, 25, 32, 24, 30);
ctx.bezierCurveTo(23, 29, 22, 28, 22, 27);
ctx.bezierCurveTo(22, 26, 23, 24, 24, 23);
ctx.bezierCurveTo(25, 21, 28, 20, 31, 20);
ctx.bezierCurveTo(34, 20, 36, 21, 38, 23);
ctx.bezierCurveTo(39, 24, 39, 26, 39, 27);
ctx.moveTo(22, 23);
ctx.lineTo(11, 20);
ctx.bezierCurveTo(8, 19, 5, 22, 5, 25);
ctx.lineTo(5, 30);
ctx.bezierCurveTo(5, 33, 8, 35, 11, 34);
ctx.lineTo(21, 31);
ctx.lineTo(23, 30);
ctx.lineTo(24, 30);
ctx.bezierCurveTo(23, 29, 22, 28, 22, 27);
ctx.bezierCurveTo(22, 26, 23, 24, 24, 23);
ctx.lineTo(22, 23);
ctx.moveTo(41, 32);
ctx.lineTo(38, 30);
ctx.lineTo(38, 30);
ctx.bezierCurveTo(36, 32, 35, 33, 33, 33);
ctx.lineTo(33, 33);
ctx.bezierCurveTo(33, 34, 33, 34, 33, 34);
ctx.lineTo(45, 46);
ctx.bezierCurveTo(46, 47, 48, 46, 48, 45);
ctx.bezierCurveTo(48, 45, 48, 44, 49, 44);
ctx.lineTo(49, 44);
ctx.bezierCurveTo(51, 44, 52, 42, 50, 41);
ctx.lineTo(41, 32);
ctx.moveTo(50, 20);
ctx.lineTo(39, 23);
ctx.bezierCurveTo(39, 23, 39, 23, 38, 23);
ctx.lineTo(38, 23);
ctx.bezierCurveTo(39, 24, 39, 26, 39, 27);
ctx.bezierCurveTo(39, 28, 38, 29, 38, 30);
ctx.lineTo(38, 30);
ctx.lineTo(41, 32);
ctx.lineTo(50, 34);
ctx.bezierCurveTo(53, 35, 57, 33, 57, 30);
ctx.lineTo(57, 25);
ctx.bezierCurveTo(57, 22, 54, 19, 50, 20);
ctx.moveTo(20, 32);
ctx.lineTo(11, 41);
ctx.bezierCurveTo(10, 42, 11, 44, 12, 44);
ctx.lineTo(13, 44);
ctx.bezierCurveTo(14, 44, 14, 45, 14, 45);
ctx.bezierCurveTo(14, 46, 16, 47, 16, 46);
ctx.lineTo(29, 34);
ctx.lineTo(29, 33);
ctx.bezierCurveTo(27, 33, 25, 32, 24, 30);
ctx.lineTo(23, 30);
ctx.lineTo(21, 31);
ctx.lineTo(20, 32);`);
 */
function loop() {
  requestAnimationFrame(loop);
  ctx.clearRect(0, 0, 300, 300);
  getPrize(1 + brickWidth, brickWidth + 34, brickWidth, "cyan");
  /* ctx.moveTo(39, 27);
  ctx.bezierCurveTo(39, 28, 38, 29, 38, 30);
  ctx.bezierCurveTo(36, 32, 35, 33, 33, 33);
  ctx.bezierCurveTo(32, 33, 31, 33, 31, 33);
  ctx.bezierCurveTo(30, 33, 30, 33, 29, 33);
  ctx.bezierCurveTo(27, 33, 25, 32, 24, 30);
  ctx.bezierCurveTo(23, 29, 22, 28, 22, 27);
  ctx.bezierCurveTo(22, 26, 23, 24, 24, 23);
  ctx.bezierCurveTo(25, 21, 28, 20, 31, 20);
  ctx.bezierCurveTo(34, 20, 36, 21, 38, 23);
  ctx.bezierCurveTo(39, 24, 39, 26, 39, 27);
  ctx.moveTo(22, 23);
  ctx.lineTo(11, 20);
  ctx.bezierCurveTo(8, 19, 5, 22, 5, 25);
  ctx.lineTo(5, 30);
  ctx.bezierCurveTo(5, 33, 8, 35, 11, 34);
  ctx.lineTo(21, 31);
  ctx.lineTo(23, 30);
  ctx.lineTo(24, 30);
  ctx.bezierCurveTo(23, 29, 22, 28, 22, 27);
  ctx.bezierCurveTo(22, 26, 23, 24, 24, 23);
  ctx.lineTo(22, 23);
  ctx.moveTo(41, 32);
  ctx.lineTo(38, 30);
  ctx.lineTo(38, 30);
  ctx.bezierCurveTo(36, 32, 35, 33, 33, 33);
  ctx.lineTo(33, 33);
  ctx.bezierCurveTo(33, 34, 33, 34, 33, 34);
  ctx.lineTo(45, 46);
  ctx.bezierCurveTo(46, 47, 48, 46, 48, 45);
  ctx.bezierCurveTo(48, 45, 48, 44, 49, 44);
  ctx.lineTo(49, 44);
  ctx.bezierCurveTo(51, 44, 52, 42, 50, 41);
  ctx.lineTo(41, 32);
  ctx.moveTo(50, 20);
  ctx.lineTo(39, 23);
  ctx.bezierCurveTo(39, 23, 39, 23, 38, 23);
  ctx.lineTo(38, 23);
  ctx.bezierCurveTo(39, 24, 39, 26, 39, 27);
  ctx.bezierCurveTo(39, 28, 38, 29, 38, 30);
  ctx.lineTo(38, 30);
  ctx.lineTo(41, 32);
  ctx.lineTo(50, 34);
  ctx.bezierCurveTo(53, 35, 57, 33, 57, 30);
  ctx.lineTo(57, 25);
  ctx.bezierCurveTo(57, 22, 54, 19, 50, 20);
  ctx.moveTo(20, 32);
  ctx.lineTo(11, 41);
  ctx.bezierCurveTo(10, 42, 11, 44, 12, 44);
  ctx.lineTo(13, 44);
  ctx.bezierCurveTo(14, 44, 14, 45, 14, 45);
  ctx.bezierCurveTo(14, 46, 16, 47, 16, 46);
  ctx.lineTo(29, 34);
  ctx.lineTo(29, 33);
  ctx.bezierCurveTo(27, 33, 25, 32, 24, 30);
  ctx.lineTo(23, 30);
  ctx.lineTo(21, 31);
  ctx.lineTo(20, 32); */
}
requestAnimationFrame(loop);
