import { connect } from "react-redux";
import Landing4 from "./container";
import {
  clearCurrentListingList,
  setBrowseLocation
} from "../../../core/actions/browseListingMap";

const mapDispatchToProps = dispatch => ({
  clearCachedListings: () => dispatch(clearCurrentListingList()),

  setBrowseLocation: ({ provinceOrState }) =>
    dispatch(setBrowseLocation({ provinceOrState }))
});

export default connect(null, mapDispatchToProps)(Landing4);
