import React from "react";
import PropTypes from "prop-types";

const DateBox = ({ day, month, year, onClick }) => (
  <div className="date-box" onClick={onClick}>
    <h2>{day}</h2>
    <p>{`${month} ${year}`}</p>
  </div>
);

DateBox.propTypes = {
  day: PropTypes.string.isRequired,
  month: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired
};

export default DateBox;
