import { connect } from "react-redux";
import ConsumerHome from "./container";
import { triggerLoginAsync } from "../../../core/thunk/anonymousEventListeners";

const mapStateToProps = state => ({
  currentUserId: state.authentication.currentUser.uid
});

const mapDispatchToProps = dispatch => ({
  promptLogin: () => dispatch(triggerLoginAsync({ trigger: true }))
});

export default connect(mapStateToProps, mapDispatchToProps)(ConsumerHome);
