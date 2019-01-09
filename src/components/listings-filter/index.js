import React from "react";
import PropTypes from "prop-types";
import { Button, Form, Radio, Checkbox } from "antd";
import { intlShape, injectIntl } from "react-intl";
import { PROPERTY_TYPES } from "../../../core/data/propertyData";

import PriceRangeSlider from "../../components/price-range-slider";
import LocationSearch from "../../components/location-search";
import { translate } from "../../utilities/locale";

import "./styles.scss";

const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;

const ListingsFilter = ({
  intl,
  defaultAddress,
  filters: { priceMin, priceMax, parking, bathrooms, bedrooms },
  onBathroomChange,
  onBedroomChange,
  onParkingChange,
  onPriceRangeChange,
  onFilterSubmit,
  onLocationSelect,
  checkBoxState,
  onCheckBoxChange,
  googleTagFilterEvent: { googleTagLocation }
}) => {
  const checkOptions = [
    translate(intl, "House/Townhouse"),
    translate(intl, "Condo/Apartment"),
    translate(intl, "Recreational"),
    translate(intl, "Commercial"),
    translate(intl, "Other")
  ];

  const checkValue = {};

  PROPERTY_TYPES.map(propertyType => { // eslint-disable-line
    checkValue[translate(intl, propertyType.value)] = propertyType.value;
  });

  return (
    <div className="listings-filter">
      <Form layout="horizontal" onSubmit={onFilterSubmit}>
        <FormItem label={translate(intl, "location")} colon={false}>
          <LocationSearch
            defaultAddress={defaultAddress}
            onLocationSelect={onLocationSelect}
            googleTagLocation={googleTagLocation}
          />
        </FormItem>

        <FormItem label={translate(intl, "bedrooms")} colon={false}>
          <RadioGroup defaultValue={bedrooms} onChange={onBedroomChange}>
            <RadioButton value={0}>{translate(intl, "any")}</RadioButton>
            <RadioButton value={1}>1+</RadioButton>
            <RadioButton value={2}>2+</RadioButton>
            <RadioButton value={3}>3+</RadioButton>
            <RadioButton value={4}>4+</RadioButton>
          </RadioGroup>
        </FormItem>
        <FormItem label={translate(intl, "bathrooms")} colon={false}>
          <RadioGroup defaultValue={bathrooms} onChange={onBathroomChange}>
            <RadioButton value={0}>{translate(intl, "any")}</RadioButton>
            <RadioButton value={1}>{translate(intl, "1+")}</RadioButton>
            <RadioButton value={2}>{translate(intl, "2+")}</RadioButton>
            <RadioButton value={3}>{translate(intl, "3+")}</RadioButton>
            <RadioButton value={4}>{translate(intl, "4+")}</RadioButton>
          </RadioGroup>
        </FormItem>
        <FormItem label={translate(intl, "parking")} colon={false}>
          <RadioGroup defaultValue={parking} onChange={onParkingChange}>
            <RadioButton value={0}>{translate(intl, "any")}</RadioButton>
            <RadioButton value={1}>{translate(intl, "1+")}</RadioButton>
            <RadioButton value={2}>{translate(intl, "2+")}</RadioButton>
            <RadioButton value={3}>{translate(intl, "3+")}</RadioButton>
            <RadioButton value={4}>{translate(intl, "4+")}</RadioButton>
          </RadioGroup>
        </FormItem>
        <FormItem
          label={translate(intl, "priceRange")}
          colon={false}
          className="listings-filter__select-price-range"
        >
          <PriceRangeSlider
            defaultValue={[priceMin, priceMax]}
            onPriceRangeChange={onPriceRangeChange}
          />
        </FormItem>
        <FormItem label={translate(intl, "propertyType")} colon={false}>
          <CheckboxGroup
            className="checkbox-group"
            options={checkOptions}
            value={getResidentialCheckboxOptions({
              checkBoxState,
              checkValue
            })}
            onChange={onCheckBoxChange}
          />
        </FormItem>

        <Button className="apply-button" htmlType="submit">
          {translate(intl, "apply")}
        </Button>
      </Form>
    </div>
  );
};
const getResidentialCheckboxOptions = ({ checkBoxState, checkValue }) => {
  return checkBoxState.map(val => checkValue[val]);
};

ListingsFilter.propTypes = {
  intl: intlShape.isRequired,
  filters: PropTypes.object,
  onBathroomChange: PropTypes.func,
  onBedroomChange: PropTypes.func,
  onParkingChange: PropTypes.func,
  onPropertyTypeChange: PropTypes.func,
  onPriceRangeChange: PropTypes.func,
  onFilterSubmit: PropTypes.func,
  onLocationSelect: PropTypes.func,
  onCheckBoxChange: PropTypes.func,
  onResidentialCheckBoxChange: PropTypes.func,
  onCommercialCheckBoxChange: PropTypes.func,
  onCheckBoxAllChange: PropTypes.func,
  checkBoxState: PropTypes.array,
  googleTagFilterEvent: PropTypes.object,
  country: PropTypes.string,
  defaultAddress: PropTypes.string
};

ListingsFilter.defaultProps = {
  defaultAddress: ""
};

export default injectIntl(ListingsFilter);
