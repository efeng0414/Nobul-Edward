import {
  JOBS_IS_LOADING,
  GET_ALL_BUY_JOBS_SUCCESS,
  GET_ALL_BUY_JOBS_FAILURE,
  GET_ALL_CONSUMER_BUY_JOBS_SUCCESS,
  GET_ALL_CONSUMER_BUY_JOBS_FAILURE,
  GET_ALL_CONSUMER_SELL_JOBS_SUCCESS,
  GET_ALL_CONSUMER_SELL_JOBS_FAILURE,
  GET_ALL_CONSUMER_DRAFT_JOBS_SUCCESS,
  GET_ALL_CONSUMER_DRAFT_JOBS_FAILURE,
  GET_ALL_CONSUMER_PENDING_JOBS_SUCCESS,
  GET_ALL_CONSUMER_PENDING_JOBS_FAILURE,
  GET_ALL_SELL_JOBS_SUCCESS,
  GET_ALL_SELL_JOBS_FAILURE,
  GET_ALL_REGION_JOBS_SUCCESS,
  GET_ALL_REGION_JOBS_FAILURE,
  UPDATE_JOB_SUCCESS,
  UPDATE_JOB_FAILURE,
  SAVE_JOB_SUCCESS,
  SAVE_JOB_FAILURE,
  FILTER_JOBS,
  GET_JOB_DETAIL_SUCCESS,
  GET_JOB_DETAIL_FAILURE,
  TAG_LISTING_TO_JOB_SUCCESS,
  TAG_LISTING_TO_JOB_FAILURE,
  REMOVE_TAGGED_LISTING_FROM_JOB_SUCCESS,
  REMOVE_TAGGED_LISTING_FROM_JOB_FAILURE,
  DELETE_JOB_SUCCESS,
  DELETE_JOB_FAILURE,
  APPEND_JOB_SUCCESS,
  APPEND_JOB_FAILURE,
  APPEND_JOBS_SUCCESS,
  APPEND_JOBS_FAILURE,
  GET_JOBS_CREATED_AT_RANGE_SUCCESS,
  GET_JOBS_CREATED_AT_RANGE_FAILURE,
  SET_MARKETPLACE_JOB_FILTERS,
  GET_MULTIPLE_MARKETPLACE_JOBS_SUCCESS,
  GET_MULTIPLE_MARKETPLACE_JOBS_FAILURE,
  SET_TEMPORARY_MARKETPLACE_REGIONS
} from "../types/jobs";
import { objectIsEmpty } from "../utilities/misc";
import {
  BUY,
  SELL,
  HIGH_TO_LOW,
  LOW_TO_HIGH,
  NEW_TO_OLD,
  OLD_TO_NEW
} from "../constants/shared";
import { PROPERTY_PRICE_RANGE_FOR_FILTER } from "../data/propertyData";
import { removeKeyFromObject } from "../../core/utilities/remove-key-from-object";
import { JOB_TYPE } from "../api-transform/jobs";

const sortByPriceRangeHigh = (a, b) =>
  a.priceRangeHigh < b.priceRangeHigh ? 1 : -1;
const sortByPriceRangeLow = (a, b) =>
  a.priceRangeLow < b.priceRangeLow ? 1 : -1;

const sortJobs = (jobs, filters) => {
  const sortFunction = sortType => {
    switch (sortType) {
      case HIGH_TO_LOW:
        return (a, b) =>
          a.priceRangeHigh !== b.priceRangeHigh
            ? sortByPriceRangeHigh(a, b)
            : sortByPriceRangeLow(a, b);

      case LOW_TO_HIGH:
        return (a, b) =>
          a.priceRangeLow !== b.priceRangeLow
            ? sortByPriceRangeLow(b, a)
            : sortByPriceRangeHigh(b, a);

      case NEW_TO_OLD:
        return (a, b) => (a.createdAt < b.createdAt ? 1 : -1);
      case OLD_TO_NEW:
        return (a, b) => (a.createdAt > b.createdAt ? 1 : -1);
    }
  };

  return jobs.sort(sortFunction(filters.sort));
};
const isValueInRange = ({ range }) => value =>
  value >= range[0] && value <= range[1];

