import React from "react";
import PropTypes from "prop-types";
import MapPin from "react-icons/lib/md/place";
import CalendarIcon from "react-icons/lib/fa/calendar-o";
import PhoneIcon from "react-icons/lib/fa/phone";
import CommentIcon from "react-icons/lib/fa/comment-o";
import DetailsRow from "./details-row";

const EventDetails = ({ location, phoneNumber, date, comment }) => (
  <div className="event-details">
    {location && <DetailsRow renderIcon={() => <MapPin />} text={location} />}
    <DetailsRow renderIcon={() => <PhoneIcon />} text={phoneNumber} />
    <DetailsRow renderIcon={() => <CalendarIcon />} text={date} />
    <DetailsRow renderIcon={() => <CommentIcon />} text={comment} />
  </div>
);

EventDetails.propTypes = {
  phoneNumber: PropTypes.string,
  location: PropTypes.string,
  date: PropTypes.string.isRequired,
  comment: PropTypes.string.isRequired
};

EventDetails.defaultProps = {
  location: "",
  phoneNumber: ""
};

export default EventDetails;
