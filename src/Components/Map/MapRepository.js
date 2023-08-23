import httpGateway from "../../Shared/HttpGateway";
import urlGateway from "../../Shared/UrlGateway";
import Observable from "../../Shared/Observable";

class MapRepository {
  httpGateway = null;
  urlGateway = null;
  pm = null;
  olMap = null;
  isMapLoading = false; // fixes multiple useEffect calls
  isLayerLoading = false;

  constructor() {
    this.httpGateway = httpGateway;
    this.urlGateway = urlGateway;
    this.pm = new Observable({});
  }

  async initMap() {
    if (this.isMapLoading === true) return false;
    this.isMapLoading = true;

    // update the url every time the pm changes
    this.subscribe((pm) => this.updateUrl({ ...pm }));
    const mapConfigDto = await this.httpGateway.get("mapConfig");
    const queryParams = this.urlGateway.getSanitizedQueryParams();
    const pm = {
      basemap: mapConfigDto.basemap,
      zoom: queryParams.zoom || mapConfigDto.zoom,
      center: queryParams.center || mapConfigDto.center,
    };
    this.updatePm(pm);
    this.isMapLoading = false;
    return pm;
  }

  async initLayers({ callback, queryParams }) {
    if (this.isLayersLoading === true) return false;
    this.isLayersLoading = true;
    this.subscribe(callback);
    const overlaysDto = await this.httpGateway.get("layerConfig");

    // if we have query params, update overlays.
    if (queryParams?.layers?.length > 0) {
      for (let i = 0; i < queryParams.layers.length; i++) {
        const layername = queryParams.layers[i];
        const visible = queryParams.layers_visibility[i];
        const opacity = queryParams.layers_opacity[i];
        const index = overlaysDto.findIndex(
          (element) => element.name === layername,
        );
        if (index !== -1) {
          overlaysDto[index].opacity = opacity;
          overlaysDto[index].tileLayer.setOpacity(opacity);
          overlaysDto[index].visible = visible;
          overlaysDto[index].tileLayer.setVisible(visible);
        }
      }
    }
    this.updatePm({ overlays: overlaysDto });
    this.isLayersLoading = false;
    return overlaysDto;
  }

  subscribe(callback) {
    if (typeof callback === "function") {
      this.pm.subscribe(callback);
    }
  }

  updatePm(newValues) {
    this.pm.value = {
      ...this.pm.value,
      ...newValues,
    };
  }

  updateUrl(params) {
    if (params) {
      this.urlGateway.updateUrl(params);
    }
  }

  updateLayer = ({ layername, visible = true, opacity = 1 }) => {
    const updatedOvelays = this.pm._value.overlays.map((overlay) => {
      if (overlay.name === layername) {
        if (overlay.tileLayer) {
          // update the map layer
          overlay.tileLayer.setVisible(visible);
          overlay.tileLayer.setOpacity(opacity);
        }
        return { ...overlay, visible, opacity };
      }
      return overlay;
    });
    // update the ui layer (checkbox, slider)
    this.updatePm({ overlays: updatedOvelays });
  };
}
const mapRepository = new MapRepository();

export default mapRepository;
