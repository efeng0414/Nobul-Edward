import React from "react";
import PropTypes from "prop-types";
import { Form, Input } from "antd";

export const FailureReasonInput = ({
  value,
  onChange,
  validationStatus,
  helpText,
  placeholder
}) => (
  <Form.Item
    help={validationStatus ? helpText : false}
    validateStatus={validationStatus}
  >
    <Input value={value} onChange={onChange} placeholder={placeholder} />
  </Form.Item>
);

FailureReasonInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  validationStatus: PropTypes.string.isRequired,
  helpText: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired
};

export default FailureReasonInput;
