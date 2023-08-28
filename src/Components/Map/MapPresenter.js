class MapPresenter {
  mapRepository = null;
  constructor(mapRepository) {
    this.mapRepository = mapRepository;
  }

  async initMap() {
    try {
      const mapConfig = await this.mapRepository.initMap();
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
    this.mapRepository.updatePm({ ...vm });
  }
}

export default MapPresenter;
