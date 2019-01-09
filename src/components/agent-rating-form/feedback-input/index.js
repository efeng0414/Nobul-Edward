import React from "react";
import PropTypes from "prop-types";
import { Form, Input } from "antd";

export const FeedbackInput = ({
  validationStatus,
  value,
  onChange,
  helpText,
  labelText
}) => (
  <Form.Item
    help={validationStatus ? helpText : false}
    validateStatus={validationStatus}
  >
    <label className="block">{labelText}</label>
    <Input.TextArea rows={4} value={value} onChange={onChange} />
  </Form.Item>
);

FeedbackInput.propTypes = {
  validationStatus: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  helpText: PropTypes.string.isRequired,
  labelText: PropTypes.string.isRequired
};

FeedbackInput.defaultProps = {
  value: ""
};

export default FeedbackInput;
