// @ts-check

import React from "react";
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { Provider } from "react-redux";
import ReactDOM from "react-dom";
import "./index.css";
import { ConnectedCardModule } from "./modules/CardModule";
import { appReducers } from "./reducers";
import { appRootSaga } from "./sagas";
import registerServiceWorker from "./registerServiceWorker";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(appReducers, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(appRootSaga);

// // for debug
// const unsubscribe = store.subscribe(() => console.log(store.getState()));

ReactDOM.render(
  <Provider store={store}>
    <ConnectedCardModule />
  </Provider>,
  document.getElementById("root")
);

registerServiceWorker();
