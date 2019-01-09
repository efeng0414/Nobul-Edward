import { connect } from "react-redux";
import TopMenu from "./component";
import { BUSINESS_PROFILE_CREATED } from "../../../../core/api-transform/users";
import { openHowItWorksModal } from "../../../../core/actions/anonymousEventListeners";
import { AGENT_USER_TYPE } from "../../../../core/constants/users";

const mapStateToProps = state => ({
  businessProfileCreated: state.authentication[BUSINESS_PROFILE_CREATED],
  isAgent: state.authentication.userType === AGENT_USER_TYPE
});

const mapDispatchToProps = dispatch => ({
  openHowItWorksModal: () => dispatch(openHowItWorksModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(TopMenu);
