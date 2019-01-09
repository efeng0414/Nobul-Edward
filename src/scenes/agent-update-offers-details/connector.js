import { connect } from "react-redux";
import AgentUpdateOffersDetails from "./container";

import {
  getWinningOffer,
  clearWinningOffer,
  updateSellOfferAsync,
  updateBuyOfferAsync
} from "../../../core/thunk/offers";

const mapStateToProps = state => ({
  winningOffer: state.offers.winningOffer
});

const mapDispatchToProps = dispatch => ({
  getWinningOffer: ({ jobType, jobId }) =>
    dispatch(getWinningOffer({ jobType, jobId })),
  clearWinningOffer: () => dispatch(clearWinningOffer()),
  updateSellOffer: (jobType, offerId, postSellData) =>
    dispatch(updateSellOfferAsync(jobType, offerId, postSellData)),
  updateBuyOffer: (jobType, offerId, postSellData) =>
    dispatch(updateBuyOfferAsync(jobType, offerId, postSellData))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AgentUpdateOffersDetails);
