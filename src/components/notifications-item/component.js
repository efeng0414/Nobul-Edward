import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Card, Popover } from "antd";
import { bound } from "class-bind";
import PropTypes from "prop-types";
import { intlShape } from "react-intl";
import { translate } from "../../utilities/locale";
import { getDateOrTime } from "../../../core/utilities/date";
import { UNREAD } from "../../../core/constants/notifications";
import ThreeDots from "../../assets/images/three_dots.svg";
import NotificationsIconType from "../notifications-icon-type";
import "./styles.scss";

class NotificationsItem extends Component {
  state = {
    isPopoverVisible: false
  };

  static propTypes = {
    notification: PropTypes.object,
    notificationReadHandle: PropTypes.func,
    notificationId: PropTypes.string,
    intl: intlShape.isRequired,
    history: PropTypes.object,
    notificationDiscardHandle: PropTypes.func,
    isDropdownItem: PropTypes.bool,
    setDropdownVisible: PropTypes.func,
    currentUserTimezone: PropTypes.string.isRequired
  };

  static defaultProps = {
    notification: {
      from: "",
      action: "",
      object: ""
    },
    notificationReadHandle: () => {},
    notificationId: "",
    history: {},
    notificationDiscardHandle: () => {},
    isDropdownItem: false,
    setDropdownVisible: () => {}
  };

  @bound
  onDiscardClickHandle(e) {
    const {
      setDropdownVisible,
      notificationDiscardHandle,
      notificationId
    } = this.props;

    this.setState({
      isPopoverVisible: false
    });

    setDropdownVisible(false);
    notificationDiscardHandle(notificationId);
  }

  @bound
  notificationClickHandle(e) {
    const {
      setDropdownVisible,
      notificationReadHandle,
      notificationId,
      notification
    } = this.props;

    const { status } = notification;

    setDropdownVisible(false);
    notificationReadHandle(notificationId, status);
  }

  @bound
  onTurnOffHandle(e) {
    const { setDropdownVisible } = this.props;
    setDropdownVisible(false);
    this.setState({
      isPopoverVisible: false
    });
  }

  @bound
  handleVisibleChange(visible) {
    this.setState({
      isPopoverVisible: visible
    });
  }

  render() {
    const { notification, intl, isDropdownItem } = this.props;
    const { status, createdAt, type, urlPath } = notification;
    const localTime = getDateOrTime({
      timestamp: createdAt,
      timezone: this.props.currentUserTimezone
    });
    const { isPopoverVisible } = this.state;

    const content = (
      <div className="popover">
        <div className="popover-hide">
          <p onClick={this.onDiscardClickHandle}>
            {translate(intl, "hideNotification")}
          </p>
        </div>
      </div>
    );

    return (
      <div className="notification">
        {notification && (
          <Card
            hoverable
            className={
              status === UNREAD ? "notification--unread" : "notification--read"
            }
          >
            <div className="notification__card">
              <div
                className={
                  isDropdownItem
                    ? "notification__type--dropdown notification__type"
                    : "notification__type"
                }
              >
                <NotificationsIconType iconType={type} />
              </div>
              <a
                onClick={this.notificationClickHandle}
                href={urlPath}
                className={
                  isDropdownItem
                    ? "notification__content--dropdown notification__content"
                    : "notification__content"
                }
              >
                <div className="notification__text">
                  <p>
                    <b>{this.props.notification.from}</b>
                    <span>{this.props.notification.action}</span>
                    <b>{this.props.notification.object}</b>
                  </p>
                </div>
                {!isDropdownItem && (
                  <div className="notification__time">
                    {localTime && <p>{localTime}</p>}
                  </div>
                )}
              </a>
              {!isDropdownItem && (
                <div className="notification__threedots">
                  <Popover
                    content={content}
                    trigger="click"
                    placement="top"
                    visible={isPopoverVisible}
                    onVisibleChange={this.handleVisibleChange}
                  >
                    <img src={ThreeDots} alt={translate(intl, "more")} />
                  </Popover>
                </div>
              )}
            </div>
          </Card>
        )}
      </div>
    );
  }
}

export default withRouter(NotificationsItem);
