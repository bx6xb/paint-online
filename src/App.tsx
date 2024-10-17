import { Route, Routes, useNavigate, useParams } from "react-router-dom"
import Canvas from "./components/Canvas"
import SettingBar from "./components/SettingBar"
import Toolbar from "./components/Toolbar"
import "./style/app.scss"
import { useEffect } from "react"

function App() {
  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    if (!id) {
      const uniqueId = `f${(+new Date()).toString(16)}`
      navigate(`/${uniqueId}`, { replace: true })
    }
  }, [id, navigate])

  return (
    <div className="app">
      <Routes>
        <Route
          path="/:id"
          element={
            <>
              <Toolbar />
              <SettingBar />
              <Canvas />
            </>
          }
        />
      </Routes>
    </div>
  )
}

export default App
