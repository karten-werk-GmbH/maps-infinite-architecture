import { it, expect, vi, beforeEach } from "vitest";
import FeatureInfoPresenter from "./FeatureInfoPresenter";
import featureInfoRepository from "./FeatureInfoRepository";
import { getFeatureInfoParams, fakePm } from "../../Shared/testHelpers";
import httpGateway from "../App/HttpGateway";

let viewModel;
let featureInfoPresenter;
let callback;

beforeEach(() => {
  viewModel = null;
  featureInfoPresenter = new FeatureInfoPresenter();

  callback = (generatedViewModel) => {
    viewModel = generatedViewModel;
  };
});

it("should call the subscribe functions", async () => {
  const subscribeSpy = vi.spyOn(featureInfoRepository, "subscribe");
  featureInfoPresenter.subscribe(callback);

  expect(subscribeSpy).toHaveBeenCalledTimes(1);
});

it("should return false when no params are provided", () => {
  const result = featureInfoPresenter.getFeatureInfos();

  expect(result).toEqual(false);
});

it("should return false for the available prop, when empty queryLayers array is provided", async () => {
  featureInfoPresenter.subscribe(callback);
  const gatewaySpy = vi.spyOn(httpGateway, "getFeatureInfo");
  await featureInfoPresenter.getFeatureInfos({
    ...getFeatureInfoParams,
    queryLayers: [],
  });

  expect(gatewaySpy).toHaveBeenCalledTimes(1);
  expect(viewModel.available).toEqual(false);
});

it("should transform a pm to a vm as expected", () => {
  const result = featureInfoPresenter.pmToVm(fakePm);
  expect(result.features).toBeInstanceOf(Array);
  expect(result.features[0].layername).toBe("my fake layer");
  expect(result.properties).toBeInstanceOf(Object);
  expect(result.properties.geometryProperty).toBeUndefined();
  expect(result.properties).toEqual({
    testProp: "my test prop",
    anotherTestProp: "my other test prop",
  });
});