import { connect } from "react-redux";
import GetStarted from "./container";

const mapStateToProps = state => ({
  users: state.authentication
});

export default connect(mapStateToProps)(GetStarted);
