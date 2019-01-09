import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Helmet from "react-helmet";
import PropTypes from "prop-types";
import { Layout } from "antd";

import initFirebaseApp from "../../../core/firebase";
import * as Routes from "../../routes/routes";

import userLocation from "../../utilities/user-location";

export const firebaseApp = initFirebaseApp();

@userLocation
class App extends Component {
  static propTypes = {
    setCurrentUser: PropTypes.func,
    currentUser: PropTypes.object,
    history: PropTypes.object,
    signOut: PropTypes.func,
    listenForNotifications: PropTypes.func,
    notifications: PropTypes.object,
    onAuthStateChange: PropTypes.func,
    setScreenBreakpoint: PropTypes.func,
    getActiveFeatures: PropTypes.func,
    userLocation: PropTypes.object.isRequired
  };

  render() {
    return (
      <Layout className="layout">
        <Layout.Header>
          <Helmet
            htmlAttributes={{ lang: "en", amp: undefined }} // amp takes no value
            titleTemplate="%s | nobul "
            titleAttributes={{ itemprop: "name", lang: "en" }}
            meta={[
              { name: "description", content: "Nobul" },
              {
                name: "viewport",
                content: "width=device-width, initial-scale=1"
              }
            ]}
          />
        </Layout.Header>
        <div className="content">
          <Switch>
            <Route exact path={Routes.url.home} component={Routes.Home} />
          </Switch>
        </div>
      </Layout>
    );
  }
}

export default App;
