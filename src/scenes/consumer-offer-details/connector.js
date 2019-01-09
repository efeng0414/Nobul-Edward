import { connect } from "react-redux";
import CustomerOfferDetails from "./container";
import {
  getOfferDetail,
  acceptOffer,
  rejectOffer,
  setFavoriteOffer
} from "../../../core/thunk/offers";
import { getJobDetail } from "../../../core/thunk/jobs";
import { getAgentWithAvatar } from "../../../core/thunk/users";
import { withRouter } from "react-router";

const mapStateToProps = state => ({
  offer: state.offers.offerDetail,
  currentUser: state.authentication.currentUser,
  agentProfile: state.users.agent,
  jobDetail: state.jobs.jobDetail,
  events: state.events.list
});

const mapDispatchToProps = dispatch => ({
  getOfferDetail: ({ jobType, offerId }) =>
    dispatch(getOfferDetail({ jobType, offerId })),
  acceptOffer: ({ jobType, offerId }) =>
    dispatch(acceptOffer({ jobType, offerId })),
  rejectOffer: ({ jobType, offerId }) =>
    dispatch(rejectOffer({ jobType, offerId })),
  setFavoriteOffer: ({ jobType, offerId, isFavorite }) =>
    dispatch(setFavoriteOffer({ jobType, offerId, isFavorite })),
  getAgentWithAvatar: ({ agentId }) =>
    dispatch(getAgentWithAvatar({ agentId })),
  getJobDetail: ({ jobType, jobId }) =>
    dispatch(getJobDetail({ jobType, jobId }))
});

export default connect(mapStateToProps, mapDispatchToProps)(
  withRouter(CustomerOfferDetails)
);
