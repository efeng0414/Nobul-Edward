import { connect } from "react-redux";
import EventListItem from "./component";
import { openEventConfirmationModalAsync } from "../../../core/thunk/anonymousEventListeners";

const mapStateToProps = state => ({
  userType: state.authentication.userType,
  currentUserTimeZone: state.authentication.timezone
});

const mapDispatchToProps = dispatch => ({
  openEventModal: ({ eventId }) =>
    dispatch(openEventConfirmationModalAsync({ eventId }))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventListItem);
