import {
  filterJobs,
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
  getJobsCreatedAtRangeSuccess,
  getJobsCreatedAtRangeFailure,
  getMultipleMarketplaceJobsSuccess,
  getMultipleMarketplaceJobsFailure
} from "../actions/jobs";

import {
  fetchAllBuyJobs,
  fetchAllConsumerDraftJobs,
  fetchAllConsumerPendingJobs,
  fetchAllSellJobs,
  postJob,
  updateJob,
  fetchJobDetail,
  tagListingToJob,
  removeTaggedListingFromJob,
  fetchAllConsumerBuyJobs,
  fetchAllConsumerSellJobs,
  fetchAllRegionJobs,
  deleteJob,
  fetchJobsCreatedAtRange,
  fetchMultipleJobs
} from "../firebase/jobs";
import { getUserProfileById } from "../firebase/users";
import { filterByMultipleValues } from "../utilities/filter-data";
import { objectIsEmpty } from "../utilities/misc";
import { JOB_TYPE, STATUS } from "../api-transform/jobs";
import {
  JOB_OPEN,
  JOB_ACCEPTED,
  JOB_EXPIRED,
  JOB_CLOSED
} from "../constants/jobs";
import { CONSUMERS } from "../api-transform";

const jobStatus = [JOB_OPEN, JOB_ACCEPTED, JOB_EXPIRED, JOB_CLOSED];

const getAllBuyJobs = () => {
  return dispatch => {
    dispatch(jobsIsLoading(true));
    fetchAllBuyJobs()
      .then(snapshot => {
        dispatch(getAllBuyJobsSuccess(snapshot.val()));
      })
      .catch(error => {
        dispatch(getAllBuyJobsFailure(error));
      });
  };
};

const filterJobsPromise = filters => dispatch =>
  new Promise(resolve => resolve(dispatch(filterJobs(filters))));

const getAllConsumerBuyJobs = userId => {
  return dispatch => {
    dispatch(jobsIsLoading(true));
    return fetchAllConsumerBuyJobs(userId)
      .then(snapshot => {
        const filteredJobs = filterByMultipleValues({
          databaseKey: STATUS,
          filterValues: jobStatus,
          entities: snapshot.val()
        });
        return dispatch(getAllConsumerBuyJobsSuccess(filteredJobs));
      })
      .catch(error => {
        return dispatch(getAllConsumerBuyJobsFailure(error));
      });
  };
};

const getAllConsumerSellJobs = userId => {
  return dispatch => {
    dispatch(jobsIsLoading(true));
    return fetchAllConsumerSellJobs(userId)
      .then(snapshot => {
        const filteredJobs = filterByMultipleValues({
          databaseKey: STATUS,
          filterValues: jobStatus,
          entities: snapshot.val()
        });
        return dispatch(getAllConsumerSellJobsSuccess(filteredJobs));
      })
      .catch(error => {
        dispatch(getAllConsumerSellJobsFailure(error));
      });
  };
};

const getAllConsumerDraftJobs = userId => {
  return dispatch => {
    dispatch(jobsIsLoading(true));
    return fetchAllConsumerDraftJobs(userId)
      .then(result => {
        return dispatch(getAllConsumerDraftJobsSuccess(result));
      })
      .catch(error => {
        dispatch(getAllConsumerDraftJobsFailure(error));
      });
  };
};

const getAllConsumerPendingJobs = userId => {
  return dispatch => {
    dispatch(jobsIsLoading(true));
    return fetchAllConsumerPendingJobs(userId)
      .then(result => {
        return dispatch(getAllConsumerPendingJobsSuccess(result));
      })
      .catch(error => {
        dispatch(getAllConsumerPendingJobsFailure(error));
      });
  };
};

const getAllSellJobs = () => {
  return dispatch => {
    dispatch(jobsIsLoading(true));
    fetchAllSellJobs()
      .then(snapshot => {
        dispatch(getAllSellJobsSuccess(snapshot.val()));
      })
      .catch(error => {
        dispatch(getAllSellJobsFailure(error));
      });
  };
};

