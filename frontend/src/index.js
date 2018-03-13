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
import InformationStatusBarContainer from "./InformationStatusBarContainer/InformationStatusBarContainer";
import { STATUSES_RECEIVED, retrieveStatuses } from "./actions";

const defaultState = {
  isLoading: true,
  isLoaded: false,
  selectedLineIds: [],
  statuses: []
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case STATUSES_RECEIVED:
      return Object.assign({}, state, {
        statuses: action.payload,
        isLoading: false,
        isLoaded: true
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
      <Wrapper>
        <HashRouter>
          <Switch>
            <Route exact path="/" name="Main" component={Main} />
            <Route
              exact
              path="/detail/:id"
              name="Detail"
              component={RouteDetail}
            />
          </Switch>
        </HashRouter>
      </Wrapper>
    </Provider>,
    document.getElementById("root")
  );

store.subscribe(run);
run();
registerServiceWorker();
