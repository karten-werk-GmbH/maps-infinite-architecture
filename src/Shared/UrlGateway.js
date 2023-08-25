import queryString from "query-string";
import { toStringXY } from "ol/coordinate";

class UrlGateway {
  /*
   * updates the query parameters of the url
   * @param {object} params an object containing key:value pairs of query params.
   * @returns {string} the search params section of the url.
   */
  updateUrl = (params) => {
    if (params) {
      if (params.center && Array.isArray(params.center)) {
        params.center = toStringXY(params.center).replace(/\s/g, ""); //remove any whitespace
      }
      if (params.basemap) {
        params.basemap = params.basemap.get("name");
      }
      if (params.overlays) {
        const layerParams = this.getLayerUrlParams(params.overlays);
        params = { ...params, ...layerParams };
        delete params.overlays;
      }
      const splittedUrl = window.location.href.split("?");
      const parsedParams = this.parseQueryParams();
      const newParams = { ...parsedParams, ...params };
      const stringified = queryString.stringify(newParams);
      window.history.replaceState(
        newParams,
        document.title,
        splittedUrl[0] + "?" + stringified,
      );
      return window.location.search;
    }
    return window.location.search;
  };

  /*
   * parses a query string into an object.
   */
  parseQueryParams = () => {
    return queryString.parse(window.location.search);
  };

  /*
   * creates layer url parameters from layer objects.
   * @param {object} overlays - overlay objects.
   * @returns {object} - object with keys and stringified values.
   */
  getLayerUrlParams = (overlays) => {
    let layernames = "";
    let layers_opacity = "";
    let layers_visibility = "";
    for (let i = 0; i < overlays.length; i++) {
      const separator = i < overlays.length - 1 ? "," : "";
      layernames += overlays[i].name + separator;
      layers_visibility += overlays[i].visible.toString() + separator;
      layers_opacity += overlays[i].opacity.toString() + separator;
    }
    return { layers: layernames, layers_visibility, layers_opacity };
  };

  /*
   * check parsed query params and make them usable for the app.
   * @param {object} searchParams - the result of parseQueryParams.
   * @returns {object} result - an object which can be used for the pm.
   */
  sanitizeQueryParams = (searchParams) => {
    const result = { ...searchParams };
    if (typeof searchParams.center === "string") {
      const centerArr = searchParams.center.split(",");
      result.center = [parseInt(centerArr[0]), parseInt(centerArr[1])];
    }
    if (typeof searchParams.zoom === "string") {
      result.zoom = parseInt(searchParams.zoom);
    }
    if (typeof searchParams.layers_visibility === "string") {
      result.layers_visibility = searchParams.layers_visibility
        .split(",")
        .map((visibility) => {
          if (visibility === "true") {
            return true;
          } else {
            return false;
          }
        });
    }
    if (typeof searchParams.layers_opacity === "string") {
      result.layers_opacity = searchParams.layers_opacity
        .split(",")
        .map((opacity) => parseFloat(opacity));
    }
    if (typeof searchParams.layers === "string") {
      result.layers = searchParams.layers
        .split(",")
        .map((layername) => layername);
    }
    return result;
  };

  getSanitizedQueryParams() {
    const queryParams = this.parseQueryParams();
    return this.sanitizeQueryParams(queryParams);
  }
}
const urlGateway = new UrlGateway();
export default urlGateway;
