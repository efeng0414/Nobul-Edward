import { connect } from "react-redux";
import BrokerageDetails from "./container";

import { updateAgentVerificationDataAsync } from "../../../../../core/thunk/authentication";

const mapStateToProps = state => ({
  currentUser: state.authentication.currentUser,
  profile: state.authentication.profile,
  verification: state.authentication.verification,
  isLoading: state.authentication.currentUser
    ? state.authentication.currentUser.isLoading
    : false,
  error: state.authentication.error
});

const mapDispatchToProps = dispatch => ({
  updateAgentVerificationData: verificationData =>
    dispatch(updateAgentVerificationDataAsync(verificationData))
});

export default connect(mapStateToProps, mapDispatchToProps)(BrokerageDetails);
