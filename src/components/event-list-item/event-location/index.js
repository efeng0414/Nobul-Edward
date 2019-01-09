import React from "react";
import PropTypes from "prop-types";
import LocationPinIcon from "react-icons/lib/md/location-on";

const EventLocation = ({ location }) => (
  <div className="event-details-item event-details-item--location">
    <LocationPinIcon />
    <span className="item-value item-value--location">{location}</span>
  </div>
);

EventLocation.propTypes = {
  location: PropTypes.string.isRequired
};

export default EventLocation;
