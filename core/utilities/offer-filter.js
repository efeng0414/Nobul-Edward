import { OFFER_ACCEPTED } from "../constants/offers";

const hasAcceptedOffer = offers => {
  return Object.keys(offers).find(key => offers[key].status === OFFER_ACCEPTED);
};

const getFilteredOffers = (filterValue, data, databaseKey) => {
  return Object.keys(data)
    .filter(key => data[key][databaseKey] === filterValue)
    .reduce((offer, key) => {
      return {
        ...offer,
        [key]: data[key]
      };
    }, {});
};

const getFilteredOffersWithDifferentValue = (
  filterValue,
  data,
  databaseKey
) => {
  return Object.keys(data)
    .filter(key => data[key][databaseKey] !== filterValue)
    .reduce((offer, key) => {
      return {
        ...offer,
        [key]: data[key]
      };
    }, {});
};

export {
  hasAcceptedOffer,
  getFilteredOffers,
  getFilteredOffersWithDifferentValue
};
