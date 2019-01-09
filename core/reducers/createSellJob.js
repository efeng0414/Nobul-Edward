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
import { SAVE_JOB_SUCCESS } from "../types/jobs";
import { JOB_TYPE, SELL } from "../api-transform/jobs";

const defaultState = {};

export default (state = defaultState, action) => {
  switch (action.type) {
    case SET_SELL_PROPERTY_TYPE:
      return { ...state, propertyType: action.payload };

    case SET_SELL_PRICE_RANGE_LOW:
      return {
        ...state,
        priceRangeLow: action.payload
      };

    case SET_SELL_PRICE_RANGE_HIGH:
      return { ...state, priceRangeHigh: action.payload };

    case SET_SELL_REGIONS:
      return { ...state, regions: action.payload };

    case SET_SELL_ADDRESS:
      return { ...state, address: action.payload };

    case SET_SELL_BEDROOMS:
      return { ...state, bedrooms: action.payload };

    case SET_SELL_BATHROOMS:
      return { ...state, bathrooms: action.payload };

    case SET_SELL_PROPERTY_FEATURES:
      return { ...state, propertyFeatures: action.payload };

    case SET_SELL_SERVICES:
      return { ...state, services: action.payload };

    case SET_SELL_SERVICES_RANGE:
      return { ...state, servicesRange: action.payload };

    case SET_SELL_PERSONAL_MESSAGE:
      return { ...state, personalMessage: action.payload };
    case SAVE_JOB_SUCCESS:
      return {
        ...state,
        id:
          action.payload[JOB_TYPE] === SELL
            ? action.payload.job.jobId
            : undefined
      };

    case CLEAR_SELL_JOB:
      return defaultState;

    case LOAD_JOB_TO_CUSTOMISE_SELL: {
      return {
        ...state,
        propertyType: action.payload.propertyType,
        id: action.payload.jobId,
        priceRangeLow: action.payload.priceRangeLow,
        priceRangeHigh: action.payload.priceRangeHigh,
        regions: action.payload.regions
      };
    }

    default:
      return state;
  }
};
