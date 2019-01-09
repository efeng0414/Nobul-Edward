import React, { Component } from "react";
import PropTypes from "prop-types";
import { Card } from "antd";
import { injectIntl, intlShape } from "react-intl";
import { bound } from "class-bind";
import { translate } from "../../utilities/locale";
import "./styles.scss";

@injectIntl
class ErrorPage extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
    Raven: PropTypes.object
  };

  static defaultProps = {
    Raven: window.Raven
  };

  @bound
  triggerErrorReportDialog() {
    this.props.Raven.lastEventId() && this.props.Raven.showReportDialog();
  }

  render() {
    return (
      <main className="error-page">
        <Card className="error-card" onClick={this.triggerErrorReportDialog}>
          <h1>{translate(this.props.intl, "errorComponent.title")}</h1>
          <p>{translate(this.props.intl, "errorComponent.text")}</p>
        </Card>
      </main>
    );
  }
}

export default ErrorPage;
