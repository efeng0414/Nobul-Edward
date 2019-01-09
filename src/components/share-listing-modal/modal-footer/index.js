import React from "react";
import PropTypes from "prop-types";
import { Button } from "antd";

const ModalFooter = ({ onCancelClick, cancelText }) => (
  <Button type="primary" onClick={onCancelClick}>
    {cancelText}
  </Button>
);

ModalFooter.propTypes = {
  onCancelClick: PropTypes.func.isRequired,
  cancelText: PropTypes.string.isRequired
};

export default ModalFooter;
