import { connect } from "react-redux";
import EventList from "./container";

const mapStateToProps = state => ({
  events: state.events.list,
  currentUser: state.authentication.currentUser,
  eventsIsLoading: state.events.isLoading
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(EventList);
