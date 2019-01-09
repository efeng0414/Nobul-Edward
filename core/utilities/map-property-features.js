import React from "react";
import { Radio } from "antd";
import PropTypes from "prop-types";

const mapPropertyFeatures = ({ value, icon }) => (
  <Radio value={value} key={value}>
    <img src={icon} />
  </Radio>
);

mapPropertyFeatures.PropTypes = {
  value: PropTypes.number,
  icon: PropTypes.any
};

export { mapPropertyFeatures };
