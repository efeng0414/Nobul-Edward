import React from "react";
import { Icon } from "antd";
import PropTypes from "prop-types";

const CarouselArrow = ({ direction, onClick }) => {
  return (
    <div className={`arrow ${direction}`} onClick={onClick}>
      <Icon className="arrow-icon" type={`${direction}`} />
    </div>
  );
};

CarouselArrow.propTypes = {
  direction: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default CarouselArrow;
