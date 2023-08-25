import { useRef, useEffect, useState } from "react";
import Layer from "./Layer";
import LayerPresenter from "./LayerPresenter";
import PropTypes from "prop-types";
import "./layers.css";

const LayerControl = (props) => {
  const layerPresenter = useRef(new LayerPresenter());
  const [layers, setLayers] = useState([]);

  useEffect(() => {
    const load = async () => {
      const callback = (vm) => {
        if (vm) {
          setLayers(vm);
        }
      };
      await layerPresenter.current.initLayers(callback);
    };
    load();
  }, []);

  useEffect(() => {
    const map = props.map;
    if (map && layers.length > 0) {
      layers.forEach((layer) => {
        map.getLayers().remove(layer.tileLayer);
        map.addLayer(layer.tileLayer);
      });
    }
  }, [props.map]);

  return (
    <div className="layers">
      <h3 className="layer__title">Layers</h3>
      {layers.map((overlay) => (
        <Layer
          key={overlay.name}
          layer={overlay}
          updateLayer={layerPresenter.current.updateLayer}
        />
      ))}
    </div>
  );
};

export default LayerControl;

LayerControl.propTypes = {
  map: PropTypes.object,
};
