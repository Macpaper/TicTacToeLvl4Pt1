import Game from "./game.js";
let socket = io();

const form = document.getElementById("message-form");
const msgBox = document.getElementById("input-text");
const sendButton = document.getElementById("send-button");
const msgContainer = document.getElementById("input-container");
const chatMessages = document.getElementById("messages");

form.addEventListener("submit", sendMessage);
sendButton.addEventListener("click", sendMessage);

function sendMessage(e) {
  e.preventDefault();
  socket.emit("send message", msgBox.value);
  msgBox.value = "";
}


const canv = document.querySelector("canvas");
const ctx = canv.getContext("2d");

const WIDTH = canv.width = window.innerWidth * 5/8;
const HEIGHT = canv.height = window.innerHeight;

console.log(window.location.href);
let url = window.location.href;



let urlArr = url.split('/');
let roomID = urlArr[4];


socket.emit("join room", roomID, localStorage.getItem("xID"), localStorage.getItem("oID"));
console.log(localStorage.getItem("xID"), localStorage.getItem("oID"))
let game = new Game(WIDTH, HEIGHT, canv);

function animate() { 
  canv.width = window.innerWidth * 5/8;
  canv.height = window.innerHeight;
  game.update(canv.width, canv.height);
  game.draw(ctx);
}

socket.on("receive message", msg => {
  let msgNode = document.createElement("p");
  msgNode.textContent = msg;
  msgNode.setAttribute('id', "message");
  chatMessages.appendChild(msgNode);
});

socket.on("o rejoins", (id, squares, turn) => {
  game.myTurn = 'o';
  for(let i = 0; i < 9; i++) {
    if (squares[i] == 1) {
      game.squares[i].choice = 'X';
    }
    if (squares[i] == 2) {
      game.squares[i].choice = 'O';
    }
  }
  game.turn = turn;
  startGame(id);
  game.checkWin();
});

socket.on("x rejoins", (id, squares, turn) => {
  game.myTurn = 'x';
  for(let i = 0; i < 9; i++) {
    if (squares[i] == 1) {
      game.squares[i].choice = 'X';
    }
    if (squares[i] == 2) {
      game.squares[i].choice = 'O';
    }
  }
  game.turn = turn;
  startGame(id);
  game.checkWin();
});

socket.on("set x", (xID) => {
  game.myTurn = 'x';
  localStorage.setItem("xID", xID);
  console.log("YOUR X ID IS: " + localStorage.getItem("xID"));
});

socket.on("give o id", oID => {
  localStorage.setItem("oID", oID);
  console.log("YOUR O ID IS: " + localStorage.getItem("oID"));
});

socket.on("start host", () => {
  socket.emit("start guest");
});

socket.on("start game", (id) => {
  startGame(id);
});

function startGame(id) {
  game.start = true;
  game.roomID = id;
  game.socket = socket;
}

socket.on("next turn", squareNum => {
  game.squares.forEach(square => {
    if (square.num == squareNum) {
      game.turn % 2 == 0 ? square.choice = "X" : square.choice = "O";
    }
  });
  // 
  game.turn += 1;
  game.checkWin();
});

setInterval(animate, 17);
