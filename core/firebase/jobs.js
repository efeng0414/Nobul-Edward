import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

import { JOBS } from "../api-transform";
import { REGION_JOBS, IS_CUSTOMISED } from "../api-transform/jobs";
import { objectIsEmpty } from "../utilities/misc";
import {
  JOB_DELETED,
  JOB_DRAFT,
  JOB_OPEN,
  JOB_PENDING_CONFIRMATION
} from "../constants/jobs";
import {
  CREATED_AT,
  UPDATED_AT,
  CREATED_ON,
  CONSUMER_ID,
  ADDRESS,
  BATHROOMS,
  BEDROOMS,
  JOB_TYPE,
  PRICE_RANGE_LOW,
  PRICE_RANGE_HIGH,
  PROPERTY_FEATURES,
  PROPERTY_TYPE,
  REGIONS,
  SERVICES_RANGE,
  SERVICES,
  STATUS,
  BUY,
  SELL,
  TAGGED_LISTINGS,
  DESCRIPTION,
  NAME
} from "../api-transform/jobs";

const fetchAllBuyJobs = () => {
  return firebase
    .database()
    .ref(`${JOBS}/${BUY}`)
    .orderByChild(STATUS)
    .equalTo(JOB_OPEN)
    .once("value");
};

const fetchAllSellJobs = () => {
  return firebase
    .database()
    .ref(`${JOBS}/${SELL}`)
    .orderByChild(STATUS)
    .equalTo(JOB_OPEN)
    .once("value");
};

const fetchAllRegionJobs = ({ regions = [] }) => {
  return Promise.all(
    regions.map(regionId =>
      firebase
        .database()
        .ref(`${REGION_JOBS}/${regionId}`)
        .once("value")
    )
  ).then(regionJobsSnapshots => {
    const allJobs = [];
    const jobsKey = {};

    Object.values(regionJobsSnapshots).map(snapshot => { // eslint-disable-line
      const jobs = snapshot.val();

      if (jobs && !objectIsEmpty(jobs)) {
        Object.keys(jobs).map(key => { // eslint-disable-line
          if (!jobsKey.hasOwnProperty(key) && jobs[key].status === JOB_OPEN) {
            jobsKey[key] = true;
            jobs[key].key = key;
            allJobs.push(jobs[key]);
          }
        });
      }
    });

    return allJobs;
  });
};

const fetchAllConsumerBuyJobs = uid => {
  return firebase
    .database()
    .ref(`${JOBS}/${BUY}`)
    .orderByChild(CONSUMER_ID)
    .equalTo(uid)
    .once("value");
};

const fetchAllConsumerSellJobs = uid => {
  return firebase
    .database()
    .ref(`${JOBS}/${SELL}`)
    .orderByChild(CONSUMER_ID)
    .equalTo(uid)
    .once("value");
};

const fetchAllConsumerDraftJobs = consumerId => {
  return new Promise((resolve, reject) => {
    const buyPromise = firebase
      .database()
      .ref(`${JOBS}/${BUY}`)
      .orderByChild(CONSUMER_ID)
      .equalTo(consumerId)
      .once("value");

    const sellPromise = firebase
      .database()
      .ref(`${JOBS}/${SELL}`)
      .orderByChild(CONSUMER_ID)
      .equalTo(consumerId)
      .once("value");

    Promise.all([buyPromise, sellPromise])
      .then(results => {
        const buyResults = results[0].val();
        const sellResults = results[1].val();
        let totalResults = { ...buyResults, ...sellResults };
        Object.keys(totalResults).forEach(key => {
          if (totalResults[key].status !== JOB_DRAFT) {
            delete totalResults[key];
          }
        });
        resolve(totalResults);
      })
      .catch(error => {
        reject(error);
      });
  });
};

const fetchAllConsumerPendingJobs = consumerId => {
  return new Promise((resolve, reject) => {
    const buyPromise = firebase
      .database()
      .ref(`${JOBS}/${BUY}`)
      .orderByChild(CONSUMER_ID)
      .equalTo(consumerId)
      .once("value");

    const sellPromise = firebase
      .database()
      .ref(`${JOBS}/${SELL}`)
      .orderByChild(CONSUMER_ID)
      .equalTo(consumerId)
      .once("value");

    Promise.all([buyPromise, sellPromise])
      .then(response => {
        const buyJobs = response[0].val();
        const sellJobs = response[1].val();
        const combinedResponse = { ...buyJobs, ...sellJobs };
        Object.keys(combinedResponse).forEach(key => {
          if (combinedResponse[key].status !== JOB_PENDING_CONFIRMATION) {
            delete combinedResponse[key];
          }
        });
        resolve(combinedResponse);
      })
      .catch(error => {
        reject(error);
      });
  });
};

