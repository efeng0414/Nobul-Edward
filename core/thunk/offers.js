import {
  offersIsLoading,
  getJobOffersSuccess,
  getJobOffersFailure,
  getConsumerBuyOffersSuccess,
  getConsumerBuyOffersFailure,
  getConsumerSellOffersSuccess,
  getConsumerSellOffersFailure,
  getAgentSellOffersSuccess,
  getAgentSellToContractOffersSuccess,
  getAgentSellOffersFailure,
  getAgentBuyOffersSuccess,
  getAgentBuyToContractOffersSuccess,
  getAgentBuyOffersFailure,
  getAgentAutobidOffersSuccess,
  getAgentAutobidOffersFailure,
  getOfferDetailSuccess,
  getOfferDetailFailure,
  saveOfferSuccess,
  saveOfferFailure,
  acceptOfferSuccess,
  acceptOfferFailure,
  withdrawOfferSuccess,
  withdrawOfferFailure,
  promoteOfferSuccess,
  promoteOfferFailure,
  rejectOfferSuccess,
  rejectOfferFailure,
  setOfferHasBeenReadSuccess,
  setOfferHasBeenReadFailure,
  setFavoriteOfferSuccess,
  setFavoriteOfferFailure,
  deleteWinningOffer,
  getJobWinningOfferSuccess,
  getJobWinningOfferFailure,
  clearSellOffers,
  clearBuyOffers,
  getOffersCreatedAtRangeSuccess,
  getOffersCreatedAtRangeFailure,

  // -------------------
  editBuyOfferSuccess,
  editSellOfferSuccess,
  updateBuyOfferSuccess,
  updateBuyOfferFailure,
  updateSellOfferSuccess,
  updateSellOfferFailure,
  getWinningOfferSuccess,
  getWinningOfferFailure
} from "../actions/offers";

import { getConsumerProfileSuccess } from "../actions/users";
import { appendJobsSuccess, appendJobsFailure } from "../actions/jobs";
import { getUserProfileById } from "../firebase/users";

import {
  postSellOffer,
  postBuyOffer,
  postWithdrawOffer,
  postPromoteOffer,
  fetchAgentSellOffers,
  fetchAgentBuyOffers,
  fetchAgentAutobidOffers,
  updateBuyOffer,
  updateSellOffer,
  postRejectOffer,
  postAcceptOffer,
  fetchWinningOffer,
  fetchJobOffers,
  fetchOffer,
  postOfferHasBeenRead,
  postFavoriteOffer,
  fetchConsumerOffers,
  fetchOffersCreatedAtRange
} from "../firebase/offers";

import {
  fetchOffersJobDetails,
  fetchAllBuyJobs,
  fetchAllSellJobs
} from "../firebase/jobs";
import { getAllBuyJobs, getAllSellJobs, jobIsOpen } from "./jobs";

import { filterByMultipleValues } from "../utilities/filter-data";
import {
  OFFER_OPEN,
  OFFER_ACCEPTED,
  OFFER_REJECTED,
  OFFER_WITHDRAWN,
  OFFER_PENDING_VERIFICATION
} from "../constants/offers";
import { CONSUMERS, OFFERS } from "../api-transform";
import { STATUS, SELL, IS_AUTOBID } from "../api-transform/offers";

const getJobOffers = ({ jobType, jobId }) => dispatch => {
  dispatch(offersIsLoading({ isLoading: true }));
  return fetchJobOffers({ jobType, jobId })
    .then(snapshot => {
      const offerStatus = [
        OFFER_OPEN,
        OFFER_ACCEPTED,
        OFFER_REJECTED,
        OFFER_WITHDRAWN
      ];
      let jobOffers = {};
      if (snapshot.val()) {
        jobOffers = filterByMultipleValues({
          databaseKey: STATUS,
          filterValues: offerStatus,
          entities: snapshot.val()
        });
      }
      dispatch(getJobOffersSuccess({ jobType, jobOffers }));
    })
    .catch(error => {
      dispatch(getJobOffersFailure({ error }));
    });
};

