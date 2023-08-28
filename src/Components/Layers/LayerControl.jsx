import { useRef, useEffect, useState } from "react";
import Layer from "./Layer";
import PropTypes from "prop-types";
import "./layers.css";
import { useInject } from "../../Shared/IOC/useInject";

const LayerControl = (props) => {
  const layerPresenter = useInject("layerPresenter");
  const [layers, setLayers] = useState([]);

  useEffect(() => {
    const load = async () => {
      const callback = (vm) => {
        if (vm) {
          setLayers(vm);
        }
      };
      await layerPresenter.initLayers(callback);
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
          updateLayer={layerPresenter.updateLayer}
        />
      ))}
    </div>
  );
};

export default LayerControl;

LayerControl.propTypes = {
  map: PropTypes.object,
};
