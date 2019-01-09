import React from "react";
import PropTypes from "prop-types";
import { Form, Button } from "antd";

const SubmitButton = ({ onClick, isDisabled, loading }) => (
  <Form.Item>
    <Button
      className="agent-rate-form-review-rate-btn"
      disabled={isDisabled}
      type="primary"
      onClick={onClick}
      loading={loading}
    >
      Submit
    </Button>
  </Form.Item>
);

SubmitButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool,
  loading: PropTypes.bool
};

SubmitButton.defaultProps = {
  isDisabled: false,
  loading: false
};

export default SubmitButton;
