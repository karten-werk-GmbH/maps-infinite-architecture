import { createContext } from "react";
import type IocContainer from "@hkfrei/iocjs";

// the context which makes the IOC container available to components
export const ContainerContext = createContext<IocContainer | undefined>(
  undefined,
);
