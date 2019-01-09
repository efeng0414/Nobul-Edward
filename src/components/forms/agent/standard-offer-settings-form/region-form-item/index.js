import React from "react";
import { intlShape } from "react-intl";
import PropTypes from "prop-types";
import { Form, Icon } from "antd";

import { objectIsEmpty } from "../../../../../../core/utilities/misc";
import { translate } from "../../../../../utilities/locale";

const FormItem = Form.Item;
const locationsMap = (location, index) => (
  <span key={index}>{location.name}</span>
);

const RegionFormItem = ({
  intl,
  locations,
  getFieldDecorator,
  onEditClick
}) => {
  const checkRegions = (_, rule, callback) => {
    if (objectIsEmpty(locations)) {
      callback(translate(intl, "error.regionsIsRequired"));
    } else {
      callback();
    }
  };

  return (
    <FormItem
      colon={false}
      className="regions"
      label={
        <div>
          <span>{translate(intl, "offerSettings.regions")}</span>
          <Icon type="edit" onClick={onEditClick} />
        </div>
      }
    >
      {getFieldDecorator("regions", {
        rules: [
          {
            validator: checkRegions
          }
        ]
      })(
        <div className="offer-settings__locations">
          {Object.values(locations).map(locationsMap)}
        </div>
      )}
    </FormItem>
  );
};

RegionFormItem.propTypes = {
  intl: intlShape.isRequired,
  locations: PropTypes.object,
  getFieldDecorator: PropTypes.any.isRequired,
  onEditClick: PropTypes.func.isRequired
};

export default RegionFormItem;
