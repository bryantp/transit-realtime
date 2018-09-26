import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { HashRouter, Route, Switch } from "react-router-dom";
import registerServiceWorker from "./registerServiceWorker";
import { connect } from "react-redux";

import "./index.css";
import Main from "./routes/Main/Main";
import RouteDetail from "./routes/RouteDetail/RouteDetail";
import Menu from "./routes/Menu/Menu";
import InformationStatusBarContainer from "./InformationStatusBarContainer/InformationStatusBarContainer";
import { STATUSES_RECEIVED, RETRIEVING_STATUSES, ERROR_DURING_RETRIEVAL, SYSTEM_INFO_RETRIEVED, ERROR_RETRIEVING_SYSTEM_INFO, retrieveStatuses } from "./actions";

const defaultState = {
  isLoading: true,
  isLoaded: false,
  isInError: false,
  isSystemInfoLoaded: false,
  selectedLineIds: [],
  statuses: [],
  systemInfo: {}
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case STATUSES_RECEIVED:
      return Object.assign({}, state, {
        statuses: action.payload,
        isLoading: false,
        isLoaded: true
      });
    case RETRIEVING_STATUSES:
      return Object.assign({}, state, {
        isLoading: true,
        isLoaded: false
      });
    case ERROR_DURING_RETRIEVAL:
      return Object.assign({}, state, {
        statuses: [],
        isLoading: false,
        isLoaded: false,
        isInError: true
      });
    case SYSTEM_INFO_RETRIEVED:
      return Object.assign({}, state, {
        isSystemInfoLoaded: true,
        systemInfo: action.payload,
        isInError: false
      });
    case ERROR_RETRIEVING_SYSTEM_INFO:
      return Object.assign({}, state, {
        isSystemInfoLoaded: false,
        isInError: true
      });
    default:
      return state;
  }
};

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

const Wrapper = connect(state => ({}), { retrieveStatuses })(props => (
  <div>
    <InformationStatusBarContainer
      refreshIntervalSeconds={120}
      refreshCallback={props.retrieveStatuses}
    />
    {props.children}
  </div>
));

const run = () =>
  ReactDOM.render(
    <Provider store={store}>
      <HashRouter>
        <Switch>
          <Wrapper>
            <Route exact path="/" name="Main" component={Main} />
            <Route
              exact
              path="/detail/:id"
              name="Detail"
              component={RouteDetail}
            />
            <Route
              exact
              path="/menu"
              name="Menu"
              component={Menu}
            />
          </Wrapper>
        </Switch>
      </HashRouter>
    </Provider>,
    document.getElementById("root")
  );

store.subscribe(run);
run();
registerServiceWorker();
