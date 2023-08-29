import { it, expect, vi, beforeEach } from "vitest";
import { getFeatureInfoParams, fakePm } from "../../Shared/testHelpers";
import appIoc from "../../Shared/IOC/appIoc";

let viewModel;
let featureInfoPresenter;
let featureInfoRepository;
let callback;

beforeEach(() => {
  viewModel = null;
  featureInfoPresenter = appIoc.get("featureInfoPresenter");
  featureInfoRepository = appIoc.get("featureInfoRepository");
  callback = (generatedViewModel) => {
    viewModel = generatedViewModel;
  };
});

it("should call the subscribe functions", async () => {
  const subscribeSpy = vi.spyOn(featureInfoRepository, "subscribe");
  featureInfoPresenter.subscribe(callback);

  expect(subscribeSpy).toHaveBeenCalledTimes(1);
});

it("should return false when no params are provided", async () => {
  const result = await featureInfoPresenter.getFeatureInfos();

  expect(result).toEqual(false);
});

it("should return false for the available prop, when empty queryLayers array is provided", async () => {
  featureInfoPresenter.subscribe(callback);
  const gatewaySpy = vi.spyOn(
    featureInfoPresenter.featureInfoRepository.gateway,
    "getFeatureInfo",
  );
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
  expect(result.features[0].layername).toBe("MY FAKE LAYER");
  expect(result.properties).toBeInstanceOf(Object);
  expect(result.properties.geometryProperty).toBeUndefined();
  expect(result.properties).toEqual({
    testProp: "my test prop",
    anotherTestProp: "my other test prop",
  });
});
