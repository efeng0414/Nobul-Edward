import {
  OFFERS_IS_LOADING,
  GET_JOB_OFFERS_SUCCESS,
  GET_JOB_OFFERS_FAILURE,
  GET_CONSUMER_BUY_OFFERS_SUCCESS,
  GET_CONSUMER_SELL_OFFERS_SUCCESS,
  GET_CONSUMER_BUY_OFFERS_FAILURE,
  GET_CONSUMER_SELL_OFFERS_FAILURE,
  GET_AGENT_BUY_OFFERS_SUCCESS,
  GET_AGENT_BUY_OFFERS_FAILURE,
  GET_AGENT_SELL_OFFERS_SUCCESS,
  GET_AGENT_SELL_OFFERS_FAILURE,
  GET_AGENT_TO_CONTRACT_SELL_OFFERS_SUCCESS,
  GET_AGENT_TO_CONTRACT_BUY_OFFERS_SUCCESS,
  GET_AGENT_AUTOBID_OFFERS_SUCCESS,
  GET_AGENT_AUTOBID_OFFERS_FAILURE,
  GET_OFFER_DETAIL_SUCCESS,
  GET_OFFER_DETAIL_FAILURE,
  SAVE_OFFER_SUCCESS,
  SAVE_OFFER_FAILURE,
  ACCEPT_OFFER_SUCCESS,
  ACCEPT_OFFER_FAILURE,
  REJECT_OFFER_SUCCESS,
  REJECT_OFFER_FAILURE,
  WITHDRAW_OFFER_SUCCESS,
  WITHDRAW_OFFER_FAILURE,
  PROMOTE_OFFER_SUCCESS,
  PROMOTE_OFFER_FAILURE,
  SET_OFFER_HAS_BEEN_READ_SUCCESS,
  SET_OFFER_HAS_BEEN_READ_FAILURE,
  SET_FAVORITE_OFFER_SUCCESS,
  SET_FAVORITE_OFFER_FAILURE,
  SET_OFFERS_FILTERS,
  CLEAR_WINNING_OFFER,
  GET_JOB_WINNING_OFFER_SUCCESS,
  GET_JOB_WINNING_OFFER_FAILURE,
  FETCH_OFFER_SUCCESS,
  FETCH_OFFER_FAILURE,
  CLEAR_BUY_OFFERS,
  CLEAR_SELL_OFFERS,
  GET_OFFERS_CREATED_AT_RANGE_SUCCESS,
  GET_OFFERS_CREATED_AT_RANGE_FAILURE,

  //__________________________________________
  GET_WINNING_OFFER_SUCCESS,
  GET_WINNING_OFFER_FAILURE,
  EDIT_BUY_OFFER_SUCCESS,
  EDIT_BUY_OFFER_FAILURE,
  EDIT_SELL_OFFER_SUCCESS,
  EDIT_SELL_OFFER_FAILURE,
  UPDATE_BUY_OFFER_SUCCESS,
  UPDATE_BUY_OFFER_FAILURE,
  UPDATE_SELL_OFFER_SUCCESS,
  UPDATE_SELL_OFFER_FAILURE
} from "../types/offers";
import { BUY, SELL, AUTOBID, ASC } from "../constants/shared";
import {
  OFFER_ACCEPTED,
  BUY_TO_CONTRACT,
  SELL_TO_CONTRACT
} from "../constants/offers";
import { IS_PROMOTED, STATUS, PROMOTED_AT } from "../api-transform/offers";
import { createObjectFromArray } from "../firebase/utilities";

