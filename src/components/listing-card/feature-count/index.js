import React from "react";
import PropTypes from "prop-types";
import {
  BATHROOM_BLACK_ICON,
  BEDROOM_BLACK_ICON,
  BATHROOM_GREY_ICON,
  BEDROOM_GREY_ICON
} from "../../../utilities/images";

const FeatureCount = ({ bedrooms, bathrooms, iconColorGrey }) => (
  <div className="features">
    {bedrooms !== false && (
      <span className="features-icon bedroom">
        <img src={iconColorGrey ? BEDROOM_GREY_ICON : BEDROOM_BLACK_ICON} />
        <span className="number">{bedrooms || "N/A"}</span>
      </span>
    )}
    {bathrooms !== false && (
      <span className="features-icon">
        <img src={iconColorGrey ? BATHROOM_GREY_ICON : BATHROOM_BLACK_ICON} />
        <span className="number">{bathrooms || "N/A"}</span>
      </span>
    )}
  </div>
);

FeatureCount.propTypes = {
  bedrooms: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  bathrooms: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  iconColorGrey: PropTypes.bool
};

FeatureCount.defaultProps = {
  iconColorGrey: false
};

export default FeatureCount;
