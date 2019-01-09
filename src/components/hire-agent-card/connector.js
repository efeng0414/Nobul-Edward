import { connect } from "react-redux";
import HireAgentCard from "./component";
import { triggerLoginAsync } from "../../../core/thunk/anonymousEventListeners";

const mapStateToProps = state => ({
  currentUserId: state.authentication.currentUser.uid,
  userType: state.authentication.userType
});

const mapDispatchToProps = dispatch => ({
  triggerLoginModal: () => dispatch(triggerLoginAsync({ trigger: true }))
});

export default connect(mapStateToProps, mapDispatchToProps)(HireAgentCard);
