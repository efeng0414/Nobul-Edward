import { connect } from "react-redux";
import Devices from "./component";

const mapStateToProps = state => ({
  currentBreakPoint: state.breakpoints.currentBreakPoint
});

export default connect(mapStateToProps)(Devices);
