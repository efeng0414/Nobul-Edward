import { connect } from "react-redux";
import AgentRatingForm from "./container";
import { getOfferDetail } from "../../../core/thunk/offers";

const mapStateToProps = state => ({
  currentOffer: state.offers.offerDetail
});

const mapDispatchToProps = dispatch => ({
  getOffer: ({ offerId, jobType }) =>
    dispatch(getOfferDetail({ jobType, offerId }))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AgentRatingForm);
