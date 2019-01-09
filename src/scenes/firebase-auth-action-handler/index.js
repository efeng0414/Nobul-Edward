import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Card } from "antd";
import PropTypes from "prop-types";
import { getSearchParamObject } from "../../utilities/get-search-params";
import { firebaseApp } from "../../scenes/app/container";
import * as Routes from "../../routes/routes";
import { authActionMap, shouldRedirect } from "./utilities";
import "./styles.scss";

@withRouter
class FirebaseAuthActionHandler extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  searchParamObject = getSearchParamObject({
    searchParamString: this.props.location.search
  });

  componentDidMount() {
    shouldRedirect({
      mode: this.searchParamObject.mode
    }) &&
      (window.location.href = `https://${process.env.FIREBASE_AUTH_DOMAIN}${
        Routes.url.firebaseAuthActionHandler
      }${this.props.location.search}`);
  }

  render() {
    const ModeComponent = authActionMap[this.searchParamObject.mode].component;
    return (
      <main className="auth-action-handler">
        <Card className="auth-action-handler-card">
          <ModeComponent
            firebaseApp={firebaseApp}
            actionCode={this.searchParamObject.oobCode}
          />
        </Card>
      </main>
    );
  }
}

export default FirebaseAuthActionHandler;
