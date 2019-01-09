import { connect } from "react-redux";
import CalendarItem from "./component";
import { openEventConfirmationModalAsync } from "../../../../core/thunk/anonymousEventListeners";

const mapStateToProps = state => ({
  userType: state.authentication.userType
});

const mapDispatchToProps = dispatch => ({
  openEventConfirmationModal: ({ eventId }) =>
    dispatch(openEventConfirmationModalAsync({ eventId }))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CalendarItem);
