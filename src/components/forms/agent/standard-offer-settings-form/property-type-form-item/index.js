import React from "react";
import { intlShape } from "react-intl";
import PropTypes from "prop-types";
import { Form } from "antd";

import { translate } from "../../../../../utilities/locale";

const FormItem = Form.Item;
const PropertyTypeFormItem = ({ intl, propertyTypes }) => (
  <FormItem colon={false} label={translate(intl, "offerSettings.propertyType")}>
    <div className="offer-settings__property-type">
      {propertyTypes.map((type, index) => (
        <span key={index}>{translate(intl, type)}</span>
      ))}
    </div>
  </FormItem>
);

PropertyTypeFormItem.propTypes = {
  intl: intlShape.isRequired,
  propertyTypes: PropTypes.array
};

export default PropertyTypeFormItem;
