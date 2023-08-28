import React from "react";
import ReactDOM from "react-dom/client";
import container from "./Shared/IOC/container.js";
import App from "./Components/App/App.jsx";
import { ContainerProvider } from "./Shared/IOC/ContainerProvider.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ContainerProvider container={container}>
      <App />
    </ContainerProvider>
  </React.StrictMode>,
);
