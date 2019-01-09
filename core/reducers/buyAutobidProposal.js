import {
  BUY_AUTOBID_SET_REGIONS,
  BUY_AUTOBID_SET_SERVICES,
  BUY_AUTOBID_SET_PRICE_RANGE_LOW,
  BUY_AUTOBID_SET_PRICE_RANGE_HIGH,
  BUY_AUTOBID_SET_REBATE_PERCENT,
  BUY_AUTOBID_SET_TAGLINE,
  BUY_AUTOBID_SET_MESSAGE,
  BUY_AUTOBID_CLEAR
} from "../types/buyAutobidProposal";

const defaultState = {};

export default (state = defaultState, action) => {
  switch (action.type) {
    case BUY_AUTOBID_SET_REGIONS:
      return { ...state, regions: action.payload };

    case BUY_AUTOBID_SET_SERVICES:
      return {
        ...state,
        services: action.payload
      };

    case BUY_AUTOBID_SET_PRICE_RANGE_LOW:
      return {
        ...state,
        priceRangeLow: action.payload
      };

    case BUY_AUTOBID_SET_PRICE_RANGE_HIGH:
      return { ...state, priceRangeHigh: action.payload };

    case BUY_AUTOBID_SET_REBATE_PERCENT:
      return { ...state, rebatePercent: action.payload };

    case BUY_AUTOBID_SET_TAGLINE:
      return { ...state, tagline: action.payload };

    case BUY_AUTOBID_SET_MESSAGE:
      return { ...state, message: action.payload };

    case BUY_AUTOBID_CLEAR:
      return defaultState;

    default:
      return state;
  }
};
