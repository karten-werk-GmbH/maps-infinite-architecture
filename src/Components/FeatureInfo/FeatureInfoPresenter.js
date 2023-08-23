import featureInfoRepository from "./FeatureInfoRepository";

class FeatureInfoPresenter {
  subscribe(componentCb) {
    const callback = (pm) => {
      const vm = this.pmToVm(pm);
      componentCb(vm);
    };
    featureInfoRepository.subscribe(callback);
  }

  getFeatureInfos({ event, queryLayers, projection, resolution } = {}) {
    if (!event || !queryLayers || !projection || !resolution) {
      return false;
    }
    return featureInfoRepository.getFeatureInfos({
      event,
      queryLayers,
      projection,
      resolution,
    });
  }

  pmToVm(pm) {
    console.log("pm", pm);
    const features = pm.vectorLayer.getSource().getFeatures();
    const featureProps = features.map((feature) => {
      const props = feature.getProperties();
      const layername = props.layername;
      delete props.geometryProperty;
      delete props.layername;
      const keys = Object.keys(props);
      return { keys, props, layername };
    });
    return { ...pm, features: featureProps };
  }
}

export default FeatureInfoPresenter;
