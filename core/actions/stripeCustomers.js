import {
  STRIPE_CUSTOMERS_IS_LOADING,
  POST_STRIPE_TOKEN_SUCCESS,
  POST_STRIPE_TOKEN_FAILURE,
  GET_STRIPE_CUSTOMER_SUCCESS,
  GET_STRIPE_CUSTOMER_FAILURE,
  GET_STRIPE_CARDS_SUCCESS,
  GET_STRIPE_CARDS_FAILURE,
  SHOW_NEW_CARD,
  HIDE_NEW_CARD,
  UNSUBSCRIBE_FROM_STRIPE_PLAN_SUCCESS,
  UNSUBSCRIBE_FROM_STRIPE_PLAN_FAILURE,
  CREATE_STRIPE_SINGLE_CHARGE_SUCCESS,
  CREATE_STRIPE_SINGLE_CHARGE_FAILURE,
  CREATE_STRIPE_SUBSCRIPTION_CHARGE_SUCCESS,
  CREATE_STRIPE_SUBSCRIPTION_CHARGE_FAILURE,
  GET_STRIPE_SUBSCRIPTION_ID_SUCCESS,
  GET_STRIPE_SUBSCRIPTION_ID_FAILURE,
  GET_STRIPE_USER_SUBSCRIPTION_DATA_SUCCESS,
  GET_STRIPE_USER_SUBSCRIPTION_DATA_FAILURE,
  GET_STRIPE_MONTHLY_SUBSCRIPTION_DATA_SUCCESS,
  GET_STRIPE_MONTHLY_SUBSCRIPTION_DATA_FAILURE
} from "../types/stripeCustomers";

const stripeCustomersIsLoading = ({ isLoading }) => {
  return {
    type: STRIPE_CUSTOMERS_IS_LOADING,
    payload: isLoading
  };
};

const postStripeTokenSuccess = stripeToken => {
  return {
    type: POST_STRIPE_TOKEN_SUCCESS,
    payload: stripeToken
  };
};

const postStripeTokenFailure = error => {
  return {
    type: POST_STRIPE_TOKEN_FAILURE,
    payload: error
  };
};

const getStripeCustomerFailure = error => {
  return {
    type: GET_STRIPE_CUSTOMER_FAILURE,
    payload: error
  };
};

const getStripeCustomerSuccess = customerDetails => {
  return {
    type: GET_STRIPE_CUSTOMER_SUCCESS,
    payload: customerDetails
  };
};

const getStripeCardsFailure = error => {
  return {
    type: GET_STRIPE_CARDS_FAILURE,
    payload: error
  };
};

const getStripeCardsSuccess = customerDetails => {
  return {
    type: GET_STRIPE_CARDS_SUCCESS,
    payload: customerDetails
  };
};

const showNewCard = () => {
  return {
    type: SHOW_NEW_CARD
  };
};

const hideNewCard = () => {
  return {
    type: HIDE_NEW_CARD
  };
};

const unsubscribeFromStripePlanSuccess = () => ({
  type: UNSUBSCRIBE_FROM_STRIPE_PLAN_SUCCESS
});

const unsubscribeFromStripePlanFailure = error => ({
  type: UNSUBSCRIBE_FROM_STRIPE_PLAN_FAILURE,
  payload: { error }
});

const createStripeSingleChargeSuccess = ({ chargeDetails }) => {
  return {
    type: CREATE_STRIPE_SINGLE_CHARGE_SUCCESS,
    payload: chargeDetails
  };
};

const createStripeSingleChargeFailure = ({ error }) => {
  return {
    type: CREATE_STRIPE_SINGLE_CHARGE_FAILURE,
    payload: error
  };
};

const createStripeSubscriptionChargeSuccess = ({ chargeDetails }) => {
  return {
    type: CREATE_STRIPE_SUBSCRIPTION_CHARGE_SUCCESS,
    payload: chargeDetails
  };
};

const createStripeSubscriptionChargeFailure = ({ error }) => {
  return {
    type: CREATE_STRIPE_SUBSCRIPTION_CHARGE_FAILURE,
    payload: error
  };
};

const getStripeSubscriptionSuccess = ({ subscriptionId }) => {
  return {
    type: GET_STRIPE_SUBSCRIPTION_ID_SUCCESS,
    payload: subscriptionId
  };
};

const getStripeSubscriptionFailure = ({ error }) => {
  return {
    type: GET_STRIPE_SUBSCRIPTION_ID_FAILURE,
    payload: error
  };
};

const getStripeUserSubscriptionDataSuccess = ({ subscriptionData }) => {
  return {
    type: GET_STRIPE_USER_SUBSCRIPTION_DATA_SUCCESS,
    payload: subscriptionData
  };
};

const getStripeUserSubscriptionDataFailure = ({ error }) => {
  return {
    type: GET_STRIPE_USER_SUBSCRIPTION_DATA_FAILURE,
    payload: error
  };
};

const getStripeMonthlySubscriptionsDataSuccess = ({
  monthlySubscriptionData
}) => {
  return {
    type: GET_STRIPE_MONTHLY_SUBSCRIPTION_DATA_SUCCESS,
    payload: monthlySubscriptionData
  };
};

const getStripeMonthlySubscriptionsDataFailure = ({ error }) => {
  return {
    type: GET_STRIPE_MONTHLY_SUBSCRIPTION_DATA_FAILURE,
    payload: error
  };
};

export {
  stripeCustomersIsLoading,
  postStripeTokenSuccess,
  postStripeTokenFailure,
  getStripeCustomerSuccess,
  getStripeCustomerFailure,
  getStripeCardsFailure,
  getStripeCardsSuccess,
  showNewCard,
  hideNewCard,
  unsubscribeFromStripePlanSuccess,
  unsubscribeFromStripePlanFailure,
  createStripeSingleChargeSuccess,
  createStripeSingleChargeFailure,
  createStripeSubscriptionChargeSuccess,
  createStripeSubscriptionChargeFailure,
  getStripeSubscriptionSuccess,
  getStripeSubscriptionFailure,
  getStripeUserSubscriptionDataSuccess,
  getStripeUserSubscriptionDataFailure,
  getStripeMonthlySubscriptionsDataSuccess,
  getStripeMonthlySubscriptionsDataFailure
};
