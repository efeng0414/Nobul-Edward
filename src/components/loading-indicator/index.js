import React from "react";
import PropTypes from "prop-types";
import "./styles.scss";
import { NOBUL_LOGO } from "../../utilities/images";
import { translate } from "../../utilities/locale";
import { intlShape } from "react-intl";

//TO-DO: Replace the Nobul Logo with the actual loader once the UI is complete

const LoadingIndicator = ({ animate, intl }) => {
  return (
    <div
      animate={animate}
      className="spinner-container"
      style={{ display: animate ? "inherit" : "none" }}
    >
      <div
        className="spinner-image"
        style={{ animationName: animate ? "animating" : "" }}
      >
        <img src={NOBUL_LOGO} alt={translate(intl, "nobul")} />
      </div>
    </div>
  );
};

LoadingIndicator.defaultProps = {
  animate: false
};

LoadingIndicator.PropTypes = {
  animate: PropTypes.bool,
  intl: intlShape.isRequired
};

export default LoadingIndicator;
