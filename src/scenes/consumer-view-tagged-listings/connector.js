import { connect } from "react-redux";
import ConsumerViewTaggedListings from "./container";
import { getAllConsumerBuyJobs } from "../../../core/thunk/jobs";
import { getTaggedListingsDetails } from "../../../core/thunk/listings";

const mapStateToProps = state => ({
  currentUser: state.authentication.currentUser,
  userJobs: state.jobs.buy,
  listings: state.listings.taggedListingsData,
  isListingsLoading: state.listings.isLoading
});

const mapDispatchToProps = dispatch => ({
  getAllConsumerBuyJobs: ({ userId }) =>
    dispatch(getAllConsumerBuyJobs(userId)),
  getTaggedListingsDetails: ({ listingIdArray }) =>
    dispatch(getTaggedListingsDetails(listingIdArray))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConsumerViewTaggedListings);
