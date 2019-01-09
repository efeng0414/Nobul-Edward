import { connect } from "react-redux";
import ConsumerRegistration from "./container";
import { clearCachedData } from "../../utilities/cache-handler";
import { saveJob } from "../../../core/thunk/jobs";
import {
  signUpUserAsync,
  resendVerificationEmail,
  clearResendVerificationEmailSuccessStatus,
  reloadUserAsync
} from "../../../core/thunk/authentication";

const mapStateToProps = state => ({
  userType: state.authentication.userType,
  error: state.authentication.error,
  jobs: state.jobs,
  currentUser: state.authentication.currentUser,
  verificationEmailResent: state.authentication.verificationEmailResent,
  isEmailVerified: state.authentication.isEmailVerified,
  isFirstTimeRegistration: state.authentication.isFirstTimeRegistration
});

const mapDispatchToProps = dispatch => ({
  signUpUser: ({ postData, userType }) => {
    dispatch(
      signUpUserAsync({
        postData,
        type: userType,
        preSignOutFunction: clearCachedData
      })
    );
  },
  resendEmailVerification: () => {
    dispatch(resendVerificationEmail());
  },
  clearResendVerificationStatus: () => {
    dispatch(clearResendVerificationEmailSuccessStatus());
  },
  reloadUser: () => dispatch(reloadUserAsync()),
  saveJob: (jobType, job) => dispatch(saveJob(jobType, job, true))
});

export default connect(mapStateToProps, mapDispatchToProps)(
  ConsumerRegistration
);