const defaultState = {
  [BUY]: {},
  [SELL]: {},
  [BUY_TO_CONTRACT]: {},
  [SELL_TO_CONTRACT]: {},
  [AUTOBID]: {},
  isLoading: false,
  error: {},
  offerDetail: {},
  winningOffer: {},
  filters: {
    sortBy: {
      [STATUS]: OFFER_ACCEPTED,
      [IS_PROMOTED]: true,
      [PROMOTED_AT]: ASC
    },
    filterBy: {}
  }
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case OFFERS_IS_LOADING:
      return { ...state, isLoading: action.payload };

    case GET_JOB_OFFERS_SUCCESS:
      return {
        ...state,
        [action.payload.jobType]: action.payload.jobOffers,
        isLoading: false,
        error: {}
      };

    case GET_JOB_OFFERS_FAILURE:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };

    case SAVE_OFFER_SUCCESS:
      return {
        ...state,
        [action.meta.jobType]: {
          ...state[action.meta.jobType],
          [action.meta.offerId]: action.payload
        },
        newOffer: action.payload,
        error: {},
        isLoading: false
      };

    case CLEAR_BUY_OFFERS:
      return {
        ...state,
        [BUY]: {}
      };

    case CLEAR_SELL_OFFERS:
      return {
        ...state,
        [SELL]: {}
      };

    case GET_CONSUMER_BUY_OFFERS_SUCCESS:
      return {
        ...state,
        [BUY]: action.payload,
        isLoading: false,
        error: {}
      };

    case GET_CONSUMER_BUY_OFFERS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };

    case GET_CONSUMER_SELL_OFFERS_SUCCESS:
      return {
        ...state,
        [SELL]: action.payload,
        isLoading: false,
        error: {}
      };

    case GET_CONSUMER_SELL_OFFERS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };

    case GET_AGENT_BUY_OFFERS_SUCCESS:
      return {
        ...state,
        [BUY]: action.payload,
        error: {},
        isLoading: false
      };

    case GET_AGENT_TO_CONTRACT_BUY_OFFERS_SUCCESS:
      return {
        ...state,
        [BUY_TO_CONTRACT]: action.payload,
        error: {},
        isLoading: false
      };

    case GET_AGENT_TO_CONTRACT_SELL_OFFERS_SUCCESS:
      return {
        ...state,
        [SELL_TO_CONTRACT]: action.payload,
        error: {},
        isLoading: false
      };

    case GET_AGENT_BUY_OFFERS_FAILURE:
      return { ...state, error: action.payload, isLoading: false };

    case GET_AGENT_SELL_OFFERS_SUCCESS:
      return {
        ...state,
        [SELL]: action.payload,
        error: {},
        isLoading: false
      };

    case GET_AGENT_SELL_OFFERS_FAILURE:
      return { ...state, error: action.payload, isLoading: false };

    case GET_AGENT_AUTOBID_OFFERS_SUCCESS:
      return {
        ...state,
        [AUTOBID]: action.payload,
        error: {},
        isLoading: false
      };

    case GET_AGENT_AUTOBID_OFFERS_FAILURE:
      return { ...state, error: action.payload, isLoading: false };

    case GET_OFFER_DETAIL_SUCCESS:
      return {
        ...state,
        offerDetail: action.payload,
        isLoading: false,
        error: {}
      };

    case GET_OFFER_DETAIL_FAILURE:
      return { ...state, error: action.payload, isLoading: false };

    case SAVE_OFFER_FAILURE:
      return { ...state, error: action.payload, isLoading: false };

    case ACCEPT_OFFER_SUCCESS:
      return { ...state, ...action.payload, isLoading: false };

    case ACCEPT_OFFER_FAILURE:
      return {
        ...state,
        ...action.payload,
        isLoading: false
      };

    case REJECT_OFFER_SUCCESS:
      return { ...state, ...action.payload, isLoading: false };

    case REJECT_OFFER_FAILURE:
      return {
        ...state,
        ...action.payload,
        isLoading: false
      };

    case WITHDRAW_OFFER_SUCCESS:
      return {
        ...state,
        error: {},
        isLoading: false
      };

    case WITHDRAW_OFFER_FAILURE:
      return {
        ...state,
        ...action.payload,
        isLoading: false
      };

    case PROMOTE_OFFER_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isLoading: false
      };

    case PROMOTE_OFFER_FAILURE:
      return {
        ...state,
        ...action.payload,
        isLoading: false
      };

    case SET_OFFER_HAS_BEEN_READ_SUCCESS:
      return { ...state, ...action.payload, isLoading: false };

    case SET_OFFER_HAS_BEEN_READ_FAILURE:
      return {
        ...state,
        ...action.payload,
        isLoading: false
      };

    case SET_FAVORITE_OFFER_SUCCESS:
      return { ...state, ...action.payload, isLoading: false };

    case SET_FAVORITE_OFFER_FAILURE:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };

    case SET_OFFERS_FILTERS:
      return {
        ...state,
        filters: action.payload.filters
      };

    case GET_JOB_WINNING_OFFER_SUCCESS:
      return {
        ...state,
        winningOffer: action.payload.offer,
        error: {},
        isLoading: false
      };

    case GET_JOB_WINNING_OFFER_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        isLoading: false
      };
    case GET_OFFERS_CREATED_AT_RANGE_SUCCESS:
      return {
        ...state,
        buy: action.payload.buy,
        sell: action.payload.sell,
        error: {},
        isLoading: false
      };
    case GET_OFFERS_CREATED_AT_RANGE_FAILURE:
      return { ...state, error: action.payload, isLoading: false };

    //__________________________________________

    case GET_WINNING_OFFER_SUCCESS:
      return { ...state, ...action.payload, isLoading: false };

    case GET_WINNING_OFFER_FAILURE:
      return { ...state, ...action.payload, isLoading: false };

    case EDIT_BUY_OFFER_SUCCESS:
      return {
        ...state,
        buyOffer: action.payload,
        error: {},
        isLoading: false
      };
    case EDIT_BUY_OFFER_FAILURE:
      return { ...state, error: action.payload, isLoading: false };
    case EDIT_SELL_OFFER_SUCCESS:
      return {
        ...state,
        sellOffer: action.payload,
        error: {},
        isLoading: false
      };
    case EDIT_SELL_OFFER_FAILURE:
      return { ...state, error: action.payload, isLoading: false };

    case UPDATE_BUY_OFFER_SUCCESS:
      return {
        ...state,
        [BUY]: {
          ...state[BUY],
          [action.payload.offerId]: {
            ...state[BUY][action.payload.offerId],
            ...action.payload.postData,
            services: createObjectFromArray(
              action.payload.postData.services || []
            )
          }
        },
        error: {},
        success: true,
        isLoading: false
      };
    case UPDATE_BUY_OFFER_FAILURE:
      return { ...state, error: action.payload, isLoading: false };
    case UPDATE_SELL_OFFER_SUCCESS:
      return {
        ...state,
        [SELL]: {
          ...state[SELL],
          [action.payload.offerId]: {
            ...state[SELL][action.payload.offerId],
            ...action.payload.postData,
            services: createObjectFromArray(
              action.payload.postData.services || []
            )
          }
        },
        error: {},
        success: true,
        isLoading: false
      };
    case UPDATE_SELL_OFFER_FAILURE:
      return { ...state, error: action.payload, isLoading: false };

    case CLEAR_WINNING_OFFER:
      return { ...state, ...action.payload, isLoading: false };

    case FETCH_OFFER_SUCCESS:
      return {
        ...state,
        offer: action.payload,
        isLoading: false,
        error: {}
      };
    case FETCH_OFFER_FAILURE:
      return { ...state, error: action.payload, isLoading: false };

    default:
      return state;
  }
};
