import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Card } from "antd";
import moment from "moment";
import { bound } from "class-bind";
import {
  getStringForStatus,
  getClassNameForStatus
} from "../../utilities/event-status";

import DateBox from "./date-box";
import EventDetails from "./event-details";
import EventMenu from "./event-menu";
import "./styles.scss";
import { convertToTimeZone } from "../../../core/utilities/date";
import { STATUS_DELETED } from "../../../core/constants/events";

class EventListItem extends PureComponent {
  static propTypes = {
    title: PropTypes.string.isRequired,
    startTime: PropTypes.number.isRequired,
    endTime: PropTypes.number.isRequired,
    location: PropTypes.string,
    phoneNumber: PropTypes.string,
    eventId: PropTypes.string.isRequired,
    openEventModal: PropTypes.func.isRequired,
    status: PropTypes.string.isRequired,
    userType: PropTypes.string.isRequired,
    currentUserTimeZone: PropTypes.string.isRequired,
    comment: PropTypes.string.isRequired
  };

  static defaultProps = {
    location: "",
    phone: ""
  };

  @bound
  getReadableTimesFromUTCArray({ timeArray }) {
    const getTimeFromUTCValue = utcValue =>
      convertToTimeZone({
        timestamp: utcValue,
        timezone: this.props.currentUserTimeZone,
        format: "HH:mm"
      });
    return timeArray.map(getTimeFromUTCValue);
  }

  @bound
  handleCardClick() {
    if (this.props.status === STATUS_DELETED) return;
    this.props.openEventModal({
      eventId: this.props.eventId
    });
  }

  render() {
    const readableTimes = this.getReadableTimesFromUTCArray({
      timeArray: [this.props.startTime, this.props.endTime]
    });

    const eventDate = moment(this.props.startTime);

    return (
      <Card className={`event-list-item ${this.props.status}`} bordered={false}>
        <DateBox
          day={eventDate.format("D")}
          month={eventDate.format("MMMM")}
          year={eventDate.year()}
          onClick={this.handleCardClick}
        />
        <EventDetails
          title={this.props.title}
          location={this.props.location}
          phoneNumber={this.props.phoneNumber}
          startTime={readableTimes[0]}
          endTime={readableTimes[1]}
          comment={this.props.comment}
          onClick={this.handleCardClick}
        />
        <EventMenu
          eventId={this.props.eventId}
          statusText={getStringForStatus({
            status: this.props.status,
            userType: this.props.userType
          })}
          statusClassName={getClassNameForStatus({
            status: this.props.status,
            userType: this.props.userType
          })}
        />
      </Card>
    );
  }
}

export default EventListItem;
