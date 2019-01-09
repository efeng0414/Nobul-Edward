import React from "react";
import PropTypes from "prop-types";

const DetailsRow = ({ renderIcon, text }) => (
  <div className="details-row">
    <div className="icon">{renderIcon()}</div>
    <div className="info">
      <p>{text}</p>
    </div>
  </div>
);

DetailsRow.propTypes = {
  renderIcon: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired
};

export default DetailsRow;
