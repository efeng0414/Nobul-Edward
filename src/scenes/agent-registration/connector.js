import { connect } from "react-redux";
import AgentRegistration from "./container";

import {
  signUpUserAsync,
  resendVerificationEmail,
  clearResendVerificationEmailSuccessStatus,
  reloadUserAsync
} from "../../../core/thunk/authentication";

import { clearCachedData } from "../../utilities/cache-handler";

const mapStateToProps = state => ({
  verification: state.authentication.verification,
  currentUser: state.authentication.currentUser,
  isLoading: state.authentication.currentUser
    ? state.authentication.currentUser.isLoading
    : false,
  error: state.authentication.error,
  userType: state.authentication.userType,
  verificationEmailResent: state.authentication.verificationEmailResent,
  isEmailVerified: state.authentication.isEmailVerified,
  isFirstTimeRegistration: state.authentication.isFirstTimeRegistration
});

const mapDispatchToProps = dispatch => ({
  signUpUser: (postData, userType, agentData) =>
    dispatch(
      signUpUserAsync({
        postData,
        type: userType,
        agentData,
        preSignOutFunction: clearCachedData
      })
    ),
  resendEmailVerification: () => {
    dispatch(resendVerificationEmail());
  },
  clearResendVerificationStatus: () => {
    dispatch(clearResendVerificationEmailSuccessStatus());
  },
  reloadUser: () => dispatch(reloadUserAsync())
});

export default connect(mapStateToProps, mapDispatchToProps)(AgentRegistration);
