import { connect } from "react-redux";
import RescheduleForm from "./component";

const mapStateToProps = state => ({
  eventId: state.anonymousEventListeners.eventConfirmationModal.toString(),
  currentConsumerId: state.authentication.currentUser.uid
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RescheduleForm);
