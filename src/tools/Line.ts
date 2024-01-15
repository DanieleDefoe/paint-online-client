import Tool from "./Tool";

export default class Line extends Tool {
  constructor(
    canvas: HTMLCanvasElement,
    public mouseDown: boolean = false
  ) {
    super(canvas);
    this.listen();
  }

  listen = () => {
    this.canvas.onmouseup = (e) => this.mouseUpHandler(e);
    this.canvas.onmousedown = (e) => this.mouseDownHandler(e);
  };

  mouseUpHandler = (e: MouseEvent) => {
    this.mouseDown = false;
    this.draw(
      e.pageX - (e.target as HTMLCanvasElement).offsetLeft,
      e.pageY - (e.target as HTMLCanvasElement).offsetTop
    );
  };

  mouseDownHandler = (e: MouseEvent) => {
    this.mouseDown = true;
    this.ctx?.beginPath();
    this.ctx?.moveTo(
      e.pageX - (e.target as HTMLCanvasElement).offsetLeft,
      e.pageY - (e.target as HTMLCanvasElement).offsetTop
    );
  };

  draw(x: number, y: number) {
    this.ctx?.lineTo(x, y);
    this.ctx?.stroke();
  }
}
