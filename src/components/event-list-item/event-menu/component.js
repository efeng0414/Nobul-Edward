import React, { Component } from "react";
import PropTypes from "prop-types";
import { Dropdown, Modal } from "antd";
import MenuIcon from "react-icons/lib/fa/ellipsis-v";
import { bound } from "class-bind";
import { injectIntl, intlShape } from "react-intl";
import { translate } from "../../../utilities/locale";
import MenuList from "./menu-list";
import CancelEventIcon from "react-icons/lib/fa/calendar-times-o";
import TrashIcon from "react-icons/lib/fa/trash-o";

import "./styles.scss";
const { confirm } = Modal;

@injectIntl
class EventMenu extends Component {
  static propTypes = {
    deleteEvent: PropTypes.func.isRequired,
    setEventInvisible: PropTypes.func.isRequired,
    eventId: PropTypes.string.isRequired,
    currentUser: PropTypes.object.isRequired,
    getEventsForUser: PropTypes.func.isRequired,
    currentUserType: PropTypes.string.isRequired,
    intl: intlShape.isRequired,
    statusText: PropTypes.string.isRequired,
    statusClassName: PropTypes.string.isRequired
  };

  state = {
    isOpen: false
  };

  @bound
  handleDeleteClick() {
    confirm({
      title: translate(this.props.intl, "myEvents.confirmDelete"),
      okText: translate(this.props.intl, "consumer.yes"),
      okType: "danger",
      cancelText: translate(this.props.intl, "consumer.no"),
      className: "event-delete-confirm",
      onOk: () => {
        this.props.deleteEvent({ eventId: this.props.eventId }).then(() => {
          this.props.getEventsForUser({
            userId: this.props.currentUser.uid,
            userType: this.props.currentUserType
          });
        });
      }
    });
  }

  @bound
  handleHideEventItem() {
    confirm({
      title: translate(this.props.intl, "myEvents.confirmHiding"),
      okText: translate(this.props.intl, "consumer.yes"),
      okType: "danger",
      cancelText: translate(this.props.intl, "consumer.no"),
      className: "event-delete-confirm",
      onOk: () => {
        this.props
          .setEventInvisible({
            eventId: this.props.eventId,
            userType: this.props.currentUserType
          })
          .then(() => {
            this.props.getEventsForUser({
              userId: this.props.currentUser.uid,
              userType: this.props.currentUserType
            });
          });
      }
    });
  }

  render() {
    return (
      <div className="event-menu-container">
        <div>
          <div className={`event-status ${this.props.statusClassName}`}>
            {this.props.statusText}
          </div>
          {this.props.statusText === "Cancelled" && (
            <button onClick={this.handleHideEventItem}>
              <TrashIcon />
            </button>
          )}
          {this.props.statusText !== "Cancelled" &&
            this.props.statusText !== "Accepted" && (
              <button onClick={this.handleDeleteClick}>
                <CancelEventIcon />
              </button>
            )}
        </div>
      </div>
    );
  }
}

export default EventMenu;
