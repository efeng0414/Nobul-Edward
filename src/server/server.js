/* eslint-disable no-console */
const express = require("express");
const React = require("react");
const { renderToNodeStream } = require("react-dom/server");
const { StaticRouter } = require("react-router-dom");
const { getLoadableState } = require("loadable-components/server");
const { Provider } = require("react-redux");
const { Helmet } = require("react-helmet");
const { addLocaleData } = require("react-intl");
const en = require("react-intl/locale-data/en");
const es = require("react-intl/locale-data/es");

const App = require("../scenes/app");
const configureStore = require("./store");
const { renderHeader, renderFooter } = require("./render");
const { getAllBuyJobs } = require("../../core/thunk/jobs");
const ReduxConnectedIntlProvider = require("../components/redux-connected-intl-provider");

const PORT = process.env.PORT || 8080;

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
    htmlSteam.pipe(res, { end: false });
    htmlSteam.on("end", () => {
      res.write(renderFooter(loadableState, preloadedState));
      return res.send();
    });
  }); // delete this line if you do not want init state

  loadableState = await getLoadableState(appWithRouter);
});

app.listen(PORT, () => console.log(`Demo app listening on port ${PORT}`));
