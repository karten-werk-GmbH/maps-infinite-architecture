import React, { createContext } from "react";
import PropTypes from "prop-types";

// create a new context for the container
export const ContainerContext = createContext();

// define a component, that provides the container to it's children
export const ContainerProvider = ({ container, children }) => {
  return (
    <ContainerContext.Provider value={container}>
      {children}
    </ContainerContext.Provider>
  );
};

ContainerProvider.propTypes = {
  container: PropTypes.object.isRequired,
  children: PropTypes.object,
};
