import { connect } from "react-redux";
import ConsumerJobDetails from "./container";
import { getJobDetail } from "../../../core/thunk/jobs";
import { getJobOffers } from "../../../core/thunk/offers";
import { getMultipleAgentsWithAvatar } from "../../../core/thunk/users";

import { withRouter } from "react-router";

const mapStateToProps = state => ({
  jobDetail: state.jobs.jobDetail,
  isLoading: state.jobs.isLoading,
  buyOffers: state.offers.buy,
  sellOffers: state.offers.sell
});

const mapDispatchToProps = dispatch => ({
  getJobDetail: ({ jobType, jobId }) =>
    dispatch(getJobDetail({ jobType, jobId })),
  getJobOffers: ({ jobType, jobId }) =>
    dispatch(getJobOffers({ jobType, jobId })),
  getMultipleAgentsWithAvatar: ({ agentIdArray }) =>
    dispatch(getMultipleAgentsWithAvatar({ agentIdArray }))
});

export default connect(mapStateToProps, mapDispatchToProps)(
  withRouter(ConsumerJobDetails)
);
