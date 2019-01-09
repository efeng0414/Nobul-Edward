import React, { PureComponent } from "react";
import { withRouter } from "react-router";
import { Modal, message } from "antd";
import { bound } from "class-bind";
import PropTypes from "prop-types";
import { intlShape, injectIntl } from "react-intl";

import PaymentStepOne from "../../../payment-modal/steps/payment-step-one";
import PaymentStepTwo from "../../../payment-modal/steps/payment-step-two";
import PaymentStepThree from "../../../payment-modal/steps/payment-step-three";
import { FREE_TRIAL } from "../../../../../core/constants/shared";
import { SELECT_CARD, ADD_CARD } from "../../../../utilities/constants";
import { translate } from "../../../../utilities/locale";
import ActivityIndicator from "../../../activity-indicator";
import ErrorBoundary from "../../../error-boundary";
import LicenceForm from "../../../forms/agent/licence-form";
import {
  AGENT_LICENCE_INFO_NOBUL_PREMIUM,
  AGENT_PREMIUM_SUBSCRIPTION_SUBMIT
} from "../../../../utilities/google-tag-variable";
import { gtmEvent } from "../../../../utilities/gtm-event";

@withRouter
@injectIntl
class AgentFreeTrialModal extends PureComponent {
  static propTypes = {
    intl: intlShape.isRequired,
    createStripeSubscriptionCharge: PropTypes.func.isRequired,
    userId: PropTypes.string.isRequired,
    history: PropTypes.object.isRequired,
    visible: PropTypes.bool.isRequired,
    onCancel: PropTypes.func.isRequired,
    deleteCard: PropTypes.func.isRequired,
    cards: PropTypes.array.isRequired,
    getStripeMonthlySubscriptionsDataAsync: PropTypes.func.isRequired,
    monthlySubscriptionData: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
    hasLicenceData: PropTypes.bool.isRequired,
    isPremium: PropTypes.bool.isRequired
  };

  state = {
    currentScreen: 1
  };

  componentDidMount() {
    this.props.getStripeMonthlySubscriptionsDataAsync();
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.isPremium !== prevProps.isPremium &&
      this.props.isPremium === false
    )
      this.setState({ currentScreen: 1 });
  }

  @bound
  nextStep({ source = "" } = {}) {
    if (this.state.currentScreen === 2 && source === SELECT_CARD) {
      this.makeSubscription();
    } else if (source !== ADD_CARD) {
      this.setState({
        currentScreen: this.state.currentScreen + 1
      });
    }
  }

  @bound
  makeSubscription() {
    this.props
      .createStripeSubscriptionCharge({
        userId: this.props.userId,
        planId: this.props.monthlySubscriptionData.planId
      })
      .then(() => {
        this.setState({
          isLoading: false,
          currentScreen: this.state.currentScreen + 1
        });

        // GTM event
        gtmEvent({ name: AGENT_PREMIUM_SUBSCRIPTION_SUBMIT });
      })
      .catch(() => {
        message.error(translate(this.props.intl, "error.paymentFailure"));
        this.setState({
          isLoading: false
        });
      });
  }

  @bound
  getModalTitle() {
    if (this.state.currentScreen === 1) {
      return translate(this.props.intl, "offer.orderSummary");
    } else if (this.state.currentScreen === 2) {
      return translate(this.props.intl, "freeTrial.title");
    } else {
      return null;
    }
  }

  render() {
    const widerModalWidth =
      this.state.currentScreen === 2 && !this.props.hasLicenceData;
    return (
      <Modal
        visible={this.props.visible}
        onCancel={this.props.onCancel}
        title={this.getModalTitle()}
        footer={null}
        width={widerModalWidth ? 520 : 367} // 367px from Zeplin file
      >
        <ActivityIndicator spinning={this.props.isLoading}>
          {this.state.currentScreen === 1 && (
            <ErrorBoundary>
              <PaymentStepTwo
                intl={this.props.intl}
                userId={this.props.userId}
                nextStep={this.nextStep}
                typeofPayment={FREE_TRIAL}
                buttonText={
                  !this.props.hasLicenceData
                    ? translate(this.props.intl, "button.next")
                    : undefined
                }
              />
            </ErrorBoundary>
          )}
          {this.state.currentScreen === 2 && (
            <ErrorBoundary>
              {this.props.hasLicenceData && (
                <PaymentStepOne
                  intl={this.props.intl}
                  userId={this.props.userId}
                  nextStep={this.nextStep}
                  typeofPayment={FREE_TRIAL}
                  deleteCard={this.props.deleteCard}
                  cards={this.props.cards}
                  footerNeeded={false}
                />
              )}
              {!this.props.hasLicenceData && (
                <LicenceForm
                  GTM_EVENT={AGENT_LICENCE_INFO_NOBUL_PREMIUM}
                  showCompleteProfileText
                />
              )}
            </ErrorBoundary>
          )}
          {this.state.currentScreen === 3 && (
            <ErrorBoundary>
              <PaymentStepThree
                intl={this.props.intl}
                toggleModal={this.toggleModal}
                typeofPayment={FREE_TRIAL}
              />
            </ErrorBoundary>
          )}
        </ActivityIndicator>
      </Modal>
    );
  }
}

export default AgentFreeTrialModal;
