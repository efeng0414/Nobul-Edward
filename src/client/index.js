import { render } from "react-dom";
import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { loadComponents } from "loadable-components";
import { Provider } from "react-redux";
import { createStore, compose, applyMiddleware } from "redux";
import { ConnectedRouter, routerMiddleware } from "react-router-redux";
import ReduxThunk from "redux-thunk";
import { combineReducers } from "redux";
import { addLocaleData } from "react-intl";
import createHistory from "history/createBrowserHistory";
import { createLogger } from "redux-logger";
import en from "react-intl/locale-data/en";
import es from "react-intl/locale-data/es";

import App from "../scenes/app";
import appReducer from "../../core/reducers";
import ReduxConnectedIntlProvider from "../components/redux-connected-intl-provider";
import { checkForCached, cacheItem } from "../utilities/cache-handler";
import { SIGN_OUT } from "../../core/types/authentication";
import ScrollToTop from "../utilities/scroll-top-top";
import "../styles/ant.less";

const isDev =
  process.env.NODE_ENV === "development" || process.env.NODE_ENV === "custom";

const logger = createLogger({
  predicate: (getState, action) => action.type !== "@@router/LOCATION_CHANGE",
  collapsed: (getState, action, logEntry) => !logEntry.error
});

Raven.config("https://ee492eca024c4502bca26ed9a68ffda5@sentry.io/1281357", {
  environment: process.env.NODE_ENV
}).install();
// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.__PRELOADED_STATE__;

const history = createHistory();
// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__;

let middleware = [routerMiddleware(history), ReduxThunk];
if (isDev) middleware = [...middleware, logger];

//Reducer Manipulation
const reducers = combineReducers(appReducer);
const rootReducer = (state, action) => {
  if (action.type === SIGN_OUT) {
    return {
      ...reducers(undefined, action),
      breakpoints: state.breakpoints
    };
  }

  return reducers(state, action);
};

const store = createStore(
  rootReducer,
  preloadedState,
  compose(
    applyMiddleware(...middleware),
    isDev && window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

store.subscribe(() => {
  const userState = store.getState().users;
  if (userState) {
    const { userType = "", currentUser = {} } = userState;
    const { uid = "" } = currentUser;
    if (
      !checkForCached("userType") ||
      checkForCached("userType") !== userType
    ) {
      if (userType) {
        cacheItem("userType", userType);
      }
    }
    if (
      !checkForCached("currentUserId") ||
      checkForCached("currentUserId") !== uid
    ) {
      if (uid) {
        cacheItem("currentUserId", uid);
      }
    }
  }
});

class Main extends Component {
  // Remove the server-side injected CSS.
  componentDidMount() {
    const jssStyles = document.getElementById("jss-server-side");
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    return (
      <Router>
        <ScrollToTop>
          <App {...this.props} />
        </ScrollToTop>
      </Router>
    );
  }
}

addLocaleData([...es, ...en]);

loadComponents().then(() => {
  render(
    <Provider store={store}>
      <ReduxConnectedIntlProvider>
        <ConnectedRouter history={history}>
          <Main />
        </ConnectedRouter>
      </ReduxConnectedIntlProvider>
    </Provider>,
    document.getElementById("root")
  );
});
