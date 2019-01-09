import {
  OFFERS_IS_LOADING,
  GET_JOB_OFFERS_SUCCESS,
  GET_JOB_OFFERS_FAILURE,
  GET_CONSUMER_BUY_OFFERS_SUCCESS,
  GET_CONSUMER_SELL_OFFERS_SUCCESS,
  GET_CONSUMER_BUY_OFFERS_FAILURE,
  GET_CONSUMER_SELL_OFFERS_FAILURE,
  GET_AGENT_BUY_OFFERS_SUCCESS,
  GET_AGENT_BUY_OFFERS_FAILURE,
  GET_AGENT_SELL_OFFERS_SUCCESS,
  GET_AGENT_SELL_OFFERS_FAILURE,
  GET_AGENT_AUTOBID_OFFERS_SUCCESS,
  GET_AGENT_AUTOBID_OFFERS_FAILURE,
  GET_AGENT_TO_CONTRACT_SELL_OFFERS_SUCCESS,
  GET_AGENT_TO_CONTRACT_BUY_OFFERS_SUCCESS,
  GET_OFFER_DETAIL_SUCCESS,
  GET_OFFER_DETAIL_FAILURE,
  GET_JOB_WINNING_OFFER_SUCCESS,
  GET_JOB_WINNING_OFFER_FAILURE,
  SAVE_OFFER_SUCCESS,
  SAVE_OFFER_FAILURE,
  ACCEPT_OFFER_SUCCESS,
  ACCEPT_OFFER_FAILURE,
  WITHDRAW_OFFER_SUCCESS,
  WITHDRAW_OFFER_FAILURE,
  PROMOTE_OFFER_SUCCESS,
  PROMOTE_OFFER_FAILURE,
  REJECT_OFFER_SUCCESS,
  REJECT_OFFER_FAILURE,
  SET_OFFER_HAS_BEEN_READ_SUCCESS,
  SET_OFFER_HAS_BEEN_READ_FAILURE,
  SET_FAVORITE_OFFER_SUCCESS,
  SET_FAVORITE_OFFER_FAILURE,
  CLEAR_WINNING_OFFER,
  SET_OFFERS_FILTERS,
  FETCH_OFFER_SUCCESS,
  FETCH_OFFER_FAILURE,
  CLEAR_BUY_OFFERS,
  CLEAR_SELL_OFFERS,
  GET_OFFERS_CREATED_AT_RANGE_SUCCESS,
  GET_OFFERS_CREATED_AT_RANGE_FAILURE,

  //__________________________________________
  // TODO:
  // check if these are being used
  GET_WINNING_OFFER_SUCCESS,
  GET_WINNING_OFFER_FAILURE,
  EDIT_BUY_OFFER_SUCCESS,
  EDIT_BUY_OFFER_FAILURE,
  EDIT_SELL_OFFER_SUCCESS,
  EDIT_SELL_OFFER_FAILURE,
  UPDATE_BUY_OFFER_SUCCESS,
  UPDATE_BUY_OFFER_FAILURE,
  UPDATE_SELL_OFFER_SUCCESS,
  UPDATE_SELL_OFFER_FAILURE
} from "../types/offers";

const offersIsLoading = ({ isLoading }) => ({
  type: OFFERS_IS_LOADING,
  payload: isLoading
});

const getJobOffersSuccess = ({ jobType, jobOffers }) => ({
  type: GET_JOB_OFFERS_SUCCESS,
  payload: {
    jobType,
    jobOffers
  }
});

const getJobOffersFailure = ({ error }) => ({
  type: GET_JOB_OFFERS_FAILURE,
  payload: error
});

const getConsumerBuyOffersSuccess = ({ payload }) => ({
  type: GET_CONSUMER_BUY_OFFERS_SUCCESS,
  payload
});

const getConsumerSellOffersSuccess = ({ payload }) => ({
  type: GET_CONSUMER_SELL_OFFERS_SUCCESS,
  payload
});

const getConsumerBuyOffersFailure = ({ error }) => ({
  type: GET_CONSUMER_BUY_OFFERS_FAILURE,
  payload: error
});

const getConsumerSellOffersFailure = ({ error }) => ({
  type: GET_CONSUMER_SELL_OFFERS_FAILURE,
  payload: error
});

