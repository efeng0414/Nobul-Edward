import { connect } from "react-redux";
import AgentProposalItem from "./container";

import { BUY, SELL } from "../../../core/constants/shared";
import { appendJobDetail } from "../../../core/thunk/jobs";
import { createStripeSingleChargeAsync } from "../../../core/thunk/stripeCustomers";
import {
  withdrawOffer,
  promoteOffer,
  getWinningOffer,
  updateSellOfferAsync,
  updateBuyOfferAsync
} from "../../../core/thunk/offers";

const mapStateToProps = state => ({
  authentication: state.authentication,
  currentUser: state.authentication.currentUser,
  buyJobs: state.jobs[BUY],
  sellJobs: state.jobs[SELL],
  stripeCards: state.stripeCustomers.cards
});

const mapDispatchToProps = dispatch => ({
  appendJobDetail: ({ jobType, jobId }) =>
    dispatch(appendJobDetail({ jobType, jobId })),
  withdrawOffer: ({ jobType, offerId }) =>
    dispatch(withdrawOffer({ jobType, offerId })),
  promoteOffer: ({ jobType, offerId }) =>
    dispatch(promoteOffer({ jobType, offerId })),
  getWinningOffer: ({ jobType, jobId }) =>
    dispatch(getWinningOffer({ jobType, jobId })),
  createStripeSingleChargeAsync: ({ userId, charge }) =>
    dispatch(createStripeSingleChargeAsync({ userId, charge })),
  updateSellOffer: ({ jobType, offerId, postData }) =>
    dispatch(updateSellOfferAsync({ jobType, offerId, postData })),
  updateBuyOffer: ({ jobType, offerId, postData }) =>
    dispatch(updateBuyOfferAsync({ jobType, offerId, postData }))
});

export default connect(mapStateToProps, mapDispatchToProps)(AgentProposalItem);
