import { connect } from "react-redux";
import ViewAgreement from "./container";
import { agreementGetAsync } from "../../../core/thunk/agreements";

const mapStateToProps = state => ({
  currentUser: state.authentication.currentUser,
  agreement: state.agreements.currentAgreement
});

const mapDispatchToProps = dispatch => ({
  getAgreementData: (agreementType, agreementId) =>
    dispatch(agreementGetAsync(agreementType, agreementId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewAgreement);