const getAgentBuyOffersSuccess = ({ buyOffers }) => ({
  type: GET_AGENT_BUY_OFFERS_SUCCESS,
  payload: buyOffers
});

const getAgentBuyToContractOffersSuccess = ({ offers }) => ({
  type: GET_AGENT_TO_CONTRACT_BUY_OFFERS_SUCCESS,
  payload: offers
});

const getAgentSellToContractOffersSuccess = ({ offers }) => ({
  type: GET_AGENT_TO_CONTRACT_SELL_OFFERS_SUCCESS,
  payload: offers
});

const getAgentBuyOffersFailure = ({ error }) => ({
  type: GET_AGENT_BUY_OFFERS_FAILURE,
  payload: error
});

const getAgentSellOffersSuccess = ({ sellOffers }) => ({
  type: GET_AGENT_SELL_OFFERS_SUCCESS,
  payload: sellOffers
});

const getAgentSellOffersFailure = ({ error }) => ({
  type: GET_AGENT_SELL_OFFERS_FAILURE,
  payload: error
});

const getAgentAutobidOffersSuccess = ({ autobidOffers }) => ({
  type: GET_AGENT_AUTOBID_OFFERS_SUCCESS,
  payload: autobidOffers
});

const getAgentAutobidOffersFailure = ({ error }) => ({
  type: GET_AGENT_AUTOBID_OFFERS_FAILURE,
  payload: error
});

const getOfferDetailSuccess = ({ offerDetail }) => ({
  type: GET_OFFER_DETAIL_SUCCESS,
  payload: offerDetail
});

const getOfferDetailFailure = ({ error }) => ({
  type: GET_OFFER_DETAIL_FAILURE,
  payload: error
});

// TODO: save the offer on the store
const saveOfferSuccess = ({ offerId, jobType, offer }) => {
  return {
    type: SAVE_OFFER_SUCCESS,
    meta: {
      offerId,
      jobType
    },
    payload: { ...offer, jobType, offerId }
  };
};

const saveOfferFailure = ({ error }) => ({
  type: SAVE_OFFER_FAILURE,
  payload: error
});

const acceptOfferSuccess = () => ({
  type: ACCEPT_OFFER_SUCCESS
});

const acceptOfferFailure = ({ error }) => ({
  type: ACCEPT_OFFER_FAILURE,
  payload: { error }
});

const rejectOfferSuccess = () => ({
  type: REJECT_OFFER_SUCCESS
});

const rejectOfferFailure = ({ error }) => ({
  type: REJECT_OFFER_FAILURE,
  payload: { error }
});

const withdrawOfferSuccess = () => ({
  type: WITHDRAW_OFFER_SUCCESS
});

const withdrawOfferFailure = error => ({
  type: WITHDRAW_OFFER_FAILURE,
  payload: { error }
});

const promoteOfferSuccess = () => ({
  type: PROMOTE_OFFER_SUCCESS
});

const promoteOfferFailure = error => ({
  type: PROMOTE_OFFER_FAILURE,
  payload: { error }
});

const setOfferHasBeenReadSuccess = () => ({
  type: SET_OFFER_HAS_BEEN_READ_SUCCESS
});

const setOfferHasBeenReadFailure = ({ error }) => ({
  type: SET_OFFER_HAS_BEEN_READ_FAILURE,
  payload: { error }
});

const setFavoriteOfferSuccess = () => ({
  type: SET_FAVORITE_OFFER_SUCCESS
});

const setFavoriteOfferFailure = ({ error }) => ({
  type: SET_FAVORITE_OFFER_FAILURE,
  payload: { error }
});

const setOffersFilters = ({ filters }) => ({
  type: SET_OFFERS_FILTERS,
  payload: { filters }
});

const deleteWinningOffer = () => ({
  type: CLEAR_WINNING_OFFER,
  payload: { winningOffer: {} }
});

const getJobWinningOfferSuccess = ({ offer }) => ({
  type: GET_JOB_WINNING_OFFER_SUCCESS,
  payload: { offer }
});

const getJobWinningOfferFailure = ({ error }) => ({
  type: GET_JOB_WINNING_OFFER_FAILURE,
  payload: { error }
});

