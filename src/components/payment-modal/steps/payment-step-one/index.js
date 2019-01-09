import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import AgentAddCard from "./components/agent-add-card";
import AgentSelectCard from "./components/agent-select-card";
import { Elements } from "react-stripe-elements";
import { intlShape } from "react-intl";

class PaymentStepOne extends PureComponent {
  static propTypes = {
    cards: PropTypes.array,
    intl: intlShape.isRequired,
    jobDetail: PropTypes.object,
    userId: PropTypes.string.isRequired,
    nextStep: PropTypes.func.isRequired,
    deleteCard: PropTypes.func.isRequired,
    typeofPayment: PropTypes.string,
    paymentFrequency: PropTypes.string,
    transactionNeeded: PropTypes.bool
  };

  static defaultProps = {
    userId: "",
    nextStep: () => {},
    deleteCard: () => {},
    transactionNeeded: true
  };

  renderAgentAddCard() {
    return (
      <AgentAddCard
        typeofPayment={this.props.typeofPayment}
        intl={this.props.intl}
        creatingSingleCharge
        jobDetail={this.props.jobDetail}
        userId={this.props.userId}
        nextStep={this.props.nextStep}
        transactionNeeded={this.props.transactionNeeded}
      />
    );
  }

  renderAgentSelectCard() {
    return (
      <AgentSelectCard
        cards={this.props.cards}
        nextStep={this.props.nextStep}
        intl={this.props.intl}
        jobDetail={this.props.jobDetail}
        userId={this.props.userId}
        deleteCard={this.props.deleteCard}
        typeofPayment={this.props.typeofPayment}
        paymentFrequency={this.props.paymentFrequency}
      />
    );
  }

  render() {
    return (
      <div>
        <Elements>
          <div>
            {!this.props.transactionNeeded ||
            (this.props.transactionNeeded && !this.props.cards.length)
              ? this.renderAgentAddCard()
              : this.renderAgentSelectCard()}
          </div>
        </Elements>
      </div>
    );
  }
}

export default PaymentStepOne;
