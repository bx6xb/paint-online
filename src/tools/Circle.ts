import Rect from "./Rect"

export default class Circle extends Rect {
  mouseMoveHandler(e: MouseEvent) {
    if (this.mouseDown) {
      const currentX = e.pageX - (e.target as HTMLCanvasElement).offsetLeft
      const currentY = e.pageY - (e.target as HTMLCanvasElement).offsetTop
      const radius = Math.sqrt(
        Math.abs(this.startX - currentX) ** 2 +
          Math.abs(this.startY - currentY) ** 2
      )

      this.draw(this.startX, this.startY, radius)
    }
  }

  draw(x: number, y: number, r: number) {
    const img = new Image()
    img.src = this.saved
    img.onload = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
      this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
      this.ctx.beginPath()
      this.ctx.arc(x, y, r, 0, 2 * Math.PI)
      this.ctx.fill()
    }
  }
}
