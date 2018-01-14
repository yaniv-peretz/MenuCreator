import React from "react";
import ReactDOM from "react-dom";
import CurrentRoute from "./components/CurrentRoute";
import registerServiceWorker from "./registerServiceWorker";
import "../node_modules/jquery/dist/jquery.min.js";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";

// styles
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./style/main.css";

ReactDOM.render(<CurrentRoute />, document.getElementById("root"));
registerServiceWorker();