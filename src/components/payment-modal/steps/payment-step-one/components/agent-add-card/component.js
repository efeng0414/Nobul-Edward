import React, { Component } from "react";
import { intlShape, injectIntl } from "react-intl";
import PropTypes from "prop-types";
import { Button, message } from "antd";
import { bound } from "class-bind";
import {
  injectStripe,
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
  PostalCodeElement
} from "react-stripe-elements";
import {
  AUTOBID,
  PROMOTE_OFFER
} from "../../../../../../../core/constants/shared";
import { getStripeMonthlySubscriptionsData } from "../../../../../../../core/firebase/stripeCustomers";
import { formatPrice } from "../../../../../../../core/utilities/format-price";
import { getStripeChargeForPriceRange } from "../../../../../../../core/utilities/stripe-charges";
import { ADD_CARD } from "../../../../../../utilities/constants";
import ActivityIndicator from "../../../../../activity-indicator";
import { translate } from "../../../../../../utilities/locale";

import "./styles.scss";

@injectStripe
@injectIntl
class AgentAddCard extends Component {
  state = {
    charge: null,
    isLoading: false,
    submitDisabled: true,
    cardNumberError: true,
    cvcError: true,
    expiryError: true
  };

  static propTypes = {
    intl: intlShape.isRequired,
    form: PropTypes.any,
    jobDetail: PropTypes.object,
    stripe: PropTypes.object,
    userId: PropTypes.string,
    typeofPayment: PropTypes.string,
    chargeAmount: PropTypes.number,
    creatingSingleCharge: PropTypes.bool,
    nextStep: PropTypes.func.isRequired,
    cardType: PropTypes.string,
    showAddedCardScreen: PropTypes.func,
    transactionNeeded: PropTypes.bool,
    addPaymentSourceToUser: PropTypes.func.isRequired,
    getStripeMonthlySubscriptionsDataAsync: PropTypes.func.isRequired,
    monthlySubscriptionData: PropTypes.object.isRequired,
    createStripeSubscriptionCharge: PropTypes.func.isRequired,
    stripeCustomerError: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.bool,
      PropTypes.string
    ])
  };

  static defaultProps = {
    stripe: {},
    currentUser: "",
    jobDetail: {
      priceRangeLow: 0,
      priceRangeHigh: 0
    }
  };

  componentDidMount() {
    this.props.getStripeMonthlySubscriptionsDataAsync();

    if (this.props.typeofPayment === PROMOTE_OFFER) {
      const { priceRangeHigh = 0, priceRangeLow = 0 } = this.props.jobDetail;
      getStripeChargeForPriceRange({ priceRangeLow, priceRangeHigh }).then(
        charge => {
          this.setState({ charge });
        }
      );
    } else {
      getStripeMonthlySubscriptionsData()
        .then(snapshot => {
          this.setState({
            charge: snapshot.val().price
          });
        })
        .catch(() => {
          message.warning(translate(this.props.intl, "error.CouldNotLoadData"));
        });
    }
  }

  @bound
  addPaymentMethod() {
    return this.props.stripe.createToken().then(tokenObject => {
      return this.props.addPaymentSourceToUser({
        userId: this.props.userId,
        tokenId: tokenObject.token.id
      });
    });
  }

  @bound
  handleSubmit(event) {
    event.preventDefault();
    this.setState({
      isLoading: true
    });
    this.addPaymentMethod()
      .then(() => {
        this.props.nextStep({ source: ADD_CARD });
      })
      .catch(() => {
        const message = this.props.stripeCustomerError.error
          ? translate(
              this.props.intl,
              `error.${this.props.stripeCustomerError.error}`
            )
          : translate(this.props.intl, "error.paymentFailure");
        message.error(message);
        this.setState({
          isLoading: false
        });
      });
  }

  @bound
  handleCardNumberChange(event) {
    !event.error &&
      this.setState({
        cardNumberError: false
      });
    this.handleSubmitDisabled();
  }

  @bound
  handleCVCChange(event) {
    !event.error &&
      this.setState({
        cvcError: false
      });
    this.handleSubmitDisabled();
  }

  @bound
  handleExpiryChange(event) {
    !event.error &&
      this.setState({
        expiryError: false
      });
    this.handleSubmitDisabled();
  }

  @bound
  handleSubmitDisabled() {
    !this.state.cardNumberError &&
      !this.state.cvcError &&
      !this.state.expiryError &&
      this.setState({
        submitDisabled: false
      });
  }

  render() {
    const { intl } = this.props;
    return (
      <ActivityIndicator spinning={this.state.isLoading} type="Validating...">
        <form
          className="payment-form"
          onSubmit={this.handleSubmit}
          onChange={this.change}
        >
          <div className="payment-form__row">
            <div className="payment-form__item">
              <label className="payment-form__label">
                {translate(intl, "payment.cardNumber")}
                <CardNumberElement onChange={this.handleCardNumberChange} />
              </label>
            </div>
          </div>
          <div className="payment-form__row">
            <div className="payment-form__item">
              <label className="payment-form__label">
                {translate(intl, "payment.postalCode")}
                <PostalCodeElement onChange={this.handlePostalCodeChange} />
              </label>
            </div>
          </div>

          <div className="payment-form__row">
            <div className="payment-form__item">
              <label className="payment-form__label">
                {translate(intl, "payment.cvc")}
                <CardCVCElement onChange={this.handleCVCChange} />
              </label>
            </div>
            <div className="payment-form__item">
              <label className="payment-form__label">
                {translate(intl, "payment.expiryDate")}
                <CardExpiryElement onChange={this.handleExpiryChange} />
              </label>
            </div>
          </div>
          <div className="payment-form__row">
            <div className="payment-form__item">
              <div className="payment-form__submit">
                {this.props.typeofPayment === AUTOBID ? (
                  <Button
                    disabled={this.state.submitDisabled}
                    className="payment-form__button"
                    onClick={this.handleSubmit}
                  >
                    {translate(intl, "button.addCreditCard")}
                  </Button>
                ) : (
                  <Button
                    disabled={this.state.submitDisabled}
                    className="payment-form__submit__button"
                    onClick={this.handleSubmit}
                  >
                    {translate(intl, "button.addCreditCard")}
                  </Button>
                )}
              </div>
              {this.props.typeofPayment === AUTOBID && (
                <p className="payment-form__footer">
                  {translate(intl, "subscriptions.stripeFooterMonthly")}
                  <br />
                  {this.state.charge &&
                    translate(intl, "proposal.promotePaymentLine2", {
                      charge: formatPrice({ price: this.state.charge })
                    })}
                </p>
              )}
              {this.props.typeofPayment === PROMOTE_OFFER && (
                <p className="payment-form__footer">
                  {this.state.charge &&
                    translate(intl, "proposal.promotePaymentLine1")}
                  <br />
                  {this.state.charge &&
                    translate(intl, "proposal.promotePaymentLine2", {
                      charge: formatPrice({ price: this.state.charge })
                    })}
                </p>
              )}
            </div>
          </div>
        </form>
      </ActivityIndicator>
    );
  }
}

export default AgentAddCard;
