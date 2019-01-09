import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import NotificationsItem from "../notifications-item";
import { VISIBLE_TO_USER } from "../../../core/api-transform/notifications";

import "./styles.scss";
import { bound } from "class-bind";

class NotificationsList extends PureComponent {
  static propTypes = {
    notifications: PropTypes.array,
    notificationReadHandle: PropTypes.func,
    intl: PropTypes.any.isRequired,
    notificationDiscardHandle: PropTypes.func
  };

  static defaultProps = {
    notifications: [],
    notificationReadHandle: () => {},
    notificationDiscardHandle: () => {}
  };

  @bound
  renderNotification(notification) {
    const shouldUserSeeNotification = Object.values(notification)[0][
      VISIBLE_TO_USER
    ];

    return (
      [true, undefined].includes(shouldUserSeeNotification) && (
        <NotificationsItem
          key={Object.keys(notification)[0]}
          notification={Object.values(notification)[0]}
          notificationId={Object.keys(notification)[0]}
          notificationReadHandle={this.props.notificationReadHandle}
          notificationDiscardHandle={this.props.notificationDiscardHandle}
          intl={this.props.intl}
        />
      )
    );
  }

  render() {
    const { notifications } = this.props;

    return (
      <div className="notifications">
        {notifications.map(this.renderNotification)}
      </div>
    );
  }
}

export default NotificationsList;
