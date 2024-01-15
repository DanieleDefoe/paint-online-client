import { makeAutoObservable } from "mobx";

class CanvasState {
  canvas: HTMLCanvasElement | null = null;
  undoList: Array<string> = [];
  redoList: Array<string> = [];

  constructor() {
    makeAutoObservable(this);
  }

  setCanvas = (canvas: HTMLCanvasElement) => {
    this.canvas = canvas;
  };

  pushToUndo = (data: string) => {
    this.undoList.push(data);
  };

  pushToRedo = (data: string) => {
    this.redoList.push(data);
  };

  undo = () => {
    const ctx = this.canvas?.getContext("2d");
    if (this.undoList.length) {
      const dataURL = <string>this.undoList.pop();
      this.pushToRedo(this.canvas!.toDataURL());
      const img = new Image();
      img.src = dataURL;
      
      img.onload = () => {
        ctx?.clearRect(0, 0, this.canvas!.width, this.canvas!.height);
        ctx?.drawImage(img, 0, 0, this.canvas!.width, this.canvas!.height);
      };
    } else {
      ctx?.clearRect(0, 0, this.canvas!.width, this.canvas!.height);
    }
  };

  redo = () => {
    const ctx = this.canvas?.getContext("2d");
    if (this.redoList.length) {
      const dataURL = <string>this.redoList.pop();
      this.pushToUndo(this.canvas!.toDataURL())
      const img = new Image();
      img.src = dataURL;
      
      img.onload = () => {
        ctx?.clearRect(0, 0, this.canvas!.width, this.canvas!.height);
        ctx?.drawImage(img, 0, 0, this.canvas!.width, this.canvas!.height)
      }
    }
  };
}

export default new CanvasState();
