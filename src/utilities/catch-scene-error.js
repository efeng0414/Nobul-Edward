import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import * as Routes from "../routes/routes";

const catchSceneError = ComponentToWrap => {
  @withRouter
  class CatchSceneErrorComponent extends Component {
    static propTypes = {
      history: PropTypes.object.isRequired
    };

    WrappedComponent = ComponentToWrap;

    componentDidCatch(error, info) {
      Raven.captureException(error, { extra: info });
      this.props.history.push(Routes.url.error);
    }

    render() {
      return <ComponentToWrap {...this.props} />;
    }
  }

  return CatchSceneErrorComponent;
};

export default catchSceneError;
