import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

import { createObjectFromArray } from "../utilities/array-to-object";
import { OFFERS, AGREEMENTS } from "../api-transform";
import {
  OFFER_WITHDRAWN,
  OFFER_REJECTED,
  OFFER_ACCEPTED
} from "../constants/offers";
import {
  CREATED_AT,
  UPDATED_AT,
  CREATED_ON,
  STATUS,
  AGENT_ID,
  COOPERATING_COMMISSION,
  LISTING_COMMISSION,
  CONSUMER_ID,
  JOB_ID,
  PERSONALIZED_MESSAGE,
  TAGLINE,
  SERVICES,
  REBATE_COMMISSION,
  CONSUMER_HAS_READ,
  IS_FAVORITE,
  IS_PROMOTED,
  IS_AUTOBID
} from "../api-transform/offers";
import { BUY, SELL, REFERRAL } from "../constants/shared";

const postSellOffer = ({ jobType, offer }) => {
  const services = createObjectFromArray(offer.services);
  return firebase
    .database()
    .ref(`${OFFERS}/${jobType}`)
    .push({
      [CREATED_AT]: firebase.database.ServerValue.TIMESTAMP,
      [UPDATED_AT]: firebase.database.ServerValue.TIMESTAMP,
      [CREATED_ON]: offer.createdOn,
      [STATUS]: offer.status,
      [AGENT_ID]: offer.agentId,
      [COOPERATING_COMMISSION]: offer.cooperatingCommission,
      [LISTING_COMMISSION]: offer.listingCommission,
      [CONSUMER_ID]: offer.consumerId,
      [JOB_ID]: offer.jobId,
      [PERSONALIZED_MESSAGE]: offer.personalizedMessage || "",
      [TAGLINE]: offer.tagline || "",
      [SERVICES]: services,
      [CONSUMER_HAS_READ]: false,
      [IS_FAVORITE]: false,
      [IS_PROMOTED]: false,
      [IS_AUTOBID]: false,
      [AGREEMENTS]: {
        // These are the agreements the agent will be asked to generate
        [SELL]: "",
        [REFERRAL]: ""
      }
    });
};

const postBuyOffer = ({ jobType, offer }) => {
  const services = createObjectFromArray(offer.services);
  return firebase
    .database()
    .ref(`${OFFERS}/${jobType}`)
    .push({
      [CREATED_AT]: firebase.database.ServerValue.TIMESTAMP,
      [UPDATED_AT]: firebase.database.ServerValue.TIMESTAMP,
      [CREATED_ON]: offer.createdOn,
      [STATUS]: offer.status,
      [AGENT_ID]: offer.agentId,
      [REBATE_COMMISSION]: offer.rebateCommission,
      [CONSUMER_ID]: offer.consumerId,
      [JOB_ID]: offer.jobId,
      [PERSONALIZED_MESSAGE]: offer.personalizedMessage || "",
      [TAGLINE]: offer.tagline || "",
      [SERVICES]: services,
      [CONSUMER_HAS_READ]: false,
      [IS_FAVORITE]: false,
      [IS_PROMOTED]: false,
      [IS_AUTOBID]: false,
      [AGREEMENTS]: {
        // These are the agreements the agent will be asked to generate
        [BUY]: "",
        [REFERRAL]: ""
      }
    });
};

const postWithdrawOffer = ({ jobType, offerId }) => {
  return firebase
    .database()
    .ref(`${OFFERS}/${jobType}/${offerId}/${STATUS}`)
    .set(OFFER_WITHDRAWN);
};

const postPromoteOffer = ({ jobType, offerId }) => {
  return firebase
    .database()
    .ref(`${OFFERS}/${jobType}/${offerId}/${IS_PROMOTED}`)
    .set(true);
};

const postRejectOffer = ({ jobType, offerId }) => {
  return firebase
    .database()
    .ref(`${OFFERS}/${jobType}/${offerId}/${STATUS}`)
    .set(OFFER_REJECTED);
};

const postAcceptOffer = ({ jobType, offerId }) => {
  return firebase
    .database()
    .ref(`${OFFERS}/${jobType}/${offerId}/${STATUS}`)
    .set(OFFER_ACCEPTED);
};

const postOfferHasBeenRead = (jobType, offerId) => {
  return firebase
    .database()
    .ref(`${OFFERS}/${jobType}/${offerId}`)
    .update({ [CONSUMER_HAS_READ]: true });
};

const postFavoriteOffer = ({ jobType, offerId, isFavorite }) => {
  return firebase
    .database()
    .ref(`${OFFERS}/${jobType}/${offerId}`)
    .update({ [IS_FAVORITE]: isFavorite });
};

const fetchAgentSellOffers = ({ jobType, userId }) => {
  return firebase
    .database()
    .ref(`${OFFERS}/${jobType}`)
    .orderByChild(AGENT_ID)
    .equalTo(userId)
    .once("value");
};

const fetchAgentBuyOffers = ({ jobType, userId }) => {
  return firebase
    .database()
    .ref(`${OFFERS}/${jobType}`)
    .orderByChild(AGENT_ID)
    .equalTo(userId)
    .once("value");
};

