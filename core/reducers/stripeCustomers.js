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

const defaultState = {
  customer: {},
  cards: [],
  error: {},
  isLoading: false,
  showNewCard: false,
  subscriptionId: "",
  monthlySubscriptionData: {}
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case STRIPE_CUSTOMERS_IS_LOADING:
      return { ...state, isLoading: action.payload };
    case POST_STRIPE_TOKEN_SUCCESS:
      return { ...state, stripeToken: action.payload, isLoading: false };
    case POST_STRIPE_TOKEN_FAILURE:
      return { ...state, error: action.payload, isLoading: false };
    case GET_STRIPE_CUSTOMER_SUCCESS:
      return { ...state, customer: action.payload, isLoading: false };
    case GET_STRIPE_CUSTOMER_FAILURE:
      return { ...state, error: action.payload, isLoading: false };
    case GET_STRIPE_CARDS_SUCCESS:
      return { ...state, cards: action.payload, isLoading: false };
    case GET_STRIPE_CARDS_FAILURE:
      return { ...state, error: action.payload, isLoading: false };
    case SHOW_NEW_CARD:
      return { ...state, showNewCard: true };
    case HIDE_NEW_CARD:
      return { ...state, showNewCard: false };
    case UNSUBSCRIBE_FROM_STRIPE_PLAN_SUCCESS:
      return {
        ...state,
        error: {},
        isLoading: false
      };
    case UNSUBSCRIBE_FROM_STRIPE_PLAN_FAILURE:
      return {
        ...state,
        ...action.payload,
        isLoading: false
      };
    case CREATE_STRIPE_SINGLE_CHARGE_SUCCESS:
      return { ...state, ...action.payload, isLoading: false };
    case CREATE_STRIPE_SINGLE_CHARGE_FAILURE:
      return { ...state, ...action.payload, isLoading: false };
    case CREATE_STRIPE_SUBSCRIPTION_CHARGE_SUCCESS:
      return { ...state, isLoading: false };
    case CREATE_STRIPE_SUBSCRIPTION_CHARGE_FAILURE:
      return { ...state, error: action.payload, isLoading: false };
    case GET_STRIPE_SUBSCRIPTION_ID_SUCCESS:
      return {
        ...state,
        subscriptionId: action.payload,
        error: {},
        isLoading: false
      };
    case GET_STRIPE_SUBSCRIPTION_ID_FAILURE:
      return { ...state, error: action.payload, isLoading: false };
    case GET_STRIPE_USER_SUBSCRIPTION_DATA_SUCCESS:
      return { ...state, subscriptionData: action.payload, isLoading: false };
    case GET_STRIPE_USER_SUBSCRIPTION_DATA_FAILURE:
      return { ...state, ...action.payload, isLoading: false };
    case GET_STRIPE_MONTHLY_SUBSCRIPTION_DATA_SUCCESS:
      return {
        ...state,
        monthlySubscriptionData: action.payload,
        isLoading: false
      };
    case GET_STRIPE_MONTHLY_SUBSCRIPTION_DATA_FAILURE:
      return {
        ...state,
        ...action.payload,
        isLoading: false
      };
    default:
      return state;
  }
};
