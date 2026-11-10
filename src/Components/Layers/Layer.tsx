import type { LayerUpdate, Overlay } from "./types";

interface LayerProps {
  layer: Overlay;
  updateLayer: (update: LayerUpdate) => void;
}

const Layer = ({ layer, updateLayer }: LayerProps) => {
  const { name, visible, opacity, legendUrl } = layer;
  return (
    <div className="layer__item">
      <input
        type="checkbox"
        name={name}
        id={name}
        checked={visible === true}
        onChange={(e) => {
          updateLayer({
            layer,
            visible: e.target.checked,
            opacity,
          });
        }}
      />
      <label className="layer__label" htmlFor={name}>
        {name}
      </label>
      <input
        type="range"
        min={0}
        max={1}
        step={0.1}
        value={opacity}
        onChange={(e) => {
          updateLayer({
            layer,
            opacity: e.target.value,
            visible,
          });
        }}
      />
      <a href={legendUrl}>Legend</a>
    </div>
  );
};

export default Layer;
