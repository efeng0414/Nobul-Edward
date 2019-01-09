import React from "react";
import PropTypes from "prop-types";
import { Form, Radio } from "antd";
import { translate } from "../../../../utilities/locale";
import { BUY, SELL, BOTH } from "../../../../../core/constants/shared";
const { Group: RadioGroup } = Radio;
const { Item: FormItem } = Form;

const LookingForFormItem = ({ getFieldDecorator, fieldName, intl }) => (
  <div className="consumer-registration-form-item">
    <FormItem>
      <p className="consumer-registration-paragraph">
        {translate(intl, "consumer.buy_sell")}
      </p>
      {getFieldDecorator(fieldName, {
        rules: [
          {
            required: true,
            message: translate(intl, "error.selectBuyOrSell")
          }
        ]
      })(
        <RadioGroup>
          <Radio value={BOTH}>{translate(intl, "consumer.both")}</Radio>
          <Radio value={BUY}>{translate(intl, "consumer.buy")}</Radio>
          <Radio value={SELL}>{translate(intl, "consumer.sell")}</Radio>
        </RadioGroup>
      )}
    </FormItem>
  </div>
);

LookingForFormItem.propTypes = {
  getFieldDecorator: PropTypes.func.isRequired,
  fieldName: PropTypes.string.isRequired,
  intl: PropTypes.object.isRequired
};

export default LookingForFormItem;
