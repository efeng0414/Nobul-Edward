import React from "react";
import PropTypes from "prop-types";
import { Button } from "antd";

const ModalFooter = ({ handleConfirm }) => (
  <div className="footer">
    <Button onClick={handleConfirm} type="primary">
      Confirm
    </Button>
  </div>
);

ModalFooter.propTypes = {
  handleConfirm: PropTypes.func.isRequired
};

export default ModalFooter;
