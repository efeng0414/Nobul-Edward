import { connect } from "react-redux";
import Header from "./component";
import { triggerLoginAsync } from "../../../core/thunk/anonymousEventListeners";
import { AGENT_USER_TYPE } from "../../../core/constants/users";

const mapStateToProps = state => ({
  loginTrigger: state.anonymousEventListeners.loginTrigger,
  currentUser: state.authentication.currentUser,
  isUserLoading: state.authentication.isLoading,
  currentBreakPoint: state.breakpoints.currentBreakPoint,
  isAgent: state.authentication.userType === AGENT_USER_TYPE
});

const mapDispatchToProps = dispatch => ({
  triggerLogin: ({ trigger }) => dispatch(triggerLoginAsync({ trigger }))
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
