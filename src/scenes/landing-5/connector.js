import { connect } from "react-redux";
import Landing5 from "./container";
import {
  clearCurrentListingList,
  setBrowseLocation
} from "../../../core/actions/browseListingMap";

const mapStateToProps = state => ({
  currentBreakPoint: state.breakpoints.currentBreakPoint
});

const mapDispatchToProps = dispatch => ({
  clearCachedListings: () => dispatch(clearCurrentListingList()),

  setBrowseLocation: ({ provinceOrState }) =>
    dispatch(setBrowseLocation({ provinceOrState }))
});

export default connect(mapStateToProps, mapDispatchToProps)(Landing5);
