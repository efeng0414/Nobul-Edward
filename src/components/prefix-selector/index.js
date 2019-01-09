import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Select } from "antd";
import { bound } from "class-bind";
import { COUNTRIES } from "../../../core/data/countries";

const { Option } = Select;

const phonePrefixes = COUNTRIES.map(({ phonePrefix }) => phonePrefix);
const uniquePhonePrefixes = [...new Set(phonePrefixes)];

const renderPhonePrefix = phonePrefix => (
  <Option key={phonePrefix} value={phonePrefix}>
    {phonePrefix}
  </Option>
);

class PrefixSelector extends PureComponent {
  static propTypes = {
    getPrefix: PropTypes.func
  };

  static defaultProps = {
    getPrefix: () => {}
  };

  @bound
  onOptionChange(value) {
    this.props.getPrefix(value);
  }

  render() {
    return (
      <Select
        style={{ width: 70 }}
        onSelect={this.onOptionChange}
        {...this.props}
      >
        {uniquePhonePrefixes.map(renderPhonePrefix)}
      </Select>
    );
  }
}

export default PrefixSelector;
