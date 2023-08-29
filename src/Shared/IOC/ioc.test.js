import IocContainer from "./IocContainer";
import { it, expect, beforeEach } from "vitest";

let container = null;
class Dummy {
  constructor() {
    this.value = 1;
  }
}
beforeEach(() => {
  container = new IocContainer();
});

it("should create a class instance.", () => {
  class Dummy {
    constructor() {
      this.value = 1;
    }
  }
  container.register("dummy", Dummy);
  const dummyInstance = container.get("dummy");

  expect(dummyInstance.value).toBe(1);
});

it("should create a transient.", () => {
  container.register("dummy", Dummy);
  const dummy1 = container.get("dummy");
  const dummy2 = container.get("dummy");
  dummy1.value = 2;

  expect(dummy1.value).toBe(2);
  expect(dummy2.value).toBe(1);
});

it("should resolve a transient with dependencies.", () => {
  const configObj = { test: "config test" };
  class ConfigClass {
    constructor(configObj) {
      this.configObj = configObj;
    }
  }
  container.register("configObj", configObj);
  container.register("configClass", ConfigClass, ["configObj"]);
  const configInstance = container.get("configClass");

  expect(configInstance.configObj.test).toBe("config test");
});

it("should resolve a singleton.", () => {
  container.singleton("dummy", Dummy);
  const instance1 = container.get("dummy");

  expect(instance1.value).toBe(1);

  instance1.value = 2;
  const instance2 = container.get("dummy");

  expect(instance2.value).toBe(2);
  expect(instance1).toEqual(instance2);
});

it("should resolve a transient with a singleton dependency.", () => {
  class Singleton {
    constructor() {
      this.value = 1;
    }
  }
  class SingletonDependency {
    constructor(singleton) {
      this.singleton = singleton;
    }
  }
  container.singleton("singleton", Singleton);
  container.register("singletonDependency", SingletonDependency, ["singleton"]);

  const singletonDepInstance1 = container.get("singletonDependency");

  expect(singletonDepInstance1.singleton.value).toBe(1);

  singletonDepInstance1.singleton.value = 2;

  expect(singletonDepInstance1.singleton.value).toBe(2);

  const singletonDepInstance2 = container.get("singletonDependency");

  expect(singletonDepInstance2.singleton.value).toBe(2);
});
