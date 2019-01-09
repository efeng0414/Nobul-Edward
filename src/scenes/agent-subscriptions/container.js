import React, { Component } from "react";
import { intlShape, injectIntl } from "react-intl";
import PropTypes from "prop-types";
import { message } from "antd";
import { MONTHLY, MONTH } from "../../../core/constants/shared";
import { translate } from "../../utilities/locale";
import requireAuth from "../../utilities/require-auth";
import validateUser from "../../utilities/validate-user";
import { isAgent } from "../../utilities/route-verification";
import { checkIfUserHasStripeSubscription } from "../../../core/firebase/stripeCustomers";
import AgentFreeTrial from "../../components/agent-free-trial";
import catchSceneError from "../../utilities/catch-scene-error";
import "./styles.scss";

@catchSceneError
@requireAuth()
@validateUser({ fn: isAgent })
@injectIntl
class AgentSubscriptions extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
    authUserId: PropTypes.string,
    createStripeSubscriptionChargeAsync: PropTypes.func,
    isPremium: PropTypes.bool,
    deleteCardAsync: PropTypes.func.isRequired,
    getStripeCards: PropTypes.func.isRequired,
    stripeCards: PropTypes.array.isRequired,
    unsubscribeFromStripePlanAsync: PropTypes.func.isRequired,
    subscriptionId: PropTypes.string.isRequired,
    getStripeUserSubscriptionDataAsync: PropTypes.func.isRequired,
    subscriptionData: PropTypes.object.isRequired,
    getStripeMonthlySubscriptionsDataAsync: PropTypes.func.isRequired,
    monthlySubscriptionData: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
    verification: PropTypes.object.isRequired,
    checkIfUserHasStripe: PropTypes.func.isRequired,
    firstName: PropTypes.string,
    updateFreeTrialSubscribeStatusAsync: PropTypes.func.isRequired
  };

  static defaultProps = {
    firstName: ""
  };

  state = {
    planType: "",
    subscriptionId: "",
    isLoading: false
  };

  componentDidMount() {
    this.props.getStripeCards(this.props.authUserId);
    this.props.checkIfUserHasStripe({ userId: this.props.authUserId });

    checkIfUserHasStripeSubscription(this.props.authUserId)
      .then(snapshot => {
        if (snapshot.exists()) {
          const keys = Object.keys(snapshot.val());
          {
            snapshot.val()[keys[0]].plan.interval === MONTH &&
              this.setState({
                planType: MONTHLY
              });
          }
        }
      })
      .catch(() => {
        message.warning(translate(this.props.intl, "error.CouldNotLoadData"));
      });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.subscriptionId !== this.props.subscriptionId) {
      this.setState({ subscriptionId: this.props.subscriptionId });
    }
  }

  render() {
    return (
      <AgentFreeTrial
        intl={this.props.intl}
        userId={this.props.authUserId}
        deleteCardAsync={this.props.deleteCardAsync}
        cards={this.props.stripeCards}
        updateFreeTrialSubscribeStatusAsync={
          this.props.updateFreeTrialSubscribeStatusAsync
        }
        createStripeSubscriptionCharge={
          this.props.createStripeSubscriptionChargeAsync
        }
        isPremium={this.props.isPremium}
        subscriptionId={this.props.subscriptionId}
        unsubscribeFromStripePlanAsync={
          this.props.unsubscribeFromStripePlanAsync
        }
        getStripeUserSubscriptionDataAsync={
          this.props.getStripeUserSubscriptionDataAsync
        }
        subscriptionData={this.props.subscriptionData}
        getStripeMonthlySubscriptionsDataAsync={
          this.props.getStripeMonthlySubscriptionsDataAsync
        }
        monthlySubscriptionData={this.props.monthlySubscriptionData}
        isLoading={this.props.isLoading}
        verification={this.props.verification}
        firstName={this.props.firstName}
      />
    );
  }
}

export default AgentSubscriptions;
