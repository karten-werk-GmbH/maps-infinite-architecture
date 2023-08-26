import featureInfoRepository from "./FeatureInfoRepository";

class FeatureInfoPresenter {
  subscribe(componentCb) {
    const callback = (pm) => {
      const vm = this.pmToVm(pm);
      componentCb(vm);
    };
    featureInfoRepository.subscribe(callback);
  }

  async getFeatureInfos({ event, queryLayers, projection, resolution } = {}) {
    if (!event || !queryLayers || !projection || !resolution) {
      return false;
    }
    await featureInfoRepository.getFeatureInfos({
      event,
      queryLayers,
      projection,
      resolution,
    });
  }

  pmToVm(pm) {
    const features = pm.vectorLayer.getSource().getFeatures();
    const featureProps = features.map((feature) => {
      const props = feature.getProperties();
      const layername = props.layername.toUpperCase();
      delete props.geometryProperty;
      delete props.layername;
      const keys = Object.keys(props);
      return { keys, props, layername };
    });
    return { ...pm, features: featureProps };
  }
}

export default FeatureInfoPresenter;
