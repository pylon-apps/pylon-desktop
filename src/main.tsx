import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";
import { NextUIProvider } from "@nextui-org/react";

import "./i18n";

// TODO: enable i18n for aria-labels
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <NextUIProvider>
      <App />
    </NextUIProvider>
  </React.StrictMode>
);