const getConsumerBuyOffers = ({ consumerId }) => dispatch => {
  dispatch(offersIsLoading({ isLoading: true }));
  return fetchConsumerOffers({ consumerId, isSell: false })
    .then(snapshot => {
      let verifiedOffers = {};
      if (snapshot.val()) {
        const offerStatus = [OFFER_PENDING_VERIFICATION];
        verifiedOffers = filterByMultipleValues({
          databaseKey: STATUS,
          filterValues: offerStatus,
          entities: snapshot.val(),
          shouldFilterOut: true
        });
      }
      dispatch(getConsumerBuyOffersSuccess({ payload: verifiedOffers || {} }));
    })
    .catch(error => dispatch(getConsumerBuyOffersFailure({ error })));
};

const getConsumerSellOffers = ({ consumerId }) => dispatch => {
  dispatch(offersIsLoading({ isLoading: true }));
  return fetchConsumerOffers({ consumerId, isSell: true })
    .then(snapshot => {
      let verifiedOffers = {};
      if (snapshot.val()) {
        const offerStatus = [OFFER_PENDING_VERIFICATION];
        verifiedOffers = filterByMultipleValues({
          databaseKey: STATUS,
          filterValues: offerStatus,
          entities: snapshot.val(),
          shouldFilterOut: true
        });
      }
      dispatch(getConsumerSellOffersSuccess({ payload: verifiedOffers || {} }));
    })
    .catch(error => dispatch(getConsumerSellOffersFailure({ error })));
};

const getAgentOffersRequiringContracts = ({ jobType, userId }) => dispatch => {
  dispatch(offersIsLoading({ isLoading: true }));
  const status = OFFER_ACCEPTED;
  let successPromise, failurePromise, reduxKey, fetchOffers;

  if (jobType === SELL) {
    fetchOffers = fetchAgentSellOffers;
    successPromise = getAgentSellToContractOffersSuccess;
    failurePromise = getAgentSellOffersFailure;
  } else {
    fetchOffers = fetchAgentBuyOffers;
    successPromise = getAgentBuyToContractOffersSuccess;
    failurePromise = getAgentBuyOffersFailure;
  }

  fetchOffers({ jobType, userId })
    .then(snapshot => {
      const offerShot = snapshot.val() || {};
      const offerObject = {};
      // Filter to desired status
      Object.keys(offerShot)
        .map(offerId => {
          offerShot[offerId].id = offerId;
          return offerShot[offerId];
        })
        .filter(
          offer =>
            offer.status === status &&
            (!offer.agreements || !offer.agreements[jobType])
        )
        .map(offer => (offerObject[offer.id] = offer));

      dispatch(successPromise({ [OFFERS]: offerObject }));
    })
    .catch(error => dispatch(failurePromise({ error })));
};

const getAgentSellOffers = ({ jobType, userId, status }) => dispatch => {
  dispatch(offersIsLoading({ isLoading: true }));
  dispatch(clearSellOffers());
  clearSellOffers;
  return fetchAgentSellOffers({ jobType, userId })
    .then(snapshot => {
      const offerShot = snapshot.val() || {};
      const offerObject = {};

      // Filter to desired status
      Object.keys(offerShot)
        .map(offerId => {
          offerShot[offerId].id = offerId;
          return offerShot[offerId];
        })
        .filter(offer => (status ? offer.status === status : true))
        .filter(offer => offer[IS_AUTOBID] === false)
        .map(offer => {
          return (offerObject[offer.id] = offer);
        });

      dispatch(getAgentSellOffersSuccess({ sellOffers: offerObject }));
    })
    .catch(error => {
      dispatch(getAgentSellOffersFailure({ error }));
    });
};

