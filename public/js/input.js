export default class Input {
  constructor(game) {
    this.clicking = false;

    this.mouseX = 0;
    this.mouseY = 0;

    this.init();
  }

  update() {

  }

  draw(ctx) {
    ctx.fillStyle = "rgb(230, 230, 230)";
    ctx.fillText("X: " + this.mouseX, this.mouseX + 10, this.mouseY);
    ctx.fillText("Y: " + this.mouseY, this.mouseX + 10, this.mouseY + 20);
  }

  init() {

    document.addEventListener("mousemove", e =>{
      this.mouseX = e.offsetX;
      this.mouseY = e.offsetY;
    });

    document.addEventListener("mousedown", e => {
      if (e.button == 0) {
        this.clicking = true;
      }
    });

    document.addEventListener("mouseup", e => {
      if (e.button == 0) {
        this.clicking = false;
      }
    });
  }
}