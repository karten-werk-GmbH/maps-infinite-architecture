import mapConfig from "../Components/Map/mapConfig";
import layerConfig from "../Components/Layers/layerConfig";
import TileLayer from "ol/layer/Tile";
import { XYZ, TileWMS } from "ol/source";
import VectorLayer from "ol/layer/Vector.js";
import { Vector as VectorSource } from "ol/source";
import WMSGetFeatureInfo from "ol/format/WMSGetFeatureInfo";
import Style from "ol/style/Style";
import Stroke from "ol/style/Stroke";
import Fill from "ol/style/Fill";

const vectorSource = new VectorSource({
  format: new WMSGetFeatureInfo(),
});
const featureOverlayLayer = new VectorLayer({
  source: vectorSource,
  style: new Style({
    stroke: new Stroke({ color: "rgb(0,0,0)", width: 5 }),
    fill: new Fill({ color: "rgb(255,0,0,0.5" }),
  }),
  zIndex: 10,
  name: "featureInfo",
});

class HttpGateway {
  get = async (endpoint) => {
    switch (endpoint) {
      case "mapConfig":
        return new Promise((resolve, reject) => {
          window.setTimeout(() => {
            if (mapConfig && mapConfig.basemap) {
              mapConfig.basemap = this.createBasemapLayer(mapConfig.basemap);
              resolve(mapConfig);
            } else {
              reject(new Error("map confing is not available"));
            }
          }, 100);
        });
      case "layerConfig":
        return new Promise((resolve, reject) => {
          window.setTimeout(() => {
            if (layerConfig && layerConfig.length > 0) {
              layerConfig.forEach((layer) => {
                layer.tileLayer = this.createOverlayLayer(layer);
              }),
                resolve(layerConfig);
            } else {
              reject(new Error("layer config is not available"));
            }
          }, 50);
        });
      default:
        try {
          const response = await fetch(endpoint);
          return await response.text();
        } catch (error) {
          console.error(error);
        }
    }
  };

  getFeatureInfo = async ({ event, queryLayers, projection, resolution }) => {
    const result = {
      vectorLayer: featureOverlayLayer,
      available: false,
    };
    featureOverlayLayer.getSource().clear();
    for (let layer of queryLayers) {
      const url = layer
        ?.getSource()
        ?.getFeatureInfoUrl(event.coordinate, resolution, projection, {
          INFO_FORMAT: "text/xml; subtype=gml/3.2.1",
        });
      if (url) {
        try {
          const response = await fetch(url);
          const xml = await response.text();
          if (xml) {
            const feature = vectorSource.getFormat().readFeature(xml);
            if (feature) {
              feature.set("layername", layer.get("name"));
              vectorSource.addFeature(feature);
            }
          }
        } catch (error) {
          return new Promise((resolve) =>
            resolve({ ...result, error: error.message }),
          );
        }
      }
    }
    return {
      ...result,
      available: vectorSource.getFeatures().length > 0 ? true : false,
    };
  };

  /*
   * create a ol Tile Layer object with XYZ source.
   * @Param {object} layerObj - stores properties like url, zIndex, and attribution.
   * @returns {object} - ol/layer/Tile object.
   */
  createBasemapLayer = (layerObj) => {
    const { name, url, attribution, zIndex } = layerObj;
    return new TileLayer({
      source: new XYZ({
        url,
        attributions: attribution,
      }),
      zIndex,
      name,
    });
  };

  /*
   * create a ol Tile Layer object with TileWMS source..
   * @Param {object} layerObj - stores properties like url, zIndex, and attribution.
   * @returns {object} - ol/layer/Tile object.
   */
  createOverlayLayer = (layerObj) => {
    const {
      name,
      url,
      layerName,
      attribution,
      minZoom,
      maxZoom,
      visible,
      opacity,
      zIndex,
      type,
    } = layerObj;
    return new TileLayer({
      source: new TileWMS({
        url,
        params: { LAYERS: layerName },
        attributions: attribution,
      }),
      minZoom,
      maxZoom,
      visible,
      opacity,
      zIndex,
      type,
      name,
    });
  };
}

const httpGateway = new HttpGateway();
export default httpGateway;
