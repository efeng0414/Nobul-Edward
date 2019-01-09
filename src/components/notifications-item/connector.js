import { connect } from "react-redux";
import NotificationsItem from "./component";

const mapStateToProps = state => ({
  currentUserTimezone: state.authentication.timezone
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationsItem);
