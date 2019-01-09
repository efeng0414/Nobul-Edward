import { connect } from "react-redux";
import BrowseListings from "./container";
import {
  getMultipleDetailsAndFeatureImages,
  getAndParseMasterlist
} from "../../../core/thunk/listings";
import { filterListings } from "../../../core/actions/listings";
import { setUserGeolocation } from "../../../core/actions/authentication";

import { setReverseGeolocationAsync } from "../../../core/thunk/authentication";
import {
  clearCurrentListingList,
  setBrowseLocation
} from "../../../core/actions/browseListingMap";

const mapStateToProps = state => ({
  listings: state.listings,
  users: state.authentication
});

const mapDispatchToProps = dispatch => ({
  setReverseGeolocationAsync: (lat, long) =>
    dispatch(setReverseGeolocationAsync(lat, long)),
  setUserGeolocation: coordinates => dispatch(setUserGeolocation(coordinates)),
  getListingDetails: listingIds =>
    dispatch(getMultipleDetailsAndFeatureImages(listingIds)),
  getMasterlist: ({ provinceOrState }) =>
    dispatch(getAndParseMasterlist({ provinceOrState })),
  filterListings: filter => {
    dispatch(filterListings(filter));
  },
  clearCachedListings: () => dispatch(clearCurrentListingList()),
  setBrowseLocation: ({ provinceOrState }) =>
    dispatch(setBrowseLocation({ provinceOrState }))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BrowseListings);
