import React from "react";
import { Select } from "antd";
import { intlShape, injectIntl } from "react-intl";
import PropTypes from "prop-types";

import { translate } from "../../utilities/locale";
import { PROPERTY_TYPES } from "../../../core/data/propertyData";

const { Option } = Select;

const PropertyTypes = props => {
  const {
    intl,
    selectedPropertyType,
    onPropertyTypeChange,
    placeholder,
    mode = "default"
  } = props;
  return (
    <Select
      placeholder={placeholder || translate(intl, "selectPropertyType")}
      onChange={onPropertyTypeChange}
      defaultValue={selectedPropertyType}
      mode={mode}
    >
      {PROPERTY_TYPES.map(propertyType => {
        return (
          <Option value={propertyType.value} key={propertyType.value}>
            {translate(intl, propertyType.value)}
          </Option>
        );
      })}
    </Select>
  );
};

PropertyTypes.propTypes = {
  intl: intlShape.isRequired,
  selectedPropertyType: PropTypes.any,
  onPropertyTypeChange: PropTypes.func.isRequired,
  mode: PropTypes.string,
  placeholder: PropTypes.string
};

export default injectIntl(PropertyTypes);
