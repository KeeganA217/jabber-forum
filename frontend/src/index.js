import React from "react";
import ReactDOM from "react-dom";
import "./bootstrap.min.css";
import { Provider } from "react-redux";
import Store from "./store";
import "./App.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
  <Router>
    <Provider store={Store}>
      <App />
    </Provider>
  </Router>,
  document.getElementById("root")
);
