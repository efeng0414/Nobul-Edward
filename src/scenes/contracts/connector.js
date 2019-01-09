import { connect } from "react-redux";
import Contracts from "./container";
import { withRouter } from "react-router";
import { getUsersAgreementStatusesAsync } from "../../../core/thunk/authentication";
import { viewAgreementAsync } from "../../../core/thunk/agreements";

const mapStateToProps = state => ({
  currentUser: state.authentication.currentUser,
  userProfile: state.authentication.profile,
  userType: state.authentication.userType,
  agreements: state.authentication.requestedAgreements || {},
  agreementURL: state.agreements.pdfUrl,
  agreementIsLoading: state.agreements.isLoading,
  isLoading:
    state.authentication.currentUser &&
    state.authentication.currentUser.isLoading
});

const mapDispatchToProps = dispatch => ({
  getUsersAgreementStatusesAsync: ({ userId, userType }) =>
    dispatch(
      getUsersAgreementStatusesAsync({
        userId,
        userType
      })
    ),
  viewAgreementAsync: ({ agreementData }) =>
    dispatch(viewAgreementAsync({ agreementData }))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Contracts));
