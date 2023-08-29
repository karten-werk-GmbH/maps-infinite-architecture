import { it, expect, vi, beforeEach } from "vitest";
import { overlays, layerQueryParams } from "../../Shared/testHelpers";
import appIoc from "../../Shared/IOC/appIoc";

let viewModel;
let layerPresenter;
let httpGateway;
let urlGateway;
let callback;

beforeEach(() => {
  viewModel = null;
  layerPresenter = appIoc.get("layerPresenter");
  httpGateway = appIoc.get("httpGateway");
  urlGateway = appIoc.get("urlGateway");

  httpGateway.get = vi.fn().mockImplementation(() => {
    return overlays;
  });
  urlGateway.updateUrl = vi.fn().mockImplementation((params) => params);
  callback = (generatedViewModel) => {
    viewModel = generatedViewModel;
  };
});

it("should load the layer config without query params", async () => {
  urlGateway.parseQueryParams = vi.fn().mockImplementation(() => {
    return {};
  });
  await layerPresenter.initLayers(callback);

  expect(httpGateway.get).toHaveBeenCalledWith("layerConfig");
  expect(viewModel).toBeInstanceOf(Object);
  expect(viewModel).toEqual(overlays);
});

it("should load the layers with query params", async () => {
  urlGateway.parseQueryParams = vi.fn().mockImplementation(() => {
    return layerQueryParams;
  });
  await layerPresenter.initLayers(callback);

  expect(httpGateway.get).toHaveBeenCalledWith("layerConfig");
  expect(viewModel).toBeInstanceOf(Object);
  expect(viewModel[0].name).toEqual("Hiking trails");
  expect(viewModel[0].visible).toEqual(true);
  expect(viewModel[0].opacity).toEqual(0.5);
  expect(viewModel[1].name).toEqual("Solar energy potential");
  expect(viewModel[1].visible).toEqual(false);
  expect(viewModel[1].opacity).toEqual(1);
});
