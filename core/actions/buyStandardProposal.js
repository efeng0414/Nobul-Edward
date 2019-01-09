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

export const setRegions = ({ regions }) => ({
  type: BUY_STANDARD_PROPOSAL_SET_REGIONS,
  payload: regions
});

export const setServices = ({ services }) => ({
  type: BUY_STANDARD_PROPOSAL_SET_SERVICES,
  payload: services
});

export const setRebatePercent = ({ rebatePercent }) => ({
  type: BUY_STANDARD_PROPOSAL_SET_REBATE_PERCENT,
  payload: rebatePercent
});

export const setTagline = ({ tagline }) => ({
  type: BUY_STANDARD_PROPOSAL_SET_TAGLINE,
  payload: tagline
});

export const setMessage = ({ message }) => ({
  type: BUY_STANDARD_PROPOSAL_SET_MESSAGE,
  payload: message
});

export const setMarketplaceProposalFlow = ({ value }) => ({
  type: SET_MARKETPLACE_PROPOSAL_FLOW,
  payload: value
});

export const clearBuyStandardProposal = () => ({
  type: CLEAR_BUY_STANDARD_PROPOSAL
});

export const clearMarketplaceProposalFlow = () => ({
  type: CLEAR_MARKETPLACE_PROPOSAL_FLOW
});
