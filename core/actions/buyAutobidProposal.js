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

export const setRegions = ({ regions }) => ({
  type: BUY_AUTOBID_SET_REGIONS,
  payload: regions
});

export const setServices = ({ services }) => ({
  type: BUY_AUTOBID_SET_SERVICES,
  payload: services
});

export const setPriceRangeLow = ({ priceRangeLow }) => ({
  type: BUY_AUTOBID_SET_PRICE_RANGE_LOW,
  payload: priceRangeLow
});

export const setPriceRangeHigh = ({ priceRangeHigh }) => ({
  type: BUY_AUTOBID_SET_PRICE_RANGE_HIGH,
  payload: priceRangeHigh
});

export const setRebatePercent = ({ rebatePercent }) => ({
  type: BUY_AUTOBID_SET_REBATE_PERCENT,
  payload: rebatePercent
});

export const setTagline = ({ tagline }) => ({
  type: BUY_AUTOBID_SET_TAGLINE,
  payload: tagline
});

export const setMessage = ({ message }) => ({
  type: BUY_AUTOBID_SET_MESSAGE,
  payload: message
});

export const clearBuyAutoBid = () => ({
  type: BUY_AUTOBID_CLEAR
});
