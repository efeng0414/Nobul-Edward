import { connect } from "react-redux";
import EditJob from "./container";

import { editJob } from "../../../core/thunk/jobs";

const mapStateToProps = state => ({ jobs: state.jobs });

const mapDispatchToProps = dispatch => ({
  editJob: (jobData, jobId, jobs, isUpdated) =>
    dispatch(editJob(jobData, jobId, jobs, isUpdated))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditJob);
