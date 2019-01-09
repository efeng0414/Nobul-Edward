import { connect } from "react-redux";
import PaymentModal from "./container";
import {
  getCustomerCardsAsync,
  createStripeSubscriptionChargeAsync,
  createStripeSingleChargeAsync,
  deleteCardAsync
} from "../../../core/thunk/stripeCustomers";

const mapStateToProps = state => ({
  stripeCards: state.stripeCustomers.cards
});

const mapDispatchToProps = dispatch => ({
  getStripeCards: userId => dispatch(getCustomerCardsAsync({ userId })),
  createStripeSubscriptionChargeAsync: ({ userId, planId }) =>
    dispatch(createStripeSubscriptionChargeAsync({ userId, planId })),
  createStripeSingleChargeAsync: ({ userId, charge }) =>
    dispatch(createStripeSingleChargeAsync({ userId, charge })),
  deleteCardAsync: ({ userId, cardNodeId }) =>
    dispatch(deleteCardAsync({ userId, cardNodeId }))
});

export default connect(mapStateToProps, mapDispatchToProps)(PaymentModal);
