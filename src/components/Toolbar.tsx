import { ChangeEvent, useEffect } from "react"
import canvasState from "../store/canvasState"
import toolState from "../store/toolState"
import "../style/toolbar.scss"
import Brush from "../tools/Brush"
import Circle from "../tools/Circle"
import Eraser from "../tools/Eraser"
import Line from "../tools/Line"
import Rect from "../tools/Rect"
import { useNavigate, useParams } from "react-router-dom"

const Toolbar = () => {
  const navigate = useNavigate()
  const { id } = useParams()

  console.log(id)

  useEffect(() => {
    if (!id) {
      const uniqueId = `f${(+new Date()).toString(16)}`
      navigate(`/${uniqueId}`, { replace: true })
    }
  }, [id, navigate])

  const changeColor = (e: ChangeEvent<HTMLInputElement>) => {
    toolState.setStrokeColor(e.currentTarget.value)
    toolState.setFillColor(e.currentTarget.value)
  }

  const download = () => {
    const dataUrl = canvasState.canvas!.toDataURL()
    const a = document.createElement("a")
    a.href = dataUrl
    a.download = canvasState.sessionId + ".jpg"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  return (
    <div className="toolbar">
      <button
        className="toolbar__btn brush"
        onClick={() =>
          toolState.setTool(
            new Brush(
              canvasState.canvas!,
              canvasState.socket,
              canvasState.sessionId
            )
          )
        }
      />
      <button
        className="toolbar__btn rect"
        onClick={() =>
          toolState.setTool(
            new Rect(
              canvasState.canvas!,
              canvasState.socket,
              canvasState.sessionId
            )
          )
        }
      />
      <button
        className="toolbar__btn circle"
        onClick={() => toolState.setTool(new Circle(canvasState.canvas!))}
      />
      <button
        className="toolbar__btn eraser"
        onClick={() => toolState.setTool(new Eraser(canvasState.canvas!))}
      />
      <button
        className="toolbar__btn line"
        onClick={() => toolState.setTool(new Line(canvasState.canvas!))}
      />
      <input style={{ marginLeft: 16 }} type="color" onChange={changeColor} />
      <button
        className="toolbar__btn undo"
        onClick={() => canvasState.undo()}
      />
      <button
        className="toolbar__btn redo"
        onClick={() => canvasState.redo()}
      />
      <button className="toolbar__btn save" onClick={download} />
    </div>
  )
}

export default Toolbar
