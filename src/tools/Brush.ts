import Tool from "./Tool";

export default class Brush extends Tool {
  constructor(
    canvas: HTMLCanvasElement,
    public mouseDown: boolean = false
  ) {
    super(canvas);
    this.listen();
  }

  listen = () => {
    this.canvas.onmousemove = (e) => this.mouseMoveHandler(e);
    this.canvas.onmouseup = () => this.mouseUpHandler();
    this.canvas.onmousedown = (e) => this.mouseDownHandler(e);
  };

  mouseUpHandler = () => {
    this.mouseDown = false;
  };

  mouseDownHandler = (e: MouseEvent) => {
    this.mouseDown = true;
    this.ctx?.beginPath();
    this.ctx?.moveTo(
      e.pageX - (e.target as HTMLCanvasElement).offsetLeft,
      e.pageY - (e.target as HTMLCanvasElement).offsetTop
    );
  };

  mouseMoveHandler = (e: MouseEvent) => {
    if (this.mouseDown) {
      this.draw(
        e.pageX - (e.target as HTMLCanvasElement).offsetLeft,
        e.pageY - (e.target as HTMLCanvasElement).offsetTop
      );
    }
  };

  draw(x: number, y: number) {
    this.ctx?.lineTo(x, y);
    this.ctx?.stroke();
  }
}
