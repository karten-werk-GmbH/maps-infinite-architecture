import { useEffect, useState } from "react";
import Layer from "./Layer";
import "./layers.css";
import { useInject } from "../../Shared/IOC/useInject";
import type OlMap from "ol/Map";
import type BaseLayer from "ol/layer/Base";
import type { Overlay } from "./types";

interface LayerControlProps {
  map: OlMap | null;
}

const LayerControl = (props: LayerControlProps) => {
  const layerPresenter = useInject("layerPresenter");
  const [layers, setLayers] = useState<Overlay[]>([]);
  // the map layers only change when the set of overlays changes, not on every
  // visibility/opacity update, so keep the previous array when nothing changed
  const [tileLayers, setTileLayers] = useState<BaseLayer[]>([]);

  useEffect(() => {
    const load = async () => {
      const callback = (vm: Overlay[] | undefined) => {
        if (vm) {
          setLayers(vm);
          setTileLayers((previous) => {
            const next = vm.map((layer) => layer.tileLayer);
            const unchanged =
              previous.length === next.length &&
              previous.every((tileLayer, i) => tileLayer === next[i]);
            return unchanged ? previous : next;
          });
        }
      };
      await layerPresenter.initLayers(callback);
    };
    load();
  }, [layerPresenter]);

  useEffect(() => {
    const map = props.map;
    if (!map) return;
    tileLayers.forEach((tileLayer) => {
      map.addLayer(tileLayer);
    });
    return () => {
      tileLayers.forEach((tileLayer) => {
        map.getLayers().remove(tileLayer);
      });
    };
  }, [props.map, tileLayers]);

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
