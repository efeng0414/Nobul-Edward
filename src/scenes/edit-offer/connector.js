import { connect } from "react-redux";
import EditOffer from "./container";
import {
  saveSellOffer,
  saveBuyOffer,
  updateSellOfferAsync,
  updateBuyOfferAsync
} from "../../../core/thunk/offers";
import { BUY, SELL } from "../../../core/constants/shared";

const mapStateToProps = state => ({
  buyOffer: state.offers[BUY],
  sellOffer: state.offers[SELL],
  winningOffer: state.offers.winningOffer,
  users: state.authentication,
  consumerProfile: state.users.consumerProfile,
  state: state,
  isLoading: state.offers.isLoading
});

const mapDispatchToProps = dispatch => ({
  saveSellOffer: ({ jobType, offer }) =>
    dispatch(saveSellOffer({ jobType, offer })),
  saveBuyOffer: ({ jobType, offer }) =>
    dispatch(saveBuyOffer({ jobType, offer })),
  updateSellOffer: (jobType, offerId, postSellData) =>
    dispatch(updateSellOfferAsync(jobType, offerId, postSellData)),
  updateBuyOffer: (jobType, offerId, postSellData) =>
    dispatch(updateBuyOfferAsync(jobType, offerId, postSellData))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditOffer);
