// settings
import React from "react";
import ReactDOM from "react-dom";
import "../src/css/_resets.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

import { createRoot } from "react-dom/client";

// state, routes
import { MyProvider } from "./Context/index.context";
import App from "./App";
import { Route, Routes, BrowserRouter } from "react-router-dom";

// main components
import Navbar from "./Components/navbar";
import Footer from "./Components/Footer";
import AllTracks from "./Components/allTracks";
import ErrorPage from "./Components/error";
import Bio from "./Components/bio";
import Login from "./Components/Login";
import Layout from "./HOC/Layout";
// Libraries
import { ToastContainer } from "react-toastify";

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <MyProvider>
      <Layout>
        <BrowserRouter>
          <ToastContainer />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<App />}></Route>
            <Route path="/bio/:id" element={<Bio />}></Route>
            <Route path="/tracks" element={<AllTracks />}></Route>
            <Route path="*" element={<ErrorPage />}></Route>
          </Routes>
        </BrowserRouter>
      </Layout>
    </MyProvider>
  </React.StrictMode>
);
