import { connect } from "react-redux";
import AgentOfferDetails from "./container";
import { withRouter } from "react-router";
import { getJobDetail } from "../../../core/thunk/jobs";
import {
  getOfferDetail,
  updateSellOfferAsync,
  updateBuyOfferAsync
} from "../../../core/thunk/offers";
import { appendJobSuccess } from "../../../core/actions/jobs";

const mapStateToProps = state => ({
  authentication: state.authentication,
  jobDetail: state.jobs.jobDetail,
  offerDetail: state.offers.offerDetail,
  isPremium: true // REMOVE_PREMIUM state.authentication.isPremium,
});

const mapDispatchToProps = dispatch => ({
  getOfferDetail: ({ jobType, offerId }) =>
    dispatch(getOfferDetail({ jobType, offerId })),
  getJobDetail: ({ jobType, jobId }) =>
    dispatch(getJobDetail({ jobType, jobId })),
  appendJobSuccess: ({ jobType, jobId, jobDetail }) =>
    dispatch(appendJobSuccess({ jobType, jobId, jobDetail })),
  updateSellOffer: ({ jobType, offerId, postData }) =>
    dispatch(updateSellOfferAsync({ jobType, offerId, postData })),
  updateBuyOffer: ({ jobType, offerId, postData }) =>
    dispatch(updateBuyOfferAsync({ jobType, offerId, postData }))
});

export default connect(mapStateToProps, mapDispatchToProps)(
  withRouter(AgentOfferDetails)
);
