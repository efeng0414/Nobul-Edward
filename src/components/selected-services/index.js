import React from "react";
import PropTypes from "prop-types";
import { intlShape } from "react-intl";
import { renderServices } from "./utilities";

import "./styles.scss";

const SelectedServices = ({
  intl,
  selectedServices,
  displayCheckbox,
  toolTips
}) => {
  return (
    <div className="selected-services">
      {selectedServices.map((service, index) =>
        renderServices(service, index, toolTips, intl, displayCheckbox)
      )}
    </div>
  );
};

SelectedServices.propTypes = {
  intl: intlShape.isRequired,
  selectedServices: PropTypes.array,
  displayCheckbox: PropTypes.bool,
  toolTips: PropTypes.array
};

SelectedServices.defaultProps = {
  selectedServices: [],
  displayCheckbox: true,
  toolTips: []
};

export default SelectedServices;
