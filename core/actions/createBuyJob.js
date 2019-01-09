import {
  SET_BUY_PROPERTY_TYPE,
  SET_BUY_PRICE_RANGE_LOW,
  SET_BUY_PRICE_RANGE_HIGH,
  SET_BUY_REGIONS,
  SET_BUY_BEDROOMS,
  SET_BUY_BATHROOMS,
  SET_BUY_PROPERTY_FEATURES,
  SET_BUY_SERVICES,
  SET_BUY_SERVICES_RANGE,
  SET_BUY_PERSONAL_MESSAGE,
  CLEAR_BUY_JOB,
  LOAD_JOB_TO_CUSTOMISE_BUY
} from "../types/createBuyJob";

export const setBuyPropertyType = ({ propertyType }) => ({
  type: SET_BUY_PROPERTY_TYPE,
  payload: propertyType
});

export const setBuyPriceRangeLow = ({ priceRangeLow }) => ({
  type: SET_BUY_PRICE_RANGE_LOW,
  payload: priceRangeLow
});

export const setBuyPriceRangeHigh = ({ priceRangeHigh }) => ({
  type: SET_BUY_PRICE_RANGE_HIGH,
  payload: priceRangeHigh
});

export const setBuyRegions = ({ regions }) => ({
  type: SET_BUY_REGIONS,
  payload: regions
});

export const setBuyBedrooms = ({ bedrooms }) => ({
  type: SET_BUY_BEDROOMS,
  payload: bedrooms
});

export const setBuyBathrooms = ({ bathrooms }) => ({
  type: SET_BUY_BATHROOMS,
  payload: bathrooms
});

export const setBuyPropertyFeatures = ({ propertyFeatures }) => ({
  type: SET_BUY_PROPERTY_FEATURES,
  payload: propertyFeatures
});

export const setBuyServices = ({ services }) => ({
  type: SET_BUY_SERVICES,
  payload: services
});

export const setBuyServicesRange = ({ servicesRange }) => ({
  type: SET_BUY_SERVICES_RANGE,
  payload: servicesRange
});

export const setBuyPersonalMessage = ({ personalMessage }) => ({
  type: SET_BUY_PERSONAL_MESSAGE,
  payload: personalMessage
});

export const clearBuyJob = () => ({
  type: CLEAR_BUY_JOB
});

export const loadJobToCustomiseJobBuy = ({ payload }) => ({
  type: LOAD_JOB_TO_CUSTOMISE_BUY,
  payload
});
