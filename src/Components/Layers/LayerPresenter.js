class LayerPresenter {
  mapRepository = null;

  constructor(mapRepository) {
    this.mapRepository = mapRepository;
  }
  async initLayers(componentCb) {
    try {
      const callback = this.getCallback(componentCb);
      await this.mapRepository.initLayers(callback);
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

  updateLayer = ({ layer, visible = true, opacity = 1 }) => {
    if (layer) {
      this.mapRepository.updateLayer({
        layername: layer.name,
        visible,
        opacity: parseFloat(opacity),
      });
    }
  };
}

export default LayerPresenter;
