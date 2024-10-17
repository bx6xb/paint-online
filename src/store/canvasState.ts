import { makeAutoObservable } from "mobx"

export type Canvas = HTMLCanvasElement | null

class CanvasState {
  canvas: Canvas = null
  undoList: string[] = []
  redoList: string[] = []

  constructor() {
    makeAutoObservable(this)
  }

  setCanvas(canvas: Canvas) {
    this.canvas = canvas
  }

  pushToUndo(data: string) {
    this.undoList.push(data)
  }
  pushToRedo(data: string) {
    this.redoList.push(data)
  }
  undo() {
    const ctx = this.canvas!.getContext("2d")!

    if (this.undoList.length > 0) {
      const dataUrl = this.undoList.pop()!
      this.pushToRedo(this.canvas!.toDataURL())
      const img = new Image()
      img.src = dataUrl
      img.onload = () => {
        this.clearCanvas(ctx)
        ctx.drawImage(img, 0, 0, this.canvas!.width, this.canvas!.height)
      }
    } else {
      this.clearCanvas(ctx)
    }
  }
  redo() {
    const ctx = this.canvas!.getContext("2d")!

    if (this.redoList.length > 0) {
      const dataUrl = this.redoList.pop()!
      this.pushToUndo(this.canvas!.toDataURL())
      const img = new Image()
      img.src = dataUrl
      img.onload = () => {
        this.clearCanvas(ctx)
        ctx!.drawImage(img, 0, 0, this.canvas!.width, this.canvas!.height)
      }
    }
  }

  clearCanvas(ctx: CanvasRenderingContext2D) {
    ctx!.clearRect(0, 0, this.canvas!.width, this.canvas!.height)
  }
}

export default new CanvasState()
