import React from "react";
import PropTypes from "prop-types";
import { Form, Radio } from "antd";
import { translate } from "../../../../utilities/locale";

const { Group: RadioGroup } = Radio;
const { Item: FormItem } = Form;

const ContractToBrokerageFormItem = ({
  getFieldDecorator,
  fieldName,
  intl
}) => (
  <div>
    <div className="consumer-registration-form-item contract-brokerage">
      <FormItem>
        <p className="consumer-registration-paragraph">
          {translate(intl, "consumer.under_contract_brokerage")}
        </p>
        {getFieldDecorator(fieldName)(
          <RadioGroup>
            <Radio value={false}>{translate(intl, "consumer.no")}</Radio>
            <Radio value={true}>{translate(intl, "consumer.yes")}</Radio>
          </RadioGroup>
        )}
      </FormItem>
    </div>
  </div>
);

ContractToBrokerageFormItem.propTypes = {
  getFieldDecorator: PropTypes.func.isRequired,
  fieldName: PropTypes.string.isRequired,
  intl: PropTypes.object.isRequired
};

export default ContractToBrokerageFormItem;
