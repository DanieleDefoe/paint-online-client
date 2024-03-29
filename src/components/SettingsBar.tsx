import toolState from "@/store/toolState";

const SettingsBar = () => {
  return (
    <div className="settings-toolbar">
      <label htmlFor="line-width">Толщина линии</label>
      <input
        onChange={(e) => toolState.setLineWidth(Number(e.target.value))}
        style={{ margin: "0 10px" }}
        id="line-width"
        type="number"
        defaultValue={1}
        min={1}
        max={50}
      />
      <label htmlFor="stroke-color">Цвет обводки</label>
      <input
        onChange={(e) => toolState.setStrokeColor(e.target.value)}
        style={{ margin: "0 10px" }}
        id="stroke-color"
        type="color"
      />
    </div>
  );
};

export default SettingsBar;
