import React from "react";
import PropTypes from "prop-types";
import { Icon } from "antd";

const CarouselArrow = ({ direction, onClick }) => (
  <div className={`arrow ${direction}`} onClick={onClick}>
    <Icon className="arrow-icon" type={`${direction}`} />
  </div>
);

CarouselArrow.propTypes = {
  direction: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default CarouselArrow;
