import Rect from "./Rect"

export default class Line extends Rect {
  mouseDownHandler(e: MouseEvent) {
    this.mouseDown = true
    this.startX = e.pageX - (e.target as HTMLCanvasElement).offsetLeft
    this.startY = e.pageY - (e.target as HTMLCanvasElement).offsetTop
    this.saved = this.canvas.toDataURL()
  }
  mouseMoveHandler(e: MouseEvent) {
    if (this.mouseDown) {
      const currentX = e.pageX - (e.target as HTMLCanvasElement).offsetLeft
      const currentY = e.pageY - (e.target as HTMLCanvasElement).offsetTop

      this.draw(currentX, currentY)
    }
  }

  draw(x: number, y: number) {
    const img = new Image()
    img.src = this.saved
    img.onload = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
      this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
      this.ctx.beginPath()
      this.ctx.moveTo(this.startX, this.startY)
      this.ctx.lineTo(x, y)
      this.ctx.stroke()
    }
  }
}
