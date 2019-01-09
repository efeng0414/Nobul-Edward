import { connect } from "react-redux";
import AgentSubscriptions from "./container";
import {
  createStripeSubscriptionChargeAsync,
  deleteCardAsync,
  getCustomerCardsAsync,
  unsubscribeSpecificStripePlanAsync,
  getStripeUserSubscriptionDataAsync,
  getStripeMonthlySubscriptionsDataAsync,
  checkIfUserHasStripeAsync,
  updateFreeTrialSubscribeStatusAsync
} from "../../../core/thunk/stripeCustomers";

const mapStateToProps = state => ({
  isPremium: true, // REMOVE_PREMIUM state.authentication.isPremium,
  verification: state.authentication.verification || {},
  stripeCards: state.stripeCustomers.cards,
  firstName: state.authentication.profile.firstName,
  subscriptionId: state.stripeCustomers.subscriptionId,
  subscriptionData: state.stripeCustomers.subscriptionData || {},
  monthlySubscriptionData: state.stripeCustomers.monthlySubscriptionData || {},
  isLoading: state.stripeCustomers.isLoading || false
});

const mapDispatchToProps = dispatch => ({
  createStripeSubscriptionChargeAsync: ({ userId, planId }) =>
    dispatch(createStripeSubscriptionChargeAsync({ userId, planId })),
  deleteCardAsync: ({ userId, cardNodeId }) =>
    dispatch(deleteCardAsync({ userId, cardNodeId })),
  getStripeCards: userId => dispatch(getCustomerCardsAsync({ userId })),
  unsubscribeFromStripePlanAsync: (userId, planId) =>
    dispatch(unsubscribeSpecificStripePlanAsync({ userId, planId })),
  getStripeUserSubscriptionDataAsync: userId =>
    dispatch(getStripeUserSubscriptionDataAsync({ userId })),
  getStripeMonthlySubscriptionsDataAsync: () =>
    dispatch(getStripeMonthlySubscriptionsDataAsync()),
  checkIfUserHasStripe: ({ userId }) =>
    dispatch(checkIfUserHasStripeAsync({ userId })),
  updateFreeTrialSubscribeStatusAsync: ({
    userId,
    subscriptionId,
    cancelAfterTrial
  }) =>
    dispatch(
      updateFreeTrialSubscribeStatusAsync({
        userId,
        subscriptionId,
        cancelAfterTrial
      })
    )
});

export default connect(mapStateToProps, mapDispatchToProps)(AgentSubscriptions);
