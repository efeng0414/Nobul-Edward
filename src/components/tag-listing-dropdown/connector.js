import { connect } from "react-redux";
import TagListingDropdown from "./component";
import {
  tagListingToJobAsync,
  removeTaggedListingFromJobAsync,
  getAllConsumerBuyJobs,
  setTaggedListAsync,
  saveJob
} from "../../../core/thunk/jobs";
import { getSingleListingDetails } from "../../../core/thunk/listings";
import { getPolygonBoundaries } from "../../../core/thunk/polygons";

const mapStateToProps = state => ({
  listings: state.listings,
  isLoading: state.jobs.isLoading,
  currentUser: state.authentication.currentUser,
  userJobs: state.jobs.buy,
  polygons: state.polygons.boundaries
});

const mapDispatchToProps = dispatch => ({
  getListingDetails: ({ listingId, browseLocation }) =>
    dispatch(getSingleListingDetails(listingId, browseLocation)),
  tagListingToJob: ({ jobId, listingId }) =>
    dispatch(tagListingToJobAsync({ jobId, listingId })),
  removeTaggedListingFromJob: ({ jobId, listingId }) =>
    dispatch(removeTaggedListingFromJobAsync({ jobId, listingId })),
  getAllConsumerBuyJobs: ({ userId }) =>
    dispatch(getAllConsumerBuyJobs(userId)),
  setTaggedList: ({ taggedList, listing }) =>
    dispatch(setTaggedListAsync({ taggedList, listing })),
  saveJob: ({ jobType, job }) => dispatch(saveJob(jobType, job)),
  getProvincePolygons: ({ provinceOrState }) =>
    dispatch(getPolygonBoundaries({ provinceOrState }))
});

export default connect(mapStateToProps, mapDispatchToProps)(TagListingDropdown);
