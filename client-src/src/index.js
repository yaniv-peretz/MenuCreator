import React from "react";
import ReactDOM from "react-dom";
import MainRoute from "./components/MainRoute";
import registerServiceWorker from "./registerServiceWorker";
import "../node_modules/jquery/dist/jquery.min.js";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";

// styles
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./style/main.css";

ReactDOM.render(<MainRoute />, document.getElementById("root"));
registerServiceWorker();