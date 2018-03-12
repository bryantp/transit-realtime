import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { HashRouter, Route, Switch } from "react-router-dom";
import createBrowserHistory from "history/createBrowserHistory";

import "./index.css";
import Main from "./routes/Main/Main";
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
const history = createBrowserHistory();

const run = () =>
  ReactDOM.render(
    <Provider store={store}>
      <HashRouter history={history}>
        <Switch>
          <Route exact path="/" name="Main" component={Main} />
        </Switch>
      </HashRouter>
    </Provider>,
    document.getElementById("root")
  );
store.subscribe(run);
run();
registerServiceWorker();
