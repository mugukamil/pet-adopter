import React, { Component } from "preact-compat";
import { Router } from "preact-router";
import Loadable from "react-loadable";
import { Provider } from "react-redux";
import store from "./store";

const loading = () => <h1>Loading...</h1>;

const LoadableDetails = Loadable({
  loader: () => import("./Details"),
  loading
});

const LoadableResults = Loadable({
  loader: () => import("./Results"),
  loading
});

const LoadableSearchParams = Loadable({
  loader: () => import("./SearchParams"),
  loading
});

class App extends Component {
  render() {
    return (
      <div>
        <Provider store={store}>
          <Router>
            <LoadableResults path="/" />
            <LoadableDetails path="/details/:id" />
            <LoadableSearchParams path="/search-params" />
          </Router>
        </Provider>
      </div>
    );
  }
}

export default App;