const getAgentBuyOffers = ({ jobType, userId, status }) => dispatch => {
  dispatch(offersIsLoading({ isLoading: true }));
  dispatch(clearBuyOffers());
  return fetchAgentBuyOffers({ jobType, userId })
    .then(snapshot => {
      const offerShot = snapshot.val() || {};
      const offerObject = {};

      // Filter to desired status
      Object.keys(offerShot)
        .map(offerId => {
          offerShot[offerId].id = offerId;
          return offerShot[offerId];
        })
        .filter(offer => (status ? offer.status === status : true))
        .filter(offer => offer[IS_AUTOBID] === false)
        .map(offer => {
          return (offerObject[offer.id] = offer);
        });

      dispatch(getAgentBuyOffersSuccess({ buyOffers: offerObject }));
    })
    .catch(error => {
      dispatch(getAgentBuyOffersFailure({ error }));
    });
};

const getAgentAutobidOffers = userId => dispatch => {
  dispatch(offersIsLoading({ isLoading: true }));
  return fetchAgentAutobidOffers(userId)
    .then(autobidOffers => {
      dispatch(getAgentAutobidOffersSuccess({ autobidOffers }));
    })
    .catch(error => {
      dispatch(getAgentAutobidOffersFailure({ error }));
    });
};

const getOffersJobDetailsAsync = ({ offers, jobType }) => dispatch => {
  dispatch(offersIsLoading({ isLoading: true }));
  return fetchOffersJobDetails({ offers, jobType })
    .then(jobDetailsArray => {
      dispatch(offersIsLoading({ isLoading: false }));

      const jobsObject = {};
      jobDetailsArray.map(job => { // eslint-disable-line
        jobsObject[job.jobId] = job;
      });

      return dispatch(
        appendJobsSuccess({
          jobs: jobsObject,
          jobType
        })
      );
    })
    .catch(error => {
      dispatch(offersIsLoading({ isLoading: false }));
      return dispatch(appendJobsFailure({ error }));
    });
};

const getAgentBuyOffersWithDetails = ({ jobType, userId }) => dispatch => {
  dispatch(offersIsLoading({ isLoading: true }));
  const offersPromise = fetchAgentBuyOffers({ jobType, userId });
  const jobsPromise = fetchAllBuyJobs();
  Promise.all([offersPromise, jobsPromise])
    .then(([offersSnapshot, jobsSnapshot]) => {
      let offers = offersSnapshot.val();
      const jobs = jobsSnapshot.val();
      let newOffers = {};
      Object.keys(offers).forEach(prop => {
        const jobId = offers[prop].jobId.toString();
        if (jobs.hasOwnProperty(jobId)) {
          const job = jobs[jobId];
          offers[prop].priceRangeHigh = job.priceRangeHigh;
          offers[prop].propertyType = job.propertyType;
          offers[prop].priceRangeLow = job.priceRangeLow;
          offers[prop].regions = job.regions;
          newOffers[prop] = offers[prop];
        }
      });
      dispatch(getAgentBuyOffersSuccess({ buyOffers: newOffers }));
    })
    .catch(error => {
      dispatch(getAgentBuyOffersFailure({ error }));
    });
};

const getAgentSellOffersWithDetails = ({ jobType, userId }) => dispatch => {
  dispatch(offersIsLoading({ isLoading: true }));
  const offersPromise = fetchAgentSellOffers({ jobType, userId });
  const jobsPromise = fetchAllSellJobs();
  Promise.all([offersPromise, jobsPromise])
    .then(([offersSnapshot, jobsSnapshot]) => {
      let offers = offersSnapshot.val();
      const jobs = jobsSnapshot.val();
      let newOffers = {};
      Object.keys(offers).forEach(prop => {
        const jobId = offers[prop].jobId.toString();
        if (jobs.hasOwnProperty(jobId)) {
          const job = jobs[jobId];
          offers[prop].priceRangeHigh = job.priceRangeHigh;
          offers[prop].propertyType = job.propertyType;
          offers[prop].priceRangeLow = job.priceRangeLow;
          offers[prop].regions = job.regions;
          newOffers[prop] = offers[prop];
        }
      });
      dispatch(getAgentSellOffersSuccess({ sellOffers: newOffers }));
    })
    .catch(error => {
      dispatch(getAgentSellOffersFailure({ error }));
    });
};

