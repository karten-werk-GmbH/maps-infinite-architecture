import React from "react";
import ReactDOM from "react-dom/client";
import appIoc from "./Shared/IOC/appIoc";
import App from "./Components/App/App.jsx";
import { ContainerProvider } from "./Shared/IOC/ContainerProvider";
import "./index.css";

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error('Root element "#root" not found in index.html');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ContainerProvider container={appIoc}>
      <App />
    </ContainerProvider>
  </React.StrictMode>,
);
