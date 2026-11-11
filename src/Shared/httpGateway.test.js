import { it, expect, vi, beforeEach, afterEach } from "vitest";
import appIoc from "./IOC/appIoc";
import solarResponse from "./fixtures/solarGetFeatureInfo.geojson.json";

let httpGateway;
let requestedUrl;

// a queryable WMS layer as HttpGateway.getFeatureInfo sees it
const queryLayer = {
  get: (key) => (key === "name" ? "Solar energy potential" : undefined),
  getSource: () => ({
    getFeatureInfoUrl: (coordinate, resolution, projection, params) => {
      requestedUrl = `https://wms.geo.admin.ch/?INFO_FORMAT=${encodeURIComponent(params.INFO_FORMAT)}`;
      return requestedUrl;
    },
  }),
};

const params = {
  event: { coordinate: [875586, 5891470] },
  queryLayers: [queryLayer],
  projection: "EPSG:3857",
  resolution: 0.6,
};

beforeEach(() => {
  httpGateway = appIoc.get("httpGateway");
  requestedUrl = null;
  vi.stubGlobal(
    "fetch",
    vi.fn(async () => ({ text: async () => JSON.stringify(solarResponse) })),
  );
});

afterEach(() => {
  vi.unstubAllGlobals();
});

it("requests GeoJSON feature info", async () => {
  await httpGateway.getFeatureInfo(params);

  expect(requestedUrl).toContain(
    encodeURIComponent("application/json; subtype=geojson"),
  );
});

it("parses a geo.admin.ch GetFeatureInfo response into a feature with geometry", async () => {
  const result = await httpGateway.getFeatureInfo(params);
  const features = result.vectorLayer.getSource().getFeatures();

  expect(result.available).toBe(true);
  expect(features).toHaveLength(1);
  expect(features[0].getGeometry().getType()).toBe("Polygon");
  expect(features[0].get("layername")).toBe("Solar energy potential");
  expect(features[0].get("flaeche")).toBe("277.055289780385");
});

it("keeps the geometry out of the attributes shown to the user", async () => {
  const pm = await httpGateway.getFeatureInfo(params);
  const vm = appIoc.get("featureInfoPresenter").pmToVm(pm);

  expect(vm.features[0].layername).toBe("SOLAR ENERGY POTENTIAL");
  expect(vm.features[0].keys).toEqual([
    "klasse",
    "flaeche",
    "ausrichtung",
    "neigung",
    "stromertrag_sommerhalbjahr",
    "stromertrag_winterhalbjahr",
    "finanzertrag",
    "gwr_egid",
  ]);
});
