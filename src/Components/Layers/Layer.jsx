import PropTypes from "prop-types";

const Layer = ({ layer, updateLayer }) => {
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
            opacity: layer.opacity,
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
            visible: layer.visible,
          });
        }}
      />
      <a href={legendUrl}>Legend</a>
    </div>
  );
};

export default Layer;

Layer.propTypes = {
  layer: PropTypes.object.isRequired,
  updateLayer: PropTypes.func.isRequired,
};
