/* eslint-disable no-console */
import express from "express";
import React from "react";
import { renderToNodeStream } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { getLoadableState } from "loadable-components/server";
import { Provider } from "react-redux";
import { Helmet } from "react-helmet";
import { addLocaleData } from "react-intl";
import en from "react-intl/locale-data/en";
import es from "react-intl/locale-data/es";

import App from "../scenes/app";
import configureStore from "./store";
import { renderHeader, renderFooter } from "./render";
import { getAllBuyJobs } from "../../core/thunk/jobs";
import ReduxConnectedIntlProvider from "../components/redux-connected-intl-provider";

const PORT = process.env.PORT || 3000;

const app = express();
app.use("/assets", express.static("./dist"));

app.get("*", async (req, res) => {
  const store = configureStore();
  const context = {};
  addLocaleData([...en, ...es]);

  const appWithRouter = (
    <Provider store={store}>
      <ReduxConnectedIntlProvider>
        <StaticRouter location={req.url} context={context}>
          <App />
        </StaticRouter>
      </ReduxConnectedIntlProvider>
    </Provider>
  );

  if (context.url) {
    res.redirect(context.url);
    return;
  }
  let loadableState = {};

  store.dispatch(getAllBuyJobs()).then(() => {
    // delete this line (store.dispatch()...) if you do not want init state
    const helmet = Helmet.renderStatic();
    res.status(200).write(renderHeader(helmet));

    const preloadedState = store.getState();

    const htmlSteam = renderToNodeStream(appWithRouter);
    htmlSteam.pipe(
      res,
      { end: false }
    );
    htmlSteam.on("end", () => {
      res.write(renderFooter(loadableState, preloadedState));
      return res.send();
    });
  }); // delete this line if you do not want init state

  loadableState = await getLoadableState(appWithRouter);
});

app.listen(PORT, () => console.log(`Demo app listening on port ${PORT}`));
