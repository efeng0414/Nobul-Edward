import React from "react";
import PropTypes from "prop-types";
import { Switch } from "antd";

const SettingsSwitchFieldItem = ({ label, subText, onChange, checked }) => (
  <div className="settings-field-item switch-field-item">
    <Switch checked={checked} onChange={onChange} className="switch" />
    <div className="settings-field-item-container">
      <p className="value">{label}</p>
      {!!subText && <label className="subtext">{subText}</label>}
    </div>
  </div>
);

SettingsSwitchFieldItem.propTypes = {
  label: PropTypes.string.isRequired,
  subText: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired
};

SettingsSwitchFieldItem.defaultProps = {
  subText: ""
};

export default SettingsSwitchFieldItem;