//__________________________________________

const getWinningOfferSuccess = ({ offer }) => ({
  type: GET_WINNING_OFFER_SUCCESS,
  payload: { winningOffer: offer }
});

const getWinningOfferFailure = ({ error }) => ({
  type: GET_WINNING_OFFER_FAILURE,
  payload: error
});

const editBuyOfferSuccess = buyOffer => {
  return { type: EDIT_BUY_OFFER_SUCCESS, payload: buyOffer };
};

const editBuyOfferFailure = error => {
  return {
    type: EDIT_BUY_OFFER_FAILURE,
    payload: error
  };
};

const editSellOfferSuccess = sellOffer => {
  return { type: EDIT_SELL_OFFER_SUCCESS, payload: sellOffer };
};

const editSellOfferFailure = error => {
  return {
    type: EDIT_SELL_OFFER_FAILURE,
    payload: error
  };
};

const updateBuyOfferSuccess = ({ payload }) => {
  return { type: UPDATE_BUY_OFFER_SUCCESS, payload };
};

const updateBuyOfferFailure = error => {
  return {
    type: UPDATE_BUY_OFFER_FAILURE,
    payload: error
  };
};

const updateSellOfferSuccess = ({ payload }) => {
  return { type: UPDATE_SELL_OFFER_SUCCESS, payload };
};

const updateSellOfferFailure = error => {
  return {
    type: UPDATE_SELL_OFFER_FAILURE,
    payload: error
  };
};

const fetchOfferSuccess = offer => {
  return {
    type: FETCH_OFFER_SUCCESS,
    payload: offer
  };
};

const fetchOfferFailure = error => {
  return {
    type: FETCH_OFFER_FAILURE,
    payload: error
  };
};

const clearBuyOffers = () => {
  return {
    type: CLEAR_SELL_OFFERS
  };
};

const clearSellOffers = () => {
  return {
    type: CLEAR_BUY_OFFERS
  };
};

const getOffersCreatedAtRangeSuccess = ({ offers }) => ({
  type: GET_OFFERS_CREATED_AT_RANGE_SUCCESS,
  payload: offers
});
const getOffersCreatedAtRangeFailure = ({ error }) => ({
  type: GET_OFFERS_CREATED_AT_RANGE_FAILURE,
  payload: error
});

export {
  offersIsLoading,
  getJobOffersSuccess,
  getJobOffersFailure,
  getConsumerBuyOffersSuccess,
  getConsumerBuyOffersFailure,
  getConsumerSellOffersSuccess,
  getConsumerSellOffersFailure,
  getAgentBuyOffersSuccess,
  getAgentBuyOffersFailure,
  getAgentSellOffersSuccess,
  getAgentSellOffersFailure,
  getAgentAutobidOffersSuccess,
  getAgentAutobidOffersFailure,
  getOfferDetailSuccess,
  getOfferDetailFailure,
  saveOfferSuccess,
  saveOfferFailure,
  acceptOfferSuccess,
  acceptOfferFailure,
  rejectOfferSuccess,
  rejectOfferFailure,
  withdrawOfferSuccess,
  withdrawOfferFailure,
  promoteOfferSuccess,
  promoteOfferFailure,
  setOfferHasBeenReadSuccess,
  setOfferHasBeenReadFailure,
  setFavoriteOfferSuccess,
  setFavoriteOfferFailure,
  setOffersFilters,
  deleteWinningOffer,
  getJobWinningOfferSuccess,
  getJobWinningOfferFailure,
  getAgentBuyToContractOffersSuccess,
  getAgentSellToContractOffersSuccess,
  clearSellOffers,
  clearBuyOffers,
  getOffersCreatedAtRangeSuccess,
  getOffersCreatedAtRangeFailure,
  //__________________________________________

  getWinningOfferSuccess,
  getWinningOfferFailure,
  editBuyOfferSuccess,
  editBuyOfferFailure,
  editSellOfferSuccess,
  editSellOfferFailure,
  updateBuyOfferSuccess,
  updateBuyOfferFailure,
  updateSellOfferSuccess,
  updateSellOfferFailure,
  fetchOfferSuccess,
  fetchOfferFailure
};