const jobIsOpen = ({ jobType, jobId }) =>
  new Promise((resolve, reject) =>
    fetchJobDetail({ jobType, jobId })
      .then(
        snapshot =>
          snapshot.val().status === JOB_OPEN
            ? resolve()
            : reject({ message: "Job is not open" })
      )
      .catch(reject)
  );

const editJob = (jobData, key, jobs, isUpdated = null) => {
  //for editJab that is not draft, dont put anything in isUpdated field
  return dispatch => {
    dispatch(jobsIsLoading(true));
    updateJob(jobData, key)
      .then(() => {
        let jobState = Object.assign({}, jobs);
        if (isUpdated === null) {
          jobState[jobData[JOB_TYPE]][key] = jobData;
          dispatch(updateJobSuccess(jobState));
        } else if (isUpdated === true) {
          let { [key]: dummy, ...draftState } = jobState.draft;
          jobState.draft = draftState;
          dispatch(updateJobSuccess(jobState));
        }
      })
      .catch(error => {
        dispatch(updateJobFailure(error));
      });
  };
};

/*

  TODO: editJob need to do some code refactoring, it's not easy to read and has extra code, but some components are rely on it.
  updateJobAsync is almost provide the same function. also need to refactor after updated the firebase part.
  
*/

const updateJobAsync = ({ jobData, jobId }) => {
  return dispatch => {
    dispatch(jobsIsLoading(true));
    return updateJob(jobData, jobId)
      .then(() => dispatch(updateJobSuccess({ ...jobData, jobId })))
      .catch(error => dispatch(updateJobFailure(error)));
  };
};

const saveJob = (jobType, job, skipUserCheck) => {
  return dispatch => {
    dispatch(jobsIsLoading(true));
    // Check user is a consumer before saving.
    return getUserProfileById({ userId: job.consumerId, userType: CONSUMERS })
      .then(snapshot => {
        if (skipUserCheck || snapshot.exists()) {
          return postJob(jobType, job);
        } else {
          throw new Error("User is not a consumer");
        }
      })
      .then(jobData => {
        return dispatch(saveJobSuccess(jobData, jobType));
      })
      .catch(error => {
        return dispatch(saveJobFailure(error));
      });
  };
};

const getJobDetail = ({ jobType, jobId }) => {
  return dispatch => {
    dispatch(jobsIsLoading(true));
    return fetchJobDetail({ jobType, jobId })
      .then(snapshot => {
        const job = Object.assign({}, snapshot.val(), {
          jobId
        });
        return dispatch(getJobDetailSuccess(job));
      })
      .catch(error => {
        dispatch(getJobDetailFailure(error));
      });
  };
};

const tagListingToJobAsync = ({ jobId, listingId }) => dispatch => {
  dispatch(jobsIsLoading(true));
  return tagListingToJob({ jobId, listingId })
    .then(() => dispatch(tagListingToJobSuccess()))
    .catch(error => dispatch(tagListingToJobFailure({ error })));
};

const removeTaggedListingFromJobAsync = ({ jobId, listingId }) => dispatch => {
  dispatch(jobsIsLoading(true));
  return removeTaggedListingFromJob({ jobId, listingId })
    .then(() => dispatch(removeTaggedListingFromJobSuccess()))
    .catch(error => removeTaggedListingFromJobFailure(error));
};

