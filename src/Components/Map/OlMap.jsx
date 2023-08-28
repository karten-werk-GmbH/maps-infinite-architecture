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
    const load = async () => {
      const vm = await mapPresenter.initMap();
      if (vm && olMap === null) {
        const map = new Map({
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
  }, []);

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
