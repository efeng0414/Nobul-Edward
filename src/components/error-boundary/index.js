import React, { Component } from "react";
import PropTypes from "prop-types";
import { Card } from "antd";
import { injectIntl, intlShape } from "react-intl";
import { bound } from "class-bind";
import { translate } from "../../utilities/locale";
import "./styles.scss";

@injectIntl
class ErrorBoundary extends Component {
  state = {
    error: false
  };

  static propTypes = {
    intl: intlShape.isRequired,
    children: PropTypes.any.isRequired
  };

  componentDidCatch(error, info) {
    this.setState({ error: true });
    Raven.captureException(error, { extra: info });
  }

  @bound
  triggerBugReportDialog() {
    Raven.lastEventId() && Raven.showReportDialog();
  }

  render() {
    return this.state.error ? (
      <Card className="error-boundary" onClick={this.triggerBugReportDialog}>
        <h1>{translate(this.props.intl, "errorComponent.title")}</h1>
        <p>{translate(this.props.intl, "errorComponent.text")}</p>
      </Card>
    ) : (
      this.props.children
    );
  }
}

export default ErrorBoundary;
