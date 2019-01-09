import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Button } from "antd";
import { translate } from "../../../../../../utilities/locale";
import { intlShape, injectIntl } from "react-intl";
import "./styles.scss";

class AgentAddCardSuccess extends PureComponent {
  static propTypes = {
    intl: intlShape.isRequired,
    onCancel: PropTypes.func
  };

  render() {
    return (
      <div className="add-card-success">
        <p className="add-card-success__text">
          {translate(this.props.intl, "subscriptions.addCardSuccess")}
        </p>
        <Button
          className="add-card-success__button"
          type="primary"
          onClick={this.props.onCancel}
        >
          {translate(this.props.intl, "button.done")}
        </Button>
      </div>
    );
  }
}

export default injectIntl(AgentAddCardSuccess);
