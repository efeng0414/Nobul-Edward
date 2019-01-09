import React from "react";
import PropTypes from "prop-types";

import "./styles.scss";

const BoxCollapsible = ({ className = "", children, isOpenByDefault }) => {
  return (
    <div className={`box-collapsible-holder ${className}`}>
      <input
        id="collapsible"
        className="box-collapsible-toggle"
        type="checkbox"
        defaultChecked={isOpenByDefault}
      />
      <div className="box-collapsible">
        <label htmlFor="collapsible" className="box-collapsible-label" />
        <div className="box-collapsible-content">
          <div className="box-collapsible-content-inner">{children}</div>
        </div>
      </div>
    </div>
  );
};

BoxCollapsible.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  isOpenByDefault: PropTypes.bool
};

BoxCollapsible.defaultProps = {
  isOpenByDefault: false
};

export default BoxCollapsible;
