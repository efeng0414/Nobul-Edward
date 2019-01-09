import {
  SELL_AUTOBID_SET_REGIONS,
  SELL_AUTOBID_SET_SERVICES,
  SELL_AUTOBID_SET_PRICE_RANGE_LOW,
  SELL_AUTOBID_SET_PRICE_RANGE_HIGH,
  SELL_AUTOBID_SET_BROKERAGE_COMMISSION,
  SELL_AUTOBID_SET_LISTING_COMMISSION,
  SELL_AUTOBID_SET_TAGLINE,
  SELL_AUTOBID_SET_MESSAGE,
  SELL_AUTOBID_CLEAR
} from "../types/sellAutobidProposal";

const defaultState = {};

export default (state = defaultState, action) => {
  switch (action.type) {
    case SELL_AUTOBID_SET_REGIONS:
      return { ...state, regions: action.payload };

    case SELL_AUTOBID_SET_SERVICES:
      return {
        ...state,
        services: action.payload
      };

    case SELL_AUTOBID_SET_PRICE_RANGE_LOW:
      return {
        ...state,
        priceRangeLow: action.payload
      };

    case SELL_AUTOBID_SET_PRICE_RANGE_HIGH:
      return { ...state, priceRangeHigh: action.payload };

    case SELL_AUTOBID_SET_BROKERAGE_COMMISSION:
      return { ...state, brokerageCommission: action.payload };

    case SELL_AUTOBID_SET_LISTING_COMMISSION:
      return { ...state, listingCommission: action.payload };

    case SELL_AUTOBID_SET_TAGLINE:
      return { ...state, tagline: action.payload };

    case SELL_AUTOBID_SET_MESSAGE:
      return { ...state, message: action.payload };

    case SELL_AUTOBID_CLEAR:
      return defaultState;

    default:
      return state;
  }
};
