import Tool from "./Tool"

export default class Brush extends Tool {
  mouseDown: boolean = false

  constructor(canvas: HTMLCanvasElement, socket: any, id: string) {
    super(canvas, socket, id)
    this.listen()
  }

  listen() {
    this.canvas.onmouseup = this.mouseUpHandler.bind(this)
    this.canvas.onmousedown = this.mouseDownHandler.bind(this)
    this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
  }

  mouseUpHandler() {
    this.mouseDown = false

    this.socket.send(
      JSON.stringify({
        method: "draw",
        id: this.id,
        figure: {
          type: "finish",
        },
      })
    )
  }
  mouseDownHandler(e: MouseEvent) {
    this.mouseDown = true
    this.ctx.beginPath()
    this.ctx.moveTo(
      e.pageX - (e.target as HTMLCanvasElement).offsetLeft,
      e.pageY - (e.target as HTMLCanvasElement).offsetTop
    )
  }
  mouseMoveHandler(e: MouseEvent) {
    if (this.mouseDown) {
      this.socket.send(
        JSON.stringify({
          method: "draw",
          id: this.id,
          figure: {
            type: "brush",
            x: e.pageX - (e.target as HTMLCanvasElement).offsetLeft,
            y: e.pageY - (e.target as HTMLCanvasElement).offsetTop,
          },
        })
      )
    }
  }

  static draw(ctx: CanvasRenderingContext2D, x: number, y: number) {
    ctx.lineTo(x, y)
    ctx.stroke()
  }
}
