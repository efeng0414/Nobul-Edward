import React from "react";
import PropTypes from "prop-types";

import EventTime from "../event-time";
import EventLocation from "../event-location";
import EventPhoneNumber from "../event-phone-number";
import EventComment from "../event-comment";

const EventDetails = ({
  title,
  startTime,
  endTime,
  location,
  phoneNumber,
  comment,
  onClick
}) => (
  <div className="event-details" onClick={onClick}>
    <h5>{title}</h5>
    <EventTime startTime={startTime} endTime={endTime} />
    {location && <EventLocation location={location} />}
    {phoneNumber && <EventPhoneNumber phoneNumber={phoneNumber} />}
    {comment && <EventComment comment={comment} />}
  </div>
);

EventDetails.propTypes = {
  title: PropTypes.string.isRequired,
  startTime: PropTypes.string.isRequired,
  endTime: PropTypes.string.isRequired,
  location: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  phoneNumber: PropTypes.string,
  comment: PropTypes.string.isRequired
};

EventDetails.defaultProps = {
  location: "",
  phoneNumber: ""
};

export default EventDetails;
