import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form, Select } from "antd";
import { bound } from "class-bind";
import { translate } from "../../../../utilities/locale";
import { optionArray } from "./utilities";

const { Item: FormItem } = Form;
const { Option } = Select;

class TimelineFormItem extends Component {
  static propTypes = {
    getFieldDecorator: PropTypes.func.isRequired,
    intl: PropTypes.object.isRequired,
    fieldName: PropTypes.string.isRequired
  };

  @bound
  renderOption({ value, key }) {
    return (
      <Option key={value} value={value}>
        {translate(this.props.intl, key)}
      </Option>
    );
  }

  render() {
    return (
      <div className="consumer-registration-form-item">
        <FormItem>
          <p className="consumer-registration-paragraph">
            {translate(this.props.intl, "consumer.period")}
          </p>
          {this.props.getFieldDecorator(this.props.fieldName)(
            <Select className="consumer-registration-select">
              {optionArray.map(this.renderOption)}
            </Select>
          )}
        </FormItem>
      </div>
    );
  }
}

export default TimelineFormItem;
