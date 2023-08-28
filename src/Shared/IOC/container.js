import FeatureInfoPresenter from "../../Components/FeatureInfo/FeatureInfoPresenter";
import MapPresenter from "../../Components/Map/MapPresenter";
import LayerPresenter from "../../Components/Layers/LayerPresenter";
import mapRepository from "../../Components/Map/MapRepository";
import featureInfoRepository from "../../Components/FeatureInfo/FeatureInfoRepository";

const container = {
  registry: {
    featureInfoPresenter: new FeatureInfoPresenter(featureInfoRepository),
    mapPresenter: new MapPresenter(mapRepository),
    layerPresenter: new LayerPresenter(mapRepository),
  },
  resolve(identifier) {
    if (!Object.prototype.hasOwnProperty.call(this.registry, identifier)) {
      throw new Error(
        `Object with identifier ${identifier} not found in container.`,
      );
    }
    return this.registry[identifier];
  },
};

export default container;
