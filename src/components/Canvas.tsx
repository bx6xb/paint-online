import { useEffect, useRef, useState } from "react"
import "../style/canvas.scss"
import { observer } from "mobx-react-lite"
import canvasState from "../store/canvasState"
import toolState from "../store/toolState"
import Brush from "../tools/Brush"
import { Button, Modal } from "react-bootstrap"
import { useParams } from "react-router-dom"

const Canvas = observer(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const usernameRef = useRef<HTMLInputElement | null>(null)
  const [modal, setModal] = useState(true)
  const { id } = useParams()

  useEffect(() => {
    canvasState.setCanvas(canvasRef.current)
    toolState.setTool(new Brush(canvasRef.current!))
  }, [])

  useEffect(() => {
    if (canvasState.username) {
      const socket = new WebSocket("ws://localhost:5000")
      socket.onopen = () => {
        console.log("Connected to the server")

        socket.send(
          JSON.stringify({
            id,
            username: canvasState.username,
            method: "connection",
          })
        )
        socket.onmessage = (event) => {
          console.log(event.data)
        }
      }
    }
  }, [canvasState.username])

  const onMouseDown = () => {
    canvasState.pushToUndo(canvasRef.current!.toDataURL())
  }

  const connectHandler = () => {
    const value = usernameRef.current!.value
    if (value) {
      canvasState.setUsername(value)
      setModal(false)
    }
  }

  return (
    <div className="canvas">
      <Modal show={modal} onHide={() => {}}>
        <Modal.Header>
          <Modal.Title>Type name</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input type="text" ref={usernameRef} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={connectHandler}>
            Sign In
          </Button>
        </Modal.Footer>
      </Modal>

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
