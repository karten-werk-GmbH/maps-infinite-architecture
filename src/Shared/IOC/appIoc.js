import IocContainer from "./IocContainer";
import MapPresenter from "../../Components/Map/MapPresenter";
import MapRepository from "../../Components/Map/MapRepository";
import LayerPresenter from "../../Components/Layers/LayerPresenter";
import FeatureInfoPresenter from "../../Components/FeatureInfo/FeatureInfoPresenter";
import FeatureInfoRepository from "../../Components/FeatureInfo/FeatureInfoRepository";
import HttpGateway from "../HttpGateway";
import UrlGateway from "../UrlGateway";
import Observable from "../Observable";

const appIoc = new IocContainer();

// pm initial values
appIoc.register("mapPmInitValue", {});
appIoc.register("featureInfoPmInitValue", { available: false });

// singletons
appIoc.singleton("urlGateway", UrlGateway);
appIoc.singleton("httpGateway", HttpGateway);
appIoc.singleton("featureInfoRepository", FeatureInfoRepository, [
  "httpGateway",
  "featureInfoPm",
]);
appIoc.singleton("mapRepository", MapRepository, [
  "httpGateway",
  "urlGateway",
  "mapPm",
]);

// transients
appIoc.register("mapPresenter", MapPresenter, ["mapRepository"]);
appIoc.register("layerPresenter", LayerPresenter, ["mapRepository"]);
appIoc.register("featureInfoPresenter", FeatureInfoPresenter, [
  "featureInfoRepository",
]);
appIoc.register("mapPm", Observable, ["mapPmInitValue"]);
appIoc.register("featureInfoPm", Observable, ["featureInfoPmInitValue"]);

export default appIoc;
