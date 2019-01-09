import React, { PureComponent } from "react";
import { Modal, Button } from "antd";
import { bound } from "class-bind";
import { intlShape, injectIntl } from "react-intl";
import PropTypes from "prop-types";
import { translate } from "../../utilities/locale";
import DeclineIcon from "../../assets/images/decline_icon.svg";

import "./styles.scss";
class WithdrawOfferModal extends PureComponent {
  static propTypes = {
    intl: intlShape.isRequired,
    visibility: PropTypes.bool,
    onClose: PropTypes.func,
    withdrawOffer: PropTypes.func,
    jobType: PropTypes.string,
    offerId: PropTypes.string
  };

  state = {
    currentScreen: 1
  };

  @bound
  handleWithdrawOffer() {
    this.props.withdrawOffer({
      jobType: this.props.jobType,
      offerId: this.props.offerId
    });
    this.setState({
      currentScreen: 2
    });
  }

  render() {
    return (
      <Modal
        title="Confirmation"
        visible={this.props.visibility}
        onCancel={this.props.onClose}
        footer={[
          this.state.currentScreen === 1 ? (
            <Button
              key="submit"
              type="primary"
              onClick={this.handleWithdrawOffer}
            >
              {translate(this.props.intl, "button.withdraw")}
            </Button>
          ) : null
        ]}
      >
        {this.state.currentScreen === 1 && (
          <p>{translate(this.props.intl, "proposal.withdrawWarning")}</p>
        )}
        {this.state.currentScreen === 2 && (
          <div className="withdraw-modal">
            <img src={DeclineIcon} />
            <p className="withdraw-modal-title">
              {translate(this.props.intl, "proposal.withdrawTitle")}
            </p>
            <p className="withdraw-modal-body">
              {translate(this.props.intl, "proposal.withdrawBody")}
            </p>
          </div>
        )}
      </Modal>
    );
  }
}

export default injectIntl(WithdrawOfferModal);
