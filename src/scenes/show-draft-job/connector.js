import { connect } from "react-redux";
import ShowDraftJob from "./container";

import { getAllConsumerDraftJobs, editJob } from "../../../core/thunk/jobs";

const mapStateToProps = state => ({
  currentUser: state.authentication.currentUser,
  jobs: state.jobs
});

const mapDispatchToProps = dispatch => ({
  getAllConsumerDraftJobs: userId => dispatch(getAllConsumerDraftJobs(userId)),
  editJob: (jobData, jobId, jobs, isUpdated) =>
    dispatch(editJob(jobData, jobId, jobs, isUpdated))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShowDraftJob);
