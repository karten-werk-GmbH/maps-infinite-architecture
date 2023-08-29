class IocContainer {
  #services = null;
  #singletons = null;

  constructor() {
    this.#services = new Map();
    this.#singletons = new Map();
  }

  register(name, definition, dependencies) {
    this.#services.set(name, {
      definition: definition,
      dependencies: dependencies,
    });
  }

  singleton(name, definition, dependencies) {
    this.#services.set(name, {
      definition: definition,
      dependencies: dependencies,
      singleton: true,
    });
  }

  get(name) {
    const service = this.#services.get(name);
    if (this.#isClass(service.definition)) {
      if (service.singleton) {
        const existingInstance = this.#singletons.get(name);
        if (existingInstance) {
          return existingInstance;
        } else {
          const newInstance = this.#createInstance(service);
          this.#singletons.set(name, newInstance);
          return newInstance;
        }
      }
      return this.#createInstance(service);
    } else {
      return service.definition;
    }
  }

  #getResolvedDependencies(service) {
    const dependencies = [];
    if (service.dependencies) {
      service.dependencies.forEach((dependency) => {
        dependencies.push(this.get(dependency));
      });
    }
    return dependencies;
  }

  #isClass(definition) {
    return typeof definition === "function";
  }

  #createInstance(service) {
    return new service.definition(...this.#getResolvedDependencies(service));
  }
}

export default IocContainer;
