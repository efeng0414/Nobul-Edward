import React, { Component } from "react";
import PropTypes from "prop-types";
import { translate } from "../../../../../../utilities/locale";
import { intlShape, injectIntl } from "react-intl";
import AgentCardPanel from "../agent-card-panel";
import AgentRemoveCard from "../agent-remove-card";
import { message, Modal } from "antd";
import { bound } from "class-bind";
import { getStripeChargeForPriceRange } from "../../../../../../../core/utilities/stripe-charges";
import {
  AUTOBID,
  FREE_TRIAL
} from "../../../../../../../core/constants/shared";
import {
  getStripeMonthlySubscriptionsData,
  getStripeYearlySubscriptionsData
} from "../../../../../../../core/firebase/stripeCustomers";
import { formatPrice } from "../../../../../../../core/utilities/format-price";

import { MONTHLY } from "../../../../../../../core/api-transform/users";

@injectIntl
class AgentSelectCard extends Component {
  state = {
    charge: "",
    nodeId: "",
    showModal: false,
    removeCardSuccess: false
  };
  static propTypes = {
    userId: PropTypes.string.isRequired,
    intl: intlShape.isRequired,
    nextStep: PropTypes.func,
    nodeId: PropTypes.string.isRequired,
    jobDetail: PropTypes.object,
    cards: PropTypes.array.isRequired,
    deleteCard: PropTypes.func.isRequired,
    typeofPayment: PropTypes.string.isRequired,
    paymentFrequency: PropTypes.string,
    transactionNeeded: PropTypes.bool,
    footerNeeded: PropTypes.bool
  };

  static defaultProps = {
    transactionNeeded: true,
    typeofPayment: "",
    nodeId: "",
    userId: "",
    jobDetail: {
      priceRangeHigh: 0,
      priceRangeLow: 0
    },
    cards: [],
    deleteCard: () => {},
    footerNeeded: true
  };

  componentDidMount() {
    if (this.props.typeofPayment === AUTOBID) {
      this.props.paymentFrequency === MONTHLY
        ? getStripeMonthlySubscriptionsData()
            .then(snapshot => {
              this.setState({
                charge: snapshot.val().price
              });
            })
            .catch(() => {
              message.warning(
                translate(this.props.intl, "error.CouldNotLoadData")
              );
            })
        : getStripeYearlySubscriptionsData()
            .then(snapshot => {
              this.setState({
                charge: snapshot.val().price
              });
            })
            .catch(() => {
              message.warning(
                translate(this.props.intl, "error.CouldNotLoadData")
              );
            });
    }
    const { priceRangeHigh, priceRangeLow } = this.props.jobDetail;
    getStripeChargeForPriceRange({ priceRangeLow, priceRangeHigh }).then(
      charge => {
        this.setState({ charge });
      }
    );
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.cards.length > this.props.cards.length) {
      this.setState({ showModal: true, removeCardSuccess: true });
    }
  }

  generatePanels() {
    const cards = this.props.cards;

    return cards.map(cardData => (
      <AgentCardPanel
        key={cardData.fingerprint}
        cardType={cardData.brand}
        lastFourDigits={cardData.last4}
        expiryDate={`${cardData.exp_month}/${cardData.exp_year}`}
        nodeId={cardData.nodeId}
        handleCreditCardSelect={this.handleCreditCardSelect}
        nextStep={this.props.nextStep}
        deleteCard={this.triggerDeleteModal}
        userId={this.props.userId}
        transactionNeeded={this.props.transactionNeeded}
      />
    ));
  }

  @bound
  triggerDeleteModal({ nodeId }) {
    this.setState({ showModal: true, nodeId, removeCardSuccess: false });
  }

  @bound
  closeDeleteModal() {
    this.setState({ showModal: false, nodeId: "" });
  }

  @bound
  confirmDelete() {
    this.state.nodeId &&
      this.props
        .deleteCard({
          userId: this.props.userId,
          cardNodeId: this.state.nodeId
        })
        .then(() => {
          this.closeDeleteModal();
        });
  }

  render() {
    const { intl } = this.props;
    return (
      <div>
        <div>{this.generatePanels()}</div>

        <Modal
          visible={this.state.showModal}
          title={translate(this.props.intl, "subscriptions.removeCardTitle")}
          footer={null}
          onCancel={this.closeDeleteModal}
        >
          <AgentRemoveCard
            removeCardSuccess={this.state.removeCardSuccess}
            confirmDelete={this.confirmDelete}
            closeDeleteModal={this.closeDeleteModal}
          />
        </Modal>
        {this.props.transactionNeeded &&
          this.props.typeofPayment !== FREE_TRIAL && (
            <div className="payment-form-footer">
              {this.props.typeofPayment === AUTOBID ? (
                <p className="payment-form-footer">
                  {this.props.paymentFrequency === MONTHLY
                    ? translate(intl, "subscriptions.stripeFooterMonthly")
                    : translate(intl, "subscriptions.stripeFooterYearly")}
                  <br />
                  {this.state.charge &&
                    translate(intl, "proposal.promotePaymentLine2", {
                      charge: formatPrice(this.state.charge)
                    })}
                </p>
              ) : (
                <p className="payment-form-footer">
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
          )}
      </div>
    );
  }
}

export default AgentSelectCard;
