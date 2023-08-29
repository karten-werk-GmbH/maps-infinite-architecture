import React from "react";
import ReactDOM from "react-dom/client";
import appIoc from "./Shared/IOC/appIoc";
import App from "./Components/App/App.jsx";
import { ContainerProvider } from "./Shared/IOC/ContainerProvider.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ContainerProvider container={appIoc}>
      <App />
    </ContainerProvider>
  </React.StrictMode>,
);
