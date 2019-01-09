import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Button } from "antd";
import { translate } from "../../../../../../utilities/locale";
import { intlShape, injectIntl } from "react-intl";
import "./styles.scss";

@injectIntl
class AgentRemoveCard extends PureComponent {
  static propTypes = {
    intl: intlShape.isRequired,
    closeDeleteModal: PropTypes.func.isRequired,
    confirmDelete: PropTypes.func.isRequired,
    removeCardSuccess: PropTypes.bool
  };

  render() {
    return (
      <div className="remove-card">
        <p className="remove-card-text">
          {this.props.removeCardSuccess
            ? translate(this.props.intl, "subscriptions.deleteCardBody")
            : translate(this.props.intl, "subscriptions.removeCardText")}
        </p>
        {this.props.removeCardSuccess ? (
          <Button
            className="remove-card-single-button"
            type="primary"
            onClick={this.props.closeDeleteModal}
          >
            {translate(this.props.intl, "button.done")}
          </Button>
        ) : (
          <div className="remove-card-button-group">
            <Button onClick={this.props.closeDeleteModal}>
              {translate(this.props.intl, "button.cancel")}
            </Button>
            <Button type="primary" onClick={this.props.confirmDelete}>
              {translate(this.props.intl, "button.remove")}
            </Button>
          </div>
        )}
      </div>
    );
  }
}

export default AgentRemoveCard;
