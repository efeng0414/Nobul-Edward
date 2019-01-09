import { createStore, applyMiddleware, compose } from "redux";
import createMemoryHistory from "history/createMemoryHistory";
import { routerMiddleware } from "react-router-redux";
import ReduxThunk from "redux-thunk";

import reducers from "../../core/reducers";

const reduxMiddlewares = [routerMiddleware(createMemoryHistory()), ReduxThunk];

export default initialState => {
  const store = createStore(
    reducers,
    initialState,
    compose(applyMiddleware(...reduxMiddlewares))
  );

  return store;
};
