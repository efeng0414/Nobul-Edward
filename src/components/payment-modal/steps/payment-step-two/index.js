import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import ActivityIndicator from "../../../activity-indicator";
import { bound } from "class-bind";
import { translate } from "../../../../utilities/locale";
import { injectIntl, intlShape } from "react-intl";
import { getStripeChargeForPriceRange } from "../../../../../core/utilities/stripe-charges";
import { Button, message } from "antd";
import {
  getStripeMonthlySubscriptionsData,
  getStripeYearlySubscriptionsData
} from "../../../../../core/firebase/stripeCustomers";
import {
  CURRENCY_SYMBOLS,
  AUTOBID,
  PROMOTE_OFFER,
  FREE_TRIAL
} from "../../../../../core/constants/shared";
import { calculateTax } from "../../../../../core/utilities/calculate-tax";
import "./styles.scss";
import {
  MONTHLY,
  YEARLY
} from "../../../../../core/api-transform/stripeCustomers";
import { url } from "../../../../routes/myNobul";
import { formatCurrency } from "../../../../utilities/locale";
import { formatPrice } from "../../../../../core/utilities/format-price";

@withRouter
class PaymentStepTwo extends PureComponent {
  state = {
    isLoading: false,
    transactionType: "",
    subscriptionPrice: 0,
    subscriptionTax: 0,
    subscriptionTotal: 0,
    promoteOfferPrice: 0,
    promoteOfferTax: 0,
    promoteOfferTotal: 0,
    planId: ""
  };

  static propTypes = {
    intl: intlShape.isRequired,
    priceRangeHigh: PropTypes.number,
    priceRangeLow: PropTypes.number,
    userId: PropTypes.string.isRequired,
    createStripeSingleCharge: PropTypes.func,
    nextStep: PropTypes.func.isRequired,
    typeofPayment: PropTypes.string.isRequired,
    createStripeSubscriptionCharge: PropTypes.func,
    jobDetail: PropTypes.object,
    paymentFrequency: PropTypes.string,
    offerId: PropTypes.string,
    setIsPremium: PropTypes.func,
    history: PropTypes.object.isRequired,
    buttonText: PropTypes.string
  };

  static defaultProps = {
    userId: "",
    nextStep: () => {},
    typeofPayment: "",
    priceRangeHigh: 0,
    priceRangeLow: 0,
    createStripeSingleCharge: () => {},
    createStripeSubscriptionCharge: () => {},
    jobDetail: {},
    paymentFrequency: "",
    offerId: "",
    setIsPremium: () => {},
    buttonText: ""
  };

  componentDidMount() {
    this.getTransactionSummary();
    if (this.props.typeofPayment === AUTOBID) {
      this.props.paymentFrequency === MONTHLY
        ? getStripeMonthlySubscriptionsData().then(snapshot => {
            this.setState({
              subscriptionPrice: snapshot.val().price,
              planId: snapshot.val().planId,
              subscriptionTotal: calculateTax(this.state.subscriptionPrice)
            });
          })
        : getStripeYearlySubscriptionsData().then(snapshot => {
            this.setState({
              subscriptionPrice: snapshot.val().price,
              planId: snapshot.val().planId
            });
          });
    } else {
      const { priceRangeHigh, priceRangeLow } = this.props.jobDetail;
      getStripeChargeForPriceRange({ priceRangeLow, priceRangeHigh })
        .then(charge => {
          this.setState({ promoteOfferPrice: charge });
        })
        .catch(() => {
          message.warning(translate(this.props.intl, "error.CouldNotLoadData"));
        });
    }
  }

