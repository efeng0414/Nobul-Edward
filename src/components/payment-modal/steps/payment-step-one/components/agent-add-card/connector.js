import { connect } from "react-redux";
import AgentAddCard from "./component";
import {
  addPaymentSourceToUserAsync,
  getStripeMonthlySubscriptionsDataAsync,
  createStripeSubscriptionChargeAsync
} from "../../../../../../../core/thunk/stripeCustomers";

const mapStateToProps = state => ({
  monthlySubscriptionData: state.stripeCustomers.monthlySubscriptionData,
  stripeCustomerError: state.stripeCustomers.error
});

const mapDispatchToProps = dispatch => ({
  addPaymentSourceToUser: ({ userId, tokenId }) =>
    dispatch(addPaymentSourceToUserAsync({ userId, tokenId })),
  getStripeMonthlySubscriptionsDataAsync: () =>
    dispatch(getStripeMonthlySubscriptionsDataAsync()),
  createStripeSubscriptionCharge: ({ userId, planId }) =>
    dispatch(createStripeSubscriptionChargeAsync({ userId, planId }))
});

export default connect(mapStateToProps, mapDispatchToProps)(AgentAddCard);
