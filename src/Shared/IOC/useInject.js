import { useContext, useMemo } from "react";
import { ContainerContext } from "./ContainerContext";

// Hook to access the container from within a component.
const useContainer = () => {
  const container = useContext(ContainerContext);
  if (!container) {
    throw new Error(
      "Container not found. Make sure to wrap your components with a ContainerProvider.",
    );
  }
  return container;
};

// Hook to inject dependencies from the container.
// Resolves once per component instance, so transient services (presenters)
// stay the same object across renders and are safe to use in effect deps.
export const useInject = (identifier) => {
  const container = useContainer();
  return useMemo(() => container.get(identifier), [container, identifier]);
};