  @bound
  renderPromoteOfferConfirmation() {
    return (
      <div>
        <p className="confirm-payment__title-small">
          {translate(this.props.intl, "offer.promoteOffer")}
        </p>
        <p className="confirm-payment__price-large">
          ${formatPrice({ price: this.state.promoteOfferPrice })}
        </p>

        <table className="confirm-payment__table">
          <tbody>
            <tr className="confirm-payment__item">
              <td className="confirm-payment__label">
                {translate(
                  this.props.intl,
                  "subscriptions.paymentConfirmFirst"
                )}
              </td>
              <td className="confirm-payment__price">
                <p>${formatPrice({ price: this.state.promoteOfferPrice })}</p>
              </td>
            </tr>
            <tr className="confirm-payment__item confirm-payment__item--tax">
              <td className="confirm-payment__label">
                {translate(
                  this.props.intl,
                  "subscriptions.paymentConfirmSecond"
                )}
              </td>
              <td className="confirm-payment__price">
                ${(
                  calculateTax(this.state.promoteOfferPrice) -
                  this.state.promoteOfferPrice
                ).toFixed(2)}{" "}
              </td>
            </tr>
            <tr className="confirm-payment__item confirm-payment__item--total">
              <td className="confirm-payment__label">
                {translate(this.props.intl, "offer.total")}
              </td>
              <td className="confirm-payment__price">
                {formatCurrency(calculateTax(this.state.promoteOfferPrice))}
              </td>
            </tr>
          </tbody>
        </table>

        <Button
          className="confirm-payment__button"
          onClick={this.confirmPayment}
        >
          {translate(this.props.intl, "button.placeOrder")}
        </Button>
      </div>
    );
  }

  @bound
  renderSubscriptionConfirmation() {
    return (
      <div>
        <p className="confirm-payment__title">
          {translate(this.props.intl, "subscriptions.title")}
        </p>
        <p className="confirm-payment__price">
          ${formatPrice({ price: this.state.subscriptionPrice })}
        </p>
        <p className="confirm-payment__price confirm-payment__price--frequency">
          {this.props.paymentFrequency === MONTHLY &&
            translate(this.props.intl, "subscriptions.monthlyFrequency")}
          {this.props.paymentFrequency === YEARLY &&
            translate(this.props.intl, "subscriptions.yearlyFrequency")}
        </p>
        <div className="confirm-payment__table">
          <div className="confirm-payment__item">
            <p>
              {this.props.paymentFrequency === MONTHLY &&
                translate(
                  this.props.intl,
                  "subscriptions.paymentConfirmFirstMonthly"
                )}
              {this.props.paymentFrequency === YEARLY &&
                translate(
                  this.props.intl,
                  "subscriptions.paymentConfirmFirstYearly"
                )}
            </p>
            <p>${formatPrice({ price: this.state.subscriptionPrice })}</p>
          </div>
          <div className="confirm-payment__item">
            <p>
              {translate(this.props.intl, "subscriptions.paymentConfirmSecond")}
            </p>
            <p>
              ${(
                calculateTax(this.state.subscriptionPrice) -
                this.state.subscriptionPrice
              ).toFixed(2)}
            </p>
          </div>
        </div>
        <div className="confirm-payment__table">
          <div className="confirm-payment__item">
            <p>{translate(this.props.intl, "offer.total")}</p>
            <p>{formatCurrency(calculateTax(this.state.subscriptionPrice))}</p>
          </div>
        </div>
        <Button
          className="confirm-payment__button"
          onClick={this.confirmPayment}
        >
          {translate(this.props.intl, "button.placeOrder")}
        </Button>
      </div>
    );
  }

