import { connect } from "react-redux";
import { closeEventConfirmationModalAsync } from "../../../core/thunk/anonymousEventListeners";
import {
  getEventThunk,
  acceptEventInviteThunk
} from "../../../core/thunk/events";
import ViewEventModal from "./component";

const mapStateToProps = state => ({
  isOpen: !!state.anonymousEventListeners.eventConfirmationModal,
  eventId: state.anonymousEventListeners.eventConfirmationModal.toString(),
  event: state.events.list,
  isEventLoading: state.events.isLoading,
  currentUserId: state.authentication.currentUser.uid,
  currentUserTimeZone: state.authentication.timezone
});

const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch(closeEventConfirmationModalAsync()),
  getEvent: ({ eventId }) => dispatch(getEventThunk({ eventId })),
  acceptEventInvite: ({ eventId }) =>
    dispatch(acceptEventInviteThunk({ eventId }))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewEventModal);
