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
import { SAVE_JOB_SUCCESS } from "../types/jobs";
import { JOB_TYPE, BUY } from "../api-transform/jobs";

const defaultState = {};

export default (state = defaultState, action) => {
  switch (action.type) {
    case SET_BUY_PROPERTY_TYPE:
      return { ...state, propertyType: action.payload };

    case SET_BUY_PRICE_RANGE_LOW:
      return {
        ...state,
        priceRangeLow: action.payload
      };

    case SET_BUY_PRICE_RANGE_HIGH:
      return { ...state, priceRangeHigh: action.payload };

    case SET_BUY_REGIONS:
      return { ...state, regions: action.payload };

    case SET_BUY_BEDROOMS:
      return { ...state, bedrooms: action.payload };

    case SET_BUY_BATHROOMS:
      return { ...state, bathrooms: action.payload };

    case SET_BUY_PROPERTY_FEATURES:
      return { ...state, propertyFeatures: action.payload };

    case SET_BUY_SERVICES:
      return { ...state, services: action.payload };

    case SET_BUY_SERVICES_RANGE:
      return { ...state, servicesRange: action.payload };

    case SET_BUY_PERSONAL_MESSAGE:
      return { ...state, personalMessage: action.payload };

    case SAVE_JOB_SUCCESS:
      return {
        ...state,
        id:
          action.payload[JOB_TYPE] === BUY
            ? action.payload.job.jobId
            : undefined
      };

    case CLEAR_BUY_JOB:
      return defaultState;

    case LOAD_JOB_TO_CUSTOMISE_BUY: {
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
