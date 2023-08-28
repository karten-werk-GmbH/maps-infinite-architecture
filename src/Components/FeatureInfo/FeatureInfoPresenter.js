class FeatureInfoPresenter {
  featureInfoRepository = null;
  constructor(featureInfoRepository) {
    this.featureInfoRepository = featureInfoRepository;
  }
  subscribe(componentCb) {
    const callback = (pm) => {
      const vm = this.pmToVm(pm);
      componentCb(vm);
    };
    this.featureInfoRepository.subscribe(callback);
  }

  async getFeatureInfos({ event, queryLayers, projection, resolution } = {}) {
    if (!event || !queryLayers || !projection || !resolution) {
      return false;
    }
    await this.featureInfoRepository.getFeatureInfos({
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
