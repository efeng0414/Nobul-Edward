import { connect } from "react-redux";
import CreateSellJob from "./container";
import { saveJob, getAllConsumerSellJobs } from "../../../core/thunk/jobs";
import { getPolygonBoundaries } from "../../../core/thunk/polygons";

const mapStateToProps = state => ({
  jobs: state.jobs,
  newJob: state.jobs.newJob,
  users: state.authentication,
  polygons: state.polygons,
  currentBreakPoint: state.breakpoints.currentBreakPoint
});

const mapDispatchToProps = dispatch => ({
  saveJob: (jobType, job) => dispatch(saveJob(jobType, job)),
  getAllConsumerSellJobs: ({ userId }) =>
    dispatch(getAllConsumerSellJobs(userId)),
  getPolygonBoundaries: ({ provinceOrState }) =>
    dispatch(getPolygonBoundaries({ provinceOrState }))
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateSellJob);
