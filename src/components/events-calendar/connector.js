import { connect } from "react-redux";
import EventsCalendar from "./container";
import { getEventsForConsumerThunk } from "../../../core/thunk/events";

const mapStateToProps = state => ({
  currentUser: state.authentication.currentUser,
  events: state.events.list,
  eventsIsLoading: state.events.isLoading
});

const mapDispatchToProps = dispatch => ({
  getEventsForConsumer: ({ consumerId }) =>
    dispatch(getEventsForConsumerThunk({ consumerId }))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventsCalendar);
