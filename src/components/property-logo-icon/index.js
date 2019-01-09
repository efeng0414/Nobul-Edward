import React from "react";
import { PropTypes } from "prop-types";

import "./styles.scss";

const PropertyLogoIcon = props => {
  return (
    <div className="property-logo__container">
      <img src={props.iconSrc} className="property-logo" />
      {props.labelKeyForProvinceOrState && (
        <div
          className={`property-logo__local-icon property-logo__local-icon--${
            props.labelKeyForProvinceOrState
          }`}
        />
      )}
    </div>
  );
};

PropertyLogoIcon.propTypes = {
  iconSrc: PropTypes.string,
  labelKeyForProvinceOrState: PropTypes.string
};

export default PropertyLogoIcon;