export const isJobInSelectedRange = ({ selectedRange, job }) => {
  const jobRangeArray = [job.priceRangeLow, job.priceRangeHigh].map(
    jobPriceRange => PROPERTY_PRICE_RANGE_FOR_FILTER[jobPriceRange]
  );

  const jobRangeInSelectedRange = jobRangeArray.every(
    isValueInRange({ range: selectedRange })
  );

  const lowSelectedPriceInRange =
    selectedRange[0] >= jobRangeArray[0] && selectedRange[0] < jobRangeArray[1];
  const highSelectedPriceInRange =
    selectedRange[1] > jobRangeArray[0] && selectedRange[1] <= jobRangeArray[1];

  return (
    jobRangeInSelectedRange ||
    lowSelectedPriceInRange ||
    highSelectedPriceInRange
  );
};
// or operator in the same field
// and operator between fields
export const filterJobs = (jobsArray, filters) => {
  const filterKeys = Object.keys(filters);

  if (
    jobsArray.length === 0 ||
    filterKeys.length === 0 ||
    objectIsEmpty(filters)
  )
    return null;

  const filteredJobsObjects = jobsArray.filter(job => {
    const filteredJobs = filterKeys.every(filterKey => {
      if (filterKey === "jobType") {
        if (objectIsEmpty(filters[filterKey])) return false;
        return filters[filterKey].includes(job[filterKey]);
      }
      if (filterKey === "propertyType") {
        return filters[filterKey].includes(job[filterKey]);
      }
      if (filterKey === "priceRange") {
        if (!filters[filterKey].length) return true;
        return isJobInSelectedRange({ selectedRange: filters[filterKey], job });
      }
      return true;
    });
    return filteredJobs ? filteredJobs : null;
  });

  return filteredJobsObjects;
};

const getDefaultState = () => ({
  buy: {},
  sell: {},
  unfilteredRegionJobs: [],
  jobsToLazyLoad: [],
  marketplaceJobs: [],
  filters: { type: [BUY, SELL] },
  draft: {},
  pendingConfirmation: {},
  jobDetail: {},
  error: {},
  isLoading: false,
  temporaryRegions: {}
});

