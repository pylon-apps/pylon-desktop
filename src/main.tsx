import React from "react";
import ReactDOM from "react-dom/client";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { App as AntApp } from "antd";
import reactLogo from "./assets/react.svg";
import { version as guiVersion } from "../package.json";
import * as bindings from "./bindings";
import App from "./App";
import "./style.css";

// Views
import Dashboard from "./views/Dashboard";
import ActiveTransfers from "./views/ActiveTransfers";
import History from "./views/History";
import Settings from "./views/Settings";
import About from "./views/About";

bindings
  .getBuildMetadata()
  .then((buildMetadata) => {
    const router = createMemoryRouter([
      {
        path: "/",
        element: <App />,
        children: [
          {
            index: true,
            element: <Dashboard appLogo={reactLogo} />,
          },
          {
            path: "dashboard",
            element: <Dashboard appLogo={reactLogo} />,
          },
          {
            path: "activeTransfers",
            element: <ActiveTransfers />,
          },
          {
            path: "history",
            element: <History />,
          },
          {
            path: "settings",
            element: <Settings />,
          },
          {
            path: "about",
            element: (
              <About
                logo={reactLogo}
                guiVersion={guiVersion}
                buildMetadata={buildMetadata}
                author="Nikhil Prabhu"
              />
            ),
          },
        ],
      },
    ]);

    ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
      <React.StrictMode>
        <AntApp>
          <RouterProvider router={router} />
        </AntApp>
      </React.StrictMode>
    );
  })
  .catch((err) => {
    console.log(err);
  });
