import React from "react";
import PropTypes from "prop-types";
import { HOME_CHECK } from "../../utilities/images";

export const BoxIcon = ({ iconSrc, hoverIconSrc }) => (
  <div className="box-icon-home">
    <img src={iconSrc} className="primary-icon" />
    <img src={hoverIconSrc} className="hover-icon" />
    <img src={HOME_CHECK} className="check-icon" />
  </div>
);

BoxIcon.propTypes = {
  iconSrc: PropTypes.string.isRequired,
  hoverIconSrc: PropTypes.string,
  getStarted: PropTypes.bool
};

export default BoxIcon;
