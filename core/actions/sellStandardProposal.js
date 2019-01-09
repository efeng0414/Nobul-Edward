import {
  SELL_STANDARD_PROPOSAL_SET_REGIONS,
  SELL_STANDARD_PROPOSAL_SET_SERVICES,
  SELL_STANDARD_PROPOSAL_SET_BROKERAGE_COMMISSION,
  SELL_STANDARD_PROPOSAL_SET_LISTING_COMMISSION,
  SELL_STANDARD_PROPOSAL_SET_TAGLINE,
  SELL_STANDARD_PROPOSAL_SET_MESSAGE,
  CLEAR_SELL_STANDARD_PROPOSAL
} from "../types/sellStandardProposal";

export const setRegions = ({ regions }) => ({
  type: SELL_STANDARD_PROPOSAL_SET_REGIONS,
  payload: regions
});

export const setServices = ({ services }) => ({
  type: SELL_STANDARD_PROPOSAL_SET_SERVICES,
  payload: services
});

export const setBrokerageCommission = ({ brokerageCommission }) => ({
  type: SELL_STANDARD_PROPOSAL_SET_BROKERAGE_COMMISSION,
  payload: brokerageCommission
});

export const setListingCommission = ({ listingCommission }) => ({
  type: SELL_STANDARD_PROPOSAL_SET_LISTING_COMMISSION,
  payload: listingCommission
});

export const setTagline = ({ tagline }) => ({
  type: SELL_STANDARD_PROPOSAL_SET_TAGLINE,
  payload: tagline
});

export const setMessage = ({ message }) => ({
  type: SELL_STANDARD_PROPOSAL_SET_MESSAGE,
  payload: message
});

export const clearSellStandardProposal = () => ({
  type: CLEAR_SELL_STANDARD_PROPOSAL
});
