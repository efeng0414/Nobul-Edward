import { connect } from "react-redux";
import LicenceForm from "./container";

import { addAgentVerificationDataAsync } from "../../../../../core/thunk/authentication";

const mapStateToProps = state => ({
  currentUserVerification: state.authentication.verification,
  currentUserProfile: state.authentication.profile,
  isLoading: state.authentication.currentUser
    ? state.authentication.currentUser.isLoading
    : false,
  error: state.authentication.error
});

const mapDispatchToProps = dispatch => ({
  addAgentVerificationData: verificationData =>
    dispatch(addAgentVerificationDataAsync(verificationData))
});

export default connect(mapStateToProps, mapDispatchToProps)(LicenceForm);
