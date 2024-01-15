export default class Tool {
  constructor(
    public canvas: HTMLCanvasElement,
    public ctx = canvas.getContext("2d")
  ) {
    this.destroyEvents();
  }

  set fillColor(color: string) {
    this.ctx!.fillStyle = color;
  }

  set strokeColor(color: string) {
    this.ctx!.strokeStyle = color;
  }

  set lineWidth(width: number) {
    this.ctx!.lineWidth = width;
  }

  destroyEvents = () => {
    this.canvas.onmousemove = null;
    this.canvas.onmouseup = null;
    this.canvas.onmousedown = null;
  };
}
