import { useEffect, useState } from "react";
import { useInject } from "../../Shared/IOC/useInject";
import "./featureInfos.css";
import AttributeTable, { type FeatureInfo } from "./AttributeTable";
import type OlMap from "ol/Map";
import type MapBrowserEvent from "ol/MapBrowserEvent";
import type BaseLayer from "ol/layer/Base";

/** The view model delivered by FeatureInfoPresenter.subscribe. */
interface FeatureInfoVm {
  available: boolean;
  error?: string;
  vectorLayer: BaseLayer;
  features: FeatureInfo[];
}

interface FeatureInfoContainerProps {
  map: OlMap | null;
}

const FeatureInfoContainer = (props: FeatureInfoContainerProps) => {
  const [featureInfos, setFeatureInfos] = useState<FeatureInfoVm | null>(
    null,
  );
  const featureInfoPresenter = useInject("featureInfoPresenter");
  const handleClickEvents = async (e: MapBrowserEvent, map: OlMap) => {
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

    featureInfoPresenter.getFeatureInfos({
      event: e,
      queryLayers,
      projection,
      resolution,
    });
  };

  useEffect(() => {
    const map = props.map;

    if (map) {
      const componentCb = (vm: FeatureInfoVm) => {
        setFeatureInfos(vm);
        if (!vm.vectorLayer.get("map")) {
          map.addLayer(vm.vectorLayer);
        }
      };
      map.on("click", (e) => handleClickEvents(e, map));
      featureInfoPresenter.subscribe(componentCb);
    }
    return () => {
      if (map) {
        map.un("click", (e) => handleClickEvents(e, map));
      }
    };
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
