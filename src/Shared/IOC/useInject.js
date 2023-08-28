import { useContext } from "react";
import { ContainerContext } from "./ContainerProvider";

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

// Hook to inject dependencies from the container
export const useInject = (identifier) => {
  const container = useContainer();
  return container.resolve(identifier);
};
