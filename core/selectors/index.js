import { createSelector } from "reselect";
import { OFFER_ACCEPTED, OFFER_ACCEPTED_CONFIRMED } from "../constants/offers";
import { DESC, ASC } from "../constants/shared";

const buyOffersSelector = state => state.offers.buy || [];
const sellOffersSelector = state => state.offers.sell || [];
const offersFilterSelector = state => state.offers.filters.filterBy;
const offersSortSelector = state => state.offers.filters.sortBy;
const jobDetailSelector = state => state.jobs.jobDetail;
const offerSelector = state => state.offers;
const currentUserId = state => state.authentication.currentUser.uid;

// sort by Fields
// sortFields : { sortField1: value, sortField2: value}
const fieldSorter = sortFields => (a, b) =>
  Object.entries(sortFields)
    .map(sortBy => {
      if (sortBy[1] === DESC) {
        return b[1][sortBy[0]] - a[1][sortBy[0]];
      } else if (sortBy[1] === ASC) {
        return a[1][sortBy[0]] - b[1][sortBy[0]];
      } else {
        const fieldA = a[1][sortBy[0]] === sortBy[1] ? 1 : 0;
        const fieldB = b[1][sortBy[0]] === sortBy[1] ? 1 : 0;
        return fieldB - fieldA;
      }
    })
    .reduce((accum, item) => (accum ? accum : item), 0);

// filter by Fields
// filterFields : { filterField1: value, filterField2: value}
const fieldFilter = filterFields => item => {
  if (Object.keys(filterFields).length === 0) return true;
  return Object.entries(filterFields)
    .map(filterBy => item[1][filterBy[0]] === filterBy[1])
    .reduce((accum, item) => (accum ? accum : item), 0);
};

export const jobBuyOffersSelector = createSelector(
  buyOffersSelector,
  offersFilterSelector,
  offersSortSelector,
  (buyOffers, filterBy, sortBy) => {
    return Object.entries(buyOffers)
      .filter(fieldFilter(filterBy))
      .sort(fieldSorter(sortBy));
  }
);

export const jobSellOffersSelector = createSelector(
  sellOffersSelector,
  offersFilterSelector,
  offersSortSelector,
  (sellOffers, filterBy, sortBy) => {
    return Object.entries(sellOffers)
      .filter(fieldFilter(filterBy))
      .sort(fieldSorter(sortBy));
  }
);

export const jobWinningOfferSelector = createSelector(
  jobDetailSelector,
  offerSelector,
  (jobDetail, offers) => {
    if (!jobDetail.jobType) return [];
    return Object.values(offers[jobDetail.jobType]).filter(
      offer =>
        (offer.status === OFFER_ACCEPTED ||
          offer.status === OFFER_ACCEPTED_CONFIRMED) &&
        offer.jobId === jobDetail.jobId
    );
  }
);

const giveOfferId = offersObject => {
  const withId = {};

  Object.keys(offersObject).map(key => { // eslint-disable-line
    withId[key] = offersObject[key];
    withId[key].offerId = key;
  });

  return withId;
};

export const jobOfferByAgentId = createSelector(
  currentUserId,
  buyOffersSelector,
  sellOffersSelector,
  jobDetailSelector,
  (agentId, offersBuy, offersSell, jobDetail) => {
    const agentOffersBuy = Object.values(giveOfferId(offersBuy)).filter(
      offer => offer.agentId === agentId && offer.jobId === jobDetail.jobId
    );
    const agentOffersSell = Object.values(giveOfferId(offersSell)).filter(
      offer => offer.agentId === agentId && offer.jobId === jobDetail.jobId
    );
    return [...agentOffersBuy, ...agentOffersSell];
  }
);

export const acceptedOffersByAgentId = createSelector(
  buyOffersSelector,
  sellOffersSelector,
  (buyOffers, sellOffers) => {
    const totalBuyOffers = Object.values(buyOffers).filter(
      offer => offer.status === OFFER_ACCEPTED
    ).length;
    const totalSellOffers = Object.values(sellOffers).filter(
      offer => offer.status === OFFER_ACCEPTED
    ).length;
    return totalBuyOffers + totalSellOffers;
  }
);

export const acceptedConfirmedOffersByAgentId = createSelector(
  buyOffersSelector,
  sellOffersSelector,
  (buyOffers, sellOffers) => {
    const totalBuyOffers = Object.values(buyOffers).filter(
      offer => offer.status === OFFER_ACCEPTED_CONFIRMED
    ).length;
    const totalSellOffers = Object.values(sellOffers).filter(
      offer => offer.status === OFFER_ACCEPTED_CONFIRMED
    ).length;
    return totalBuyOffers + totalSellOffers;
  }
);
