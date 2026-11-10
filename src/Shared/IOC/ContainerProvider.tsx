import { createContext, type ReactNode } from "react";
import type IocContainer from "@hkfrei/iocjs";

// create a new context for the container
export const ContainerContext = createContext<IocContainer | undefined>(
  undefined,
);

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
