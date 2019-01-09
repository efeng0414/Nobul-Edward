import React, { Component } from "react";
import { Select } from "antd";
import { intlShape, injectIntl } from "react-intl";
import PropTypes from "prop-types";
import { bound } from "class-bind";
import { amortizationRange } from "./utilities";
import { translate } from "../../utilities/locale";

@injectIntl
export class AmortizationOptions extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
    parentClass: PropTypes.string,
    onSelectChange: PropTypes.func.isRequired,
    defaultValue: PropTypes.number
  };

  static defaultProps = {
    defaultValue: 5
  };

  @bound
  renderOption(value) {
    return (
      <Select.Option key={value} value={value}>
        {translate(
          this.props.intl,
          `mortgageCalculator.amorizationPeriod.${value}`
        )}
      </Select.Option>
    );
  }

  render() {
    return (
      <Select
        style={{
          width: 104
        }}
        getPopupContainer={() =>
          document.querySelector(`.${this.props.parentClass}`)
        }
        onChange={this.props.onSelectChange}
        defaultValue={this.props.defaultValue}
      >
        {amortizationRange.map(this.renderOption)}
      </Select>
    );
  }
}
