import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter, Link } from "react-router-dom";
import { PrismicProvider } from "@prismicio/react";
import { client } from "./libs/prismic";
import "../src/index.css";
import routes from "./routes";

const router = createBrowserRouter([...routes]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <PrismicProvider
      client={client}
      internalLinkComponent={({ href, props }) => (
        <Link to={href} {...props}></Link>
      )}
    >
      <RouterProvider router={router} />
    </PrismicProvider>
  </React.StrictMode>
);
