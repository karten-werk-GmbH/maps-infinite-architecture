import MapPresenter from "../../Components/Map/MapPresenter";
import MapRepository from "../../Components/Map/MapRepository";
import LayerPresenter from "../../Components/Layers/LayerPresenter";
import FeatureInfoPresenter from "../../Components/FeatureInfo/FeatureInfoPresenter";
import FeatureInfoRepository from "../../Components/FeatureInfo/FeatureInfoRepository";
import HttpGateway from "../HttpGateway";
import UrlGateway from "../UrlGateway";
import Observable from "../Observable";
import IocContainer from "@hkfrei/iocjs";

const appIoc = new IocContainer();

// pm initial values
appIoc.register({ name: "mapPmInitValue", definition: {} });
appIoc.register({
  name: "featureInfoPmInitValue",
  definition: { available: false },
});

// singletons
appIoc.register({
  name: "urlGateway",
  definition: UrlGateway,
  singleton: true,
});
appIoc.register({
  name: "httpGateway",
  definition: HttpGateway,
  singleton: true,
});
appIoc.register({
  name: "featureInfoRepository",
  definition: FeatureInfoRepository,
  dependencies: ["httpGateway", "featureInfoPm"],
  singleton: true,
});
appIoc.register({
  name: "mapRepository",
  definition: MapRepository,
  dependencies: ["httpGateway", "urlGateway", "mapPm"],
  singleton: true,
});

// transients
appIoc.register({
  name: "mapPresenter",
  definition: MapPresenter,
  dependencies: ["mapRepository"],
});
appIoc.register({
  name: "layerPresenter",
  definition: LayerPresenter,
  dependencies: ["mapRepository"],
});
appIoc.register({
  name: "featureInfoPresenter",
  definition: FeatureInfoPresenter,
  dependencies: ["featureInfoRepository"],
});
appIoc.register({
  name: "mapPm",
  definition: Observable,
  dependencies: ["mapPmInitValue"],
});
appIoc.register({
  name: "featureInfoPm",
  definition: Observable,
  dependencies: ["featureInfoPmInitValue"],
});

export default appIoc;