const getOfferDetail = ({ jobType, offerId }) => dispatch => {
  dispatch(offersIsLoading({ isLoading: true }));
  return fetchOffer({ jobType, offerId })
    .then(snapshot => {
      dispatch(getOfferDetailSuccess({ offerDetail: snapshot.val() }));
    })
    .catch(error => {
      dispatch(getOfferDetailFailure({ error }));
    });
};

const saveBuyOffer = ({ jobType, offer }) => dispatch => {
  dispatch(offersIsLoading({ isLoading: true }));
  return jobIsOpen({ jobType, jobId: offer.jobId })
    .then(() => postBuyOffer({ jobType, offer }))
    .then(newOffer => {
      dispatch(saveOfferSuccess({ offerId: newOffer.key, jobType, offer }));
      return dispatch(getAllBuyJobs());
    })
    .catch(error => {
      dispatch(saveOfferFailure({ error }));
      throw error;
    });
};

const saveSellOffer = ({ jobType, offer }) => dispatch => {
  dispatch(offersIsLoading({ isLoading: true }));
  return jobIsOpen({ jobType, jobId: offer.jobId })
    .then(() => postSellOffer({ jobType, offer }))
    .then(newOffer => {
      dispatch(saveOfferSuccess({ offerId: newOffer.key, jobType, offer }));
      return dispatch(getAllSellJobs());
    })
    .catch(error => dispatch(saveOfferFailure({ error })));
};

const acceptOffer = ({ jobType, offerId }) => dispatch => {
  dispatch(offersIsLoading({ isLoading: true }));
  return postAcceptOffer({ jobType, offerId })
    .then(() => {
      dispatch(acceptOfferSuccess());
    })
    .catch(error => {
      dispatch(acceptOfferFailure({ error }));
    });
};

const rejectOffer = ({ jobType, offerId }) => dispatch => {
  dispatch(offersIsLoading({ isLoading: true }));
  return postRejectOffer({ jobType, offerId })
    .then(() => {
      dispatch(rejectOfferSuccess());
    })
    .catch(error => {
      dispatch(rejectOfferFailure({ error }));
    });
};

const withdrawOffer = ({ jobType, offerId }) => dispatch => {
  dispatch(offersIsLoading({ isLoading: true }));
  return postWithdrawOffer({ jobType, offerId })
    .then(() => {
      dispatch(withdrawOfferSuccess());
    })
    .catch(error => {
      dispatch(withdrawOfferFailure({ error }));
    });
};

const promoteOffer = ({ jobType, offerId }) => dispatch => {
  dispatch(offersIsLoading({ isLoading: true }));
  return postPromoteOffer({ jobType, offerId })
    .then(() => {
      dispatch(promoteOfferSuccess());
    })
    .catch(error => {
      dispatch(promoteOfferFailure({ error }));
    });
};

const setOfferHasBeenRead = ({ jobType, offerId }) => dispatch => {
  dispatch(offersIsLoading({ isLoading: true }));
  return postOfferHasBeenRead(jobType, offerId)
    .then(() => {
      dispatch(setOfferHasBeenReadSuccess());
    })
    .catch(error => {
      dispatch(setOfferHasBeenReadFailure(error));
    });
};

const setFavoriteOffer = ({ jobType, offerId, isFavorite }) => dispatch => {
  dispatch(offersIsLoading({ isLoading: true }));
  return postFavoriteOffer({ jobType, offerId, isFavorite })
    .then(() => {
      dispatch(setFavoriteOfferSuccess());
    })
    .catch(error => {
      dispatch(setFavoriteOfferFailure(error));
    });
};

