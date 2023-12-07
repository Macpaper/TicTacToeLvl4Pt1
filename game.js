import Square from "./square.js";
import Input from "./input.js";

export default class Game {
  constructor(W, H) {
    this.gameWidth = W;
    this.gameHeight = H;

    this.squareSize = this.gameHeight / 5;

    this.input = new Input(this);
    
    this.turn = 0;

    this.squares = [];
    this.makeBoard();
  }

  makeBoard() {
    for(let col = 0; col < 3; col++) {
      for (let row = 0; row < 3; row++) {
        let square = new Square(this, col * (this.squareSize + this.squareSize/20) + this.gameWidth / 2 - (this.squareSize * 3 + 3*this.squareSize/20)/2, row * (this.squareSize + this.squareSize/20) + this.squareSize,  this.squareSize);
        this.squares.push(square);
        console.log(square.x, square.y);
      }
    }
  }

  update() {
    this.squares.forEach(s => {
      s.update();
    });
  }

  draw(ctx) {
    ctx.clearRect(0, 0, this.gameWidth, this.gameHeight);
    ctx.fillStyle = "rgb(50, 50, 50)";
    ctx.fillRect(0, 0, this.gameWidth, this.gameHeight);
    this.squares.forEach(s => {
      s.draw(ctx);
    });
    this.input.draw(ctx);
  }
}