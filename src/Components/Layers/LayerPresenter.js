import mapRepository from "../Map/MapRepository";
import urlGateway from "../../Shared/UrlGateway";

class LayerPresenter {
  async initLayers(componentCb) {
    try {
      const callback = this.getCallback(componentCb);
      const layerConfig = await mapRepository.initLayers(callback);
      return layerConfig;
    } catch (error) {
      console.error(error);
    }
  }
  getCallback(componentCb) {
    if (typeof componentCb === "function") {
      const callback = (pm) => {
        componentCb(pm.overlays);
      };
      return callback;
    }
    return false;
  }

  updateLayer({ layer, visible = true, opacity = 1 }) {
    if (layer) {
      mapRepository.updateLayer({
        layername: layer.name,
        visible,
        opacity: parseFloat(opacity),
      });
    }
  }
}

export default LayerPresenter;
