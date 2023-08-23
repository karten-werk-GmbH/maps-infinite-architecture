import mapRepository from "./MapRepository";

class MapPresenter {
  async initMap() {
    try {
      const mapConfig = await mapRepository.initMap();
      return this.pmToVm(mapConfig);
    } catch (error) {
      console.error(error);
    }
  }

  pmToVm(pm) {
    if (pm) {
      return { ...pm };
    }
    return false;
  }

  updatePm(vm) {
    mapRepository.updatePm({ ...vm });
  }
}

export default MapPresenter;
