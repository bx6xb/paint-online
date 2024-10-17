import { useEffect, useRef } from "react"
import "../style/canvas.scss"
import { observer } from "mobx-react-lite"
import canvasState from "../store/canvasState"
import toolState from "../store/toolState"
import Brush from "../tools/Brush"

const Canvas = observer(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    canvasState.setCanvas(canvasRef.current)
    toolState.setTool(new Brush(canvasRef.current!))
  }, [])

  const onMouseDown = () => {
    canvasState.pushToUndo(canvasRef.current!.toDataURL())
  }

  return (
    <div className="canvas">
      <canvas
        ref={canvasRef}
        width={600}
        height={400}
        onMouseDown={onMouseDown}
      />
    </div>
  )
})

export default Canvas
