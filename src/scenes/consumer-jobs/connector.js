import { connect } from "react-redux";
import ConsumerJobs from "./container";
import { getMultipleListingsDetails } from "../../../core/thunk/listings";
import {
  getAllConsumerBuyJobs,
  getAllConsumerSellJobs,
  deleteJobAsync,
  updateJobAsync
} from "../../../core/thunk/jobs";

const mapStateToProps = state => ({
  buyJobs: state.jobs.buy || [],
  sellJobs: state.jobs.sell || []
});

const mapDispatchToProps = dispatch => ({
  getAllConsumerBuyJobs: consumerId =>
    dispatch(getAllConsumerBuyJobs(consumerId)),
  getAllConsumerSellJobs: consumerId =>
    dispatch(getAllConsumerSellJobs(consumerId)),
  getMultipleListings: listingIds =>
    dispatch(getMultipleListingsDetails(listingIds)),
  deleteJobAsync: ({ jobType, jobId }) =>
    dispatch(deleteJobAsync({ jobType, jobId })),
  updateJobAsync: ({ jobData, jobId }) =>
    dispatch(updateJobAsync({ jobData, jobId }))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConsumerJobs);
