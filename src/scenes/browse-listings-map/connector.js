import { connect } from "react-redux";
import BrowseListingsMap from "./container";
import {
  getMultipleDetailsAndFeatureImages,
  getAndParseMasterlist,
  filterListingsAsync
} from "../../../core/thunk/listings";
import {
  saveCurrentListingList,
  setBrowseLocation
} from "../../../core/actions/browseListingMap";
import { getBrowseRegionsPolygons } from "../../../core/thunk/polygons";

const mapStateToProps = state => ({
  listings: state.listings,
  users: state.authentication,
  buyJobs: state.jobs.buy || {},
  cachedListingList: state.browseListingMap.currentListingList,
  browseLocation: state.browseListingMap.browseLocation,
  currentBreakPoint: state.breakpoints.currentBreakPoint,
  supportedBrowsePolygons: state.polygons.supportedBrowsePolygons,
  sortError: state.listings.sortError,
  sortingActive: !!state.config.features.browseListingsSort
});

const mapDispatchToProps = dispatch => ({
  getListingDetails: listingIds =>
    dispatch(getMultipleDetailsAndFeatureImages(listingIds)),
  getMasterlist: ({ provinceOrState }) =>
    dispatch(getAndParseMasterlist({ provinceOrState })),
  getSupportedBrowseRegions: () => dispatch(getBrowseRegionsPolygons()),
  filterListings: ({
    filters,
    sortBy,
    latBottom,
    latTop,
    lngLeft,
    lngRight,
    skipSorting
  }) =>
    dispatch(
      filterListingsAsync({
        filters,
        sortBy,
        latBottom,
        latTop,
        lngLeft,
        lngRight,
        skipSorting
      })
    ),
  cacheListingList: ({ listingList }) =>
    dispatch(saveCurrentListingList({ listingList })),
  setBrowseLocation: ({ provinceOrState }) =>
    dispatch(setBrowseLocation({ provinceOrState }))
});

export default connect(mapStateToProps, mapDispatchToProps)(BrowseListingsMap);
