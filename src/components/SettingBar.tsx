import toolState from "../store/toolState"
import "../style/setting-bar.scss"

const SettingBar = () => {
  return (
    <div className="setting-bar">
      <label>
        Line width{" "}
        <input
          type="number"
          defaultValue={1}
          min={1}
          max={50}
          onChange={(e) => toolState.setLineWidth(+e.currentTarget.value)}
        />
      </label>

      <label>
        Stroke color
        <input
          type="color"
          onChange={(e) => toolState.setStrokeColor(e.currentTarget.value)}
        />
      </label>
    </div>
  )
}

export default SettingBar
