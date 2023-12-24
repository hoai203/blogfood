import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-loading-skeleton/dist/skeleton.css";
import { Provider } from "react-redux";
import store from "./sagas/configureStore";
import App from "./App";
ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <Provider store={store}> <App /> </Provider>
    <ToastContainer autoClose={2500} style={{ zIndex: "9999999" }}></ToastContainer>
  </>
);
