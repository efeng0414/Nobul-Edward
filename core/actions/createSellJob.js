import {
  SET_SELL_PROPERTY_TYPE,
  SET_SELL_PRICE_RANGE_LOW,
  SET_SELL_PRICE_RANGE_HIGH,
  SET_SELL_REGIONS,
  SET_SELL_ADDRESS,
  SET_SELL_BEDROOMS,
  SET_SELL_BATHROOMS,
  SET_SELL_PROPERTY_FEATURES,
  SET_SELL_SERVICES,
  SET_SELL_SERVICES_RANGE,
  SET_SELL_PERSONAL_MESSAGE,
  CLEAR_SELL_JOB,
  LOAD_JOB_TO_CUSTOMISE_SELL
} from "../types/createSellJob";

export const setSellPropertyType = ({ propertyType }) => ({
  type: SET_SELL_PROPERTY_TYPE,
  payload: propertyType
});

export const setSellPriceRangeLow = ({ priceRangeLow }) => ({
  type: SET_SELL_PRICE_RANGE_LOW,
  payload: priceRangeLow
});

export const setSellPriceRangeHigh = ({ priceRangeHigh }) => ({
  type: SET_SELL_PRICE_RANGE_HIGH,
  payload: priceRangeHigh
});

export const setSellRegions = ({ regions }) => ({
  type: SET_SELL_REGIONS,
  payload: regions
});

export const setSellAddress = ({ address }) => ({
  type: SET_SELL_ADDRESS,
  payload: address
});

export const setSellBedrooms = ({ bedrooms }) => ({
  type: SET_SELL_BEDROOMS,
  payload: bedrooms
});

export const setSellBathrooms = ({ bathrooms }) => ({
  type: SET_SELL_BATHROOMS,
  payload: bathrooms
});

export const setSellPropertyFeatures = ({ propertyFeatures }) => ({
  type: SET_SELL_PROPERTY_FEATURES,
  payload: propertyFeatures
});

export const setSellServices = ({ services }) => ({
  type: SET_SELL_SERVICES,
  payload: services
});

export const setSellServicesRange = ({ servicesRange }) => ({
  type: SET_SELL_SERVICES_RANGE,
  payload: servicesRange
});

export const setSellPersonalMessage = ({ personalMessage }) => ({
  type: SET_SELL_PERSONAL_MESSAGE,
  payload: personalMessage
});

export const clearSellJob = () => ({
  type: CLEAR_SELL_JOB
});

export const loadJobToCustomiseJobSell = ({ payload }) => ({
  type: LOAD_JOB_TO_CUSTOMISE_SELL,
  payload
});
