import { useEffect, useRef, useState } from "react"
import "../style/canvas.scss"
import { observer } from "mobx-react-lite"
import canvasState from "../store/canvasState"
import toolState from "../store/toolState"
import Brush from "../tools/Brush"
import { Button, Modal } from "react-bootstrap"
import { useParams } from "react-router-dom"
import Rect from "../tools/Rect"
import axios from "axios"

const Canvas = observer(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const usernameRef = useRef<HTMLInputElement | null>(null)
  const [modal, setModal] = useState(true)
  const { id } = useParams()

  useEffect(() => {
    canvasState.setCanvas(canvasRef.current)
    axios.get(`http://localhost:5000/image?id=${id}`).then((res) => {
      const img = new Image()
      img.src = res.data
      img.onload = () => {
        const ctx = canvasRef.current!.getContext("2d")!

        ctx.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height)
        ctx.drawImage(
          img,
          0,
          0,
          canvasRef.current!.width,
          canvasRef.current!.height
        )
      }
    })
  }, [])

  useEffect(() => {
    if (canvasState.username) {
      const socket = new WebSocket("ws://localhost:5000")

      canvasState.setSocket(socket)
      canvasState.setSessionId(id!)

      toolState.setTool(new Brush(canvasRef.current!, socket, id!))

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
          const msg = JSON.parse(event.data)
          switch (msg.method) {
            case "connection": {
              console.log(`User '${msg.username}' has connected`)
              break
            }
            case "draw": {
              drawHadnler(msg)
              break
            }
          }
        }
      }
    }
  }, [canvasState.username])

  const drawHadnler = (msg: any) => {
    const figure = msg.figure
    const ctx = canvasRef.current!.getContext("2d")!

    switch (figure.type) {
      case "brush": {
        Brush.draw(ctx, figure.x, figure.y)
        break
      }
      case "rect": {
        Rect.staticDraw(
          ctx,
          figure.x,
          figure.y,
          figure.width,
          figure.height,
          figure.color
        )
        break
      }
      case "finish": {
        ctx.beginPath()
        break
      }
    }
  }

  const onMouseDown = () => {
    canvasState.pushToUndo(canvasRef.current!.toDataURL())
    axios
      .post(`http://localhost:5000/image?id=${id}`, {
        img: canvasRef.current?.toDataURL(),
      })
      .then((res) => console.log(res))
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
