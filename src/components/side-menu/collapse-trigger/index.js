import React from "react";
import PropTypes from "prop-types";
import { Icon } from "antd";

const CollapseTrigger = ({ isCollapsed, toggleCollapsed }) => (
  <div className="layout-sider-trigger">
    <Icon
      type={isCollapsed ? "menu-unfold" : "menu-fold"}
      onClick={toggleCollapsed}
    />
  </div>
);

CollapseTrigger.propTypes = {
  isCollapsed: PropTypes.bool.isRequired,
  toggleCollapsed: PropTypes.func.isRequired
};

export default CollapseTrigger;
