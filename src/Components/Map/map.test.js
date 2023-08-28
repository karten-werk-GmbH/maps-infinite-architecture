//import MapPresenter from "./MapPresenter";
import httpGateway from "../../Shared/HttpGateway";
import urlGateway from "../../Shared/UrlGateway";
import { it, vi, expect, beforeEach } from "vitest";
import mapConfig from "./mapConfig";
import container from "../../Shared/IOC/container";

let mapPresenter;
let parsedSearchParams;

beforeEach(() => {
  mapPresenter = container.resolve("mapPresenter");
  parsedSearchParams = {
    zoom: 11,
    center: "5700000,2344456",
  };

  httpGateway.get = vi.fn().mockImplementation(() => {
    return mapConfig;
  });

  urlGateway.updateUrl = vi.fn().mockImplementation((params) => params);
});

it("should load the map config without query params", async () => {
  urlGateway.parseQueryParams = vi.fn().mockImplementation(() => {
    return {};
  });
  const vm = await mapPresenter.initMap();

  expect(httpGateway.get).toHaveBeenCalledWith("mapConfig");
  expect(vm).toEqual(mapConfig);
});

it("should load the map config with query params", async () => {
  urlGateway.parseQueryParams = vi.fn().mockImplementation(() => {
    return parsedSearchParams;
  });
  const vm = await mapPresenter.initMap();

  expect(httpGateway.get).toHaveBeenCalledWith("mapConfig");
  expect(vm).toEqual({
    center: [5700000, 2344456],
    zoom: 11,
    basemap: mapConfig.basemap,
  });
});
