import Tool from "./Tool";

export default class Rect extends Tool {
  public startX: number = 0;
  public startY: number = 0;
  public saved: string = "";

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

    this.startX = e.pageX - (e.target as HTMLCanvasElement).offsetLeft;
    this.startY = e.pageY - (e.target as HTMLCanvasElement).offsetTop;

    this.saved = this.canvas.toDataURL();
  };

  mouseMoveHandler = (e: MouseEvent) => {
    if (this.mouseDown) {
      const currentX = e.pageX - (e.target as HTMLCanvasElement).offsetLeft;
      const currentY = e.pageY - (e.target as HTMLCanvasElement).offsetTop;

      const width = currentX - this.startX;
      const height = currentY - this.startY;

      this.draw(this.startX, this.startY, width, height);
    }
  };

  draw(x: number, y: number, w: number, h: number) {
    const img = new Image();
    img.src = this.saved;
    img.onload = () => {
      this.ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx?.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
      this.ctx?.beginPath();
      this.ctx?.rect(x, y, w, h);
      this.ctx?.fill();
      this.ctx?.stroke();
    };
  }
}