const getJobWinningOffer = ({ jobType, jobId }) => dispatch => {
  dispatch(offersIsLoading({ isLoading: true }));
  return fetchWinningOffer({ jobType, jobId })
    .then(snapshot => {
      const offers = snapshot.val() || [];
      const winningOffer = Object.values(offers).filter(
        offer => offer.status === OFFER_ACCEPTED
      );
      dispatch(getJobWinningOfferSuccess({ offer: winningOffer[0] }));
    })
    .catch(error => {
      dispatch(getJobWinningOfferFailure({ error }));
    });
};

// ---------------------

const getWinningOffer = ({ jobType, jobId }) => dispatch => {
  dispatch(offersIsLoading({ isLoading: true }));
  return fetchWinningOffer({ jobType, jobId })
    .then(snapshot => {
      const offers = snapshot.val();
      const offerKey = Object.keys(offers).filter(key => {
        return offers[key].status === OFFER_ACCEPTED;
      });
      const winningOffer = offers[offerKey[0]];
      getUserProfileById({
        userId: winningOffer.consumerId,
        userType: CONSUMERS
      }).then(clientSnapshot => {
        dispatch(getConsumerProfileSuccess(clientSnapshot.val()));
        dispatch(getWinningOfferSuccess({ offer: winningOffer }));
      });
    })
    .catch(error => {
      dispatch(getWinningOfferFailure({ error }));
    });
};

const editBuyOfferAsync = buyOffer => {
  return dispatch => {
    return dispatch(editBuyOfferSuccess(buyOffer));
  };
};

const editSellOfferAsync = sellOffer => {
  return dispatch => {
    return dispatch(editSellOfferSuccess(sellOffer));
  };
};

const updateSellOfferAsync = ({ jobType, offerId, postData }) => dispatch => {
  dispatch(offersIsLoading({ isLoading: true }));
  return updateSellOffer(jobType, offerId, postData)
    .then(() => {
      dispatch(
        updateSellOfferSuccess({
          payload: {
            offerId,
            postData
          }
        })
      );
    })
    .catch(error => {
      dispatch(updateSellOfferFailure(error));
    });
};

const updateBuyOfferAsync = ({ jobType, offerId, postData }) => dispatch => {
  dispatch(offersIsLoading({ isLoading: true }));
  return updateBuyOffer(jobType, offerId, postData)
    .then(() => {
      dispatch(
        updateBuyOfferSuccess({
          payload: {
            offerId,
            postData
          }
        })
      );
    })
    .catch(error => {
      dispatch(updateBuyOfferFailure(error));
    });
};

const clearWinningOffer = () => {
  return dispatch => {
    dispatch(deleteWinningOffer());
  };
};

const getOffersCreatedAtRange = ({ startAt = 0, endAt = 0 }) => dispatch => {
  dispatch(offersIsLoading(true));
  return fetchOffersCreatedAtRange({ startAt, endAt })
    .then(offers => dispatch(getOffersCreatedAtRangeSuccess({ offers })))
    .catch(error => dispatch(getOffersCreatedAtRangeFailure({ error })));
};

export {
  getJobOffers,
  getAgentSellOffers,
  getAgentBuyOffers,
  getConsumerBuyOffers,
  getConsumerSellOffers,
  getAgentAutobidOffers,
  getAgentBuyOffersWithDetails,
  getAgentSellOffersWithDetails,
  getOfferDetail,
  getJobWinningOffer,
  saveSellOffer,
  saveBuyOffer,
  acceptOffer,
  rejectOffer,
  withdrawOffer,
  promoteOffer,
  setOfferHasBeenRead,
  setFavoriteOffer,
  clearWinningOffer,
  getAgentOffersRequiringContracts,
  getOffersJobDetailsAsync,
  getOffersCreatedAtRange,
  //______________________________

  getWinningOffer,
  editBuyOfferAsync,
  editSellOfferAsync,
  updateSellOfferAsync,
  updateBuyOfferAsync
};
