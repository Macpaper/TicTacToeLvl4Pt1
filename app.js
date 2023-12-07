import Game from "./game.js";

const canv = document.querySelector("canvas");
const ctx = canv.getContext("2d");

const WIDTH = canv.width = window.innerWidth;
const HEIGHT = canv.height = window.innerHeight;

let game = new Game(WIDTH, HEIGHT);

function animate() { 
  game.update();
  game.draw(ctx);
}

setInterval(animate, 17);