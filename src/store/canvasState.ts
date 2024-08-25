import { makeAutoObservable } from "mobx"

export type Canvas = HTMLCanvasElement | null

class CanvasState {
  canvas: Canvas = null
  
  constructor() {
    makeAutoObservable(this)
  }

  setCanvas(canvas: Canvas) {
    this.canvas = canvas
  }
}

export default new CanvasState()
