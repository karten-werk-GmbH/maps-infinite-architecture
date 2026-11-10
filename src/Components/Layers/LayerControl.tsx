import { useEffect, useState } from "react";
import Layer from "./Layer";
import "./layers.css";
import { useInject } from "../../Shared/IOC/useInject";
import type OlMap from "ol/Map";
import type { Overlay } from "./types";

interface LayerControlProps {
  map: OlMap | null;
}

const LayerControl = (props: LayerControlProps) => {
  const layerPresenter = useInject("layerPresenter");
  const [layers, setLayers] = useState<Overlay[]>([]);

  useEffect(() => {
    const load = async () => {
      const callback = (vm: Overlay[] | undefined) => {
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
        map.addLayer(layer.tileLayer);
      });
    }
    return () => {
      if (map && layers.length > 0) {
        layers.forEach((layer) => {
          map.getLayers().remove(layer.tileLayer);
        });
      }
    };
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
