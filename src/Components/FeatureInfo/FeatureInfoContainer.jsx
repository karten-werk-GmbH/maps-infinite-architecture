import { useEffect, useState, useRef } from "react";
import "./featureInfos.css";
import FeatureInfoPresenter from "./FeatureInfoPresenter";
import AttributeTable from "./AttributeTable";

const FeatureInfoContainer = (props) => {
  const [featureInfos, setFeatureInfos] = useState(null);
  const featureInfoPresenter = useRef(new FeatureInfoPresenter());
  const handleClickEvents = async (e, map) => {
    const resolution = map.getView().getResolution();
    const layers = map.getLayers().getArray();
    const projection = map.getView().getProjection();
    const queryLayers = layers.filter((layer) => {
      return (
        layer.getVisible() === true &&
        layer.getZIndex() !== 0 &&
        layer.get("type") === "overlay"
      );
    });

    featureInfoPresenter.current.getFeatureInfos({
      event: e,
      queryLayers,
      projection,
      resolution,
    });
  };

  useEffect(() => {
    const map = props.map;
    const componentCb = (vm) => {
      setFeatureInfos(vm);
      if (!vm.vectorLayer.get("map")) {
        map.addLayer(vm.vectorLayer);
      }
    };

    if (map) {
      map.un("click", (e) => handleClickEvents(e, map));
      map.on("click", (e) => handleClickEvents(e, map));
      featureInfoPresenter.current.subscribe(componentCb);
    }
  }, [props.map]);
  if (featureInfos && featureInfos.available) {
    return (
      <div className="featureInfoContainer">
        {featureInfos.features.map((feature, id) => (
          <AttributeTable feature={feature} key={id} />
        ))}
      </div>
    );
  }
  if (featureInfos && featureInfos.error) {
    return (
      <div className="featureInfoContainer">
        Sorry, we were not able to get feature information:
        <br />
        Message:{featureInfos.error}
      </div>
    );
  }

  return <div className="featureInfoContainer">No Feature Infos available</div>;
};
export default FeatureInfoContainer;
