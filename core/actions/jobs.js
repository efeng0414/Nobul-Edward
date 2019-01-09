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

const jobsIsLoading = isLoading => ({
  type: JOBS_IS_LOADING,
  payload: isLoading
});

const getAllBuyJobsSuccess = buyJobs => ({
  type: GET_ALL_BUY_JOBS_SUCCESS,
  payload: buyJobs
});

const getAllBuyJobsFailure = error => ({
  type: GET_ALL_BUY_JOBS_FAILURE,
  payload: error
});

const getAllConsumerDraftJobsSuccess = draftJobs => ({
  type: GET_ALL_CONSUMER_DRAFT_JOBS_SUCCESS,
  payload: draftJobs
});

const getAllConsumerDraftJobsFailure = error => ({
  type: GET_ALL_CONSUMER_DRAFT_JOBS_FAILURE,
  payload: error
});

const getAllConsumerPendingJobsSuccess = jobs => ({
  type: GET_ALL_CONSUMER_PENDING_JOBS_SUCCESS,
  payload: jobs
});

const getAllConsumerPendingJobsFailure = error => ({
  type: GET_ALL_CONSUMER_PENDING_JOBS_FAILURE,
  payload: error
});

const getAllSellJobsSuccess = sellJobs => ({
  type: GET_ALL_SELL_JOBS_SUCCESS,
  payload: sellJobs
});

const getAllSellJobsFailure = error => ({
  type: GET_ALL_SELL_JOBS_FAILURE,
  payload: error
});

const getAllRegionJobsSuccess = regionJobs => ({
  type: GET_ALL_REGION_JOBS_SUCCESS,
  payload: regionJobs
});

const getAllRegionJobsFailure = error => ({
  type: GET_ALL_REGION_JOBS_FAILURE,
  payload: error
});

const getAllConsumerBuyJobsSuccess = buyJobs => ({
  type: GET_ALL_CONSUMER_BUY_JOBS_SUCCESS,
  payload: buyJobs
});

const getAllConsumerBuyJobsFailure = error => ({
  type: GET_ALL_CONSUMER_BUY_JOBS_FAILURE,
  payload: error
});

const getAllConsumerSellJobsSuccess = sellJobs => ({
  type: GET_ALL_CONSUMER_SELL_JOBS_SUCCESS,
  payload: sellJobs
});

const getAllConsumerSellJobsFailure = error => ({
  type: GET_ALL_CONSUMER_SELL_JOBS_FAILURE,
  payload: error
});

const updateJobSuccess = jobState => ({
  type: UPDATE_JOB_SUCCESS,
  payload: jobState
});

const updateJobFailure = error => ({
  type: UPDATE_JOB_FAILURE,
  payload: error
});

const saveJobSuccess = (job, jobType) => ({
  type: SAVE_JOB_SUCCESS,
  payload: { job, jobType }
});

const saveJobFailure = error => ({
  type: SAVE_JOB_FAILURE,
  payload: error
});

const filterJobs = filters => ({
  type: FILTER_JOBS,
  filters
});

const getJobDetailSuccess = job => ({
  type: GET_JOB_DETAIL_SUCCESS,
  payload: job
});

const getJobDetailFailure = error => ({
  type: GET_JOB_DETAIL_FAILURE,
  payload: error
});

const tagListingToJobSuccess = () => ({
  type: TAG_LISTING_TO_JOB_SUCCESS
});

const tagListingToJobFailure = ({ error }) => ({
  type: TAG_LISTING_TO_JOB_FAILURE,
  payload: error
});

const removeTaggedListingFromJobSuccess = () => ({
  type: REMOVE_TAGGED_LISTING_FROM_JOB_SUCCESS
});

const removeTaggedListingFromJobFailure = ({ error }) => ({
  type: REMOVE_TAGGED_LISTING_FROM_JOB_FAILURE,
  payload: error
});

const deleteJobSuccess = ({ payload }) => ({
  type: DELETE_JOB_SUCCESS,
  payload
});

const deleteJobFailure = ({ error }) => ({
  type: DELETE_JOB_FAILURE,
  payload: error
});

const appendJobSuccess = ({ jobId, jobType, jobDetail }) => ({
  type: APPEND_JOB_SUCCESS,
  meta: {
    jobId,
    jobType
  },
  payload: jobDetail
});

const appendJobsSuccess = ({ jobs, jobType }) => ({
  type: APPEND_JOBS_SUCCESS,
  meta: {
    jobType
  },
  payload: jobs
});

const appendJobsFailure = ({ error }) => ({
  type: APPEND_JOBS_FAILURE,
  payload: error
});

const appendJobFailure = ({ error }) => ({
  type: APPEND_JOB_FAILURE,
  payload: error
});

const getJobsCreatedAtRangeSuccess = ({ jobs }) => ({
  type: GET_JOBS_CREATED_AT_RANGE_SUCCESS,
  payload: jobs
});

const getJobsCreatedAtRangeFailure = ({ error }) => ({
  type: GET_JOBS_CREATED_AT_RANGE_FAILURE,
  payload: error
});

const setMarketplaceJobFilters = ({ filters }) => ({
  type: SET_MARKETPLACE_JOB_FILTERS,
  payload: filters
});

const getMultipleMarketplaceJobsSuccess = ({ jobs }) => ({
  type: GET_MULTIPLE_MARKETPLACE_JOBS_SUCCESS,
  payload: jobs
});

const getMultipleMarketplaceJobsFailure = ({ error }) => ({
  type: GET_MULTIPLE_MARKETPLACE_JOBS_FAILURE,
  payload: error
});

export const setTemporaryMarketplaceRegions = ({ regions }) => ({
  type: SET_TEMPORARY_MARKETPLACE_REGIONS,
  payload: regions
});

export {
  jobsIsLoading,
  getAllBuyJobsSuccess,
  getAllBuyJobsFailure,
  getAllConsumerBuyJobsSuccess,
  getAllConsumerBuyJobsFailure,
  getAllConsumerSellJobsSuccess,
  getAllConsumerSellJobsFailure,
  getAllConsumerDraftJobsSuccess,
  getAllConsumerDraftJobsFailure,
  getAllConsumerPendingJobsSuccess,
  getAllConsumerPendingJobsFailure,
  getAllSellJobsSuccess,
  getAllSellJobsFailure,
  updateJobSuccess,
  updateJobFailure,
  saveJobSuccess,
  saveJobFailure,
  filterJobs,
  getJobDetailSuccess,
  getJobDetailFailure,
  tagListingToJobSuccess,
  tagListingToJobFailure,
  removeTaggedListingFromJobSuccess,
  removeTaggedListingFromJobFailure,
  getAllRegionJobsSuccess,
  getAllRegionJobsFailure,
  deleteJobSuccess,
  deleteJobFailure,
  appendJobSuccess,
  appendJobFailure,
  appendJobsSuccess,
  appendJobsFailure,
  getJobsCreatedAtRangeSuccess,
  getJobsCreatedAtRangeFailure,
  setMarketplaceJobFilters,
  getMultipleMarketplaceJobsSuccess,
  getMultipleMarketplaceJobsFailure
};
