import React, { Component } from "react";
import { Menu, Dropdown } from "antd";
import { withRouter } from "react-router-dom";
import { injectIntl } from "react-intl";
import PropTypes from "prop-types";
import { bound } from "class-bind";
import { Link } from "react-router-dom";
import { translate } from "../../utilities/locale";
import IconBell from "react-icons/lib/fa/bell";
import { NOTIFICATIONS, SEE_ALL } from "../../../core/constants/notifications";
import { url } from "../../routes/myNobul";
import NotificationsItem from "../../components/notifications-item";
import { CONSUMER_USER_TYPE } from "../../../core/constants/users";
import { gtmEvent } from "../../utilities/gtm-event";
import {
  CONSUMER_VIEW_NOTIFICATIONS,
  AGENT_VIEW_NOTIFICATIONS
} from "../../utilities/google-tag-variable";
import { VISIBLE_TO_USER } from "../../../core/api-transform/notifications";
import "./styles.scss";

class NotificationsDropdown extends Component {
  state = {
    isDropdownVisible: false
  };
  static propTypes = {
    intl: PropTypes.any,
    latestNotifications: PropTypes.array.isRequired,
    notificationReadHandle: PropTypes.func,
    notificationDiscardHandle: PropTypes.func,
    history: PropTypes.object,
    totalAmountOfNotifications: PropTypes.number,
    hasNewNotifications: PropTypes.any.isRequired,
    userType: PropTypes.string.isRequired,
    hideMenu: PropTypes.func.isRequired
  };

  static defaultProps = {
    notificationReadHandle: () => {},
    notificationDiscardHandle: () => {},
    history: {},
    totalAmountOfNotifications: 0
  };

  @bound
  renderNotification(latestNotification) {
    const shouldUserSeeNotification = Object.values(latestNotification)[0][
      VISIBLE_TO_USER
    ];

    return (
      [true, undefined].includes(shouldUserSeeNotification) &&
      this.renderMenuItem({ latestNotification })
    );
  }

  @bound
  renderMenu({ intl, latestNotifications, totalAmountOfNotifications }) {
    const maxDropdownNotifications = 5;

    return (
      <Menu onClick={this.menuClickHandle} className="notifications-dropdown">
        <Menu.Item key={NOTIFICATIONS} className="dropdown-title">
          <span className="dropdown-title-text">
            {translate(intl, "notificationsTitle")}
          </span>
          <span className="dropdown-title-number">
            {totalAmountOfNotifications}
          </span>
        </Menu.Item>
        {latestNotifications.map(this.renderNotification)}
        {totalAmountOfNotifications > maxDropdownNotifications && (
          <Menu.Item key={SEE_ALL} className="dropdown-all">
            <Link to={`${url.notifications}`}>
              <span>{translate(intl, "notifications.viewAll")}</span>
            </Link>
          </Menu.Item>
        )}
      </Menu>
    );
  }

  @bound
  renderMenuItem({ latestNotification }) {
    const {
      intl,
      notificationReadHandle,
      notificationDiscardHandle
    } = this.props;

    return (
      <Menu.Item key={Object.keys(latestNotification)[0]}>
        <NotificationsItem
          notification={Object.values(latestNotification)[0]}
          notificationId={Object.keys(latestNotification)[0]}
          notificationReadHandle={notificationReadHandle}
          notificationDiscardHandle={notificationDiscardHandle}
          intl={intl}
          isDropdownItem
          setDropdownVisible={this.dropdownVisibleHandle}
        />
      </Menu.Item>
    );
  }

  @bound
  dropdownVisibleHandle(isDropdownVisible) {
    this.setState({ isDropdownVisible });
    isDropdownVisible &&
      gtmEvent({
        name:
          this.props.userType === CONSUMER_USER_TYPE
            ? CONSUMER_VIEW_NOTIFICATIONS
            : AGENT_VIEW_NOTIFICATIONS
      });
  }

  @bound
  menuClickHandle(e) {
    e.key === SEE_ALL && this.dropdownVisibleHandle(false);
  }

  render() {
    const {
      intl,
      latestNotifications,
      totalAmountOfNotifications
    } = this.props;

    const { isDropdownVisible } = this.state;
    return (
      <div className="notifications-container">
        <div id="notifications" className="notifications-container-dropdown" />
        <Dropdown
          className="user-header-register"
          overlay={this.renderMenu({
            intl,
            latestNotifications,
            totalAmountOfNotifications
          })}
          placement="bottomCenter"
          onVisibleChange={this.dropdownVisibleHandle}
          visible={isDropdownVisible}
          onClick={this.props.hideMenu}
          trigger={["click"]}
          getPopupContainer={() => document.getElementById("notifications")}
        >
          <div>
            <IconBell size={25} className="notifications__icons" />
            {this.props.hasNewNotifications && <span className="badge" />}
          </div>
        </Dropdown>
      </div>
    );
  }
}

export default injectIntl(withRouter(NotificationsDropdown));
