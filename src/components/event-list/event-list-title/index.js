import React from "react";
import PropTypes from "prop-types";

const EventListTitle = ({ title, eventCount, condition }) =>
  condition && <h6>{`${title} (${eventCount})`}</h6>;

EventListTitle.propTypes = {
  title: PropTypes.string.isRequired,
  eventCount: PropTypes.number.isRequired,
  condition: PropTypes.bool
};

EventListTitle.defaultProps = {
  condition: true
};

export default EventListTitle;
