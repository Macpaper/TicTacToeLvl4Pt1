export default class Square {
  constructor(game, x, y, size) {
    this.game = game;

    this.size = size;

    this.mouseX = this.game.input.mouseX;
    this.mouseY = this.game.input.mouseY;

    this.x = x;
    this.y = y;

    this.hovering = false;

    this.clicked = false;

    this.choice = "e";
  }

  update() {
    this.mouseX = this.game.input.mouseX;
    this.mouseY = this.game.input.mouseY;
    this.clicking = this.game.input.clicking;
    // console.log(this.mouseX);
    // console.log(this.mouseY)
    this.hovering = false;
    if (this.mouseX > this.x && this.mouseX < this.x + this.size && this.mouseY > this.y && this.mouseY < this.y + this.size) {
      this.hovering = true;
    } else {
      this.hovering = false;
    }

    if (this.clicking && this.hovering && this.choice == "e") {
      this.clicked = true;
      this.game.turn % 2 == 0 ? this.choice = "X" : this.choice = "O";
      this.game.turn += 1;
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
  }
}