const fetchAgentAutobidOffers = userId => {
  return new Promise((resolve, reject) => {
    const buyPromise = firebase
      .database()
      .ref(`${OFFERS}/${BUY}`)
      .orderByChild(AGENT_ID)
      .equalTo(userId)
      .once("value");

    const sellPromise = firebase
      .database()
      .ref(`${OFFERS}/${SELL}`)
      .orderByChild(AGENT_ID)
      .equalTo(userId)
      .once("value");

    Promise.all([buyPromise, sellPromise])
      .then(results => {
        const buyResults = results[0].val();
        const sellResults = results[1].val();
        let totalResults = { ...buyResults, ...sellResults };
        Object.keys(totalResults).map(key => {
          if (totalResults[key][IS_AUTOBID] !== true) {
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

const fetchWinningOffer = ({ jobType, jobId }) => {
  return firebase
    .database()
    .ref(`${OFFERS}/${jobType}`)
    .orderByChild(JOB_ID)
    .equalTo(jobId)
    .once("value");
};

const fetchJobOffers = ({ jobType, jobId }) => {
  return firebase
    .database()
    .ref(`${OFFERS}/${jobType}`)
    .orderByChild(`${JOB_ID}`)
    .equalTo(jobId)
    .once("value");
};

const fetchOffer = ({ jobType, offerId }) => {
  return firebase
    .database()
    .ref(`${OFFERS}/${jobType}/${offerId}`)
    .once("value");
};

const fetchConsumerOffers = ({ consumerId, isSell = false }) => {
  const jobType = isSell ? SELL : BUY;
  return firebase
    .database()
    .ref(`${OFFERS}/${jobType}`)
    .orderByChild(CONSUMER_ID)
    .equalTo(consumerId)
    .once("value");
};

const fetchOfferById = ({ offerId }) => {
  return fetchOffer({ jobType: BUY, offerId }).then(buySnapshot => {
    const buy = buySnapshot.val();
    if (buy) return Promise.resolve({ ...buy, jobType: BUY });
    return fetchOffer({ jobType: SELL, offerId }).then(sellSnapshot => {
      const sell = sellSnapshot.val();
      if (sell) return Promise.resolve({ ...sell, jobType: SELL });
    });
  });
};

const updateBuyOffer = (jobType, offerId, postData) => {
  const services = createObjectFromArray(postData[SERVICES]);
  return firebase
    .database()
    .ref(`${OFFERS}/${jobType}/${offerId}`)
    .update({
      [UPDATED_AT]: firebase.database.ServerValue.TIMESTAMP,
      [REBATE_COMMISSION]: postData[REBATE_COMMISSION],
      [PERSONALIZED_MESSAGE]: postData[PERSONALIZED_MESSAGE],
      [SERVICES]: services,
      [TAGLINE]: postData[TAGLINE]
    });
};

const updateSellOffer = (jobType, offerId, postData) => {
  const services = createObjectFromArray(postData[SERVICES]);
  return firebase
    .database()
    .ref(`${OFFERS}/${jobType}/${offerId}`)
    .update({
      [UPDATED_AT]: firebase.database.ServerValue.TIMESTAMP,
      [COOPERATING_COMMISSION]: postData[COOPERATING_COMMISSION],
      [LISTING_COMMISSION]: postData[LISTING_COMMISSION],
      [PERSONALIZED_MESSAGE]: postData[PERSONALIZED_MESSAGE],
      [SERVICES]: services,
      [TAGLINE]: postData[TAGLINE]
    });
};
const fetchBuyOffersCreatedAtRange = ({ startAt, endAt }) =>
  firebase
    .database()
    .ref(`${OFFERS}/${BUY}`)
    .orderByChild(CREATED_AT)
    .startAt(startAt)
    .endAt(endAt)
    .once("value");

const fetchSellOffersCreatedAtRange = ({ startAt, endAt }) =>
  firebase
    .database()
    .ref(`${OFFERS}/${SELL}`)
    .orderByChild(CREATED_AT)
    .startAt(startAt)
    .endAt(endAt)
    .once("value");

const fetchOffersCreatedAtRange = ({ startAt, endAt }) =>
  new Promise((resolve, reject) => {
    const buyPromise = fetchBuyOffersCreatedAtRange({ startAt, endAt });
    const sellPromise = fetchSellOffersCreatedAtRange({ startAt, endAt });
    Promise.all([buyPromise, sellPromise])
      .then(snapshots => {
        const [buy, sell] = snapshots.map(snap => snap.val());
        resolve({ buy, sell });
      })
      .catch(reject);
  });

export {
  postSellOffer,
  postBuyOffer,
  postWithdrawOffer,
  postPromoteOffer,
  postRejectOffer,
  postAcceptOffer,
  postOfferHasBeenRead,
  postFavoriteOffer,
  fetchAgentSellOffers,
  fetchAgentBuyOffers,
  fetchAgentAutobidOffers,
  fetchWinningOffer,
  fetchJobOffers,
  fetchOffer,
  fetchOfferById,
  fetchConsumerOffers,
  updateBuyOffer,
  updateSellOffer,
  fetchOffersCreatedAtRange
};
