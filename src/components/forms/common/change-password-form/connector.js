import { connect } from "react-redux";
import ChangePasswordForm from "./component";

const mapStateToProps = state => ({
  userError: state.authentication.error
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangePasswordForm);
