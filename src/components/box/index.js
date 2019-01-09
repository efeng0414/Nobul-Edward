import React from "react";
import PropTypes from "prop-types";

import "./styles.scss";

const Box = ({
  icon,
  title,
  description,
  onClick,
  backgroundClass,
  className = "",
  children
}) => {
  return (
    <div className={`box ${className}`} onClick={onClick}>
      <div className={`box-icon ${backgroundClass}`}>{icon}</div>
      <h2>{title}</h2>
      <p>{description}</p>
      {children}
    </div>
  );
};

Box.propTypes = {
  icon: PropTypes.any,
  title: PropTypes.string,
  description: PropTypes.string,
  onClick: PropTypes.func,
  backgroundClass: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.any
};

Box.defaultProps = {
  onClick: () => {},
  backgroundClass: ""
};

export default Box;
