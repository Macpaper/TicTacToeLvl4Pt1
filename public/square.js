export default class Square {
  constructor(game, x, y, size, num, row, col) {
    this.game = game;

    this.size = size;

    this.num = num;

    this.mouseX = this.game.input.mouseX;
    this.mouseY = this.game.input.mouseY;
    this.col = col;
    this.row = row;
    // col * (this.squareSize + this.squareSize/20) + this.gameWidth / 2 - (this.squareSize * 3 + 3*this.squareSize/20)/2,
    //  row * (this.squareSize + this.squareSize/20) + this.squareSize
    this.x = x;
    this.y = y;

    this.hovering = false;

    this.clickingCheck = false;

    this.choice = "e";
  }

  update() {
    this.x = this.col * (this.game.squareSize + this.game.squareSize / 20) + this.game.gameWidth / 2 - (this.game.squareSize * 3 + 3 * this.game.squareSize / 20) / 2;
    this.y = this.row * (this.game.squareSize + this.game.squareSize / 20) + this.game.squareSize;
    this.size = this.game.squareSize;
    this.mouseX = this.game.input.mouseX;
    this.mouseY = this.game.input.mouseY;
    this.clicking = this.game.input.clicking;

    this.hovering = false;
    if (this.mouseX > this.x && this.mouseX < this.x + this.size && this.mouseY > this.y && this.mouseY < this.y + this.size) {
      this.hovering = true;
      
      // if hovering and clicking,
      if (this.clicking) {
        this.clickingCheck = true;
      }

      // if you are hovering and RELEASE clicking while on the square....
      if (!this.clicking) {
        if (this.clickingCheck) {
          this.clickingCheck = false;
        
          if (this.game.turn % 2 == 0 && this.game.myTurn == 'x'||
              this.game.turn % 2 == 1 && this.game.myTurn == 'o') {

                if (this.choice == "e" && this.game.winner == "e") {
                  let piece = 1;
                  if (this.game.myTurn == 'o') {
                    piece = 2;
                  }
                  this.game.socket.emit("next turn", this.num, piece, this.game.turn + 1);
                }  
          }
        }
      }
    } else {
      this.clickingCheck = false;
    }
  }

  draw(ctx) {
    this.color = "rgb(90, 200, 230)";
    if (this.hovering) {
      this.color = "rgb(30, 90, 250)";
      if (this.clicking) {
        this.color = "black";
      }
    }
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.size, this.size);

    if (this.choice != "e") {
      ctx.fillStyle = "black";
      ctx.font = "bold 24px serif";
      ctx.fillText(this.choice, this.x + this.size/2, this.y + this.size/2);
    }

    // debugging for square num
    // ctx.fillStyle = "black";
    // ctx.font = "bold 24px serif";
    // ctx.fillText(this.num, this.x + this.size/2, this.y + this.size/2);
  }
}