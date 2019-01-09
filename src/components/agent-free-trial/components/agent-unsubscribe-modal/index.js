import React, { PureComponent } from "react";
import { intlShape } from "react-intl";
import PropTypes from "prop-types";
import { translate } from "../../../../utilities/locale";
import { Modal, Button } from "antd";
import "./styles.scss";

class AgentUnsubscribeModal extends PureComponent {
  static propTypes = {
    intl: intlShape.isRequired,
    visibility: PropTypes.bool.isRequired,
    toggleVisibility: PropTypes.func.isRequired,
    firstName: PropTypes.string,
    cancelMembership: PropTypes.func.isRequired,
    keepMembership: PropTypes.func.isRequired,
    currentStep: PropTypes.number.isRequired,
    endDate: PropTypes.string
  };

  static defaultProps = {
    endDate: ""
  };

  render() {
    return (
      <Modal
        visible={this.props.visibility}
        onCancel={this.props.toggleVisibility}
        footer={[null, null]}
      >
        <div className="agent-unsubscribe-modal-content">
          {this.props.currentStep === 1 && (
            <div>
              <p>
                {translate(this.props.intl, "subscriptions.sorryToLoseYou", {
                  User: this.props.firstName
                })}
              </p>
              <div className="agent-unsubscribe-modal-content__cancel__membership">
                <Button type="primary" onClick={this.props.cancelMembership}>
                  {translate(this.props.intl, "subscriptions.cancelMembership")}
                </Button>
                <p>
                  {translate(
                    this.props.intl,
                    "subscriptionSettings.unsubscribePremiumAccountWarning",
                    {
                      endDate: this.props.endDate
                    }
                  )}
                </p>
              </div>
              <Button onClick={this.props.toggleVisibility}>
                {translate(this.props.intl, "subscriptions.keepMembership")}
              </Button>
            </div>
          )}
          {this.props.currentStep === 2 && (
            <div>
              <p>
                {translate(this.props.intl, "subscriptions.memberWillEnd", {
                  Date: this.props.endDate
                })}
              </p>
              <p>{translate(this.props.intl, "subscriptions.NotBeCharged")}</p>
              <Button onClick={this.props.keepMembership}>
                {translate(this.props.intl, "subscriptions.continueMembership")}
              </Button>
            </div>
          )}
          {this.props.currentStep === 3 && (
            <div>
              <p>
                {translate(
                  this.props.intl,
                  "subscriptions.membershipWillContinue1"
                )}
              </p>
              <p>
                {translate(
                  this.props.intl,
                  "subscriptions.membershipWillContinue2",
                  { Date: this.props.endDate }
                )}
              </p>
            </div>
          )}
        </div>
      </Modal>
    );
  }
}

export default AgentUnsubscribeModal;
