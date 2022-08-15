// settings
import React from "react";
import { createRoot } from "react-dom/client";

// Default CSS imports
import "../src/css/_resets.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

// Internal imports
import { MyProvider } from "./Context/index.context";
import App from "./App";
import Layout from "./HOC/Layout";

const root = createRoot(document.getElementById("root"));

root.render(
  // <React.StrictMode>
  <MyProvider>
    <Layout>
      <App />
    </Layout>
  </MyProvider>
  // </React.StrictMode>
);