export default (state = getDefaultState(), action) => {
  switch (action.type) {
    case JOBS_IS_LOADING:
      return { ...state, isLoading: action.payload, success: false, error: {} };
    case GET_ALL_BUY_JOBS_SUCCESS:
      return { ...state, buy: action.payload, isLoading: false, error: {} };
    case GET_ALL_BUY_JOBS_FAILURE:
      return { ...state, error: action.payload, isLoading: false };
    case GET_ALL_CONSUMER_BUY_JOBS_SUCCESS:
      return { ...state, buy: action.payload, isLoading: false, error: {} };
    case GET_ALL_CONSUMER_BUY_JOBS_FAILURE:
      return { ...state, error: action.payload, isLoading: false };
    case GET_ALL_CONSUMER_SELL_JOBS_SUCCESS:
      return { ...state, sell: action.payload, isLoading: false, error: {} };
    case GET_ALL_CONSUMER_SELL_JOBS_FAILURE:
      return { ...state, error: action.payload, isLoading: false };
    case GET_ALL_CONSUMER_DRAFT_JOBS_SUCCESS:
      return { ...state, draft: action.payload, isLoading: false, error: {} };
    case GET_ALL_CONSUMER_DRAFT_JOBS_FAILURE:
      return { ...state, draft: action.payload, isLoading: false };
    case GET_ALL_CONSUMER_PENDING_JOBS_SUCCESS:
      return {
        ...state,
        pendingConfirmation: action.payload,
        isLoading: false,
        error: {}
      };
    case GET_ALL_CONSUMER_PENDING_JOBS_FAILURE:
      return {
        ...state,
        pendingConfirmation: action.payload,
        isLoading: false
      };
    case GET_ALL_SELL_JOBS_SUCCESS:
      return { ...state, sell: action.payload, isLoading: false, error: {} };
    case GET_ALL_SELL_JOBS_FAILURE:
      return { ...state, error: action.payload, isLoading: false };
    case GET_ALL_REGION_JOBS_SUCCESS:
      return {
        ...state,
        unfilteredRegionJobs: action.payload,
        jobsToLazyLoad: [],
        marketplaceJobs: [],
        isLoading: false,
        error: {}
      };
    case GET_ALL_REGION_JOBS_FAILURE:
      return {
        ...state,
        error: action.payload,
        jobsToLazyLoad: [],
        marketplaceJobs: [],
        isLoading: false
      };
    case UPDATE_JOB_SUCCESS: {
      return {
        ...state,
        ...action.payload,
        error: {},
        isLoading: false,
        [action.payload[JOB_TYPE]]: {
          ...state[action.payload[JOB_TYPE]],
          [action.payload.jobId]: {
            ...state[action.payload[JOB_TYPE]][action.payload.jobId],
            ...action.payload
          }
        }
      };
    }
    case UPDATE_JOB_FAILURE:
      return { ...state, error: action.payload, isLoading: false };
    case SAVE_JOB_SUCCESS:
      return {
        ...state,
        success: true,
        newJob: action.payload.job,
        [action.payload[JOB_TYPE]]: {
          ...state[action.payload[JOB_TYPE]],
          [action.payload.job.jobId]: action.payload.job
        },
        error: {},
        isLoading: false
      };
    case SAVE_JOB_FAILURE:
      return { ...state, error: action.payload, isLoading: false };
    case FILTER_JOBS: {
      const sortedJobs = sortJobs(state.unfilteredRegionJobs, action.filters);
      const jobsToLazyLoad = filterJobs(sortedJobs, action.filters) || [];
      return {
        ...state,
        marketplaceJobs: [],
        jobsToLazyLoad,
        filters: action.filters
      };
    }
    case SET_MARKETPLACE_JOB_FILTERS:
      return {
        ...state,
        jobsToLazyLoad: [],
        marketplaceJobs: [],
        filters: action.payload,
        error: {},
        isLoading: false
      };
    case GET_JOB_DETAIL_SUCCESS:
      return {
        ...state,
        jobDetail: action.payload,
        error: {},
        isLoading: false
      };
    case GET_JOB_DETAIL_FAILURE:
      return { ...state, error: action.payload, isLoading: false };

    case TAG_LISTING_TO_JOB_SUCCESS:
      return { ...state, isLoading: false, error: {} };

    case TAG_LISTING_TO_JOB_FAILURE:
      return { ...state, isLoading: false, error: action.payload };

    case REMOVE_TAGGED_LISTING_FROM_JOB_SUCCESS:
      return { ...state, isLoading: false, error: {} };

    case REMOVE_TAGGED_LISTING_FROM_JOB_FAILURE:
      return { ...state, isLoading: false, error: action.payload };

    case DELETE_JOB_SUCCESS:
      return {
        ...state,
        isLoading: false,
        [action.payload.jobType]: removeKeyFromObject({
          key: action.payload.jobId,
          object: state[action.payload.jobType]
        }),
        error: {}
      };

    case DELETE_JOB_FAILURE:
      return { ...state, isLoading: false, error: action.payload };

    case APPEND_JOB_SUCCESS:
      return {
        ...state,
        [action.meta.jobType]: {
          ...state[action.meta.jobType],
          [action.meta.jobId]: action.payload
        },
        error: {},
        isLoading: false
      };
    case APPEND_JOBS_SUCCESS:
      return {
        ...state,
        [action.meta.jobType]: {
          ...state[action.meta.jobType],
          ...action.payload
        },
        error: {},
        isLoading: false
      };

    case APPEND_JOB_FAILURE:
      return { ...state, error: action.payload, isLoading: false };
    case APPEND_JOBS_FAILURE:
      return { ...state, error: action.payload, isLoading: false };
    case GET_JOBS_CREATED_AT_RANGE_SUCCESS:
      return {
        ...state,
        buy: action.payload.buy,
        sell: action.payload.sell,
        error: {},
        isLoading: false
      };
    case GET_JOBS_CREATED_AT_RANGE_FAILURE:
      return { ...state, error: action.payload, isLoading: false };
    case GET_MULTIPLE_MARKETPLACE_JOBS_SUCCESS:
      return {
        ...state,
        marketplaceJobs: [...state.marketplaceJobs, ...action.payload],
        isLoading: false,
        error: {}
      };
    case GET_MULTIPLE_MARKETPLACE_JOBS_FAILURE:
      return { ...state, error: action.payload, isLoading: false };
    case SET_TEMPORARY_MARKETPLACE_REGIONS:
      return { ...state, temporaryRegions: action.payload };
    default:
      return state;
  }
};
