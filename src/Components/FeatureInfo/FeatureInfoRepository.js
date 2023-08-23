import Observable from "../../Shared/Observable";
import httpGateway from "../../Shared/HttpGateway";

class FeatureInfoRepository {
  programmersModel = null;
  gateway = null;

  constructor() {
    this.programmersModel = new Observable({ available: false });
    this.gateway = httpGateway;
  }

  setPm = (vm) => {
    this.programmersModel.value = { ...vm };
  };

  subscribe = (callback) => {
    if (typeof callback === "function") {
      this.programmersModel.subscribe(callback);
    }
  };

  getFeatureInfos = async ({ event, queryLayers, projection, resolution }) => {
    const response = await this.gateway.getFeatureInfo({
      event,
      queryLayers,
      projection,
      resolution,
    });
    this.setPm(response);
    return response;
  };
}

const featureInfoRepository = new FeatureInfoRepository();
export default featureInfoRepository;
