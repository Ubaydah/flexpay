import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import setUpAxios from "./redux/setup-axios";
import { BrowserRouter } from "react-router-dom";
import { store } from "./redux/store";
import axios from "axios";

setUpAxios(axios, store);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
