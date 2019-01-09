import { connect } from "react-redux";
import {
  getSingleListingDetails,
  getAndParseMasterlist
} from "../../../core/thunk/listings";
import { saveJob, getAllConsumerBuyJobs } from "../../../core/thunk/jobs";
import { getPolygonBoundaries } from "../../../core/thunk/polygons";
import {
  setFavoritePropertyAsync,
  removeFavoritePropertyAsync,
  getUsersFavoriteListingsAsync,
  getUsersFavoriteListings
} from "../../../core/thunk/authentication";
import {
  triggerLoginAsync,
  setFavoriteAsync
} from "../../../core/thunk/anonymousEventListeners";
import ListingDetails from "./container";

const mapStateToProps = state => ({
  jobs: state.jobs,
  isSavingJob: state.jobs.isLoading,
  listings: state.listings,
  currentUser: state.authentication.currentUser,
  userType: state.authentication.userType,
  polygons: state.polygons.boundaries,
  browseLocation: state.browseListingMap.browseLocation,
  usersFavorites: state.authentication.favoriteListings,
  favoriteList: state.anonymousEventListeners.favoriteList,
  loginTrigger: state.anonymousEventListeners.loginTrigger
});

const mapDispatchToProps = dispatch => ({
  getListingDetails: ({ listingId, browseLocation }) =>
    dispatch(getSingleListingDetails(listingId, browseLocation)),
  getMasterlist: ({ provinceOrState }) =>
    dispatch(getAndParseMasterlist({ provinceOrState })),
  saveJob: ({ jobType, job }) => dispatch(saveJob(jobType, job)),
  getAllConsumerBuyJobs: ({ userId }) =>
    dispatch(getAllConsumerBuyJobs(userId)),
  getProvincePolygons: ({ provinceOrState }) =>
    dispatch(getPolygonBoundaries({ provinceOrState })),
  getFavoriteListings: ({ userId }) =>
    dispatch(getUsersFavoriteListings({ userId })),
  setPropertyAsFavorite: ({ uid, listing }) =>
    dispatch(setFavoritePropertyAsync(uid, listing)),
  removePropertyAsFavorite: ({ uid, creaId }) =>
    dispatch(removeFavoritePropertyAsync(uid, creaId)),
  getUsersFavoriteListings: ({ userId }) =>
    dispatch(getUsersFavoriteListingsAsync({ userId })),
  triggerLogin: ({ trigger }) => dispatch(triggerLoginAsync({ trigger })),
  setFavorite: ({ favoriteList }) =>
    dispatch(setFavoriteAsync({ favoriteList }))
});

export default connect(mapStateToProps, mapDispatchToProps)(ListingDetails);
