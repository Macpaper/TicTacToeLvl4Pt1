import Game from "./game.js";

const canv = document.querySelector("canvas");
const ctx = canv.getContext("2d");

const WIDTH = canv.width = window.innerWidth;
const HEIGHT = canv.height = window.innerHeight;


let socket = io();
let url = window.location.href;
let urlArr = url.split('/');
let roomID = urlArr[4];
let game = new Game(WIDTH, HEIGHT, roomID);

socket.emit('join room', roomID);
// socket.on("get roomID", roomID => {
//   alert("Your room ID is: " + roomID);
// });

socket.on("start host", () => {
  game.start = true;
  game.socket = socket;
  console.log("BOTH PLAYERS GET THIS BROADCAST")
});

socket.on("start x", () => {
  game.myTurn = 'x';
  console.log("ONLY HOST GETS THIS BROADCAST")
});

// squareNum is the square that was clicked. so this is telling the other player
socket.on("next turn", squareNum => {
  game.turn % 2 == 0 ? game.squares[squareNum].choice = "X" : game.squares[squareNum].choice = "O";
  game.turn += 1;
  if(game.checkWin() != 'e') {
    game.winner = game.checkWin();
  }
});

function animate() { 
  game.update();
  game.draw(ctx);
}

setInterval(animate, 17);