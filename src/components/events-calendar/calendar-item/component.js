import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { bound } from "class-bind";
import {
  STATUS_AGENT_HAS_PROPOSED,
  STATUS_DELETED
} from "../../../../core/constants/events";
import { getClassNameForStatus } from "../../../utilities/event-status";

class CalendarItem extends PureComponent {
  static propTypes = {
    title: PropTypes.string.isRequired,
    eventId: PropTypes.string.isRequired,
    openEventConfirmationModal: PropTypes.func.isRequired,
    eventStatus: PropTypes.string.isRequired,
    userType: PropTypes.string.isRequired
  };

  doesRequireAttention = this.props.eventStatus === STATUS_AGENT_HAS_PROPOSED;

  @bound
  onCalendarItemClick() {
    if (this.props.eventStatus === STATUS_DELETED) return;
    this.props.openEventConfirmationModal({ eventId: this.props.eventId });
  }

  render() {
    const statusClass = getClassNameForStatus({
      status: this.props.eventStatus,
      userType: this.props.userType
    });

    return (
      <p
        className={`calendar-item ${statusClass}`}
        onClick={this.onCalendarItemClick}
      >
        {this.props.title}
      </p>
    );
  }
}

export default CalendarItem;
