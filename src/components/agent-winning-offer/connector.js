import { connect } from "react-redux";
import AgentWinningOffer from "./container";

import { getJobWinningOffer } from "../../../core/thunk/offers";

const mapStateToProps = state => ({
  winningOffer: state.offers.winningOffer
});

const mapDispatchToProps = dispatch => ({
  getJobWinningOffer: ({ jobType, jobId }) =>
    dispatch(getJobWinningOffer({ jobType, jobId }))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AgentWinningOffer);
