import { connect } from "react-redux";
import CreateBuyJob from "./container";
import { saveJob, getAllConsumerBuyJobs } from "../../../core/thunk/jobs";
import { getPolygonBoundaries } from "../../../core/thunk/polygons";

const mapStateToProps = state => ({
  jobs: state.jobs,
  newJob: state.jobs.newJob,
  polygons: state.polygons,
  users: state.authentication,
  currentBreakPoint: state.breakpoints.currentBreakPoint
});

const mapDispatchToProps = dispatch => ({
  saveJob: (jobType, job) => dispatch(saveJob(jobType, job)),
  getAllConsumerBuyJobs: ({ userId }) =>
    dispatch(getAllConsumerBuyJobs(userId)),
  getPolygonBoundaries: ({ provinceOrState }) =>
    dispatch(getPolygonBoundaries({ provinceOrState }))
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateBuyJob);
