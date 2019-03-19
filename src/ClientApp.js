import React from "preact-compat";
import { hydrate } from "preact-compat";
import App from "./App";

hydrate(<App />, document.getElementById("root"));
