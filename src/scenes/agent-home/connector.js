import { connect } from "react-redux";
import AgentHome from "./container";
import { BUSINESS_PROFILE_CREATED } from "../../../core/api-transform/users";
import { AGENT_USER_TYPE } from "../../../core/constants/users";
import { triggerLoginAsync } from "../../../core/thunk/anonymousEventListeners";
import { checkLicenceData } from "../../utilities/check-licence-data";

const mapStateToProps = state => ({
  currentUserId: state.authentication.currentUser.uid,
  isAgent: state.authentication.userType === AGENT_USER_TYPE,
  businessProfileCreated: !!state.authentication[BUSINESS_PROFILE_CREATED],
  hasLicenceData: checkLicenceData({
    verification: state.authentication.verification
  })
});

const mapDispatchToProps = dispatch => ({
  promptLogin: () => dispatch(triggerLoginAsync({ trigger: true }))
});

export default connect(mapStateToProps, mapDispatchToProps)(AgentHome);
