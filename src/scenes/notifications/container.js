import React, { Component } from "react";
import ActivityIndicator from "../../components/activity-indicator";
import { injectIntl } from "react-intl";
import { translate } from "../../utilities/locale";
import PropTypes from "prop-types";
import { bound } from "class-bind";
import {
  UNREAD,
  SUBMITTED_PROPOSAL
} from "../../../core/constants/notifications";
import NotificationsList from "../../components/notifications-list";
import NotificationsDropdown from "../../components/notifications-dropdown";
import MyDashboardMeta from "../../components/my-dashboard-meta";
import {
  isVisible,
  isUnreadAndVisible
} from "../../../core/utilities/notifications";
import { url } from "../../routes/myNobul";
import "./styles.scss";

class Notifications extends Component {
  state = {
    notifications: [],
    latestNotifications: [],
    totalAmountOfNotifications: 0,
    isStatusUpdated: false,
    hasNewNotifications: false
  };

  static propTypes = {
    intl: PropTypes.any,
    notifications: PropTypes.array,
    readNotificationAsync: PropTypes.func,
    currentUser: PropTypes.object,
    discardNotificationAsync: PropTypes.func,
    isDropdown: PropTypes.bool,
    isNotificationLoading: PropTypes.bool,
    userType: PropTypes.string.isRequired,
    hideMenu: PropTypes.func
  };

  static defaultProps = {
    notifications: [],
    currentUser: {},
    readNotificationAsync: () => {},
    discardNotificationAsync: () => {},
    isDropdown: false,
    isNotificationLoading: false,
    hideMenu: () => {}
  };

  @bound
  notificationReadHandle(notificationId, status) {
    const { readNotificationAsync, currentUser } = this.props;
    const { uid } = currentUser;

    if (status === UNREAD) {
      readNotificationAsync(uid, notificationId);

      this.setState({
        isStatusUpdated: true
      });
    }
  }

  @bound
  notificationDiscardHandle(notificationId) {
    const { discardNotificationAsync, currentUser } = this.props;
    const { uid } = currentUser;

    discardNotificationAsync(uid, notificationId);

    this.setState({
      isStatusUpdated: true
    });
  }

  @bound
  reorganizeNotifications({ notifications, maxDropdownNotifications }) {
    const postHashMap = {};
    const organizedNotifications = [];

    for (let i = 0; i < notifications.length; i++) {
      const notification = Object.values(notifications[i])[0];
      const notificationId = Object.keys(notifications[i])[0];
      if (!notification.visibleToUser) continue;
      if (notification.action === SUBMITTED_PROPOSAL) {
        if (postHashMap.hasOwnProperty(notification.object)) {
          const postValue = postHashMap[notification.object];
          postValue.count++;

          if (notification.updatedAt > postValue.updatedAt) {
            const count = postValue.count;
            postHashMap[notification.object] = { ...notification };
            postHashMap[notification.object].count = count;
            postHashMap[notification.object].notificationId = notificationId;
          }
        } else {
          postHashMap[notification.object] = { ...notification };
          postHashMap[notification.object].count = 1;
          postHashMap[notification.object].notificationId = notificationId;
        }
      } else {
        notification.notificationId = notificationId;
        const copyNotification = { ...notification };
        organizedNotifications.push(copyNotification);
      }
    }

    for (let key in postHashMap) {
      const postValue = postHashMap[key];

      if (postValue.count > 1) {
        const agentFrom = postHashMap[key].from;
        let indexOfBrokerage = agentFrom.indexOf("from ");
        if (indexOfBrokerage > -1) {
          indexOfBrokerage += 5;
          const brokerage = agentFrom.substring(indexOfBrokerage);
          const from = translate(this.props.intl, "agentSubmittedProposal", {
            Brokerage: brokerage
          });
          const action = translate(this.props.intl, "moreAgentHaveProposal", {
            X: postValue.count
          });
          postValue.from = from;
          postValue.action = action;
          postValue.urlPath = url.notifications;
        }
      }

      organizedNotifications.push(postHashMap[key]);
    }

    organizedNotifications.sort((a, b) => {
      return b.updatedAt - a.updatedAt;
    });

    const topNotifications =
      organizedNotifications.length > maxDropdownNotifications
        ? organizedNotifications.slice(0, maxDropdownNotifications)
        : organizedNotifications;

    const unreadNotifications = [];
    const readNotifications = [];

    for (let i = 0; i < topNotifications.length; i++) {
      if (topNotifications[i].status === UNREAD) {
        unreadNotifications.push({
          [topNotifications[i].notificationId]: topNotifications[i]
        });
      } else {
        readNotifications.push({
          [topNotifications[i].notificationId]: topNotifications[i]
        });
      }
    }

    const sortedNotifications = unreadNotifications.concat(readNotifications);

    return sortedNotifications;
  }

  @bound
  latestNotifications({ notifications }) {
    const maxDropdownNotifications = 5;

    return this.reorganizeNotifications({
      notifications,
      maxDropdownNotifications
    });
  }

  componentDidMount() {
    const { notifications } = this.props;
    const latestNotifications = this.latestNotifications({ notifications });
    const totalAmountOfNotifications =
      notifications.length > 0 ? notifications.filter(isVisible).length : 0;

    const hasNewNotifications =
      notifications.length > 0 &&
      notifications.filter(isUnreadAndVisible).length;

    this.setState({
      notifications,
      latestNotifications,
      totalAmountOfNotifications,
      hasNewNotifications
    });
  }

  componentDidUpdate(prevProps, prevStates) {
    const { notifications } = this.props;
    if (
      prevProps.notifications.length === notifications.length &&
      prevStates.isStatusUpdated === this.state.isStatusUpdated
    ) {
      return;
    }

    const latestNotifications = this.latestNotifications({ notifications });
    const totalAmountOfNotifications = notifications.length
      ? notifications.filter(isVisible).length
      : 0;

    const hasNewNotifications =
      notifications.length && notifications.filter(isUnreadAndVisible).length;

    this.setState({
      notifications,
      latestNotifications,
      totalAmountOfNotifications,
      isStatusUpdated: false,
      hasNewNotifications
    });
  }

  render() {
    const { intl } = this.props;

    return (
      <ActivityIndicator
        spinning={this.props.isNotificationLoading}
        type="loading"
      >
        {this.props.isDropdown ? (
          <NotificationsDropdown
            userType={this.props.userType}
            intl={intl}
            latestNotifications={this.state.latestNotifications}
            notificationReadHandle={this.notificationReadHandle}
            notificationDiscardHandle={this.notificationDiscardHandle}
            totalAmountOfNotifications={this.state.totalAmountOfNotifications}
            hasNewNotifications={this.state.hasNewNotifications}
            className="notifications-dropdown-container"
            hideMenu={this.props.hideMenu}
          />
        ) : (
          <div className="notification-list">
            <MyDashboardMeta titleKey="helmet.myDashboard.activities" />
            <h2>
              <span className="notification-text">
                {translate(intl, "allNotifications")}
              </span>
              <span className="notification-amount">
                ({this.state.totalAmountOfNotifications})
              </span>
            </h2>
            <NotificationsList
              intl={intl}
              notifications={this.state.notifications}
              notificationReadHandle={this.notificationReadHandle}
              notificationDiscardHandle={this.notificationDiscardHandle}
            />
          </div>
        )}
      </ActivityIndicator>
    );
  }
}

export default injectIntl(Notifications);