const setTaggedListAsync = ({ taggedList, listing }) => dispatch => {
  dispatch(jobsIsLoading(true));
  let tagJobFuncList = [];
  let removeTagFuncList = [];
  const [listingId, provinceOrState] = listing;
  Object.keys(taggedList).forEach(key => {
    if (taggedList[key].isTagged) {
      tagJobFuncList.push(
        tagListingToJob({ jobId: key, listingId, provinceOrState })
      );
    } else {
      removeTagFuncList.push(
        removeTaggedListingFromJob({ jobId: key, listingId })
      );
    }
  });

  return Promise.all([...tagJobFuncList, ...removeTagFuncList])
    .then(result => {
      tagJobFuncList.length && dispatch(tagListingToJobSuccess());
      removeTagFuncList.length && dispatch(removeTaggedListingFromJobSuccess());
    })
    .catch(error => {
      tagJobFuncList.length && dispatch(tagListingToJobFailure({ error }));
      removeTagFuncList.length &&
        dispatch(removeTaggedListingFromJobFailure({ error }));
    });
};

const getAllRegionJobsAsync = ({ regions, agentId }) => dispatch => {
  dispatch(jobsIsLoading(true));
  return fetchAllRegionJobs({ regions })
    .then(jobsList => {
      // Filter out any that have offers by this agent.
      const filteredList = jobsList.filter(job =>
        marketplaceFilterCondition({ job, currentAgentId: agentId })
      );
      dispatch(getAllRegionJobsSuccess(filteredList));
    })
    .catch(error => {
      dispatch(getAllRegionJobsFailure(error));
    });
};

const deleteJobAsync = ({ jobType, jobId }) => {
  return dispatch => {
    dispatch(jobsIsLoading);
    return deleteJob({ jobType, jobId })
      .then(() => dispatch(deleteJobSuccess({ payload: { jobType, jobId } })))
      .catch(error => dispatch(deleteJobFailure(error)));
  };
};

const appendJobDetail = ({ jobType, jobId }) => {
  return dispatch => {
    dispatch(jobsIsLoading(true));
    return fetchJobDetail({ jobType, jobId })
      .then(snapshot => {
        return dispatch(
          appendJobSuccess({ jobId, jobType, jobDetail: snapshot.val() })
        );
      })
      .catch(error => {
        dispatch(appendJobFailure(error));
      });
  };
};

const getJobsCreatedAtRange = ({ startAt = 0, endAt = 0 }) => dispatch => {
  dispatch(jobsIsLoading(true));
  return fetchJobsCreatedAtRange({ startAt, endAt })
    .then(jobs => dispatch(getJobsCreatedAtRangeSuccess({ jobs })))
    .catch(error => dispatch(getJobsCreatedAtRangeFailure({ error })));
};

const marketplaceFilterCondition = ({ job, currentAgentId }) => {
  return (
    objectIsEmpty(job.agents) ||
    !Object.keys(job.agents).includes(currentAgentId)
  );
};

const getMultipleMarketplaceJobs = ({
  jobIdsAndTypes,
  currentAgentId
}) => dispatch => {
  dispatch(jobsIsLoading(true));
  return fetchMultipleJobs({ jobIdsAndTypes })
    .then(snapshots => {
      const jobs = snapshots
        .filter(snapshot => snapshot.exists())
        .map(snapshot => ({
          ...snapshot.val(),
          key: snapshot.key
        }))
        .filter(job => marketplaceFilterCondition({ job, currentAgentId }));
      dispatch(getMultipleMarketplaceJobsSuccess({ jobs }));
    })
    .catch(error => {
      dispatch(getMultipleMarketplaceJobsFailure({ error }));
    });
};

export {
  getAllBuyJobs,
  getAllConsumerBuyJobs,
  getAllConsumerSellJobs,
  getAllConsumerDraftJobs,
  getAllConsumerPendingJobs,
  getAllSellJobs,
  editJob,
  updateJobAsync,
  saveJob,
  getJobDetail,
  tagListingToJobAsync,
  removeTaggedListingFromJobAsync,
  setTaggedListAsync,
  getAllRegionJobsAsync,
  deleteJobAsync,
  appendJobDetail,
  jobIsOpen,
  getJobsCreatedAtRange,
  getMultipleMarketplaceJobs,
  filterJobsPromise
};
