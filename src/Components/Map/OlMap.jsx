import Map from "ol/Map";
import View from "ol/View";
import { useInject } from "../../Shared/IOC/useInject";
import { useEffect, useState } from "react";
import LayerControl from "../Layers/LayerControl";
import FeatureInfoContainer from "../FeatureInfo/FeatureInfoContainer";
import "./olMap.css";
const OlMap = () => {
  const mapPresenter = useInject("mapPresenter");
  const [olMap, setOlMap] = useState(null);

  useEffect(() => {
    let cancelled = false;
    let map = null;
    const load = async () => {
      const vm = await mapPresenter.initMap();
      // the effect may have been cleaned up while the config was loading
      if (vm && !cancelled) {
        map = new Map({
          target: "olMap",
          layers: [vm.basemap],
          view: new View({
            zoom: vm.zoom,
            center: vm.center,
          }),
        });
        addMapEventListeners(map, mapPresenter);
        setOlMap(map);
      }
    };
    load();
    return () => {
      cancelled = true;
      if (map) {
        map.setTarget(undefined); // detach from the DOM and release listeners
        setOlMap(null);
      }
    };
  }, [mapPresenter]);

  return (
    <>
      <div id="olMap"></div>
      <FeatureInfoContainer map={olMap} />
      <LayerControl map={olMap} />
    </>
  );
};
export default OlMap;

function addMapEventListeners(map, presenter) {
  map.on("moveend", (e) => {
    const view = e.map.getView();
    const params = {
      zoom: parseInt(view.getZoom()),
      center: view.getCenter(),
    };
    presenter.updatePm(params);
  });
}
