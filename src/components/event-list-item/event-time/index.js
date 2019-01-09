import React from "react";
import PropTypes from "prop-types";
import ClockIcon from "react-icons/lib/fa/clock-o";

const EventTime = ({ startTime, endTime }) => (
  <div className="event-details-item">
    <ClockIcon />
    <span className="item-value">{`${startTime} - ${endTime}`}</span>
  </div>
);

EventTime.propTypes = {
  startTime: PropTypes.string.isRequired,
  endTime: PropTypes.string.isRequired
};

export default EventTime;
