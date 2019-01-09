import React from "react";
import PropTypes from "prop-types";
import { Icon } from "antd";

import "./styles.scss";

const SummaryBadge = ({ value, display, onClick }) => (
  <div className="summaryBadge">
    <button onClick={onClick} value={value}>
      <Icon type="close" />
    </button>
    <span> {display} </span>
  </div>
);

SummaryBadge.defaultProps = {
  value: "",
  display: "",
  onClick: () => {}
};

SummaryBadge.propTypes = {
  value: PropTypes.string,
  display: PropTypes.string.isRequired,
  onClick: PropTypes.func
};

export default SummaryBadge;
