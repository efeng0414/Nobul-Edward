import React from "react";
import PropTypes from "prop-types";
import { Form, Rate } from "antd";

const StarRateInput = ({ value, onChange, labelText }) => (
  <Form.Item className="agent-rate-form-star-rate-input">
    <label className="agent-rate-form-review-rate-title">{labelText}</label>
    <Rate
      className="agent-rate-form-review-rate"
      value={value}
      onChange={onChange}
    />
  </Form.Item>
);

StarRateInput.propTypes = {
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  labelText: PropTypes.string.isRequired
};

export default StarRateInput;
