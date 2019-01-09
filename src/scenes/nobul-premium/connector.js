import { connect } from "react-redux";
import NobulPremium from "./container";

const mapStateToProps = state => ({
  currentUser: state.authentication.currentUser
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NobulPremium);