const postJob = (jobType, job) => {
  let jobData = {
    [CREATED_AT]: firebase.database.ServerValue.TIMESTAMP,
    [UPDATED_AT]: firebase.database.ServerValue.TIMESTAMP,
    [CREATED_ON]: job.createdOn,
    [CONSUMER_ID]: job.consumerId,
    [JOB_TYPE]: job.jobType,
    [PRICE_RANGE_LOW]: job.priceRangeLow,
    [PRICE_RANGE_HIGH]: job.priceRangeHigh,
    [PROPERTY_FEATURES]: job.propertyFeatures,
    [PROPERTY_TYPE]: job.propertyType,
    [BATHROOMS]: job.bathrooms || 0,
    [BEDROOMS]: job.bedrooms || 0,
    [REGIONS]: job.regions,
    [SERVICES_RANGE]: job.servicesRange || 3,
    [SERVICES]: job.services || [],
    [TAGGED_LISTINGS]: job.taggedListings || [],
    [STATUS]: job.status,
    [DESCRIPTION]: job.description,
    [NAME]: job.name
  };
  if (jobType === SELL) {
    jobData[ADDRESS] = job.address;
  }

  //TODO: Declare in jobData once web supports this
  if (job[IS_CUSTOMISED] !== undefined) {
    jobData[IS_CUSTOMISED] = job[IS_CUSTOMISED];
  }

  return firebase
    .database()
    .ref(`${JOBS}/${jobType}`)
    .push(jobData)
    .then(snap => {
      jobData.jobId = snap.getKey();
      return jobData;
    });
};

/*

 TODO: updateJob need to do some code refactor,
 the jobType is included in the jobData, it's not easy to read

*/

const updateJob = (job, jobId) => {
  let jobData = { ...job };
  jobData[UPDATED_AT] = firebase.database.ServerValue.TIMESTAMP;
  return firebase
    .database()
    .ref(`${JOBS}/${jobData[JOB_TYPE]}/${jobId}`)
    .update(jobData);
};

const fetchJobDetail = ({ jobType, jobId }) => {
  return firebase
    .database()
    .ref(`${JOBS}/${jobType}/${jobId}`)
    .once("value");
};

const fetchJobDetailById = ({ jobId }) => {
  return fetchJobDetail({ jobType: BUY, jobId }).then(buySnapshot => {
    const buy = buySnapshot.val();
    if (buy) return Promise.resolve({ ...buy, jobType: BUY });
    return fetchJobDetail({ jobType: SELL, jobId }).then(sellSnapshot => {
      const sell = sellSnapshot.val();
      if (sell) return Promise.resolve({ ...sell, jobType: SELL });
    });
  });
};

const fetchOffersJobDetails = ({ offers, jobType }) =>
  Promise.all(
    offers.map(offer => fetchJobDetail({ jobType, jobId: offer.jobId }))
  ).then(snapshots =>
    snapshots.map((snapshot, index) => {
      return {
        jobId: offers[index].jobId,
        ...snapshot.val()
      };
    })
  );

const tagListingToJob = ({ jobId, listingId, provinceOrState }) => {
  return firebase
    .database()
    .ref(`${JOBS}/${BUY}/${jobId}/${TAGGED_LISTINGS}/${listingId}`)
    .set(provinceOrState);
};

const removeTaggedListingFromJob = ({ jobId, listingId }) => {
  return firebase
    .database()
    .ref(`${JOBS}/${BUY}/${jobId}/${TAGGED_LISTINGS}/${listingId}`)
    .remove();
};

const deleteJob = ({ jobType, jobId }) => {
  const jobData = {
    [UPDATED_AT]: firebase.database.ServerValue.TIMESTAMP,
    [STATUS]: JOB_DELETED
  };
  return firebase
    .database()
    .ref(`${JOBS}/${jobType}/${jobId}`)
    .update(jobData);
};

const fetchBuyJobsCreatedAtRange = ({ startAt, endAt }) =>
  firebase
    .database()
    .ref(`${JOBS}/${BUY}`)
    .orderByChild(CREATED_AT)
    .startAt(startAt)
    .endAt(endAt)
    .once("value");

const fetchSellJobsCreatedAtRange = ({ startAt, endAt }) =>
  firebase
    .database()
    .ref(`${JOBS}/${SELL}`)
    .orderByChild(CREATED_AT)
    .startAt(startAt)
    .endAt(endAt)
    .once("value");

const fetchJobsCreatedAtRange = ({ startAt, endAt }) =>
  new Promise((resolve, reject) => {
    const buyPromise = fetchBuyJobsCreatedAtRange({ startAt, endAt });
    const sellPromise = fetchSellJobsCreatedAtRange({ startAt, endAt });
    Promise.all([buyPromise, sellPromise])
      .then(snapshots => {
        const [buy, sell] = snapshots.map(snap => snap.val());
        resolve({ buy, sell });
      })
      .catch(reject);
  });

const fetchMultipleJobs = ({ jobIdsAndTypes }) =>
  Promise.all(
    jobIdsAndTypes.map(({ jobId, jobType }) =>
      fetchJobDetail({ jobId, jobType })
    )
  );

export {
  fetchAllBuyJobs,
  fetchAllConsumerDraftJobs,
  fetchAllSellJobs,
  fetchAllConsumerBuyJobs,
  fetchAllConsumerSellJobs,
  fetchAllConsumerPendingJobs,
  postJob,
  updateJob,
  fetchJobDetail,
  fetchJobDetailById,
  tagListingToJob,
  removeTaggedListingFromJob,
  fetchAllRegionJobs,
  deleteJob,
  fetchOffersJobDetails,
  fetchJobsCreatedAtRange,
  fetchMultipleJobs
};
