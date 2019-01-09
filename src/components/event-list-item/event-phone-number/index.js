import React from "react";
import PropTypes from "prop-types";
import PhoneIcon from "react-icons/lib/fa/phone";

const EventPhoneNumber = ({ phoneNumber }) => (
  <div className="event-details-item">
    <PhoneIcon />
    <span className="item-value">{phoneNumber}</span>
  </div>
);

EventPhoneNumber.propTypes = {
  phoneNumber: PropTypes.string.isRequired
};

export default EventPhoneNumber;
