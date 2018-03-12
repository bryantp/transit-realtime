import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

import { STATUSES_RECEIVED } from "./actions";

const defaultState = {
  isLoading: true,
  selectedLineIds: [],
  statuses: []
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case STATUSES_RECEIVED:
      return Object.assign({}, state, {
        statuses: action.payload,
        isLoading: false
      });
    default:
      return state;
  }
};

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

const run = () =>
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById("root")
  );
store.subscribe(run);
run();
registerServiceWorker();
