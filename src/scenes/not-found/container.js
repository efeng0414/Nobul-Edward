import React, { Component } from "react";
import Helmet from "react-helmet";
import { injectIntl } from "react-intl";
import { translate } from "../../utilities/locale";
import PropTypes from "prop-types";
import "./styles.scss";

class NotFound extends Component {
  static propTypes = {
    intl: PropTypes.any
  };

  render() {
    const { intl } = this.props;

    return (
      <div className="Test">
        <Helmet title={translate(intl, "helmet.notFound")} />
        {/* TODO: Style and content */}
        <div>Not found</div>
      </div>
    );
  }
}

export default injectIntl(NotFound);
