import Square from "./square.js";
import Input from "./input.js";

export default class Game {
  constructor(W, H, canv) {
    this.gameWidth = W;
    this.gameHeight = H;
    this.start = false;
    this.squareSize = this.gameHeight / 5;
    this.canv = canv;
    this.input = new Input(this);

    this.turn = 0;

    this.squares = [];
    this.makeBoard();
    
    this.myTurn = 'o';
    this.roomID = '';

    this.winner = "e";
  }

  makeBoard() {
    let count = 0;
    for(let col = 0; col < 3; col++) {
      for (let row = 0; row < 3; row++) {
        let square = new Square(this, col * (this.squareSize + this.squareSize/20) + this.gameWidth / 2 - (this.squareSize * 3 + 3*this.squareSize/20)/2, row * (this.squareSize + this.squareSize/20) + this.squareSize,  this.squareSize, count, row, col);
        count += 1;
        this.squares.push(square);
        console.log(square.x, square.y);
      }
    }
  }

  checkWin() {
    let winCons = [[0,3,6],[1,4,7],[2,5,8],
                   [0,1,2],[3,4,5],[6,7,8],
                   [0,4,8],[2,4,6]];
    
    winCons.forEach(con => {
      let [a, b, c] = con;
      if (this.squares[a].choice != "e" && this.squares[a].choice == this.squares[b].choice && this.squares[a].choice == this.squares[c].choice) {
        this.winner = this.squares[a].choice;
      }
    });

    let draw = true;
    this.squares.forEach(s => {
      // if there is a winner OR an empty square, then no draw yet
      // contrapositive: if there isn't a winner AND no empty squares, then there's a draw
      if (this.winner != "e" || s.choice == "e") {
        draw = false;
      } 
    });

    if (draw) {
      this.winner = "NOBODY";
    }
  }

  update(w, h) {
    this.squareSize = this.gameHeight / 5;
    this.gameWidth = w;
    this.gameHeight = h;
    if(this.start) {
      this.squares.forEach(s => {
        s.update();
      });
    }

    this.input.update();
  }

  draw(ctx) {
    ctx.clearRect(0, 0, this.gameWidth, this.gameHeight);
    ctx.fillStyle = "rgb(50, 50, 50)";
    ctx.fillRect(0, 0, this.gameWidth, this.gameHeight);
    this.squares.forEach(s => {
      s.draw(ctx);
    });
    this.input.draw(ctx);

    if (this.winner != "e") {
      ctx.fillStyle = "black";
      ctx.font = "bold 48px serif";
      ctx.fillText(this.winner + " WINS!!!", this.gameWidth/2, this.gameHeight/10);
      
    }
    ctx.fillStyle = "black";
    ctx.font = "bold 48px serif";
    ctx.fillText("You are: " + this.myTurn.toUpperCase(), 50, 50);

  
  }
} 