  @bound
  renderFreeTrialConfirmation() {
    return (
      <div>
        <h1 className="confirm-payment__title-trial">
          {translate(this.props.intl, "freeTrial.title2")}
        </h1>
        <p className="confirm-payment__price-trial">
          {translate(this.props.intl, "freeTrial.modal.months")}
        </p>
        <table className="confirm-payment__table">
          <tbody>
            <tr className="confirm-payment__item">
              <td className="confirm-payment__label">
                {translate(this.props.intl, "freeTrial.modal.item")}
              </td>
              <td className="confirm-payment__price">
                {translate(this.props.intl, "freeTrial.price")}
              </td>
            </tr>
            <tr className="confirm-payment__item confirm-payment__item--tax">
              <td className="confirm-payment__label">
                {translate(this.props.intl, "freeTrial.modal.hst")}
              </td>
              <td className="confirm-payment__price">
                {translate(this.props.intl, "freeTrial.price")}
              </td>
            </tr>
            <tr className="confirm-payment__item confirm-payment__item--total">
              <td className="confirm-payment__label">
                {translate(this.props.intl, "freeTrial.modal.total")}
              </td>
              <td className="confirm-payment__price">
                {translate(this.props.intl, "freeTrial.price")}
              </td>
            </tr>
          </tbody>
        </table>
        <Button
          className="confirm-payment__button"
          onClick={this.props.nextStep}
        >
          {this.props.buttonText ||
            translate(this.props.intl, "subscriptions.addPaymentMethod")}
        </Button>
        <div className="confirm-payment__footer">
          {translate(this.props.intl, "freeTrial.footer")}
          <span className="confirm-payment__footer--price">
            {translate(this.props.intl, "freeTrial.footerPrice")}
          </span>
        </div>
      </div>
    );
  }

  @bound
  promoteOffer() {
    const { priceRangeHigh, priceRangeLow, jobType } = this.props.jobDetail;
    const { userId } = this.props;
    getStripeChargeForPriceRange({
      priceRangeLow,
      priceRangeHigh
    })
      .then(chargeAmount => {
        // TODO: really shouldnt be letting front-end set the price to pay.
        const chargeWithTax = calculateTax(chargeAmount);
        const charge = {
          amount: parseInt(chargeWithTax * 100), //Stripe expects data in cents. Please parseInt ALL amounts.
          currency: CURRENCY_SYMBOLS.CAD,
          description: `Offer promotion for price range of CAD${priceRangeLow} to CAD${priceRangeHigh}`,
          itemId: this.props.offerId,
          promoteItem: `${jobType}Offer`
        };

        return this.props.createStripeSingleCharge({
          userId,
          charge
        });
      })
      .then(() => {
        this.setState({
          isLoading: false
        });
        this.props.nextStep();
      })
      .catch(() => {
        message.error(translate(this.props.intl, "error.paymentFailure"));
      });
  }

  @bound
  makeAutobidSubscription() {
    this.props
      .createStripeSubscriptionCharge({
        userId: this.props.userId,
        planId: this.state.planId
      })
      .then(() => {
        this.props.history.push({
          pathname: url.settings,
          state: { afterSubscribeAutobid: true }
        });
      })
      .catch(error => {
        console.log("error in payment step 2: ", error);
        message.error(translate(this.props.intl, "error.paymentFailure"));
        this.setState({
          isLoading: false
        });
      });
    this.props.setIsPremium();
  }

  @bound
  confirmPayment() {
    this.setState({
      isLoading: true
    });
    this.props.typeofPayment === PROMOTE_OFFER && this.promoteOffer();
    this.props.typeofPayment === AUTOBID && this.makeAutobidSubscription();
  }

  @bound
  getTransactionSummary() {
    if (this.props.typeofPayment === PROMOTE_OFFER) {
      this.setState({
        transactionType: PROMOTE_OFFER
      });
    } else if (this.props.typeofPayment === AUTOBID) {
      this.setState({
        transactionType: AUTOBID
      });
    } else if (this.props.typeofPayment === FREE_TRIAL) {
      this.setState({
        transactionType: FREE_TRIAL
      });
    }
  }

  render() {
    return (
      <div className="confirm-payment">
        <ActivityIndicator
          spinning={this.state.isLoading}
          type={translate(this.props.intl, "loading.makingPayment")}
        >
          {this.state.transactionType === PROMOTE_OFFER &&
            this.renderPromoteOfferConfirmation()}
          {this.state.transactionType === AUTOBID &&
            this.renderSubscriptionConfirmation()}
          {this.state.transactionType === FREE_TRIAL &&
            this.renderFreeTrialConfirmation()}
        </ActivityIndicator>
      </div>
    );
  }
}

export default injectIntl(PaymentStepTwo);
