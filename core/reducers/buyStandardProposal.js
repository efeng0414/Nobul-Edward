import {
  BUY_STANDARD_PROPOSAL_SET_REGIONS,
  BUY_STANDARD_PROPOSAL_SET_SERVICES,
  BUY_STANDARD_PROPOSAL_SET_REBATE_PERCENT,
  BUY_STANDARD_PROPOSAL_SET_TAGLINE,
  BUY_STANDARD_PROPOSAL_SET_MESSAGE,
  SET_MARKETPLACE_PROPOSAL_FLOW,
  CLEAR_BUY_STANDARD_PROPOSAL,
  CLEAR_MARKETPLACE_PROPOSAL_FLOW
} from "../types/buyStandardProposal";

const defaultState = {};

export default (state = defaultState, action) => {
  switch (action.type) {
    case BUY_STANDARD_PROPOSAL_SET_REGIONS:
      return { ...state, regions: action.payload };

    case BUY_STANDARD_PROPOSAL_SET_SERVICES:
      return {
        ...state,
        services: action.payload
      };

    case BUY_STANDARD_PROPOSAL_SET_REBATE_PERCENT:
      return { ...state, rebatePercent: action.payload };

    case BUY_STANDARD_PROPOSAL_SET_TAGLINE:
      return { ...state, tagline: action.payload };

    case BUY_STANDARD_PROPOSAL_SET_MESSAGE:
      return { ...state, message: action.payload };

    case SET_MARKETPLACE_PROPOSAL_FLOW:
      return { ...state, marketplaceProposalFlow: action.payload };

    case CLEAR_MARKETPLACE_PROPOSAL_FLOW:
      return {
        ...state,
        marketplaceProposalFlow: undefined
      };

    case CLEAR_BUY_STANDARD_PROPOSAL:
      return defaultState;

    default:
      return state;
  }
};
