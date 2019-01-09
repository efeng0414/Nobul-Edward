import React from "react";
import PropTypes from "prop-types";
import { Button } from "antd";
import { injectIntl, intlShape } from "react-intl";
import { translate } from "../../../../../utilities/locale";

const ModalFooter = ({ onUpdateClick, activeFieldKey, intl }) => (
  <div>
    <Button type="primary" onClick={onUpdateClick} data-active-field-key={activeFieldKey}>
      {translate(intl, "consumerSettings.update")}
    </Button>
  </div>
);

ModalFooter.propTypes = {
  onUpdateClick: PropTypes.func.isRequired,
  activeFieldKey: PropTypes.string.isRequired,
  intl: intlShape.isRequired
};

export default injectIntl(ModalFooter);
