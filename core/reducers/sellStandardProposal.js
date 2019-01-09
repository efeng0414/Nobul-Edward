import {
  SELL_STANDARD_PROPOSAL_SET_REGIONS,
  SELL_STANDARD_PROPOSAL_SET_SERVICES,
  SELL_STANDARD_PROPOSAL_SET_BROKERAGE_COMMISSION,
  SELL_STANDARD_PROPOSAL_SET_LISTING_COMMISSION,
  SELL_STANDARD_PROPOSAL_SET_TAGLINE,
  SELL_STANDARD_PROPOSAL_SET_MESSAGE,
  CLEAR_SELL_STANDARD_PROPOSAL
} from "../types/sellStandardProposal";

const defaultState = {};

export default (state = defaultState, action) => {
  switch (action.type) {
    case SELL_STANDARD_PROPOSAL_SET_REGIONS:
      return { ...state, regions: action.payload };

    case SELL_STANDARD_PROPOSAL_SET_SERVICES:
      return {
        ...state,
        services: action.payload
      };

    case SELL_STANDARD_PROPOSAL_SET_BROKERAGE_COMMISSION:
      return { ...state, brokerageCommission: action.payload };

    case SELL_STANDARD_PROPOSAL_SET_LISTING_COMMISSION:
      return { ...state, listingCommission: action.payload };

    case SELL_STANDARD_PROPOSAL_SET_TAGLINE:
      return { ...state, tagline: action.payload };

    case SELL_STANDARD_PROPOSAL_SET_MESSAGE:
      return { ...state, message: action.payload };

    case CLEAR_SELL_STANDARD_PROPOSAL:
      return defaultState;

    default:
      return state;
  }
};
