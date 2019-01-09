import { connect } from "react-redux";
import Notifications from "./container";
import {
  readNotificationAsync,
  discardNotificationAsync
} from "../../../core/thunk/notifications";

const mapStateToProps = state => ({
  notifications: state.notifications.notifications.sortedNotifications,
  currentUser: state.authentication.currentUser,
  isNotificationLoading: state.notifications.isLoading,
  userType: state.authentication.userType || ""
});

const mapDispatchToProps = dispatch => ({
  readNotificationAsync: (userId, notificationId) =>
    dispatch(readNotificationAsync(userId, notificationId)),
  discardNotificationAsync: (userId, notificationId) =>
    dispatch(discardNotificationAsync(userId, notificationId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
