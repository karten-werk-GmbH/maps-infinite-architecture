import type { ReactNode } from "react";
import type IocContainer from "@hkfrei/iocjs";
import { ContainerContext } from "./ContainerContext";

interface ContainerProviderProps {
  container: IocContainer;
  children?: ReactNode;
}

// define a component, that provides the container to it's children
export const ContainerProvider = ({
  container,
  children,
}: ContainerProviderProps) => {
  return (
    <ContainerContext.Provider value={container}>
      {children}
    </ContainerContext.Provider>
  );
};
