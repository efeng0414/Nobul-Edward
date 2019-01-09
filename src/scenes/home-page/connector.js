import { connect } from "react-redux";
import HomePage from "./container";
import {
  clearCurrentListingList,
  setBrowseLocation
} from "../../../core/actions/browseListingMap";
import { triggerLoginAsync } from "../../../core/thunk/anonymousEventListeners";

const mapStateToProps = state => ({
  currentBreakPoint: state.breakpoints.currentBreakPoint
});

const mapDispatchToProps = dispatch => ({
  clearCachedListings: () => dispatch(clearCurrentListingList()),
  setBrowseLocation: ({ provinceOrState }) =>
    dispatch(setBrowseLocation({ provinceOrState })),
  promptLogin: () => dispatch(triggerLoginAsync({ trigger: true }))
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
