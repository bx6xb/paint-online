import { Route, Routes } from "react-router-dom"
import Canvas from "./components/Canvas"
import SettingBar from "./components/SettingBar"
import Toolbar from "./components/Toolbar"
import "./style/app.scss"

function App() {
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
