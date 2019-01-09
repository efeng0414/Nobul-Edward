import React from "react";
import { Select } from "antd";
import { intlShape, injectIntl } from "react-intl";
import PropTypes from "prop-types";

import { translate } from "../../utilities/locale";
import { PRICE_RANGES } from "../../../core/data/propertyData";
import { getSelectorParent } from "./utilities";

const Option = Select.Option;

const PriceRanges = props => {
  const {
    intl,
    selectedPriceRange,
    onPriceRangeChange,
    mode = "default"
  } = props;
  return (
    <Select
      placeholder={translate(intl, "selectPriceRange")}
      onChange={onPriceRangeChange}
      defaultValue={selectedPriceRange}
      mode={mode}
      getPopupContainer={getSelectorParent}
    >
      {PRICE_RANGES.map(price => {
        return (
          <Option value={price.key} key={price.key}>
            {price.label}
          </Option>
        );
      })}
    </Select>
  );
};

PriceRanges.propTypes = {
  intl: intlShape.isRequired,
  selectedPriceRange: PropTypes.string,
  onPriceRangeChange: PropTypes.func.isRequired,
  mode: PropTypes.string
};

export default injectIntl(PriceRanges);
