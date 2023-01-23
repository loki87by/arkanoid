const height = window.innerHeight;
export const HEIGHT = Math.floor(height / 50) * 50;
const point = HEIGHT / 500;
export const CANVAS = document.querySelector("canvas");
export const CTX = CANVAS.getContext("2d");
export const DATA = document.getElementById("data");
export const SCORE = document.getElementById("score");
export const LIFES = document.getElementById("lifes");
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