class FeatureInfoRepository {
  programmersModel = null;
  gateway = null;

  constructor(httpGateway, pm) {
    this.gateway = httpGateway;
    this.programmersModel = pm;
  }

  setPm = (dto) => {
    this.programmersModel.value = { ...dto };
  };

  subscribe = (callback) => {
    if (typeof callback === "function") {
      this.programmersModel.subscribe(callback);
    }
  };

  getFeatureInfos = async ({ event, queryLayers, projection, resolution }) => {
    try {
      const featureInfoDto = await this.gateway.getFeatureInfo({
        event,
        queryLayers,
        projection,
        resolution,
      });
      this.setPm(featureInfoDto);
    } catch (error) {
      console.error(error);
    }
  };
}

export default FeatureInfoRepository;
