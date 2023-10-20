import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";
import {createMemoryRouter, RouterProvider} from "react-router-dom";
import Dashboard from "./views/Dashboard";

const router = createMemoryRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                index: true,
                element: <Dashboard/>
            }
        ]
    }
])

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>,
);
