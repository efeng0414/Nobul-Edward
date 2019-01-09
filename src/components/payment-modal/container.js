import React, { Component } from "react";
import PropTypes from "prop-types";
import { Modal } from "antd";
import { intlShape, injectIntl } from "react-intl";
import { translate } from "../../utilities/locale";
import { bound } from "class-bind";
import { PROMOTE_OFFER, AUTOBID } from "../../../core/constants/shared";

import PaymentStepOne from "./steps/payment-step-one";
import PaymentStepTwo from "./steps/payment-step-two";
import PaymentStepThree from "./steps/payment-step-three";

import AgentAddCardSuccess from "./steps/payment-step-one/components/agent-add-card-success";

class PaymentModal extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
    getStripeCards: PropTypes.func.isRequired,
    userId: PropTypes.string.isRequired,
    toggleVisibility: PropTypes.func.isRequired,
    visibility: PropTypes.bool.isRequired,
    stripeCards: PropTypes.array.isRequired,
    jobDetail: PropTypes.object,
    typeofPayment: PropTypes.string,
    createStripeSubscriptionChargeAsync: PropTypes.func,
    createStripeSingleChargeAsync: PropTypes.func,
    deleteCardAsync: PropTypes.func.isRequired,
    paymentFrequency: PropTypes.string,
    offerId: PropTypes.string,
    transactionNeeded: PropTypes.bool.isRequired,
    setIsPremium: PropTypes.func
  };

  static defaultProps = {
    jobDetail: {},
    typeofPayment: "",
    createStripeSubscriptionChargeAsync: () => {},
    createStripeSingleChargeAsync: () => {},
    paymentFrequency: "",
    offerId: "",
    setIsPremium: () => {}
  };

  state = {
    typeofPayment: "",
    currentStep: 1
  };

  @bound
  onNext() {
    this.setState({
      currentStep: this.state.currentStep + 1
    });
  }

  componentDidMount() {
    this.props.getStripeCards(this.props.userId);
    this.props.typeofPayment === PROMOTE_OFFER &&
      this.setState({
        typeofPayment: PROMOTE_OFFER
      });
    this.props.typeofPayment === AUTOBID &&
      this.setState({
        typeofPayment: AUTOBID
      });
  }

  @bound
  handleModalVisibility() {
    //reset modal state to step 1 on success or cancel
    this.setState({ currentStep: 1 });
    this.props.toggleVisibility();
  }

  render() {
    return (
      <Modal
        onCancel={this.handleModalVisibility}
        title={
          this.state.currentStep === 2
            ? translate(this.props.intl, "subscriptions.addPaymentMethod")
            : translate(this.props.intl, "offer.confirmation")
        }
        visible={this.props.visibility}
        footer={null}
        className="payment-modal"
        width={367} // 367px from Zeplin file
      >
        {this.state.currentStep === 1 && (
          <PaymentStepOne
            cards={this.props.stripeCards}
            nextStep={this.onNext}
            intl={this.props.intl}
            jobDetail={this.props.jobDetail}
            userId={this.props.userId}
            typeofPayment={this.state.typeofPayment}
            deleteCard={this.props.deleteCardAsync}
            paymentFrequency={this.props.paymentFrequency}
            transactionNeeded={this.props.transactionNeeded}
          />
        )}
        {this.state.currentStep === 2 &&
          this.props.transactionNeeded && (
            <PaymentStepTwo
              cards={this.props.stripeCards}
              nextStep={this.onNext}
              intl={this.props.intl}
              jobDetail={this.props.jobDetail}
              userId={this.props.userId}
              offerId={this.props.offerId}
              typeofPayment={this.state.typeofPayment}
              createStripeSubscriptionCharge={this.props.createStripeSubscriptionChargeAsync}
              createStripeSingleCharge={this.props.createStripeSingleChargeAsync}
              paymentFrequency={this.props.paymentFrequency}
              setIsPremium={this.props.setIsPremium}
            />
          )}
        {this.state.currentStep === 2 &&
          !this.props.transactionNeeded && (
            <AgentAddCardSuccess onCancel={this.handleModalVisibility} intl={this.props.intl} />
          )}
        {this.state.currentStep === 3 && (
          <PaymentStepThree intl={this.props.intl} typeofPayment={this.state.typeofPayment} />
        )}
      </Modal>
    );
  }
}

export default injectIntl(PaymentModal);
