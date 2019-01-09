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

export const setRegions = ({ regions }) => ({
  type: SELL_AUTOBID_SET_REGIONS,
  payload: regions
});

export const setServices = ({ services }) => ({
  type: SELL_AUTOBID_SET_SERVICES,
  payload: services
});

export const setPriceRangeLow = ({ priceRangeLow }) => ({
  type: SELL_AUTOBID_SET_PRICE_RANGE_LOW,
  payload: priceRangeLow
});

export const setPriceRangeHigh = ({ priceRangeHigh }) => ({
  type: SELL_AUTOBID_SET_PRICE_RANGE_HIGH,
  payload: priceRangeHigh
});

export const setBrokerageCommission = ({ brokerageCommission }) => ({
  type: SELL_AUTOBID_SET_BROKERAGE_COMMISSION,
  payload: brokerageCommission
});

export const setListingCommission = ({ listingCommission }) => ({
  type: SELL_AUTOBID_SET_LISTING_COMMISSION,
  payload: listingCommission
});

export const setTagline = ({ tagline }) => ({
  type: SELL_AUTOBID_SET_TAGLINE,
  payload: tagline
});

export const setMessage = ({ message }) => ({
  type: SELL_AUTOBID_SET_MESSAGE,
  payload: message
});

export const clearSellAutoBid = () => ({
  type: SELL_AUTOBID_CLEAR
});
