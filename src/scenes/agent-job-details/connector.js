import { connect } from "react-redux";
import AgentJobDetails from "./container";
import { getJobDetail } from "../../../core/thunk/jobs";
import { getConsumerProfileAsync } from "../../../core/thunk/users";
import { getJobOffers } from "../../../core/thunk/offers";
import { getAgentAverageRating } from "../../../core/thunk/authentication";

import { withRouter } from "react-router";

const mapStateToProps = state => ({
  jobDetail: state.jobs.jobDetail,
  isLoading: state.jobs.isLoading,
  consumerIsLoading: state.users.isLoading,
  consumerCity: state.users.consumerProfile.city
});

const mapDispatchToProps = dispatch => ({
  getJobDetail: ({ jobType, jobId }) =>
    dispatch(getJobDetail({ jobType, jobId })),
  getConsumerProfileAsync: ({ consumerId }) =>
    dispatch(getConsumerProfileAsync({ consumerId })),
  getAgentAverageRating: ({ agentId }) =>
    dispatch(getAgentAverageRating({ agentId })),
  getJobOffers: ({ jobType, jobId }) =>
    dispatch(getJobOffers({ jobType, jobId }))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AgentJobDetails));
