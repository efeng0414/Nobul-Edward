import React from "react";
import PropTypes from "prop-types";

import "./styles.scss";

const Background = ({ children, image, className, tint }) => {
  const linearGradient = tint
    ? `linear-gradient(
    ${tint},
    ${tint}
  ),`
    : "";

  const styleImage = image && {
    backgroundColor: linearGradient,
    backgroundImage: `url(${image})`
  };

  return (
    <div className={`background ${className}`} style={styleImage}>
      <div className="background-content">{children}</div>
    </div>
  );
};

Background.propTypes = {
  image: PropTypes.string,
  children: PropTypes.any,
  className: PropTypes.string,
  tint: PropTypes.string
};

Background.defaultProps = {
  image: "",
  className: "",
  tint: ""
};

export default Background;
